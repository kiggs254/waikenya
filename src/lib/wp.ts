/**
 * Helpers for consuming the WordPress REST API at admin.waikenyachapter.com.
 *
 * WordPress returns `title.rendered` / `content.rendered` as HTML with
 * character references already applied by wptexturize (`--` becomes `&#8212;`,
 * `'` becomes `&#8216;`/`&#8217;`, `&` becomes `&#038;`, ...). React escapes
 * strings when rendering, so those references must be decoded here or they
 * show up literally on the page.
 */

const NAMED_ENTITIES: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    ndash: "–",
    mdash: "—",
    lsquo: "‘",
    rsquo: "’",
    sbquo: "‚",
    ldquo: "“",
    rdquo: "”",
    bdquo: "„",
    hellip: "…",
    prime: "′",
    Prime: "″",
    bull: "•",
    middot: "·",
    laquo: "«",
    raquo: "»",
    copy: "©",
    reg: "®",
    trade: "™",
    deg: "°",
    eacute: "é",
    egrave: "è",
    uuml: "ü",
    ouml: "ö",
    auml: "ä",
};

/**
 * Decode HTML character references in a single pass, so text that was encoded
 * twice (`&amp;lt;`) is not over-decoded into markup.
 */
export function decodeEntities(input: string): string {
    if (!input) return "";
    return input.replace(
        /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([a-zA-Z][a-zA-Z0-9]{1,31}));/g,
        (match, dec: string | undefined, hex: string | undefined, name: string | undefined) => {
            if (dec !== undefined) return fromCodePoint(Number.parseInt(dec, 10), match);
            if (hex !== undefined) return fromCodePoint(Number.parseInt(hex, 16), match);
            if (name !== undefined) {
                const mapped = NAMED_ENTITIES[name];
                if (mapped !== undefined) return mapped;
            }
            return match;
        },
    );
}

function fromCodePoint(code: number, fallback: string): string {
    // Reject surrogates and out-of-range values that String.fromCodePoint throws on.
    if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return fallback;
    if (code >= 0xd800 && code <= 0xdfff) return fallback;
    return String.fromCodePoint(code);
}

/** Strip tags, decode entities and collapse the whitespace WP leaves in markup. */
export function stripHtml(html: string): string {
    if (!html) return "";
    const withBreaks = html
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/(?:p|div|li|h[1-6]|blockquote)>/gi, " ");
    return decodeEntities(withBreaks.replace(/<[^>]+>/g, ""))
        .replace(/\s+/g, " ")
        .trim();
}

/** Split WP block content into clean plain-text paragraphs. */
export function htmlToParagraphs(html: string): string[] {
    if (!html) return [];
    return html
        .split(/<\/(?:p|h[1-6]|blockquote)>/i)
        .map(stripHtml)
        .filter(Boolean);
}

/** Decode a `title.rendered` / meta string coming back from WP. */
export function decodeText(value: unknown): string {
    return typeof value === "string" ? decodeEntities(value).trim() : "";
}

/** Truncate on a word boundary, only appending an ellipsis when text was cut. */
export function truncate(text: string, max = 150): string {
    if (!text || text.length <= max) return text || "";
    const slice = text.slice(0, max);
    const lastSpace = slice.lastIndexOf(" ");
    return `${(lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).replace(/[\s,.;:—-]+$/, "")}…`;
}
