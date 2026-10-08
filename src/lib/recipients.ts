import type { Profile } from "@/components/ProfileGrid";
import { decodeText, htmlToParagraphs } from "@/lib/wp";

/**
 * WAI scholarship recipients from the Kenya Chapter.
 *
 * Managed in WordPress under "Scholarship Recipients" — name as the title, a
 * short profile in the editor, and scholarship / year / field / institution as
 * meta. Rendered with the same card and modal as the leadership profiles.
 */
export async function getRecipients(): Promise<Profile[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return [];

    try {
        const res = await fetch(`${baseUrl}/wai_recipient?_embed&per_page=100`, {
            next: { revalidate: 60 },
        });
        // The post type does not exist until the updated plugin is active —
        // a 404 here just means "no recipients yet", not an error worth logging.
        if (!res.ok) return [];
        const data = await res.json();
        if (!Array.isArray(data)) return [];

        return data
            .map((item): Profile | null => {
                const image = item?.meta?.external_avatar || item?.featured_image_url;
                if (!image) return null;

                const year = decodeText(item?.meta?.year);
                const field = decodeText(item?.meta?.field_of_study);
                const institution = decodeText(item?.meta?.institution);

                return {
                    name: decodeText(item?.title?.rendered) || "Recipient",
                    role: decodeText(item?.meta?.scholarship) || "WAI Scholarship",
                    // Year, field of study and institution read as one subtitle
                    // under the name, in the card and in the modal.
                    company: [year, field, institution].filter(Boolean).join(" · ") || undefined,
                    bio: htmlToParagraphs(item?.content?.rendered || ""),
                    image,
                };
            })
            .filter((p): p is Profile => p !== null)
            .sort((a, b) => (b.company ?? "").localeCompare(a.company ?? ""));
    } catch {
        return [];
    }
}
