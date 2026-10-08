import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CopyField from "@/components/CopyField";
import { DONATION, CONTACT } from "@/lib/site";
import {
    GraduationCap, Atom, Compass, HandHeart, Megaphone, School, Heart,
    Globe, TrendingUp, Sparkles, ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Donate | WAI Kenya Chapter",
    description:
        "Support Women in Aviation International – Kenya Chapter. Your donation funds mentorship, youth STEM education, aviation career awareness and menstrual dignity initiatives that keep girls in school.",
};

const SUPPORTS = [
    { icon: GraduationCap, label: "Professional development and education" },
    { icon: Atom, label: "Youth STEM education" },
    { icon: Compass, label: "Aviation career awareness" },
    { icon: HandHeart, label: "Mentorship" },
    { icon: Megaphone, label: "Outreach programmes" },
    { icon: School, label: "Supporting girls to remain in school" },
    { icon: Heart, label: "Menstrual dignity initiatives, including provision of sanitary towels" },
];

const WHY = [
    { icon: Globe, title: "A more inclusive industry", body: "Building a more inclusive and diverse aviation and aerospace industry." },
    { icon: TrendingUp, title: "The aviation workforce", body: "Investing in the current and future aviation workforce." },
    { icon: Sparkles, title: "Inspiring the next generation", body: "Inspiring women and girls to pursue aviation and aerospace careers." },
    { icon: ShieldCheck, title: "Keeping girls in school", body: "Supporting girls to remain in school through menstrual dignity initiatives." },
];

export default function DonatePage() {
    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="Support the Chapter"
                    title="Donate to WAI Kenya"
                    lead="Your donation helps us increase the number of women and girls participating in every aspect of aviation and aerospace."
                >
                    <a href="#donation-details" className="btn-primary" style={{ background: "var(--gold)", color: "var(--teal-deep)" }}>
                        Donate now →
                    </a>
                    <Link href="/contact" className="btn-outline">Talk to us first</Link>
                </PageHero>

                {/* ── OUR MESSAGE ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div style={{ maxWidth: 720, margin: "0 auto 3.5rem", textAlign: "center" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Our message</p>
                            <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                                Dues alone cannot reach every girl
                            </h2>
                            <p style={{ color: "var(--text-body)", fontSize: "1.03rem", lineHeight: 1.8 }}>
                                Donations support programmes beyond what membership dues alone can cover. Every
                                shilling goes directly into the work that puts Kenyan women and girls on a path
                                into aviation and aerospace.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                                gap: "1.25rem",
                                maxWidth: 1040,
                                margin: "0 auto",
                            }}
                        >
                            {SUPPORTS.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "1rem",
                                        padding: "1.5rem",
                                        background: "var(--off-white)",
                                        borderRadius: 6,
                                        border: "1px solid #e9edf0",
                                    }}
                                >
                                    <span
                                        style={{
                                            flexShrink: 0,
                                            width: 42,
                                            height: 42,
                                            borderRadius: "50%",
                                            background: "rgba(26,107,124,0.1)",
                                            color: "var(--teal)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Icon size={19} strokeWidth={2} />
                                    </span>
                                    <p style={{ color: "var(--text-dark)", fontWeight: 600, lineHeight: 1.6, fontSize: "0.95rem" }}>
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY DONATE ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 3.5rem" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Why donate?</p>
                            <h2 className="section-title">The impact of your gift</h2>
                        </div>

                        <div className="grid-4">
                            {WHY.map(({ icon: Icon, title, body }) => (
                                <div
                                    key={title}
                                    style={{
                                        background: "var(--white)",
                                        padding: "2.25rem 1.75rem",
                                        borderRadius: 6,
                                        boxShadow: "0 4px 20px rgba(8,46,58,0.06)",
                                        borderTop: "3px solid var(--gold)",
                                    }}
                                >
                                    <Icon size={26} strokeWidth={1.8} color="var(--teal)" />
                                    <h3
                                        style={{
                                            fontSize: "1.05rem",
                                            color: "var(--teal-deep)",
                                            margin: "1.1rem 0 0.6rem",
                                        }}
                                    >
                                        {title}
                                    </h3>
                                    <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                                        {body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DONATION DETAILS ── */}
                <section
                    id="donation-details"
                    style={{
                        padding: "7rem 0",
                        background:
                            "radial-gradient(circle at 15% 20%, rgba(201,168,76,0.18) 0%, transparent 45%), linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        color: "white",
                        scrollMarginTop: "90px",
                    }}
                >
                    <div className="container" style={{ maxWidth: 760 }}>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <p
                                style={{
                                    fontSize: "0.74rem",
                                    fontWeight: 700,
                                    letterSpacing: "4px",
                                    textTransform: "uppercase",
                                    color: "var(--gold)",
                                    marginBottom: "1.2rem",
                                }}
                            >
                                Donation details
                            </p>
                            <h2
                                style={{
                                    fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
                                    fontWeight: 900,
                                    color: "white",
                                    letterSpacing: "-1px",
                                    marginBottom: "1rem",
                                }}
                            >
                                Donate now
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.75 }}>
                                Donations are made by bank transfer to the Chapter&rsquo;s official account.
                            </p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            <CopyField label="Bank" value={DONATION.bank} />
                            <CopyField label="Account name" value={DONATION.accountName} />
                            <CopyField label="Account number" value={DONATION.accountNumber} />
                        </div>

                        <p
                            style={{
                                textAlign: "center",
                                marginTop: "2.5rem",
                                color: "rgba(255,255,255,0.72)",
                                fontSize: "0.92rem",
                                lineHeight: 1.75,
                            }}
                        >
                            Once you have made a transfer, please email{" "}
                            <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--gold)", fontWeight: 700 }}>
                                {CONTACT.email}
                            </a>{" "}
                            with your name and the amount so we can thank you properly and send a receipt.
                        </p>
                    </div>
                </section>

                {/* ── OTHER WAYS ── */}
                <section style={{ padding: "6rem 0", background: "var(--white)", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: 680 }}>
                        <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "1.25rem" }}>
                            Other ways to support us
                        </h2>
                        <p style={{ color: "var(--text-body)", marginBottom: "2.5rem" }}>
                            Not every contribution is financial. Partner with the Chapter, mentor a young
                            aviator, host an outreach visit, or simply become a member.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/membership" className="btn-primary">Become a member →</Link>
                            <Link
                                href="/contact"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    border: "2px solid var(--teal)",
                                    color: "var(--teal)",
                                    padding: "0.9rem 2.2rem",
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                }}
                            >
                                Partner with us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
