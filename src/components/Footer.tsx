import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import SocialIcon from "./SocialIcon";
import { ACTIVE_SOCIALS, CONTACT, WAI } from "@/lib/site";

const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
        heading: "Explore",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Board of Directors", href: "/leadership" },
            { label: "Volunteers & Team", href: "/team" },
            { label: "Events", href: "/events" },
            { label: "Gallery", href: "/gallery" },
        ],
    },
    {
        heading: "Get Involved",
        links: [
            { label: "Membership", href: "/membership" },
            { label: "Scholarships", href: "/scholarships" },
            { label: "Donate", href: "/donate" },
            { label: "Become a Volunteer", href: "/contact" },
            { label: "Partner With Us", href: "/contact" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Resources", href: "/resources" },
            { label: "FAQ", href: "/faq" },
            { label: "Communication", href: "/communication" },
            { label: "Contact Us", href: "/contact" },
            { label: "WAI International", href: WAI.home, external: true },
        ],
    },
];

export default function Footer() {
    return (
        <footer id="contact-footer" style={{ background: "var(--teal-deep)", color: "white" }}>
            {/* ── Contact strip ── */}
            <div style={{ background: "var(--teal)", padding: "1.15rem 0" }}>
                <div
                    className="container"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p
                        style={{
                            fontWeight: 600,
                            fontSize: "0.86rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <MapPin size={15} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                        {CONTACT.address}
                    </p>
                    <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
                        <a href={CONTACT.phoneHref} className="footer-contact">
                            <Phone size={14} strokeWidth={2.2} />
                            {CONTACT.phone}
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="footer-contact">
                            <Mail size={14} strokeWidth={2.2} />
                            {CONTACT.email}
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Main footer ── */}
            <div className="container" style={{ padding: "5rem 2.5rem 3rem" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "3.5rem",
                    }}
                >
                    {/* Brand */}
                    <div style={{ maxWidth: 320 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
                            <Image src="/images/logo.png" alt="" width={56} height={56} style={{ borderRadius: "50%" }} />
                            <h2
                                style={{
                                    fontSize: "1.4rem",
                                    fontWeight: 900,
                                    color: "white",
                                    letterSpacing: "-1px",
                                    margin: 0,
                                }}
                            >
                                WAI <span style={{ color: "var(--gold)" }}>KENYA</span>
                            </h2>
                        </div>
                        <p
                            style={{
                                color: "rgba(255,255,255,0.65)",
                                lineHeight: 1.75,
                                marginBottom: "1.75rem",
                                fontSize: "0.88rem",
                            }}
                        >
                            A chapter of Women in Aviation International, dedicated to the encouragement and
                            advancement of women and girls in every aviation career field in Kenya.
                        </p>

                        {ACTIVE_SOCIALS.length > 0 && (
                            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                {ACTIVE_SOCIALS.map((s) => (
                                    <a
                                        key={s.key}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-link"
                                        aria-label={`WAI Kenya on ${s.label}`}
                                    >
                                        <SocialIcon platform={s.key} size={16} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {COLUMNS.map((col) => (
                        <div key={col.heading}>
                            <h3
                                style={{
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    letterSpacing: "3px",
                                    textTransform: "uppercase",
                                    color: "var(--gold)",
                                    marginBottom: "1.6rem",
                                }}
                            >
                                {col.heading}
                            </h3>
                            <ul
                                className="footer-links"
                                style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}
                            >
                                {col.links.map((l) => (
                                    <li key={`${col.heading}-${l.label}`}>
                                        {l.external ? (
                                            <a href={l.href} target="_blank" rel="noopener noreferrer">
                                                {l.label}
                                            </a>
                                        ) : (
                                            <Link href={l.href}>{l.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── Bottom bar ── */}
                <div
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        marginTop: "4rem",
                        paddingTop: "2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.83rem" }}>
                        &copy; {new Date().getFullYear()} Women in Aviation International – Kenya Chapter. All
                        rights reserved.
                    </p>
                    <a
                        href={WAI.kenyaChapter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}
                    >
                        A chapter of Women in Aviation International ↗
                    </a>
                </div>
            </div>

            <style>{`
                .footer-links a {
                    color: rgba(255,255,255,0.55);
                    font-size: 0.9rem;
                    transition: color 0.2s;
                }
                .footer-links a:hover { color: var(--gold); }
                .footer-contact {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    font-size: 0.86rem;
                    font-weight: 600;
                    color: white;
                    opacity: 0.9;
                    transition: opacity 0.2s;
                }
                .footer-contact:hover { opacity: 1; }
                .footer-social-link {
                    width: 38px;
                    height: 38px;
                    background: rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    color: white;
                    transition: all 0.2s;
                }
                .footer-social-link:hover {
                    background: var(--gold);
                    color: var(--teal-deep);
                    transform: translateY(-2px);
                }
                @media (prefers-reduced-motion: reduce) {
                    .footer-links a, .footer-contact, .footer-social-link { transition: none; }
                }
            `}</style>
        </footer>
    );
}
