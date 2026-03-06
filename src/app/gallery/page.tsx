import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";
import { Images } from "lucide-react";

export const metadata: Metadata = {
    title: "Gallery | WAI Kenya Chapter",
    description:
        "Browse photos from WAI Kenya Chapter events, Girls in Aviation Day, conferences, and community outreach programmes.",
};

type GalleryImage = {
    id: number;
    title: string;
    imageUrl: string;
    caption?: string;
};

async function getGalleryImages(): Promise<GalleryImage[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return [];

    try {
        const res = await fetch(`${baseUrl}/wai_gallery?per_page=100`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const data = await res.json();

        return data
            .filter((item: any) => item.featured_image_url)
            .map((item: any) => ({
                id: item.id,
                title: item.title?.rendered || "",
                imageUrl: item.featured_image_url,
                caption: item.content?.rendered
                    ? item.content.rendered.replace(/<[^>]+>/g, "").trim()
                    : "",
            }));
    } catch {
        return [];
    }
}

export default async function GalleryPage() {
    const images = await getGalleryImages();

    return (
        <>
            <Navbar />
            <main>

                {/* ── HERO ── */}
                <section
                    style={{
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        padding: "12rem 0 7rem",
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {[360, 580, 800].map((s) => (
                        <div key={s} style={{
                            position: "absolute", width: s, height: s, borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.05)",
                            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                            pointerEvents: "none",
                        }} />
                    ))}
                    <div style={{
                        position: "absolute", top: -60, right: -60, width: 280, height: 280,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(212,176,89,0.18) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    <div className="container" style={{ position: "relative", zIndex: 2 }}>
                        <p style={{
                            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "4px",
                            textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem",
                        }}>
                            ── WAI Kenya Chapter ──
                        </p>
                        <h1 style={{
                            fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900,
                            color: "white", letterSpacing: "-2px", marginBottom: "1.5rem",
                        }}>
                            Gallery
                        </h1>
                        <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: 540, lineHeight: 1.7 }}>
                            Moments captured from our events, outreach programmes, and community milestones —
                            celebrating the women shaping the future of aviation in Kenya.
                        </p>
                    </div>
                </section>

                {/* ── GALLERY GRID ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        {images.length === 0 ? (
                            /* Empty state */
                            <div style={{
                                textAlign: "center",
                                padding: "6rem 2rem",
                                background: "white",
                                borderRadius: 8,
                                border: "1px solid #edf0f3",
                                boxShadow: "0 4px 28px rgba(0,0,0,0.05)",
                            }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: "50%",
                                    background: "var(--off-white)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    margin: "0 auto 1.5rem",
                                }}>
                                    <Images size={36} color="var(--teal)" strokeWidth={1.5} />
                                </div>
                                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "0.75rem" }}>
                                    Photos Coming Soon
                                </h2>
                                <p style={{ color: "var(--text-body)", maxWidth: 400, margin: "0 auto 2rem", lineHeight: 1.7 }}>
                                    Our gallery images are being added. Check back soon to see
                                    moments from our events and programmes.
                                </p>
                                <Link href="/events" className="btn-primary">
                                    View Our Events →
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Gallery header */}
                                <div style={{ marginBottom: "4rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                                        <div style={{ width: 36, height: 3, background: "var(--teal)", borderRadius: 2 }} />
                                        <p style={{
                                            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                                            letterSpacing: "3px", color: "var(--teal)",
                                        }}>
                                            Our Moments
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                                        <h2 style={{
                                            fontSize: "2.5rem", fontWeight: 800, color: "var(--teal-deep)",
                                            letterSpacing: "-1px",
                                        }}>
                                            Photo Gallery
                                        </h2>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-body)", fontWeight: 600 }}>
                                            {images.length} {images.length === 1 ? "photo" : "photos"} · click any to enlarge
                                        </p>
                                    </div>
                                </div>

                                {/* Client component handles grid + lightbox */}
                                <GalleryClient images={images} />
                            </>
                        )}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section style={{ background: "var(--teal-deep)", padding: "7rem 0", textAlign: "center" }}>
                    <div className="container">
                        <p style={{
                            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.25rem",
                        }}>
                            Get Involved
                        </p>
                        <h2 style={{
                            fontSize: "2.8rem", fontWeight: 900, color: "white",
                            letterSpacing: "-1px", marginBottom: "1.25rem",
                        }}>
                            Be Part of Our Story
                        </h2>
                        <p style={{
                            opacity: 0.75, maxWidth: 500, margin: "0 auto 3rem",
                            lineHeight: 1.7, color: "white",
                        }}>
                            Join WAI Kenya Chapter and be part of the events and milestones
                            featured in this gallery.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/events" className="btn-primary">View Upcoming Events →</Link>
                            <Link
                                href="/membership"
                                style={{
                                    display: "inline-flex", alignItems: "center",
                                    border: "2px solid rgba(255,255,255,0.35)",
                                    color: "white", padding: "0.9rem 2.2rem",
                                    fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                                    transition: "all 0.3s",
                                }}
                            >
                                Become a Member
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}
