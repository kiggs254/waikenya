import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import type { SocialKey } from "@/lib/site";

/** lucide has no X mark, so the official glyph is inlined. */
function XMark({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export default function SocialIcon({ platform, size = 18 }: { platform: SocialKey; size?: number }) {
    switch (platform) {
        case "linkedin":
            return <Linkedin size={size} strokeWidth={2} />;
        case "facebook":
            return <Facebook size={size} strokeWidth={2} />;
        case "instagram":
            return <Instagram size={size} strokeWidth={2} />;
        case "youtube":
            return <Youtube size={size} strokeWidth={2} />;
        case "x":
            return <XMark size={size} />;
    }
}

/** Brand colour per platform, used for the large cards on /communication. */
export const SOCIAL_COLOR: Record<SocialKey, string> = {
    linkedin: "#0a66c2",
    facebook: "#1877f2",
    instagram: "#d62976",
    youtube: "#ff0000",
    x: "#111111",
};
