import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProfileGrid from "@/components/ProfileGrid";
import { getTeam } from "@/lib/team";

export const metadata: Metadata = {
    title: "Board of Directors | WAI Kenya Chapter",
    description:
        "Meet the Board of Directors and Patron of Women in Aviation International – Kenya Chapter: the co-founders, President and board members steering the Chapter.",
};

export default async function LeadershipPage() {
    const { board } = await getTeam();

    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="WAI Kenya Chapter"
                    title="Board of Directors"
                    lead="The founders, officers and Patron who set the direction of Women in Aviation International – Kenya Chapter."
                />

                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 4rem" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Leadership</p>
                            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                                Who leads the Chapter
                            </h2>
                            <p style={{ color: "var(--text-body)" }}>
                                Click any board member to read their full profile.
                            </p>
                        </div>

                        {board.length > 0 ? (
                            <ProfileGrid members={board} accent="gold" />
                        ) : (
                            <p style={{ textAlign: "center", color: "var(--gray)" }}>
                                Board profiles are being updated. Please check back shortly.
                            </p>
                        )}

                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "3.5rem",
                                color: "var(--gray)",
                                fontSize: "0.92rem",
                            }}
                        >
                            Additional Board members will be added as the Chapter&rsquo;s leadership grows.
                        </p>
                    </div>
                </section>

                {/* ── POINTER TO THE VOLUNTEER TEAM ── */}
                <section style={{ padding: "6rem 0", background: "var(--white)" }}>
                    <div className="container grid-2" style={{ alignItems: "center", gap: "4rem" }}>
                        <div>
                            <p className="section-label">The wider team</p>
                            <h2 className="section-title" style={{ fontSize: "2.2rem", marginBottom: "1.25rem" }}>
                                Behind the Board is a team of volunteers
                            </h2>
                            <p style={{ color: "var(--text-body)", marginBottom: "2rem" }}>
                                Our Secretary, Treasurer, Outreach Chair and Marketing &amp; Events lead run the
                                programmes, mentorship and outreach that reach women and girls across Kenya —
                                all of it voluntary.
                            </p>
                            <Link href="/team" className="btn-primary">
                                Meet the volunteers &amp; team →
                            </Link>
                        </div>

                        <div
                            style={{
                                background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                                color: "white",
                                padding: "3rem",
                                borderRadius: 8,
                            }}
                        >
                            <h3 style={{ color: "white", fontSize: "1.3rem", marginBottom: "1rem" }}>
                                Want to volunteer with us?
                            </h3>
                            <p style={{ color: "rgba(255,255,255,0.78)", marginBottom: "2rem", lineHeight: 1.75 }}>
                                The Chapter is run entirely by members who give their time. If you would like to
                                help with outreach, mentorship, events or communications, we would love to hear
                                from you.
                            </p>
                            <Link
                                href="/contact"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    background: "var(--gold)",
                                    color: "var(--teal-deep)",
                                    padding: "0.85rem 2rem",
                                    fontWeight: 800,
                                    fontSize: "0.88rem",
                                    borderRadius: 2,
                                }}
                            >
                                Become a volunteer →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
