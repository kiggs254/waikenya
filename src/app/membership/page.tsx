import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Membership | WAI Kenya Chapter",
    description:
        "Join Women in Aviation International – Kenya Chapter. View all membership categories, pricing and benefits for individuals, students, families and corporate members.",
};

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
                {/* ── HERO ── */}
                <section
                    style={{
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        padding: "12rem 0 8rem",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <div className="container">
                        <p
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                letterSpacing: "4px",
                                textTransform: "uppercase",
                                color: "var(--gold)",
                                marginBottom: "1.25rem",
                            }}
                        >
                            ── WAI Kenya Chapter ──
                        </p>
                        <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, color: "white", letterSpacing: "-2px", marginBottom: "1.5rem" }}>
                            Choose Your Membership
                        </h1>
                        <p style={{ fontSize: "1.15rem", opacity: 0.8, maxWidth: 580, margin: "0 auto" }}>
                            WAI membership is open to women and men from all segments of the aviation industry and in all stages of their career.
                        </p>
                    </div>
                </section>

                {/* ── INDIVIDUAL / STUDENT PLANS ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
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

                {/* ── KENYA CHAPTER JOIN FORM ── */}
                <section id="join-form" style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
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
                                <form
                                    style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                                    action="mailto:info@waikenyachapter.com"
                                    method="GET"
                                >
                                    {[
                                        { label: "Full Name", name: "name", type: "text" },
                                        { label: "Email Address", name: "email", type: "email" },
                                        { label: "Phone Number", name: "phone", type: "tel" },
                                        { label: "Occupation / Career Field", name: "occupation", type: "text" },
                                    ].map((field) => (
                                        <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "0.5px" }}>
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                style={{
                                                    border: "1.5px solid #e2e6ea",
                                                    borderRadius: 2,
                                                    padding: "0.8rem 1rem",
                                                    fontSize: "0.95rem",
                                                    outline: "none",
                                                    transition: "border-color 0.2s",
                                                    color: "var(--text-dark)",
                                                }}
                                            />
                                        </div>
                                    ))}

                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "0.5px" }}>
                                            Membership Category
                                        </label>
                                        <select
                                            name="category"
                                            style={{
                                                border: "1.5px solid #e2e6ea",
                                                borderRadius: 2,
                                                padding: "0.8rem 1rem",
                                                fontSize: "0.95rem",
                                                background: "white",
                                                color: "var(--text-dark)",
                                            }}
                                        >
                                            <option value="">Select a category...</option>
                                            <option>Individual ($45)</option>
                                            <option>Student ($32)</option>
                                            <option>International ($55)</option>
                                            <option>International – Digital Only ($42)</option>
                                            <option>International Student ($45)</option>
                                            <option>International Student – Digital Only ($30)</option>
                                            <option>Family ($20)</option>
                                            <option>Lifetime ($1,499)</option>
                                            <option>Lifetime +60 ($949)</option>
                                            <option>Corporate ($400)</option>
                                            <option>Supersonic Corporate ($500)</option>
                                        </select>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "0.5px" }}>
                                            Why do you want to join? (optional)
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={3}
                                            style={{
                                                border: "1.5px solid #e2e6ea",
                                                borderRadius: 2,
                                                padding: "0.8rem 1rem",
                                                fontSize: "0.95rem",
                                                resize: "vertical",
                                                color: "var(--text-dark)",
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        style={{ marginTop: "0.5rem", justifyContent: "center", padding: "1rem" }}
                                    >
                                        Submit Application →
                                    </button>
                                </form>

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
