import type { Profile } from "@/components/ProfileGrid";
import { decodeText, htmlToParagraphs } from "@/lib/wp";

export type TeamGroup = "board" | "volunteer";

/**
 * Who sits on the Board and who is a Chapter volunteer.
 *
 * The CMS is the authority: set the `group` field on a Team Member in
 * WordPress (`board`, `volunteer`, or `board,volunteer` for someone in both)
 * and it wins. These defaults only apply to entries where that field is still
 * blank, so the site matches the Chapter's structure before anyone edits
 * WordPress. Keys are normalised names — see `normalise()`.
 */
const DEFAULT_GROUPS: Record<string, TeamGroup[]> = {
    "fiona omondi": ["board"],
    "una gertrude odhiambo": ["board"],
    "mary mukulu kai": ["board"],
    "hon john ogutu omondi": ["board"],
    // The President sits on the Board and leads the volunteer team.
    "peninah n n ngugi": ["board", "volunteer"],
    "primerose njeri": ["volunteer"],
    "kwamboka kemunto": ["volunteer"],
    "emily manduku": ["volunteer"],
    "vanessa lumbasio": ["volunteer"],
};

/** Display order within each section; anyone unlisted sorts to the end. */
const ORDER: Record<TeamGroup, string[]> = {
    board: [
        "fiona omondi",
        "una gertrude odhiambo",
        "mary mukulu kai",
        "peninah n n ngugi",
        "hon john ogutu omondi",
    ],
    volunteer: [
        "peninah n n ngugi",
        "primerose njeri",
        "kwamboka kemunto",
        "emily manduku",
        "vanessa lumbasio",
    ],
};

/** Lowercase, strip punctuation, collapse spaces — so "Peninah N.N.Ngugi" matches. */
function normalise(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function parseGroups(raw: unknown, name: string): TeamGroup[] {
    const fromCms = typeof raw === "string" ? raw.toLowerCase() : "";
    const groups: TeamGroup[] = [];
    if (fromCms.includes("board")) groups.push("board");
    if (fromCms.includes("volunteer")) groups.push("volunteer");
    if (groups.length > 0) return groups;

    // Nothing set in WordPress — fall back to the known structure, and default
    // anyone new to the volunteer team so they are never silently dropped.
    return DEFAULT_GROUPS[normalise(name)] ?? ["volunteer"];
}

function sortForSection(members: (Profile & { key: string })[], group: TeamGroup): Profile[] {
    const order = ORDER[group];
    return [...members]
        .sort((a, b) => {
            const ai = order.indexOf(a.key);
            const bi = order.indexOf(b.key);
            if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
            if (ai === -1) return 1;
            if (bi === -1) return -1;
            return ai - bi;
        })
        .map((entry): Profile => {
            const { key, ...profile } = entry;
            void key;
            return profile;
        });
}

export type TeamData = { board: Profile[]; volunteers: Profile[] };

export async function getTeam(): Promise<TeamData> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return { board: [], volunteers: [] };

    try {
        const res = await fetch(`${baseUrl}/wai_team?_embed&per_page=100`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return { board: [], volunteers: [] };
        const data = await res.json();
        if (!Array.isArray(data)) return { board: [], volunteers: [] };

        const board: (Profile & { key: string })[] = [];
        const volunteers: (Profile & { key: string })[] = [];

        for (const item of data) {
            const name = decodeText(item?.title?.rendered) || "Unknown";
            const image = item?.meta?.external_avatar || item?.featured_image_url;
            if (!image) continue; // every card needs a photograph

            const profile = {
                key: normalise(name),
                name,
                role: decodeText(item?.meta?.role),
                company: decodeText(item?.meta?.company) || undefined,
                bio: htmlToParagraphs(item?.content?.rendered || ""),
                image,
                linkedinUrl: item?.meta?.linkedin_url || undefined,
            };

            for (const group of parseGroups(item?.meta?.group, name)) {
                (group === "board" ? board : volunteers).push(profile);
            }
        }

        return {
            board: sortForSection(board, "board"),
            volunteers: sortForSection(volunteers, "volunteer"),
        };
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        return { board: [], volunteers: [] };
    }
}
