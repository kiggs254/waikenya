import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Scholarships | WAI Kenya Chapter",
    description:
        "WAI Kenya Chapter Scholarships — including the Hon John Ogutu Omondi Scholarship for gifted girls and women from disadvantaged backgrounds across Kenya pursuing aviation careers.",
};

const spotlights = [
    { name: "Andrea Coppick", wai: "WAI 6452" },
    { name: "Lindsey Dreiling", wai: "WAI 14613" },
    { name: 'Miyukiko "Koko" Kostelny', wai: "WAI 41327" },
    { name: "Melissa Martin", wai: "WAI 77913" },
];

type Scholarship = {
    title: string;
    content: string[];
    amount: string;
    deadline: string;
    status: string;
};

async function getScholarships(): Promise<Scholarship[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return [];
    try {
        const res = await fetch(`${baseUrl}/wai_scholarship?_embed&per_page=1`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.map((item: any) => {
            const paragraphs = (item.content?.rendered || "").split('</p>')
                .map((p: string) => p.replace(/<[^>]+>/g, '').trim())
                .filter(Boolean);
            return {
                title: item.title?.rendered || "",
                content: paragraphs,
                amount: item.meta?.amount || "",
                deadline: item.meta?.deadline || "",
                status: item.meta?.status || "",
            };
        });
    } catch (error) {
        console.error("Failed to fetch scholarships:", error);
        return [];
    }
}

export default async function ScholarshipsPage() {
    const scholarships = await getScholarships();
    const featured = scholarships[0];

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
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Decorative circles */}
                    <div
                        style={{
                            position: "absolute",
                            width: 600,
                            height: 600,
                            borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.06)",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            pointerEvents: "none",
                        }}
                    />
                    <div className="container" style={{ position: "relative", zIndex: 2 }}>
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
                        <h1
                            style={{
                                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-2px",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Scholarships
                        </h1>
                        <p
                            style={{
                                fontSize: "1.1rem",
                                opacity: 0.8,
                                maxWidth: 620,
                                margin: "0 auto 3rem",
                                lineHeight: 1.7,
                            }}
                        >
                            Scholarship awards are a major benefit of WAI membership and help members reach their goals and advance into the aviation and aerospace careers they have always dreamed about.
                        </p>
                        <Link href="#apply" className="btn-outline">Apply for a Scholarship</Link>
                    </div>
                </section>

                {/* ── IMPACT STATS ── */}
                <section style={{ background: "var(--off-white)", padding: "5rem 0" }}>
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "2rem",
                            textAlign: "center",
                        }}
                    >
                        {[
                            { num: "151", label: "Scholarships Awarded in 2020" },
                            { num: "$831K", label: "Total Value in 2020" },
                            { num: "$13.2M+", label: "Total Since 1995" },
                            { num: "25+", label: "Years of Impact" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: "white",
                                    padding: "2.5rem",
                                    borderRadius: 4,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "2.8rem",
                                        fontWeight: 900,
                                        color: "var(--teal)",
                                        letterSpacing: "-2px",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {s.num}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "1.5px",
                                        color: "var(--gray)",
                                    }}
                                >
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── ABOUT THE SCHOLARSHIP PROGRAM ── */}
                <section style={{ padding: "8rem 0", background: "white" }}>
                    <div className="container">
                        <div className="grid-2"
                            style={{
                                gap: "6rem",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "3px",
                                        color: "var(--teal)",
                                        marginBottom: "1rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 24,
                                            height: 2,
                                            background: "var(--teal)",
                                            display: "inline-block",
                                        }}
                                    />
                                    WAI Scholarship Program
                                </p>
                                <h2
                                    style={{
                                        fontSize: "clamp(2rem, 4vw, 3rem)",
                                        fontWeight: 800,
                                        color: "var(--teal-deep)",
                                        letterSpacing: "-1px",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    Changing Lives Through Aviation Education
                                </h2>
                                <div style={{ width: 48, height: 3, background: "var(--teal)", marginBottom: "1.5rem" }} />
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                                    In 2020, WAI awarded <strong>151 scholarships valued at $831,365</strong> — bringing the total scholarships awarded since 1995 to over <strong>$13.2 million</strong>.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                                    The WAI scholarship program was founded by Peggy Chabrian with the mission of removing financial barriers from the path of women who dream of careers in aviation and aerospace. Each year, scholarship sponsors enable dozens of women to attend flight school, earn ratings, and advance their careers.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                                    Read the success stories of past scholarship winners in the special 20th anniversary publication <em>WAI Scholarships Change Lives</em>, and watch the WAI Scholarship Spotlights video series to learn more.
                                </p>
                                <Link href="#apply" className="btn-primary">Apply Now →</Link>
                            </div>

                            <div style={{ position: "relative", height: "500px", borderRadius: 4, overflow: "hidden" }}>
                                <Image
                                    src="/images/wai_panel.jpg"
                                    alt="WAI Scholarship recipient"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(to top, rgba(8,46,58,0.7) 0%, transparent 60%)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "2rem",
                                        left: "2rem",
                                        right: "2rem",
                                        color: "white",
                                    }}
                                >
                                    <p style={{ fontWeight: 700, fontSize: "1rem" }}>
                                        🏆 Congratulations to our 2020 scholarship winners!
                                    </p>
                                    <p style={{ opacity: 0.7, fontSize: "0.85rem", marginTop: "0.4rem" }}>
                                        151 women whose lives were changed forever.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SCHOLARSHIP SPOTLIGHTS ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <p
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "3px",
                                    color: "var(--teal)",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                Scholarship Spotlights
                            </p>
                            <h2
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    color: "var(--teal-deep)",
                                    letterSpacing: "-1px",
                                }}
                            >
                                Meet Our Winners
                            </h2>
                            <p style={{ color: "var(--text-body)", maxWidth: 520, margin: "1rem auto 0" }}>
                                Watch WAI Scholarship Spotlights videos to hear directly from the women whose careers were launched through the WAI scholarship program.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: "2rem",
                            }}
                        >
                            {spotlights.map((s) => (
                                <div
                                    key={s.name}
                                    style={{
                                        background: "white",
                                        borderRadius: 4,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: 180,
                                            background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "4rem",
                                        }}
                                    >
                                        ✈️
                                    </div>
                                    <div style={{ padding: "1.75rem" }}>
                                        <p
                                            style={{
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "2px",
                                                color: "var(--teal)",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {s.wai}
                                        </p>
                                        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "1.25rem" }}>
                                            {s.name}
                                        </h3>
                                        <a
                                            href="#"
                                            style={{
                                                color: "var(--teal)",
                                                fontWeight: 700,
                                                fontSize: "0.85rem",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.4rem",
                                            }}
                                        >
                                            ▶ Watch Spotlight
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HON JOHN OMONDI SCHOLARSHIP ── */}
                <section
                    style={{
                        padding: "10rem 0",
                        background: "var(--teal-deep)",
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Gold accent bar */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: "linear-gradient(90deg, var(--gold), transparent)",
                        }}
                    />

                    <div className="container">
                        <div
                            className="grid-2"
                            style={{
                                gap: "7rem",
                                alignItems: "center",
                            }}
                        >
                            {/* Left: Text */}
                            <div>
                                <p
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "4px",
                                        color: "var(--gold)",
                                        marginBottom: "1.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 24,
                                            height: 2,
                                            background: "var(--gold)",
                                            display: "inline-block",
                                        }}
                                    />
                                    Featured Kenya Scholarship
                                </p>

                                <h2
                                    style={{
                                        fontSize: "clamp(2rem, 4vw, 3rem)",
                                        fontWeight: 900,
                                        color: "white",
                                        letterSpacing: "-1px",
                                        lineHeight: 1.1,
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    {featured?.title || "Hon John Ogutu Omondi"}
                                </h2>
                                <p
                                    style={{
                                        color: "var(--gold)",
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        marginBottom: "2rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem",
                                    }}
                                >
                                    {featured ? (
                                        <>
                                            <span style={{ color: "rgba(255,255,255,0.7)" }}>Status: <span style={{ color: "var(--gold)" }}>{featured.status}</span></span>
                                        </>
                                    ) : (
                                        "A passionate Aviator, Women & Girls' Empowerment Champion"
                                    )}
                                </p>

                                {featured && featured.content.length > 0 ? (
                                    featured.content.map((para, i) => (
                                        <p key={i} style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                                            {para}
                                        </p>
                                    ))
                                ) : (
                                    <>
                                        <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                                            The <strong style={{ color: "white" }}>Hon John Omondi Scholarship</strong> is designed to provide scholarships to academically gifted girls, boys and women from <strong style={{ color: "white" }}>disadvantaged backgrounds across Kenya</strong>, who are passionate about pursuing a career in the Aviation Industry.
                                        </p>
                                        <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                                            The scholarship was formed with the belief that discipline, passion together with a chance at quality education would empower young Kenyan women and equip them with the right skills needed to make a significant positive impact towards their communities and the country.
                                        </p>
                                    </>
                                )}

                                {/* Quote */}
                                <blockquote
                                    style={{
                                        borderLeft: "3px solid var(--gold)",
                                        paddingLeft: "1.5rem",
                                        margin: "2.5rem 0",
                                        color: "rgba(255,255,255,0.85)",
                                        fontStyle: "italic",
                                        fontSize: "1.15rem",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    &ldquo;If you educate a woman, you educate a nation.&rdquo;
                                    <cite
                                        style={{
                                            display: "block",
                                            fontStyle: "normal",
                                            color: "var(--gold)",
                                            fontWeight: 700,
                                            fontSize: "0.85rem",
                                            marginTop: "0.75rem",
                                        }}
                                    >
                                        — Hon John Ogutu Omondi
                                    </cite>
                                </blockquote>

                                <Link href="#apply" className="btn-outline">Apply for This Scholarship →</Link>
                            </div>

                            {/* Right: Feature card */}
                            <div>
                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        borderRadius: 4,
                                        padding: "3rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 72,
                                            height: 72,
                                            background: "var(--gold)",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "2rem",
                                        }}
                                    >
                                        🏆
                                    </div>
                                    <div>
                                        <h4
                                            style={{
                                                color: "var(--gold)",
                                                fontSize: "0.75rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "2px",
                                                marginBottom: "0.75rem",
                                            }}
                                        >
                                            Who Can Apply
                                        </h4>
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.85rem",
                                            }}
                                        >
                                            {[
                                                "Academically gifted girls, boys or women",
                                                "From disadvantaged backgrounds in Kenya",
                                                "Passionate about an aviation career",
                                                "Committed to community impact",
                                                "WAI Kenya Chapter members (or willing to join)",
                                            ].map((c) => (
                                                <li
                                                    key={c}
                                                    style={{
                                                        display: "flex",
                                                        gap: "0.75rem",
                                                        color: "rgba(255,255,255,0.75)",
                                                        fontSize: "0.95rem",
                                                        alignItems: "flex-start",
                                                    }}
                                                >
                                                    <span style={{ color: "var(--gold)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div
                                        style={{
                                            borderTop: "1px solid rgba(255,255,255,0.08)",
                                            paddingTop: "1.75rem",
                                        }}
                                    >
                                        <h4
                                            style={{
                                                color: "var(--gold)",
                                                fontSize: "0.75rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "2px",
                                                marginBottom: "0.75rem",
                                            }}
                                        >
                                            Values
                                        </h4>
                                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                            {["Discipline", "Passion", "Education", "Empowerment", "Community"].map((v) => (
                                                <span
                                                    key={v}
                                                    style={{
                                                        background: "rgba(201,168,76,0.15)",
                                                        border: "1px solid rgba(201,168,76,0.3)",
                                                        color: "var(--gold)",
                                                        fontSize: "0.78rem",
                                                        fontWeight: 700,
                                                        padding: "0.35rem 0.85rem",
                                                        borderRadius: "100px",
                                                    }}
                                                >
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── DISCLAIMER ── */}
                <section style={{ padding: "4rem 0", background: "var(--gray-light)" }}>
                    <div className="container">
                        <div
                            style={{
                                background: "white",
                                padding: "2rem 2.5rem",
                                borderLeft: "4px solid var(--gold)",
                                borderRadius: 2,
                                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 700,
                                    color: "var(--teal-deep)",
                                    marginBottom: "0.5rem",
                                    fontSize: "0.9rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                }}
                            >
                                Please Note
                            </p>
                            <p style={{ color: "var(--text-body)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                The applicant understands and accepts that WAI has no responsibility or liability whatsoever for any scholarship awards other than those specifically identified as WAI scholarships.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── APPLY SECTION ── */}
                <section id="apply" style={{ padding: "8rem 0", background: "white" }}>
                    <div className="container">
                        <div
                            className="grid-2"
                            style={{
                                gap: "6rem",
                                alignItems: "start",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "3px",
                                        color: "var(--teal)",
                                        marginBottom: "1rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                    }}
                                >
                                    <span style={{ width: 24, height: 2, background: "var(--teal)", display: "inline-block" }} />
                                    Apply Today
                                </p>
                                <h2
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: 800,
                                        color: "var(--teal-deep)",
                                        letterSpacing: "-1px",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    Start Your Scholarship Application
                                </h2>
                                <div style={{ width: 48, height: 3, background: "var(--teal)", marginBottom: "1.5rem" }} />
                                <p style={{ color: "var(--text-body)", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    Ignite your learning experience. Submit your scholarship application to the WAI Kenya Chapter and take the next step towards your aviation career. All applications are reviewed by a panel of industry professionals.
                                </p>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {[
                                        "Complete the application form in full",
                                        "Provide proof of enrolment / student status",
                                        "Include a personal essay on your aviation goals",
                                        "Submit two letters of recommendation",
                                        "Attach academic transcripts",
                                    ].map((tip) => (
                                        <li key={tip} style={{ display: "flex", gap: "0.75rem", color: "var(--text-body)", alignItems: "flex-start" }}>
                                            <span style={{ color: "var(--teal)", fontWeight: 900 }}>✓</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Application Form */}
                            <div
                                style={{
                                    background: "var(--off-white)",
                                    padding: "3rem",
                                    borderRadius: 4,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                                }}
                            >
                                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "2rem" }}>
                                    Scholarship Application
                                </h3>
                                <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    {[
                                        { label: "Full Name", name: "name", type: "text" },
                                        { label: "Email Address", name: "email", type: "email" },
                                        { label: "Phone Number", name: "phone", type: "tel" },
                                        { label: "School / Institution", name: "school", type: "text" },
                                    ].map((field) => (
                                        <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                            <label
                                                style={{
                                                    fontSize: "0.82rem",
                                                    fontWeight: 700,
                                                    color: "var(--teal-deep)",
                                                    letterSpacing: "0.5px",
                                                }}
                                            >
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                style={{
                                                    border: "1.5px solid #dde2e7",
                                                    borderRadius: 2,
                                                    padding: "0.8rem 1rem",
                                                    fontSize: "0.95rem",
                                                    background: "white",
                                                    color: "var(--text-dark)",
                                                }}
                                            />
                                        </div>
                                    ))}

                                    {/* Scholarship dropdown */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "0.5px" }}>
                                            Scholarship Applying For
                                        </label>
                                        <select
                                            name="scholarship"
                                            style={{
                                                border: "1.5px solid #dde2e7",
                                                borderRadius: 2,
                                                padding: "0.8rem 1rem",
                                                fontSize: "0.95rem",
                                                background: "white",
                                                color: "var(--text-dark)",
                                            }}
                                        >
                                            <option value="">Select a scholarship...</option>
                                            <option>Hon John Ogutu Omondi Scholarship</option>
                                            <option>WAI General Scholarship</option>
                                            <option>WAI Flight Training Scholarship</option>
                                        </select>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "0.5px" }}>
                                            Tell us about your aviation goals
                                        </label>
                                        <textarea
                                            name="essay"
                                            rows={4}
                                            style={{
                                                border: "1.5px solid #dde2e7",
                                                borderRadius: 2,
                                                padding: "0.8rem 1rem",
                                                fontSize: "0.95rem",
                                                resize: "vertical",
                                                background: "white",
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
                                    Questions? Email{" "}
                                    <a href="mailto:info@waikenyachapter.com" style={{ color: "var(--teal)", fontWeight: 700 }}>
                                        info@waikenyachapter.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    style={{
                        background: "var(--teal)",
                        padding: "6rem 0",
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <div className="container">
                        <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "white", letterSpacing: "-1px", marginBottom: "1rem" }}>
                            Not yet a member?
                        </h2>
                        <p style={{ opacity: 0.8, maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.7 }}>
                            Scholarship applications are open to WAI members. Join the WAI Kenya Chapter today and unlock access to all our scholarship programs.
                        </p>
                        <Link href="/membership" className="btn-outline">View Membership Options →</Link>
                    </div>
                </section>
            </main >

            <Footer />
        </>
    );
}
