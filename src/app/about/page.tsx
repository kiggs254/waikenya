import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Plane, GraduationCap, Users, Trophy, Star } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | WAI Kenya Chapter",
    description:
        "Women in Aviation International is a nonprofit organization dedicated to the encouragement and advancement of women in all aviation career fields and interests.",
};

const pillars = [
    {
        Icon: Plane,
        title: "Encourage & Advance",
        body: "We provide year-round resources to assist women in aviation and to encourage young women to consider aviation as a rewarding and achievable career.",
    },
    {
        Icon: GraduationCap,
        title: "Education Outreach",
        body: "WAI offers educational outreach programs to educators, aviation industry members, and young people nationally and internationally.",
    },
    {
        Icon: Users,
        title: "Girls in Aviation Day",
        body: "Our flagship initiative connects girls aged 8–17 with female aviation professionals through hands-on experiences and inspiring conversations.",
    },
    {
        Icon: Trophy,
        title: "Pioneer Hall of Fame",
        body: "We promote public understanding of the accomplishments of women in aviation through our WAI Pioneer Hall of Fame recognition programme.",
    },
];

const membership = [
    "Astronauts",
    "Corporate Pilots",
    "Maintenance Technicians",
    "Air Traffic Controllers",
    "Business Owners",
    "Educators & Journalists",
    "Flight Attendants",
    "University & High School Students",
    "Air Show Performers",
    "Airport Managers",
];

const pioneers = [
    { name: "Amelia Earhart", note: "First woman to fly solo across the Atlantic" },
    { name: "Bessie Coleman", note: "First African-American woman to hold a pilot licence" },
    { name: "Eileen Collins", note: "First female Space Shuttle Commander" },
    { name: "Jeana Yeager", note: "First to fly non-stop around the world without refuelling" },
    { name: "Nicole Malachowski", note: "First female Thunderbirds demonstration pilot" },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>

                {/* ── HERO ── */}
                <section
                    style={{
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        padding: "12rem 0 8rem",
                        position: "relative",
                        overflow: "hidden",
                        color: "white",
                    }}
                >
                    {/* Decorative rings */}
                    {[400, 650, 900].map((s) => (
                        <div
                            key={s}
                            style={{
                                position: "absolute",
                                width: s,
                                height: s,
                                borderRadius: "50%",
                                border: "1px solid rgba(255,255,255,0.05)",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                                pointerEvents: "none",
                            }}
                        />
                    ))}
                    {/* Gold accent circle */}
                    <div
                        style={{
                            position: "absolute",
                            width: 320,
                            height: 320,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(212,176,89,0.15) 0%, transparent 70%)",
                            top: "-80px",
                            right: "-80px",
                            pointerEvents: "none",
                        }}
                    />

                    <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 760 }}>
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
                                lineHeight: 1.1,
                                marginBottom: "1.75rem",
                            }}
                        >
                            About Us
                        </h1>
                        <p
                            style={{
                                fontSize: "1.15rem",
                                lineHeight: 1.8,
                                opacity: 0.85,
                                maxWidth: 640,
                            }}
                        >
                            Women in Aviation International is a nonprofit organisation dedicated to
                            the encouragement and advancement of women in all aviation career fields
                            and interests.
                        </p>
                    </div>
                </section>

                {/* ── WHO WE ARE ── */}
                <section style={{ padding: "8rem 0", background: "white" }}>
                    <div className="container">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "6rem",
                                alignItems: "start",
                            }}
                        >
                            {/* Left — text */}
                            <div>
                                <p
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "3px",
                                        color: "var(--teal)",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Who We Are
                                </p>
                                <h2
                                    style={{
                                        fontSize: "2.4rem",
                                        fontWeight: 900,
                                        color: "var(--teal-deep)",
                                        letterSpacing: "-1px",
                                        lineHeight: 1.2,
                                        marginBottom: "2rem",
                                    }}
                                >
                                    A Global Community,<br />
                                    <span style={{ color: "var(--teal)" }}>Rooted in Kenya</span>
                                </h2>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, marginBottom: "1.4rem", fontSize: "1rem" }}>
                                    Women in Aviation International is a nonprofit organisation dedicated to
                                    the encouragement and advancement of women in all aviation career fields
                                    and interests. Our diverse membership includes astronauts, corporate pilots,
                                    maintenance technicians, air traffic controllers, business owners, educators,
                                    journalists, flight attendants, high school and university students, air show
                                    performers, airport managers and many others.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, marginBottom: "1.4rem", fontSize: "1rem" }}>
                                    We provide year-round resources to assist women in aviation and to encourage
                                    young women to consider aviation as a career. WAI also offers educational
                                    outreach programmes to educators, aviation industry members, and young people
                                    nationally and internationally. Our most recent initiative is our <strong>Girls in
                                        Aviation Day</strong> programme for girls ages 8 to 17.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, fontSize: "1rem" }}>
                                    In addition, WAI promotes public understanding of the accomplishments and
                                    contributions of women in aviation — including historic notables such as
                                    Amelia Earhart, Bessie Coleman, Eileen Collins, Jeana Yeager and Nicole
                                    Malachowski — through our WAI Pioneer Hall of Fame programme.
                                </p>
                            </div>

                            {/* Right — membership tags */}
                            <div>
                                <div
                                    style={{
                                        background: "var(--off-white)",
                                        borderRadius: 6,
                                        padding: "2.5rem",
                                        borderLeft: "4px solid var(--teal)",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "0.72rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "3px",
                                            color: "var(--teal)",
                                            marginBottom: "1.5rem",
                                        }}
                                    >
                                        Our Diverse Membership Includes
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                        {membership.map((m) => (
                                            <span
                                                key={m}
                                                style={{
                                                    background: "white",
                                                    border: "1.5px solid #dce8ea",
                                                    color: "var(--teal-deep)",
                                                    padding: "0.45rem 1rem",
                                                    borderRadius: "100px",
                                                    fontSize: "0.82rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Kenya chapter fact */}
                                <div
                                    style={{
                                        marginTop: "2rem",
                                        background: "linear-gradient(135deg, var(--teal-deep), var(--teal))",
                                        borderRadius: 6,
                                        padding: "2.5rem",
                                        color: "white",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "0.72rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "3px",
                                            color: "var(--gold)",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        Kenya Chapter
                                    </p>
                                    <p style={{ lineHeight: 1.75, opacity: 0.9, fontSize: "0.97rem" }}>
                                        Founded in <strong style={{ color: "var(--gold)" }}>2012</strong> by Una Gertrude Odhiambo and
                                        Fiona Omondi, the WAI Kenya Chapter bridges the gender gap in Kenya&rsquo;s
                                        aviation industry — mentoring students, awarding scholarships, and running
                                        outreach events across the country.
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "2.5rem",
                                            marginTop: "1.75rem",
                                        }}
                                    >
                                        {[["500+", "Members"], ["15+", "Scholarships"], ["10+", "Annual Events"]].map(([num, label]) => (
                                            <div key={label}>
                                                <p style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--gold)", letterSpacing: "-1px" }}>{num}</p>
                                                <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.7 }}>{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── MISSION PILLARS ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
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
                                What We Do
                            </p>
                            <h2
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    color: "var(--teal-deep)",
                                    letterSpacing: "-1px",
                                }}
                            >
                                Our Mission Pillars
                            </h2>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: "1.75rem",
                            }}
                        >
                            {pillars.map((p, i) => (
                                <div
                                    key={p.title}
                                    style={{
                                        background: "white",
                                        borderRadius: 6,
                                        padding: "2.5rem 2rem",
                                        borderTop: `3px solid ${i % 2 === 0 ? "var(--teal)" : "var(--gold)"}`,
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <div style={{ marginBottom: "1.25rem", color: i % 2 === 0 ? "var(--teal)" : "var(--gold)" }}><p.Icon size={32} strokeWidth={1.75} /></div>
                                    <h3
                                        style={{
                                            fontSize: "1.1rem",
                                            fontWeight: 800,
                                            color: "var(--teal-deep)",
                                            marginBottom: "0.85rem",
                                        }}
                                    >
                                        {p.title}
                                    </h3>
                                    <p style={{ color: "var(--text-body)", lineHeight: 1.75, fontSize: "0.93rem" }}>
                                        {p.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PIONEER HALL OF FAME TEASER ── */}
                <section
                    style={{
                        padding: "8rem 0",
                        background: "white",
                    }}
                >
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
                                Honouring Greatness
                            </p>
                            <h2
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    color: "var(--teal-deep)",
                                    letterSpacing: "-1px",
                                    marginBottom: "1rem",
                                }}
                            >
                                WAI Pioneer Hall of Fame
                            </h2>
                            <p
                                style={{
                                    color: "var(--text-body)",
                                    maxWidth: 560,
                                    margin: "0 auto",
                                    lineHeight: 1.7,
                                }}
                            >
                                We recognise the extraordinary women who paved the way — whose courage,
                                skill and determination opened the skies for generations to follow.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "1.25rem",
                            }}
                        >
                            {pioneers.map((pio, i) => (
                                <div
                                    key={pio.name}
                                    style={{
                                        background: i === 0
                                            ? "linear-gradient(135deg, var(--teal-deep), var(--teal))"
                                            : "var(--off-white)",
                                        borderRadius: 6,
                                        padding: "2rem",
                                        color: i === 0 ? "white" : "var(--teal-deep)",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    {i === 0 && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: -20,
                                                right: -20,
                                                width: 100,
                                                height: 100,
                                                borderRadius: "50%",
                                                background: "rgba(212,176,89,0.2)",
                                            }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            background: i === 0 ? "var(--gold)" : "var(--teal)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: i === 0 ? "var(--teal-deep)" : "white",
                                            fontWeight: 900,
                                            fontSize: "0.9rem",
                                            marginBottom: "1.25rem",
                                        }}
                                    >
                                        <Star size={16} fill="currentColor" strokeWidth={0} />
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: 800,
                                            marginBottom: "0.5rem",
                                            color: i === 0 ? "white" : "var(--teal-deep)",
                                        }}
                                    >
                                        {pio.name}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.82rem",
                                            lineHeight: 1.6,
                                            opacity: i === 0 ? 0.85 : 0.75,
                                            color: i === 0 ? "white" : "var(--text-body)",
                                        }}
                                    >
                                        {pio.note}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── GIRLS IN AVIATION HIGHLIGHT ── */}
                <section
                    style={{
                        background: "var(--gold)",
                        padding: "6rem 0",
                    }}
                >
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "5rem",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "3px",
                                    color: "var(--teal-deep)",
                                    opacity: 0.7,
                                    marginBottom: "1rem",
                                }}
                            >
                                Our Flagship Initiative
                            </p>
                            <h2
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 900,
                                    color: "var(--teal-deep)",
                                    letterSpacing: "-1px",
                                    lineHeight: 1.2,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Girls in Aviation Day
                            </h2>
                            <p
                                style={{
                                    color: "var(--teal-deep)",
                                    lineHeight: 1.8,
                                    fontSize: "1rem",
                                    opacity: 0.85,
                                    marginBottom: "2rem",
                                }}
                            >
                                Our most exciting outreach programme connects girls aged 8 to 17 with
                                female aviation professionals — through airport tours, cockpit visits, panel
                                discussions and hands-on STEM activities. One afternoon can spark a lifetime
                                of ambition.
                            </p>
                            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                <Link
                                    href="/membership"
                                    style={{
                                        background: "var(--teal-deep)",
                                        color: "white",
                                        padding: "0.9rem 2.2rem",
                                        fontWeight: 700,
                                        fontSize: "0.9rem",
                                        borderRadius: 2,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    Get Involved →
                                </Link>
                            </div>
                        </div>

                        {/* Stat blocks */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "1rem",
                            }}
                        >
                            {[
                                { num: "8–17", label: "Age Range", sub: "Girls we reach" },
                                { num: "2012", label: "Year Founded", sub: "Kenya Chapter" },
                                { num: "40+", label: "Industry Partners", sub: "Supporting WAI" },
                                { num: "Global", label: "Reach", sub: "National & International" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        background: "rgba(255,255,255,0.35)",
                                        borderRadius: 6,
                                        padding: "1.75rem",
                                        backdropFilter: "blur(4px)",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "1.9rem",
                                            fontWeight: 900,
                                            color: "var(--teal-deep)",
                                            letterSpacing: "-1px",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        {s.num}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "0.75rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "1.5px",
                                            color: "var(--teal-deep)",
                                            opacity: 0.7,
                                            marginBottom: "0.2rem",
                                        }}
                                    >
                                        {s.label}
                                    </p>
                                    <p style={{ fontSize: "0.78rem", color: "var(--teal-deep)", opacity: 0.6 }}>
                                        {s.sub}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    style={{
                        background: "var(--teal-deep)",
                        padding: "7rem 0",
                        textAlign: "center",
                    }}
                >
                    <div className="container">
                        <p
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "4px",
                                color: "var(--gold)",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Join the Movement
                        </p>
                        <h2
                            style={{
                                fontSize: "2.8rem",
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-1px",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Be Part of Our Story
                        </h2>
                        <p
                            style={{
                                opacity: 0.75,
                                maxWidth: 500,
                                margin: "0 auto 3rem",
                                lineHeight: 1.7,
                                color: "white",
                            }}
                        >
                            Whether you are a seasoned aviator, a student, or someone who simply loves
                            aviation — there is a place for you in the WAI Kenya Chapter.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Link href="/membership" className="btn-primary">
                                Become a Member →
                            </Link>
                            <Link
                                href="/team"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    border: "2px solid rgba(255,255,255,0.35)",
                                    color: "white",
                                    padding: "0.9rem 2.2rem",
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    textDecoration: "none",
                                    transition: "all 0.3s",
                                }}
                            >
                                Meet the Team
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
