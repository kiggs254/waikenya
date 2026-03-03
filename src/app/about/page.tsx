import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Plane, GraduationCap, Users, Trophy, Star } from "lucide-react";
import PartnerCarousel from "@/components/PartnerCarousel";

export const metadata: Metadata = {
    title: "About Us | WAI Kenya Chapter",
    description:
        "Women in Aviation International is a nonprofit organization dedicated to the encouragement and advancement of women in all aviation career fields and interests.",
};

const Label = ({ text }: { text: string }) => (
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
        {text}
    </p>
);

const Bar = () => <div style={{ width: 40, height: 4, background: "var(--gold)", marginBottom: "2rem", borderRadius: 2 }} />;

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

const scholarshipRecipients = [
    { year: "2014", name: "Loise Mwangi", award: "Airbus Leadership & Boeing Grants" },
    { year: "2018", name: "Maureen Okoth", award: "Bonita Jean Olson Memorial" },
    { year: "2018", name: "Primerose Gitau", award: "Pratt & Whitney Training" },
    { year: "2021", name: "Betty Mbatha", award: "Hilton Commercial Helicopter" },
    { year: "2021", name: "Ellah A. Wafula", award: "ISA+21 Financial" },
    { year: "2022", name: "Fiona Omondi", award: "Dorothy Hilbert Chapter Volunteer of the Year" },
    { year: "2023", name: "Primerose Gitau", award: "Boeing Skills" },
    { year: "2023", name: "Ellah Wafula", award: "Boeing / Southwest Scholarships" },
    { year: "2023", name: "Betty Mbatha", award: "CAE Citation Bravo" },
    { year: "2023", name: "Aretha Kimani", award: "Dare to Dream & ISA+21" },
    { year: "2023", name: "Tonny Ndilinge", award: "Keep Flying International" },
    { year: "2023", name: "Emily Manduku", award: "Harvard Women Leadership Program" },
    { year: "2023", name: "Fiona Omondi", award: "Harvard Women Leadership Program" },
    { year: "2024", name: "Maseka Kithinji", award: "Hilton Instrument Rating" },
    { year: "2024", name: "Ernest Mwanzia Mutinda", award: "Keep Flying Extra Lift" },
    { year: "2024", name: "Loise Mwangi", award: "Harvard Women Leadership Program" },
    { year: "2025", name: "Winnie Nafula", award: "Harvard Women Leadership Program" },
    { year: "2025", name: "Unah Odhiambo", award: "Harvard Women Leadership Program" },
    { year: "2026", name: "Ashley Obondo", award: "Assets Noviams" },
    { year: "2026", name: "Maseka Kithinji", award: "Boeing Flight Training Scholarship" },
    { year: "2026", name: "Margert Ngugi", award: "Diane Ballweg Scholarship" },
];

const milestones = [
    { year: "2011", title: "The Beginning", desc: "Co-founded by Fiona Omondi and Una Gertrude after discovering WAI in an aviation classroom." },
    { year: "2012", title: "First Membership Drive", desc: "Partnered with EASA to host the official launch event with industry support." },
    { year: "2014", title: "Wilson Airport Airshow", desc: "Greatly increased Chapter visibility with a dedicated exhibition booth." },
    { year: "2015", title: "First GIAD Kenya", desc: "Hosted at Kenya Airways Pride Centre flight simulator, reaching girls across Nairobi." },
    { year: "2023", title: "Africa Ambassador", desc: "Fiona Omondi appointed WAI International Ambassador for Africa." },
    { year: "2024", title: "Girls Air Show", desc: "Partnered with GIAA to host the first Girls Air Show in August 2024." },
];

type Pioneer = { name: string; note: string; };

const fallbackPioneers: Pioneer[] = [
    { name: "Amelia Earhart", note: "First woman to fly solo across the Atlantic" },
    { name: "Bessie Coleman", note: "First African-American woman to hold a pilot licence" },
    { name: "Eileen Collins", note: "First female Space Shuttle Commander" },
    { name: "Jeana Yeager", note: "First to fly non-stop around the world without refuelling" },
    { name: "Nicole Malachowski", note: "First female Thunderbirds demonstration pilot" },
];

async function getPioneers(): Promise<Pioneer[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return fallbackPioneers;
    try {
        const res = await fetch(`${baseUrl}/wai_pioneer?_embed&per_page=100`, { next: { revalidate: 60 } });
        if (!res.ok) return fallbackPioneers;
        const data = await res.json();
        return data.map((item: any) => ({
            name: item.title?.rendered || "Unknown",
            note: item.meta?.note || "",
        }));
    } catch {
        return fallbackPioneers;
    }
}

type Partner = { name: string; logoUrl: string; websiteUrl?: string; };

async function getPartners(): Promise<Partner[] | undefined> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return undefined;
    try {
        const res = await fetch(`${baseUrl}/wai_partner?_embed&per_page=100`, { next: { revalidate: 60 } });
        if (!res.ok) return undefined;
        const data = await res.json();
        if (data.length === 0) return undefined;
        return data.map((item: any) => ({
            name: item.title?.rendered || "Partner",
            logoUrl: item.featured_image_url || "",
            websiteUrl: item.meta?.website_url || "",
        }));
    } catch {
        return undefined;
    }
}

export default async function AboutPage() {
    const pioneers = await getPioneers();
    const partners = await getPartners();

    return (
        <>
            <Navbar />
            <main>

                {/* ── HERO ── */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media (max-width: 768px) {
                        .hide-mb { display: none !important; }
                        .full-width-mb { width: 100% !important; }
                    }
                ` }} />
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
                            className="grid-2"
                            style={{
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
                                    Women in Aviation International (WAI) Kenya Chapter is a non-profit organization co-founded in <strong>2011</strong> by <strong>Ms. Fiona Omondi</strong> and <strong>Ms. Una Gertrude</strong>. The idea originated in an aviation classroom at the East Africa School of Aviation (EASA), motivated by the impact of WAI globally and a desire to create a local community that could provide more opportunities for Kenyan women in aerospace.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, marginBottom: "1.4rem", fontSize: "1rem" }}>
                                    Despite limited resources at inception, the Chapter rallied industry support and hosted its first membership drive in <strong>April 2012</strong>. This milestone was followed by <strong>Hon. John Omondi</strong> agreeing to serve as Patron, consistently supporting the career development of young women in aeronautical engineering.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, fontSize: "1rem" }}>
                                    The involvement of <strong>Captain Mary Mukulu Kai</strong> (then a Kenya Airways pilot) as Guest of Honor during the inaugural drive established the groundwork for ongoing mentorship and industry collaboration. Captain Kai now serves as the <strong>President</strong> of the WAI–Kenya Chapter.
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

                {/* ── MILESTONES TIMELINE ── */}
                <section style={{ padding: "8rem 0", background: "white" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <Label text="Journey & Impact" />
                            <h2 className="section-title">Our Growth Story</h2>
                        </div>

                        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
                            {/* Vertical line for desktop */}
                            <div style={{
                                position: "absolute", left: "50%", top: 0, bottom: 0,
                                width: 2, background: "#edf0f3", transform: "translateX(-50%)",
                                display: "block"
                            }} className="hide-mb" />

                            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
                                {milestones.map((m, i) => (
                                    <div key={m.year} style={{
                                        display: "flex",
                                        justifyContent: i % 2 === 0 ? "flex-end" : "flex-start",
                                        width: "100%",
                                        position: "relative"
                                    }}>
                                        {/* Dot */}
                                        <div style={{
                                            position: "absolute", left: "50%", top: "1.5rem",
                                            width: 16, height: 16, borderRadius: "50%",
                                            background: i % 2 === 0 ? "var(--teal)" : "var(--gold)",
                                            border: "4px solid white",
                                            transform: "translateX(-50%)",
                                            zIndex: 2
                                        }} className="hide-mb" />

                                        <div style={{
                                            width: "45%",
                                            background: "var(--off-white)",
                                            padding: "2rem",
                                            borderRadius: 6,
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                                            borderLeft: i % 2 === 0 ? "none" : `4px solid var(--gold)`,
                                            borderRight: i % 2 === 0 ? `4px solid var(--teal)` : "none",
                                        }} className="full-width-mb">
                                            <p style={{ fontSize: "1.2rem", fontWeight: 900, color: i % 2 === 0 ? "var(--teal)" : "var(--gold)", marginBottom: "0.25rem" }}>{m.year}</p>
                                            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "0.5rem" }}>{m.title}</h3>
                                            <p style={{ color: "var(--text-body)", fontSize: "0.93rem", lineHeight: 1.6 }}>{m.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── SCHOLARSHIP RECIPIENTS ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <Label text="Success Stories" />
                            <h2 className="section-title">Scholarship & Award Recipients</h2>
                            <p style={{ color: "var(--text-body)", maxWidth: 640, margin: "1rem auto 0", lineHeight: 1.7 }}>
                                Our members have successfully competed for numerous WAI global scholarships,
                                developing technical training, leadership skills, and professional excellence.
                            </p>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "1.5rem"
                        }}>
                            {scholarshipRecipients.map((s, i) => (
                                <div key={i} style={{
                                    background: "white",
                                    padding: "1.5rem",
                                    borderRadius: 6,
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                                    display: "flex",
                                    gap: "1.25rem",
                                    alignItems: "center"
                                }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: "50%",
                                        background: "var(--off-white)", color: "var(--gold)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, fontWeight: 800, fontSize: "0.75rem"
                                    }}>
                                        {s.year}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--teal-deep)" }}>{s.name}</h4>
                                        <p style={{ fontSize: "0.8rem", color: "var(--text-body)", opacity: 0.8 }}>{s.award}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent leadership note */}
                        <div style={{
                            marginTop: "4rem",
                            background: "white",
                            padding: "3rem",
                            borderRadius: 6,
                            textAlign: "center",
                            border: "1px solid #edf0f3"
                        }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "1rem" }}>Harvard Leadership Program</h3>
                            <p style={{ color: "var(--text-body)", lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
                                Recipient list includes <strong>Emily Manduku (2023)</strong>, <strong>Fiona Omondi (2023)</strong>, <strong>Loise Mwangi (2024)</strong>, <strong>Winnie Nafula (2025)</strong>, and <strong>Unah Odhiambo (2025)</strong>. This program tracks selected members worldwide to improve leadership skills and professional influence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── PROFESSIONAL DEVELOPMENT & OUTREACH ── */}
                <section style={{ padding: "8rem 0", background: "white" }}>
                    <div className="container">
                        <div className="grid-2" style={{ gap: "6rem", alignItems: "center" }}>
                            <div>
                                <Label text="Advocacy & Outreach" />
                                <h2 className="section-title">Beyond Scholarships</h2>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                                    In <strong>2023</strong>, the Chapter hosted a session at the Aero Club focused on emotional intelligence. By <strong>2024</strong>, AirKenya Express Ltd sponsored our International Women&rsquo;s Day event, featuring industry leaders like Eng. Liz Aluvanze, CEO of KAAO.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                                    Looking to the future, we plan to expand **Girls in Aviation Day (GIAD)** beyond Nairobi to counties with airport facilities, increasing access and introducing more girls to the full range of aerospace careers.
                                </p>
                                <p style={{ color: "var(--text-body)", lineHeight: 1.85 }}>
                                    We also partner locally and internationally, such as our <strong>2024 Girls Air Show</strong> collaboration with Girls in Aviation Africa (GIAA), led by Ms. Maseka Githinji.
                                </p>
                            </div>
                            <div style={{
                                position: "relative",
                                padding: "3rem",
                                background: "var(--teal-deep)",
                                borderRadius: 6,
                                color: "white"
                            }}>
                                <Users size={48} style={{ color: "var(--gold)", marginBottom: "1.5rem" }} />
                                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.25rem" }}>Empowering the Future</h3>
                                <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: "0.97rem" }}>
                                    &ldquo;Through mentorship, partnerships, and skills development, we continue to strengthen our core mission: enhancing the representation and leadership of women in aviation in Kenya.&rdquo;
                                </p>
                            </div>
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
                        className="container grid-2"
                        style={{
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
                            className="grid-2"
                            style={{
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

                {/* ── PARTNERS CAROUSEL ── */}
                <PartnerCarousel partners={partners} />

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
