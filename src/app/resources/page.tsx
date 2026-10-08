import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { WAI } from "@/lib/site";
import {
    Users, CalendarDays, PlayCircle, Briefcase, Compass, Plane,
    GraduationCap, Sparkles, ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Resources | WAI Kenya Chapter",
    description:
        "Learning, mentorship, career and networking resources for women, girls, students and aviation professionals — WAI Together, the WAI 2027 Conference, On-Demand Education, Jobs Connect, Mentor Connect and Aviation Careers.",
};

type Resource = {
    icon: typeof Users;
    title: string;
    body: string;
    href: string;
    cta: string;
    tag: string;
};

const RESOURCES: Resource[] = [
    {
        icon: Users,
        title: "WAI Together",
        body: "The global online community where WAI members connect, join virtual meetups, ask questions and find each other between conferences.",
        href: WAI.waiTogether,
        cta: "Join the community",
        tag: "Community",
    },
    {
        icon: CalendarDays,
        title: "WAI 2027 Conference",
        body: "The Annual International Women in Aviation Conference — keynotes, professional development seminars, education sessions, the exhibit hall and scholarship awards.",
        href: WAI.conference2027,
        cta: "Conference details",
        tag: "Events",
    },
    {
        icon: PlayCircle,
        title: "On-Demand Education Sessions",
        body: "Recorded conference education sessions you can work through in your own time, wherever you are in Kenya.",
        href: WAI.onDemandEducation,
        cta: "Browse sessions",
        tag: "Learning",
    },
    {
        icon: Briefcase,
        title: "Jobs Connect",
        body: "WAI's aviation and aerospace job board, where member employers post roles across the industry.",
        href: WAI.jobsConnect,
        cta: "Find a role",
        tag: "Careers",
    },
    {
        icon: Compass,
        title: "Mentor Connect",
        body: "Be matched with a mentor — or become one. Mentorship is how most of our own team found their way into aviation.",
        href: WAI.mentorConnect,
        cta: "Find a mentor",
        tag: "Mentorship",
    },
    {
        icon: Plane,
        title: "Aviation Careers",
        body: "What the jobs actually are — pilots, engineers, dispatchers, controllers, cabin crew, safety and security — and the path into each.",
        href: WAI.aviationCareers,
        cta: "Explore careers",
        tag: "Careers",
    },
];

const EXTRA = [
    {
        icon: GraduationCap,
        title: "Scholarships",
        body: "WAI awards scholarships every year across flight training, engineering, dispatch and management.",
        href: "/scholarships",
        external: false,
    },
    {
        icon: Sparkles,
        title: "Youth Education",
        body: "Programmes and resources for Junior Members and young people aged 5–15, including Girls in Aviation Day.",
        href: WAI.youthEducation,
        external: true,
    },
];

export default function ResourcesPage() {
    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="One-stop resources"
                    title="Resources"
                    lead="Learning, mentorship, career and networking opportunities for women, girls, students and aviation professionals."
                />

                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ maxWidth: 640, margin: "0 auto 3.5rem", textAlign: "center" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>From WAI International</p>
                            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                                Everything open to you as a member
                            </h2>
                            <p style={{ color: "var(--text-body)" }}>
                                As a WAI Kenya Chapter member you are a member of Women in Aviation
                                International — these resources are maintained globally and open to you.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                                gap: "1.75rem",
                            }}
                        >
                            {RESOURCES.map(({ icon: Icon, title, body, href, cta, tag }) => (
                                <a
                                    key={title}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-card"
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "1.5rem",
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 8,
                                                background: "rgba(26,107,124,0.1)",
                                                color: "var(--teal)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Icon size={22} strokeWidth={1.9} />
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "0.64rem",
                                                fontWeight: 800,
                                                letterSpacing: "1.6px",
                                                textTransform: "uppercase",
                                                color: "var(--gold)",
                                                background: "rgba(201,168,76,0.14)",
                                                padding: "0.3rem 0.7rem",
                                                borderRadius: 100,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: "1.2rem", color: "var(--teal-deep)", marginBottom: "0.7rem" }}>
                                        {title}
                                    </h3>
                                    <p
                                        style={{
                                            color: "var(--text-body)",
                                            fontSize: "0.92rem",
                                            lineHeight: 1.75,
                                            marginBottom: "1.75rem",
                                            flex: 1,
                                        }}
                                    >
                                        {body}
                                    </p>
                                    <span className="resource-cta">
                                        {cta}
                                        <ArrowUpRight size={15} strokeWidth={2.4} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── ALSO USEFUL ── */}
                <section style={{ padding: "6rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <h2 className="section-title" style={{ fontSize: "2rem" }}>Also worth a look</h2>
                        </div>

                        <div className="grid-2" style={{ maxWidth: 900, margin: "0 auto" }}>
                            {EXTRA.map(({ icon: Icon, title, body, href, external }) => {
                                const inner = (
                                    <>
                                        <Icon size={24} strokeWidth={1.9} color="var(--gold)" />
                                        <h3 style={{ fontSize: "1.1rem", color: "white", margin: "1rem 0 0.6rem" }}>
                                            {title}
                                        </h3>
                                        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                                            {body}
                                        </p>
                                    </>
                                );
                                const style = {
                                    display: "block",
                                    background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                                    padding: "2.5rem",
                                    borderRadius: 8,
                                } as const;

                                return external ? (
                                    <a key={title} href={href} target="_blank" rel="noopener noreferrer" style={style}>
                                        {inner}
                                    </a>
                                ) : (
                                    <Link key={title} href={href} style={style}>
                                        {inner}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── FAQ POINTER ── */}
                <section style={{ padding: "5.5rem 0", background: "var(--off-white)", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: 620 }}>
                        <h2 className="section-title" style={{ fontSize: "1.9rem", marginBottom: "1rem" }}>
                            Still have a question?
                        </h2>
                        <p style={{ color: "var(--text-body)", marginBottom: "2.25rem" }}>
                            Our FAQ covers membership, renewals, the conference, scholarships and Girls in
                            Aviation Day.
                        </p>
                        <Link href="/faq" className="btn-primary">Read the FAQ →</Link>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                .resource-card {
                    display: flex;
                    flex-direction: column;
                    background: var(--white);
                    border: 1px solid #e9edf0;
                    border-radius: 8px;
                    padding: 2rem;
                    height: 100%;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                }
                .resource-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 18px 44px rgba(26,107,124,0.16);
                    border-color: transparent;
                }
                .resource-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 0.4px;
                    text-transform: uppercase;
                    color: var(--teal);
                    transition: gap 0.25s ease;
                }
                .resource-card:hover .resource-cta { gap: 0.7rem; }
                @media (prefers-reduced-motion: reduce) {
                    .resource-card, .resource-cta { transition: none; }
                }
            `}</style>
        </>
    );
}
