import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import PartnerCarousel from "@/components/PartnerCarousel";
import { Plane, GraduationCap, Handshake, Rocket, Medal, Globe } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://waikenyachapter.com"),
  title: "WAI Kenya Chapter | Women in Aviation International",
  description:
    "The Kenya Chapter of Women in Aviation International – dedicated to the encouragement and advancement of women in all aviation career fields and interests.",
  keywords: "Women in Aviation, Kenya, Pilots, Aerospace, Mentorship, Girls in Aviation Day, Scholarships",
  openGraph: {
    title: "WAI Kenya Chapter",
    description: "Advancing women in every aviation career field in Kenya.",
    url: "https://waikenyachapter.com",
    siteName: "WAI Kenya",
    images: [{ url: "/images/hero_bg.png", width: 1200, height: 630 }],
    locale: "en_KE",
    type: "website",
  },
};

/* ───────── helpers ───────── */
const Label = ({ text }: { text: string }) => (
  <p
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "0.75rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "3px",
      color: "var(--teal)",
      marginBottom: "1rem",
    }}
  >
    <span
      style={{ width: 24, height: 2, background: "var(--teal)", display: "inline-block" }}
    />
    {text}
  </p>
);

const Bar = ({ color = "var(--teal)" }: { color?: string }) => (
  <div style={{ width: 48, height: 3, background: color, marginBottom: "1.5rem" }} />
);

/* ───────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── 1. HERO SLIDER ─────────────────────────── */}
        <HeroSlider />

        {/* ── 2. QUICK INTRO BAR ────────────────────── */}
        <section style={{ background: "var(--teal)", padding: "2.5rem 0" }}>
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              { Icon: Plane, label: "Global Network" },
              { Icon: GraduationCap, label: "Scholarships & Training" },
              { Icon: Handshake, label: "Mentorship Programs" },
              { Icon: Rocket, label: "Career Advancement" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                }}
              >
                <item.Icon size={24} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                {item.label}
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. WHO WE ARE ─────────────────────────── */}
        <section className="section" id="about">
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6rem",
                alignItems: "center",
              }}
            >
              <div>
                <Label text="Who We Are" />
                <h2
                  className="section-title"
                >
                  A Nonprofit Advancing Women in <span style={{ color: "var(--teal)" }}>All Aviation Fields</span>
                </h2>
                <Bar />
                <p style={{ color: "var(--text-body)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
                  Women in Aviation International is a nonprofit organization dedicated to the encouragement and advancement of women in all aviation career fields and interests. Our diverse membership includes astronauts, corporate pilots, maintenance technicians, air traffic controllers, business owners, educators, journalists, flight attendants, and students.
                </p>
                <p style={{ color: "var(--text-body)", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
                  We provide year-round resources to assist women in aviation and to encourage young women to consider aviation as a career. WAI also offers educational outreach programs to educators, aviation industry members, and young people nationally and internationally.
                </p>
                <Link href="/join" className="btn-primary">Become a Member →</Link>
              </div>

              <div
                style={{
                  position: "relative",
                  height: "520px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "30px 30px 0 var(--gray-light)",
                }}
              >
                <Image src="/images/team.png" alt="WAI Kenya Team" fill style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. STATS BAR ──────────────────────────── */}
        <section style={{ background: "var(--teal-deep)", padding: "6rem 0", color: "white" }}>
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { num: "500+", label: "Active Members" },
              { num: "15+", label: "Scholarships Awarded" },
              { num: "40+", label: "Industry Partners" },
              { num: "10", label: "Annual Events" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "var(--gold)",
                    letterSpacing: "-2px",
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.num}
                </div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", opacity: 0.7 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. PROGRAMS ───────────────────────────── */}
        <section className="section" id="programs" style={{ background: "var(--off-white)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Label text="What We Do" />
              <h2 className="section-title">
                Our Programs &amp; <span style={{ color: "var(--teal)" }}>Initiatives</span>
              </h2>
              <p style={{ maxWidth: 560, margin: "0 auto", color: "var(--text-body)" }}>
                From outreach to scholarships, every program we run is designed to open doors and build careers.
              </p>
            </div>

            <div className="grid-3">
              {[
                {
                  Icon: Plane,
                  title: "Girls in Aviation Day",
                  desc: "Our flagship program for girls aged 8–17. A day packed with flights, simulators, and inspiring role models to spark a passion for the skies.",
                  img: "/images/girls_aviation.png",
                },
                {
                  Icon: Medal,
                  title: "Scholarships",
                  desc: "We award flight training and academic scholarships annually to deserving women pursuing careers in aviation and aerospace engineering.",
                  img: "/images/mentorship.png",
                },
                {
                  Icon: Globe,
                  title: "Education Outreach",
                  desc: "We deliver aviation education to schools, educators, and youth groups across Kenya, building the pipeline for the next generation.",
                  img: "/images/youth.png",
                },
              ].map((p) => (
                <div key={p.title} className="card">
                  <div style={{ position: "relative", height: 220 }}>
                    <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover" }} />
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        background: "var(--teal)",
                        color: "white",
                        padding: "0.4rem 0.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4,
                      }}
                    >
                      {p.Icon && <p.Icon size={18} strokeWidth={1.75} />}
                    </div>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>{p.title}</h3>
                    <p style={{ color: "var(--text-body)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>{p.desc}</p>
                    <Link href="#events" style={{ color: "var(--teal)", fontWeight: 700, fontSize: "0.9rem" }}>
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. MEMBERSHIP ─────────────────────────── */}
        <section className="section" id="membership">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Label text="Membership" />
              <h2 className="section-title">
                Join the Community. <span style={{ color: "var(--teal)" }}>Shape the Future.</span>
              </h2>
              <p style={{ maxWidth: 580, margin: "0 auto", color: "var(--text-body)" }}>
                WAI membership is open to women and men from all segments of the aviation industry and in all stages of their career.
              </p>
            </div>

            {/* Pricing highlights */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.75rem",
                marginBottom: "3.5rem",
              }}
            >
              {[
                { category: "Student", price: "$32", desc: "Full-time students (U.S.)", highlight: false },
                { category: "Individual", price: "$45", desc: "Aviation professionals (U.S.)", highlight: true },
                { category: "International", price: "$55", desc: "Outside the United States", highlight: false },
                { category: "Corporate", price: "$400", desc: "Organisations & companies", highlight: false },
              ].map((tier) => (
                <div
                  key={tier.category}
                  style={{
                    background: tier.highlight ? "var(--teal)" : "white",
                    color: tier.highlight ? "white" : "var(--text-dark)",
                    padding: "2.5rem 2rem",
                    borderRadius: 4,
                    boxShadow: tier.highlight
                      ? "0 16px 40px rgba(26,107,124,0.3)"
                      : "0 4px 20px rgba(0,0,0,0.07)",
                    border: tier.highlight ? "none" : "1px solid #edf0f3",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  {tier.highlight && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--gold)",
                        color: "var(--teal-deep)",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "100px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", opacity: 0.6, marginBottom: "0.5rem" }}>
                    {tier.category}
                  </p>
                  <p style={{ fontSize: "2.8rem", fontWeight: 900, color: tier.highlight ? "var(--gold)" : "var(--teal)", letterSpacing: "-2px", lineHeight: 1 }}>
                    {tier.price}
                  </p>
                  <p style={{ fontSize: "0.7rem", opacity: 0.5, marginBottom: "1rem" }}>/year</p>
                  <p style={{ fontSize: "0.88rem", opacity: 0.7 }}>{tier.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/membership" className="btn-primary">View All Membership Options →</Link>
              <Link
                href="/membership#join-form"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "2px solid var(--teal)",
                  color: "var(--teal)",
                  padding: "0.9rem 2.2rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  transition: "all 0.3s",
                }}
              >
                Apply for Kenya Chapter
              </Link>
            </div>
          </div>
        </section>

        {/* ── 7. HALL OF FAME ───────────────────────── */}
        <section id="pioneers" style={{ background: "var(--teal-deep)", padding: "7rem 0", color: "white" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ width: 24, height: 2, background: "var(--gold)", display: "inline-block" }} />
                WAI Pioneer Hall of Fame
              </p>
              <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "white", letterSpacing: "-1px", marginBottom: "1rem" }}>
                Women Who Changed the Sky
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto" }}>
                WAI promotes public understanding of the accomplishments and contributions of women in aviation, recognizing historic pioneers through our Hall of Fame.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "2rem",
              }}
            >
              {[
                { name: "Amelia Earhart", role: "First woman to fly solo across the Atlantic Ocean", year: "1928" },
                { name: "Bessie Coleman", role: "First African American woman to earn a pilot's license", year: "1921" },
                { name: "Eileen Collins", role: "First woman to pilot and command a Space Shuttle", year: "1995" },
                { name: "Jeana Yeager", role: "First woman to fly nonstop around the world without refueling", year: "1986" },
                { name: "Nicole Malachowski", role: "First female pilot on the Thunderbirds demonstration team", year: "2005" },
                { name: "Mary Kai", role: "WAI Kenya Chapter President, advancing women in Kenyan aviation", year: "Today" },
              ].map((p) => (
                <div
                  key={p.name}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "2rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--gold)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    🏆
                  </div>
                  <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>
                    {p.year}
                  </p>
                  <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "0.75rem" }}>{p.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.92rem", lineHeight: 1.6 }}>{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. CTA ────────────────────────────────── */}
        <section
          style={{
            background: "var(--teal)",
            padding: "7rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "3rem", fontWeight: 900, color: "white", marginBottom: "1rem", letterSpacing: "-1px" }}>
              Ready to Take Flight?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 3rem" }}>
              Join the WAI Kenya Chapter today and be part of a movement that is rewriting the story of women in African aviation.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
              <Link href="/join" className="btn-outline">Apply for Membership</Link>
              <Link
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "white",
                  fontWeight: 700,
                  gap: "0.5rem",
                  opacity: 0.75,
                  transition: "opacity 0.2s",
                }}
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PARTNERS CAROUSEL ── */}
        <PartnerCarousel />
      </main>

      <Footer />
    </>
  );
}
