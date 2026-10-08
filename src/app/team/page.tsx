import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProfileGrid from "@/components/ProfileGrid";
import { getTeam } from "@/lib/team";

export const metadata: Metadata = {
    title: "Volunteers & Team | WAI Kenya Chapter",
    description:
        "Meet the volunteers who run Women in Aviation International – Kenya Chapter: the President, Secretary, Treasurer, Outreach Chair and Marketing & Events lead.",
};

export default async function TeamPage() {
    const { volunteers } = await getTeam();

    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="WAI Kenya Chapter"
                    title={<>Volunteers &amp; Team</>}
                    lead="Every programme we run is delivered by members who volunteer their time, on top of full careers in aviation."
                />

                {/* ── COUNTER BAR ── */}
                <section style={{ background: "var(--teal)", padding: "2.75rem 0" }}>
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                            gap: "2rem",
                            textAlign: "center",
                        }}
                    >
                        {[
                            { num: volunteers.length.toString(), label: "Volunteers" },
                            { num: "2012", label: "Chapter Founded" },
                            { num: "500+", label: "Active Members" },
                            { num: "14+", label: "Scholarships Awarded" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p
                                    style={{
                                        fontSize: "2.2rem",
                                        fontWeight: 900,
                                        color: "white",
                                        letterSpacing: "-1px",
                                        marginBottom: "0.2rem",
                                    }}
                                >
                                    {s.num}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "2px",
                                        color: "rgba(255,255,255,0.68)",
                                    }}
                                >
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── VOLUNTEER GRID ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 4rem" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Our people</p>
                            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                                WAI Kenya Volunteers
                            </h2>
                            <p style={{ color: "var(--text-body)" }}>
                                Click any team member to read their full profile.
                            </p>
                        </div>

                        {volunteers.length > 0 ? (
                            <ProfileGrid members={volunteers} />
                        ) : (
                            <p style={{ textAlign: "center", color: "var(--gray)" }}>
                                Team profiles are being updated. Please check back shortly.
                            </p>
                        )}
                    </div>
                </section>

                {/* ── OPEN ROLE ── */}
                <section style={{ padding: "5rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div
                            style={{
                                border: "2px dashed rgba(26,107,124,0.3)",
                                borderRadius: 8,
                                padding: "3rem",
                                textAlign: "center",
                                maxWidth: 720,
                                margin: "0 auto",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 800,
                                    letterSpacing: "2.5px",
                                    textTransform: "uppercase",
                                    color: "var(--gold)",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                Position open
                            </p>
                            <h3 style={{ fontSize: "1.5rem", color: "var(--teal-deep)", marginBottom: "1rem" }}>
                                Membership Chair
                            </h3>
                            <p style={{ color: "var(--text-body)", marginBottom: "2rem" }}>
                                We are appointing a Membership Chair to welcome new members, support renewals
                                and grow the Chapter across Kenya. If that sounds like you, get in touch.
                            </p>
                            <Link href="/contact" className="btn-primary">
                                Express your interest →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    style={{
                        background: "var(--teal-deep)",
                        padding: "6.5rem 0",
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <div className="container">
                        <p
                            style={{
                                fontSize: "0.74rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "4px",
                                color: "var(--gold)",
                                marginBottom: "1.2rem",
                            }}
                        >
                            Get involved
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-1px",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Want to be part of our journey?
                        </h2>
                        <p style={{ opacity: 0.75, maxWidth: 480, margin: "0 auto 2.75rem", lineHeight: 1.7 }}>
                            Join the WAI Kenya Chapter and connect with aviation professionals, mentors, and a
                            community that uplifts every aspiring aviator.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/membership" className="btn-primary">Become a Member →</Link>
                            <Link href="/leadership" className="btn-outline">Meet the Board</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
