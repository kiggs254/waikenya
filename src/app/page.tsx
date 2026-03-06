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
type Partner = { name: string; logoUrl: string; websiteUrl?: string; };

async function getPartners(): Promise<Partner[] | undefined> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!baseUrl) return undefined;
  try {
    const res = await fetch(`${baseUrl}/wai_partner?_embed&per_page=100`, { next: { revalidate: 60 } });
    if (!res.ok) return undefined;
    const data = await res.json();
    if (data.length === 0) return undefined;
    return data.map((item: any) => {
      const logoUrl = item.featured_image_url
        || item._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        || "";
      return {
        name: item.title?.rendered || "Partner",
        logoUrl,
        websiteUrl: item.meta?.website_url || "",
      };
    });
  } catch {
    return undefined;
  }
}

type UpcomingEvent = {
  title: string;
  dateDisplay: string;
  link: string;
};

async function getUpcomingEvent(): Promise<UpcomingEvent | undefined> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!baseUrl) return undefined;
  try {
    const res = await fetch(`${baseUrl}/wai_event?_embed&per_page=100`, { next: { revalidate: 60 } });
    if (!res.ok) return undefined;
    const data = await res.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = data.filter((item: any) => {
      const dateStr = item.meta?.event_date;
      if (!dateStr || !(/^\d{4}-\d{2}-\d{2}$/.test(dateStr))) return false;
      return new Date(dateStr) >= today;
    });

    if (upcomingEvents.length === 0) return undefined;

    // Sort to get the nearest upcoming event
    upcomingEvents.sort((a: any, b: any) => new Date(a.meta.event_date).getTime() - new Date(b.meta.event_date).getTime());

    const nextEvent = upcomingEvents[0];
    const dateObj = new Date(nextEvent.meta.event_date);

    return {
      title: nextEvent.title?.rendered || "Upcoming Event",
      dateDisplay: dateObj.toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      }),
      link: nextEvent.meta?.external_url || "/events",
    };
  } catch {
    return undefined;
  }
}

export default async function Home() {
  const partners = await getPartners();
  const upcomingEvent = await getUpcomingEvent();

  return (
    <>
      <Navbar />

      <main>
        {/* ── 1. HERO SLIDER ─────────────────────────── */}
        <HeroSlider upcomingEvent={upcomingEvent} />

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
              className="grid-2"
              style={{
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
            className="container grid-4"
            style={{
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
        <PartnerCarousel partners={partners} />
      </main>

      <Footer />
    </>
  );
}
