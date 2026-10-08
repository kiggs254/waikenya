import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import { WAI } from "@/lib/site";
import {
    Plane, GraduationCap, Wrench, Users, Check, RefreshCw,
    Award, HeartHandshake, BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Membership | WAI Kenya Chapter",
    description:
        "Join Women in Aviation International – Kenya Chapter. View all membership categories, pricing and benefits for individuals, students, families and corporate members.",
};

const WHO_CAN_JOIN = [
    { icon: Plane, title: "Aviation professionals", body: "Pilots, engineers, dispatchers, controllers, cabin crew, ground handlers, regulators and operators." },
    { icon: GraduationCap, title: "Students", body: "Anyone training towards an aviation career, in Kenya or abroad." },
    { icon: Wrench, title: "Enthusiasts", body: "You do not have to work in aviation to care about it, or to support this work." },
    { icon: Users, title: "Men as allies", body: "Men are welcome and valued as important allies in advancing women in aviation." },
];

const WHY_JOIN = [
    { icon: Award, title: "Scholarship eligibility", body: "WAI awards scholarships every year across flight training, engineering, dispatch and management — members only." },
    { icon: HeartHandshake, title: "Mentorship and networking", body: "Mentor Connect, WAI Together and a Kenyan chapter of people who have walked the path ahead of you." },
    { icon: BookOpen, title: "Learning and careers", body: "Aviation for Women magazine, on-demand education sessions, Jobs Connect and the annual conference." },
];

const JUNIOR_POINTS = [
    "Free membership for Junior Members aged 5–15",
    "Birthday and school information are required during registration",
    "Junior Members are not eligible to apply for WAI scholarships",
    "Membership expires 60 days after the member turns 16",
    "Members can then upgrade to Student or Individual Membership",
];

const individualPlans = [
    {
        category: "Individual",
        price: "$45",
        badge: "Popular",
        desc: "Aviation professionals or enthusiasts. (U.S. residents only)",
        features: ["Aviation for Women magazine", "WAI e-Newsletter", "Member networking", "Scholarship eligibility"],
    },
    {
        category: "Student",
        price: "$32",
        badge: "Best for Students",
        desc: "Full-time high school, undergraduate, or graduate students. (U.S. residents and active students only).",
        features: ["Aviation for Women magazine", "WAI e-Newsletter", "Scholarship eligibility", "Career mentorship access"],
    },
    {
        category: "International",
        price: "$55",
        badge: null,
        desc: "Aviation professionals and enthusiasts who live outside the United States.",
        features: ["Aviation for Women magazine", "WAI e-Newsletter", "Member networking", "Scholarship eligibility"],
    },
    {
        category: "International – Digital Only",
        price: "$42",
        badge: null,
        desc: "Same as International, but with digital magazine only.",
        features: ["Digital Aviation for Women", "WAI e-Newsletter", "Member networking", "Scholarship eligibility"],
    },
    {
        category: "International Student",
        price: "$45",
        badge: null,
        desc: "Full-time high school or college students outside the United States pursuing an aviation career. (Active students only).",
        features: ["Aviation for Women magazine", "WAI e-Newsletter", "Scholarship eligibility", "Career mentorship access"],
    },
    {
        category: "International Student – Digital Only",
        price: "$30",
        badge: "Best Value",
        desc: "Same as International Student, but with digital magazine only. (Active students only).",
        features: ["Digital Aviation for Women", "WAI e-Newsletter", "Scholarship eligibility", "Career mentorship access"],
    },
    {
        category: "Family",
        price: "$20",
        badge: null,
        desc: "Individual family members residing in the same household as an Individual, Student or International Member. *Please contact WAI headquarters to set up.",
        features: ["One copy Aviation for Women (primary member)", "WAI e-Newsletter"],
    },
];

const lifetimePlans = [
    {
        category: "Lifetime",
        price: "$1,499",
        badge: "Under 60",
        desc: "Lifetime WAI membership for those under age 60.",
        features: ["All Individual benefits — for life", "Lifetime certificate", "Pioneer Hall of Fame eligibility"],
    },
    {
        category: "Lifetime +60",
        price: "$949",
        badge: "Age 60+",
        desc: "Lifetime WAI membership for those age 60 and over.",
        features: ["All Individual benefits — for life", "Lifetime certificate", "Pioneer Hall of Fame eligibility"],
    },
];

const corporatePlans = [
    {
        category: "Corporate",
        price: "$400",
        badge: null,
        desc: "Organizations and/or companies that support the goals of Women in Aviation International.",
        features: [
            "Corporate listing in WAI directory",
            "Aviation for Women for one contact",
            "WAI e-Newsletter",
            "Recognition at WAI events",
        ],
    },
    {
        category: "Supersonic Corporate",
        price: "$500",
        badge: "Recommended",
        desc: "Same as Corporate, but includes individual member benefits for four employees.",
        features: [
            "All Corporate benefits",
            "Individual benefits for 4 employees",
            "Enhanced WAI directory listing",
            "Priority recognition at events",
        ],
    },
];

function PlanCard({
    plan,
    highlight = false,
}: {
    plan: (typeof individualPlans)[number];
    highlight?: boolean;
}) {
    return (
        <div
            style={{
                background: highlight ? "var(--teal)" : "white",
                color: highlight ? "white" : "var(--text-dark)",
                borderRadius: 4,
                padding: "2.5rem",
                boxShadow: highlight
                    ? "0 20px 50px rgba(26,107,124,0.35)"
                    : "0 4px 24px rgba(0,0,0,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                position: "relative",
                border: highlight ? "none" : "1px solid #edf0f3",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
        >
            {plan.badge && (
                <span
                    style={{
                        position: "absolute",
                        top: "-12px",
                        left: "2rem",
                        background: "var(--gold)",
                        color: "var(--teal-deep)",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.9rem",
                        borderRadius: "100px",
                    }}
                >
                    {plan.badge}
                </span>
            )}

            <div>
                <p
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        opacity: 0.6,
                        marginBottom: "0.4rem",
                    }}
                >
                    Membership
                </p>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: highlight ? "white" : "var(--teal-deep)" }}>
                    {plan.category}
                </h3>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 900, color: highlight ? "var(--gold)" : "var(--teal)", letterSpacing: "-2px" }}>
                    {plan.price}
                </span>
                <span style={{ opacity: 0.6, fontSize: "0.85rem" }}>/year</span>
            </div>

            <p style={{ fontSize: "0.9rem", opacity: 0.75, lineHeight: 1.6 }}>{plan.desc}</p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", flex: 1 }}>
                {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: "0.6rem", fontSize: "0.9rem", alignItems: "flex-start" }}>
                        <span style={{ color: highlight ? "var(--gold)" : "var(--teal)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                        {f}
                    </li>
                ))}
            </ul>

            <Link
                href="#join-form"
                style={{
                    display: "block",
                    textAlign: "center",
                    padding: "0.9rem",
                    background: highlight ? "white" : "var(--teal)",
                    color: highlight ? "var(--teal)" : "white",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    borderRadius: 2,
                    marginTop: "0.5rem",
                    transition: "opacity 0.2s",
                }}
            >
                Get Started →
            </Link>
        </div>
    );
}

export default function MembershipPage() {
    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="WAI Kenya Chapter"
                    title="Join Women in Aviation"
                    lead="Membership is open to women and men from all segments of the aviation industry, at every stage of a career."
                >
                    <a
                        href={WAI.membershipInformation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ background: "var(--gold)", color: "var(--teal-deep)" }}
                    >
                        Join WAI →
                    </a>
                    <a href="#categories" className="btn-outline">See membership categories</a>
                </PageHero>

                {/* ── WHO CAN JOIN ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div style={{ maxWidth: 700, margin: "0 auto 3.5rem", textAlign: "center" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Who can join</p>
                            <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                                Everyone is welcome
                            </h2>
                            <p style={{ color: "var(--text-body)", fontSize: "1.03rem", lineHeight: 1.8 }}>
                                WAI membership is open to women <em>and</em> men from all segments of the
                                aviation industry and at all stages of their careers. Men are welcome and
                                valued as <strong>important allies in advancing women in aviation</strong>.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                                gap: "1.25rem",
                                maxWidth: 1060,
                                margin: "0 auto",
                            }}
                        >
                            {WHO_CAN_JOIN.map(({ icon: Icon, title, body }) => (
                                <div
                                    key={title}
                                    style={{
                                        padding: "2rem 1.6rem",
                                        background: "var(--off-white)",
                                        border: "1px solid #e9edf0",
                                        borderRadius: 6,
                                    }}
                                >
                                    <Icon size={24} strokeWidth={1.9} color="var(--teal)" />
                                    <h3 style={{ fontSize: "1.02rem", color: "var(--teal-deep)", margin: "1rem 0 0.5rem" }}>
                                        {title}
                                    </h3>
                                    <p style={{ color: "var(--text-body)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                                        {body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY JOIN ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 3.5rem" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>Why join</p>
                            <h2 className="section-title">What membership gives you</h2>
                        </div>
                        <div className="grid-3" style={{ maxWidth: 1060, margin: "0 auto" }}>
                            {WHY_JOIN.map(({ icon: Icon, title, body }) => (
                                <div
                                    key={title}
                                    style={{
                                        background: "var(--white)",
                                        padding: "2.25rem",
                                        borderRadius: 6,
                                        boxShadow: "0 4px 20px rgba(8,46,58,0.06)",
                                        borderTop: "3px solid var(--teal)",
                                    }}
                                >
                                    <Icon size={26} strokeWidth={1.8} color="var(--gold)" />
                                    <h3 style={{ fontSize: "1.08rem", color: "var(--teal-deep)", margin: "1.1rem 0 0.6rem" }}>
                                        {title}
                                    </h3>
                                    <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                                        {body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── GLOBAL ACCESS PROGRAM ── */}
                <section
                    id="global-access"
                    style={{
                        padding: "6.5rem 0",
                        background:
                            "radial-gradient(circle at 80% 20%, rgba(201,168,76,0.16) 0%, transparent 50%), linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        color: "white",
                        scrollMarginTop: "90px",
                    }}
                >
                    <div className="container grid-2" style={{ gap: "4rem", alignItems: "center" }}>
                        <div>
                            <p
                                style={{
                                    fontSize: "0.74rem",
                                    fontWeight: 700,
                                    letterSpacing: "3px",
                                    textTransform: "uppercase",
                                    color: "var(--gold)",
                                    marginBottom: "1.1rem",
                                }}
                            >
                                Global Access Program
                            </p>
                            <h2
                                style={{
                                    fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                                    fontWeight: 900,
                                    color: "white",
                                    letterSpacing: "-1px",
                                    marginBottom: "1.25rem",
                                }}
                            >
                                Kenyan rates, applied automatically
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                                WAI&rsquo;s Global Access Program automatically adjusts membership dues in
                                selected regions — Kenya among them — to expand access and participation.
                            </p>
                            <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.8, marginBottom: "2rem" }}>
                                There is nothing extra to apply for: the adjusted rate is applied for you at
                                checkout when you join or renew from Kenya.
                            </p>
                            <a
                                href={WAI.membershipInformation}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{ background: "var(--gold)", color: "var(--teal-deep)" }}
                            >
                                Join WAI →
                            </a>
                        </div>

                        <div
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.14)",
                                borderRadius: 8,
                                padding: "2.5rem",
                            }}
                        >
                            <RefreshCw size={26} strokeWidth={1.8} color="var(--gold)" />
                            <h3 style={{ fontSize: "1.25rem", color: "white", margin: "1.1rem 0 0.75rem" }}>
                                Set up Auto-Pay
                            </h3>
                            <p style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                                Activate Auto-Pay when you join or renew and your membership renews itself each
                                year — so your scholarship eligibility, conference access and member resources
                                are never interrupted by a missed renewal date.
                            </p>
                            <a
                                href={WAI.renew}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    color: "var(--gold)",
                                    fontWeight: 800,
                                    fontSize: "0.85rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.8px",
                                }}
                            >
                                Renew and activate Auto-Pay →
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── JUNIOR MEMBERSHIP ── */}
                <section id="junior" style={{ padding: "6.5rem 0", background: "var(--white)", scrollMarginTop: "90px" }}>
                    <div className="container">
                        <div style={{ maxWidth: 980, margin: "0 auto" }}>
                            <div
                                style={{
                                    background: "var(--off-white)",
                                    border: "2px solid var(--gold)",
                                    borderRadius: 10,
                                    padding: "3rem",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        flexWrap: "wrap",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            background: "var(--gold)",
                                            color: "var(--teal-deep)",
                                            fontSize: "0.68rem",
                                            fontWeight: 900,
                                            letterSpacing: "1.8px",
                                            textTransform: "uppercase",
                                            padding: "0.4rem 0.9rem",
                                            borderRadius: 100,
                                        }}
                                    >
                                        Free membership
                                    </span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--teal)" }}>
                                        Ages 5–15
                                    </span>
                                </div>

                                <h2
                                    style={{
                                        fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                                        fontWeight: 900,
                                        color: "var(--teal-deep)",
                                        letterSpacing: "-1px",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Junior Membership
                                </h2>
                                <p style={{ color: "var(--text-body)", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "2.25rem", maxWidth: 680 }}>
                                    Junior Membership is <strong>free for children aged 5–15</strong>. It is how
                                    a lot of our Girls in Aviation Day attendees stay connected to aviation long
                                    after the day itself.
                                </p>

                                <ul
                                    style={{
                                        listStyle: "none",
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                                        gap: "1rem",
                                        marginBottom: "2.5rem",
                                    }}
                                >
                                    {JUNIOR_POINTS.map((point) => (
                                        <li
                                            key={point}
                                            style={{
                                                display: "flex",
                                                gap: "0.75rem",
                                                alignItems: "flex-start",
                                                background: "var(--white)",
                                                padding: "1.1rem 1.25rem",
                                                borderRadius: 6,
                                                border: "1px solid #e9edf0",
                                            }}
                                        >
                                            <Check size={17} strokeWidth={3} color="var(--teal)" style={{ flexShrink: 0, marginTop: 3 }} />
                                            <span style={{ color: "var(--text-body)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                    <a
                                        href={WAI.membershipInformation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                    >
                                        Register a Junior Member →
                                    </a>
                                    <Link
                                        href="/events"
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
                                        Girls in Aviation Day
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── INDIVIDUAL / STUDENT PLANS ── */}
                <section id="categories" style={{ padding: "7rem 0", background: "var(--off-white)", scrollMarginTop: "90px" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "var(--teal)", marginBottom: "0.75rem" }}>
                                Individual & Student
                            </p>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--teal-deep)", letterSpacing: "-1px" }}>
                                Personal Membership Options
                            </h2>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                                gap: "2rem",
                            }}
                        >
                            {individualPlans.map((plan, i) => (
                                <PlanCard key={plan.category} plan={plan} highlight={i === 0} />
                            ))}
                        </div>

                        <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "var(--gray)", lineHeight: 1.7, maxWidth: 750 }}>
                            * Student memberships are for youth age 18 years and under OR undergraduate student: minimum of 12 credit hours in college, university or technical school; OR graduate student: minimum of 6 credit hours. The full name of your school is required for all student membership categories.
                        </p>
                    </div>
                </section>

                {/* ── LIFETIME PLANS ── */}
                <section style={{ padding: "8rem 0", background: "white" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "var(--teal)", marginBottom: "0.75rem" }}>
                                Lifetime
                            </p>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--teal-deep)", letterSpacing: "-1px" }}>
                                Membership for Life
                            </h2>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "2rem",
                                maxWidth: 800,
                                margin: "0 auto",
                            }}
                        >
                            {lifetimePlans.map((plan) => (
                                <PlanCard key={plan.category} plan={plan} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CORPORATE PLANS ── */}
                <section style={{ padding: "8rem 0", background: "var(--teal-deep)", color: "white" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "var(--gold)", marginBottom: "0.75rem" }}>
                                Corporate
                            </p>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "white", letterSpacing: "-1px" }}>
                                Organisation Membership
                            </h2>
                            <p style={{ opacity: 0.7, marginTop: "1rem", maxWidth: 550, margin: "1rem auto 0" }}>
                                For organisations and companies that support the mission of Women in Aviation International.
                            </p>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                                gap: "2rem",
                                maxWidth: 860,
                                margin: "0 auto",
                            }}
                        >
                            {corporatePlans.map((plan) => (
                                <div
                                    key={plan.category}
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        borderRadius: 4,
                                        padding: "3rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1.25rem",
                                        position: "relative",
                                    }}
                                >
                                    {plan.badge && (
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "-12px",
                                                left: "2rem",
                                                background: "var(--gold)",
                                                color: "var(--teal-deep)",
                                                fontSize: "0.7rem",
                                                fontWeight: 800,
                                                letterSpacing: "1.5px",
                                                textTransform: "uppercase",
                                                padding: "0.3rem 0.9rem",
                                                borderRadius: "100px",
                                            }}
                                        >
                                            {plan.badge}
                                        </span>
                                    )}
                                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white" }}>{plan.category}</h3>
                                    <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--gold)", letterSpacing: "-2px" }}>
                                        {plan.price}<span style={{ fontSize: "1rem", opacity: 0.6 }}>/year</span>
                                    </div>
                                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.6 }}>{plan.desc}</p>
                                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                                        {plan.features.map((f) => (
                                            <li key={f} style={{ display: "flex", gap: "0.6rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", alignItems: "flex-start" }}>
                                                <span style={{ color: "var(--gold)", fontWeight: 900 }}>✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="#join-form"
                                        style={{
                                            display: "block",
                                            textAlign: "center",
                                            padding: "0.9rem",
                                            background: "var(--gold)",
                                            color: "var(--teal-deep)",
                                            fontWeight: 800,
                                            borderRadius: 2,
                                        }}
                                    >
                                        Contact Us →
                                    </a>
                                </div>
                            ))}
                        </div>
                        <p style={{ textAlign: "center", marginTop: "2.5rem", opacity: 0.5, fontSize: "0.85rem" }}>
                            Corporate Membership Forms available on request — contact info@waikenyachapter.com
                        </p>
                    </div>
                </section>

                {/* ── HOW TO JOIN ── */}
                <section style={{ padding: "6.5rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 3.5rem" }}>
                            <p className="section-label" style={{ justifyContent: "center" }}>How to join</p>
                            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                                Three steps to membership
                            </h2>
                            <p style={{ color: "var(--text-body)" }}>
                                Membership is held with Women in Aviation International; the Kenya Chapter is
                                how you plug into it locally.
                            </p>
                        </div>

                        <ol
                            style={{
                                listStyle: "none",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                                gap: "1.5rem",
                                maxWidth: 1040,
                                margin: "0 auto 3rem",
                                counterReset: "step",
                            }}
                        >
                            {[
                                {
                                    title: "Choose your category",
                                    body: "Pick the membership that matches where you are — Junior, Student, Individual, Family, Lifetime or Corporate.",
                                },
                                {
                                    title: "Register with WAI",
                                    body: "Sign up on the WAI International site and select the Kenya Chapter. Global Access Program pricing is applied automatically.",
                                },
                                {
                                    title: "Tell the Chapter",
                                    body: "Send us the form below so we can add you to our mailing list, events and mentorship programmes here in Kenya.",
                                },
                            ].map((step, i) => (
                                <li
                                    key={step.title}
                                    style={{
                                        position: "relative",
                                        background: "var(--off-white)",
                                        border: "1px solid #e9edf0",
                                        borderRadius: 8,
                                        padding: "2.25rem 1.9rem 1.9rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "-18px",
                                            left: "1.9rem",
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            background: "var(--teal)",
                                            color: "white",
                                            fontWeight: 900,
                                            fontSize: "0.95rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                    <h3 style={{ fontSize: "1.08rem", color: "var(--teal-deep)", marginBottom: "0.6rem" }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                                        {step.body}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <a
                                href={WAI.membershipInformation}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                Join WAI →
                            </a>
                            <a
                                href="#join-form"
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
                                Tell the Kenya Chapter
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── KENYA CHAPTER JOIN FORM ── */}
                <section id="join-form" style={{ padding: "7rem 0", background: "var(--off-white)", scrollMarginTop: "90px" }}>
                    <div className="container">
                        <div
                            className="grid-2"
                            style={{
                                gap: "6rem",
                                alignItems: "start",
                            }}
                        >
                            <div>
                                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "var(--teal)", marginBottom: "1rem" }}>
                                    WAI Membership – Kenya Chapter
                                </p>
                                <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--teal-deep)", letterSpacing: "-1px", marginBottom: "1.5rem" }}>
                                    Become a Member of the Kenya Chapter
                                </h2>
                                <div style={{ width: 48, height: 3, background: "var(--teal)", marginBottom: "1.5rem" }} />
                                <p style={{ color: "var(--text-body)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    By joining the WAI Kenya Chapter, you gain access to a powerful local and international network of aviators, mentors, scholarship opportunities, and career resources designed to help you succeed in the skies.
                                </p>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {[
                                        "Local mentorship and networking events",
                                        "Access to WAI Kenya scholarship awards",
                                        "Invitations to Girls in Aviation Day",
                                        "Global WAI community connection",
                                        "Career development resources",
                                    ].map((b) => (
                                        <li key={b} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", color: "var(--text-body)" }}>
                                            <span style={{ color: "var(--teal)", fontWeight: 900 }}>✓</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Form */}
                            <div
                                style={{
                                    background: "white",
                                    padding: "3rem",
                                    borderRadius: 4,
                                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                                }}
                            >
                                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "2rem" }}>
                                    Kenyan Chapter Application
                                </h3>
                                <EnquiryForm
                                    formName="membership"
                                    submitLabel="Submit application"
                                    successTitle="Application received"
                                    successBody="Thank you for your interest in the Kenya Chapter. We will be in touch with the next steps shortly."
                                    fields={[
                                        { name: "name", label: "Full name", required: true },
                                        { name: "email", label: "Email address", type: "email", required: true },
                                        { name: "phone", label: "Phone number", type: "tel", required: true },
                                        { name: "occupation", label: "Occupation / career field", required: true },
                                        {
                                            name: "category",
                                            label: "Membership category",
                                            type: "select",
                                            required: true,
                                            placeholder: "Select a category\u2026",
                                            options: [
                                                "Junior (ages 5\u201315) \u2014 free",
                                                "Student",
                                                "Individual",
                                                "International",
                                                "International \u2013 Digital Only",
                                                "International Student",
                                                "International Student \u2013 Digital Only",
                                                "Family",
                                                "Lifetime",
                                                "Lifetime +60",
                                                "Corporate",
                                                "Supersonic Corporate",
                                                "Not sure \u2014 please advise",
                                            ],
                                        },
                                        { name: "message", label: "Why do you want to join? (optional)", type: "textarea", rows: 3 },
                                    ]}
                                />

                                <p style={{ marginTop: "1.5rem", fontSize: "0.82rem", color: "var(--gray)", textAlign: "center" }}>
                                    Or email us directly at{" "}
                                    <a href="mailto:info@waikenyachapter.com" style={{ color: "var(--teal)", fontWeight: 700 }}>
                                        info@waikenyachapter.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
