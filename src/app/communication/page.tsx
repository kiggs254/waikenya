import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SocialIcon, { SOCIAL_COLOR } from "@/components/SocialIcon";
import { ACTIVE_SOCIALS, CONTACT } from "@/lib/site";
import { decodeText, stripHtml } from "@/lib/wp";
import { ArrowUpRight, Images, CalendarDays, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Communication | WAI Kenya Chapter",
    description:
        "Follow Women in Aviation International – Kenya Chapter on LinkedIn, Facebook, Instagram and X, and see the latest photographs and events from the Chapter.",
};

type Snapshot = { id: number; title: string; imageUrl: string; caption: string };

/** Most recent gallery photographs — the Chapter's own, regularly updated feed. */
async function getLatestImages(): Promise<Snapshot[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return [];
    try {
        const res = await fetch(`${baseUrl}/wai_gallery?per_page=9&orderby=date&order=desc`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        if (!Array.isArray(data)) return [];
        return data
            .filter((item: { featured_image_url?: string }) => item.featured_image_url)
            .map((item: { id: number; title?: { rendered?: string }; featured_image_url: string; content?: { rendered?: string } }) => ({
                id: item.id,
                title: decodeText(item.title?.rendered),
                imageUrl: item.featured_image_url,
                caption: stripHtml(item.content?.rendered || ""),
            }));
    } catch {
        return [];
    }
}

export default async function CommunicationPage() {
    const images = await getLatestImages();

    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="Stay connected"
                    title="Communication"
                    lead="Follow the Chapter to see what we are doing — outreach visits, Girls in Aviation Day, scholarship wins and the people behind them."
                />

                {/* ── SOCIAL PLATFORMS ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 3.5rem" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Follow us</p>
                            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                                Find WAI Kenya on social media
                            </h2>
                            <p style={{ color: "var(--text-body)" }}>
                                Everything we run is posted first on our channels. Follow whichever you use.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                                gap: "1.5rem",
                                maxWidth: 1020,
                                margin: "0 auto",
                            }}
                        >
                            {ACTIVE_SOCIALS.map((s) => (
                                <a
                                    key={s.key}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-card"
                                    style={{ ["--brand" as string]: SOCIAL_COLOR[s.key] }}
                                >
                                    <span className="social-badge">
                                        <SocialIcon platform={s.key} size={22} />
                                    </span>
                                    <h3 className="social-name">{s.label}</h3>
                                    <p className="social-handle">{s.handle}</p>
                                    <span className="social-cta">
                                        Follow
                                        <ArrowUpRight size={14} strokeWidth={2.6} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── LATEST ACTIVITY ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                flexWrap: "wrap",
                                gap: "1.5rem",
                                marginBottom: "3rem",
                            }}
                        >
                            <div>
                                <p className="section-label">Latest from the Chapter</p>
                                <h2 className="section-title" style={{ fontSize: "2.1rem", marginBottom: 0 }}>
                                    What we have been up to
                                </h2>
                            </div>
                            <Link
                                href="/gallery"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.45rem",
                                    fontWeight: 800,
                                    fontSize: "0.82rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    color: "var(--teal)",
                                }}
                            >
                                <Images size={16} strokeWidth={2.2} />
                                See the full gallery →
                            </Link>
                        </div>

                        {images.length > 0 ? (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                                    gap: "1rem",
                                }}
                            >
                                {images.map((img) => (
                                    <figure key={img.id} className="snapshot">
                                        {/* Gallery photographs are large unoptimised WordPress uploads;
                                            next/image handles the resizing. */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img.imageUrl} alt={img.caption || img.title} loading="lazy" />
                                        {(img.caption || img.title) && (
                                            <figcaption>{img.caption || img.title}</figcaption>
                                        )}
                                    </figure>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: "var(--gray)", textAlign: "center" }}>
                                New photographs are added after every event — follow us on social media in the
                                meantime.
                            </p>
                        )}
                    </div>
                </section>

                {/* ── OTHER CHANNELS ── */}
                <section style={{ padding: "6rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div className="grid-3" style={{ maxWidth: 1000, margin: "0 auto" }}>
                            {[
                                {
                                    icon: CalendarDays,
                                    title: "Events calendar",
                                    body: "Upcoming and past Chapter events, with photographs and reports from each one.",
                                    href: "/events",
                                    cta: "View the calendar",
                                },
                                {
                                    icon: Mail,
                                    title: "Email the Chapter",
                                    body: `Questions, partnerships, press and school visit requests — write to ${CONTACT.email}.`,
                                    href: "/contact",
                                    cta: "Contact us",
                                },
                                {
                                    icon: Images,
                                    title: "Photo gallery",
                                    body: "Girls in Aviation Day, outreach visits, conferences and the people who make it happen.",
                                    href: "/gallery",
                                    cta: "Open the gallery",
                                },
                            ].map(({ icon: Icon, title, body, href, cta }) => (
                                <Link
                                    key={title}
                                    href={href}
                                    style={{
                                        display: "block",
                                        padding: "2.25rem",
                                        background: "var(--off-white)",
                                        borderRadius: 8,
                                        border: "1px solid #e9edf0",
                                    }}
                                >
                                    <Icon size={24} strokeWidth={1.9} color="var(--teal)" />
                                    <h3 style={{ fontSize: "1.1rem", color: "var(--teal-deep)", margin: "1rem 0 0.6rem" }}>
                                        {title}
                                    </h3>
                                    <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                                        {body}
                                    </p>
                                    <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                                        {cta} →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                .social-card {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 2rem;
                    background: var(--white);
                    border: 1px solid #e9edf0;
                    border-radius: 8px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                }
                .social-card:hover {
                    transform: translateY(-6px);
                    border-color: transparent;
                    box-shadow: 0 18px 40px color-mix(in srgb, var(--brand) 26%, transparent);
                }
                .social-badge {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: color-mix(in srgb, var(--brand) 12%, transparent);
                    color: var(--brand);
                    margin-bottom: 1.35rem;
                    transition: background 0.3s ease, color 0.3s ease;
                }
                .social-card:hover .social-badge {
                    background: var(--brand);
                    color: #fff;
                }
                .social-name {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: var(--teal-deep);
                    margin-bottom: 0.3rem;
                }
                .social-handle {
                    font-size: 0.84rem;
                    color: var(--gray);
                    line-height: 1.5;
                    word-break: break-word;
                    margin-bottom: 1.5rem;
                    flex: 1;
                }
                .social-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.78rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    color: var(--brand);
                    transition: gap 0.25s ease;
                }
                .social-card:hover .social-cta { gap: 0.65rem; }

                .snapshot {
                    position: relative;
                    margin: 0;
                    border-radius: 6px;
                    overflow: hidden;
                    aspect-ratio: 1 / 1;
                    background: var(--gray-light);
                }
                .snapshot img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .snapshot:hover img { transform: scale(1.06); }
                .snapshot figcaption {
                    position: absolute;
                    inset: auto 0 0 0;
                    padding: 2.5rem 0.9rem 0.85rem;
                    background: linear-gradient(to top, rgba(8,46,58,0.88), transparent);
                    color: #fff;
                    font-size: 0.76rem;
                    line-height: 1.45;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                @media (prefers-reduced-motion: reduce) {
                    .social-card, .social-badge, .social-cta, .snapshot img { transition: none; }
                }
            `}</style>
        </>
    );
}
