"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Mail, Share2, Facebook, Instagram, CheckCircle, GraduationCap, Users, Info, Handshake } from "lucide-react";

const contactDetails = [
    {
        Icon: MapPin,
        label: "Our Office",
        lines: [
            "Cargo Village, Freight Link Road,",
            "Mechanized Freight Terminal, 1st Floor,",
            "Nairobi, Kenya",
        ],
    },
    {
        Icon: Mail,
        label: "Email Us",
        lines: ["info@waikenyachapter.com"],
        isEmail: true,
    },
    {
        Icon: Share2,
        label: "Follow Us",
        lines: ["@WAIKenya on Facebook", "@womeninaviation_kenyachapter on Instagram"],
    },
];

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.9rem 1.1rem",
    border: "1.5px solid #dce8ea",
    borderRadius: 4,
    fontSize: "0.95rem",
    color: "var(--teal-deep)",
    background: "white",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
};

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate send (replace with real API call)
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setSent(true);
    };

    return (
        <>
            <Navbar />
            <main>

                {/* ── HERO ── */}
                <section
                    style={{
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        padding: "12rem 0 7rem",
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {[360, 580, 800].map((s) => (
                        <div
                            key={s}
                            style={{
                                position: "absolute",
                                width: s, height: s,
                                borderRadius: "50%",
                                border: "1px solid rgba(255,255,255,0.05)",
                                top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                pointerEvents: "none",
                            }}
                        />
                    ))}
                    <div
                        style={{
                            position: "absolute", top: -60, right: -60,
                            width: 280, height: 280, borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(212,176,89,0.18) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />
                    <div className="container" style={{ position: "relative", zIndex: 2 }}>
                        <p style={{
                            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "4px",
                            textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem",
                        }}>
                            ── WAI Kenya Chapter ──
                        </p>
                        <h1 style={{
                            fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900,
                            color: "white", letterSpacing: "-2px", marginBottom: "1.5rem",
                        }}>
                            Contact Us
                        </h1>
                        <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: 520, lineHeight: 1.7 }}>
                            Have a question, want to partner with us, or simply want to say hello?
                            We&rsquo;d love to hear from you.
                        </p>
                    </div>
                </section>

                {/* ── MAIN CONTENT ── */}
                <section style={{ padding: "7rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div
                            className="grid-2-asym"
                            style={{
                                gap: "4rem",
                                alignItems: "start",
                            }}
                        >

                            {/* ── LEFT: Contact info + map ── */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                                {contactDetails.map((c) => (
                                    <div
                                        key={c.label}
                                        style={{
                                            background: "white",
                                            borderRadius: 6,
                                            padding: "1.75rem 2rem",
                                            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                                            borderLeft: "4px solid var(--teal)",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                                            <c.Icon size={20} color="var(--teal)" strokeWidth={1.75} />
                                            <p style={{
                                                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                                                letterSpacing: "2px", color: "var(--teal)",
                                            }}>
                                                {c.label}
                                            </p>
                                        </div>
                                        {c.lines.map((line, i) =>
                                            c.isEmail ? (
                                                <a
                                                    key={i}
                                                    href={`mailto:${line}`}
                                                    style={{
                                                        display: "block", color: "var(--teal-deep)", fontWeight: 700,
                                                        fontSize: "0.95rem", textDecoration: "none",
                                                    }}
                                                >
                                                    {line}
                                                </a>
                                            ) : (
                                                <p key={i} style={{ color: "var(--text-body)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                                                    {line}
                                                </p>
                                            )
                                        )}
                                    </div>
                                ))}

                                {/* Social badges */}
                                <div
                                    style={{
                                        background: "linear-gradient(135deg, var(--teal-deep), var(--teal))",
                                        borderRadius: 6,
                                        padding: "2rem",
                                        color: "white",
                                    }}
                                >
                                    <p style={{
                                        fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                                        letterSpacing: "2px", color: "var(--gold)", marginBottom: "1.25rem",
                                    }}>
                                        Find Us Online
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                        <a
                                            href="https://www.facebook.com/WAIKenya"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "flex", alignItems: "center", gap: "0.75rem",
                                                background: "rgba(255,255,255,0.1)", padding: "0.75rem 1.1rem",
                                                borderRadius: 4, color: "white", textDecoration: "none",
                                                fontWeight: 600, fontSize: "0.9rem", transition: "background 0.2s",
                                            }}
                                        >
                                            <Facebook size={18} strokeWidth={1.75} /> WAIKenya on Facebook
                                        </a>
                                        <a
                                            href="https://www.instagram.com/womeninaviation_kenyachapter/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "flex", alignItems: "center", gap: "0.75rem",
                                                background: "rgba(255,255,255,0.1)", padding: "0.75rem 1.1rem",
                                                borderRadius: 4, color: "white", textDecoration: "none",
                                                fontWeight: 600, fontSize: "0.9rem", transition: "background 0.2s",
                                            }}
                                        >
                                            <Instagram size={18} strokeWidth={1.75} /> @womeninaviation_kenyachapter
                                        </a>
                                    </div>
                                </div>

                                {/* Google Map embed */}
                                <div style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8184068946437!2d36.92458647501837!3d-1.3192419356193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f0f8c61d77b37%3A0xa4aff72b0c82f8e2!2sJomo%20Kenyatta%20International%20Airport!5e0!3m2!1sen!2ske!4v1700000000000"
                                        width="100%"
                                        height="220"
                                        style={{ border: 0, display: "block" }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="WAI Kenya Chapter Location"
                                    />
                                </div>
                            </div>

                            {/* ── RIGHT: Contact form ── */}
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 6,
                                    padding: "3rem",
                                    boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
                                }}
                            >
                                {sent ? (
                                    /* Success state */
                                    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                                        <div style={{
                                            width: 72, height: 72, borderRadius: "50%",
                                            background: "linear-gradient(135deg, var(--teal-deep), var(--teal))",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            margin: "0 auto 1.75rem", color: "white",
                                        }}>
                                            <CheckCircle size={32} strokeWidth={2} />
                                        </div>
                                        <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--teal-deep)", marginBottom: "1rem" }}>
                                            Message Sent!
                                        </h2>
                                        <p style={{ color: "var(--text-body)", lineHeight: 1.7, maxWidth: 360, margin: "0 auto 2rem" }}>
                                            Thank you for reaching out. A member of the WAI Kenya team will
                                            get back to you as soon as possible.
                                        </p>
                                        <button
                                            onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                            style={{
                                                background: "var(--teal)", color: "white",
                                                border: "none", padding: "0.85rem 2rem",
                                                borderRadius: 4, fontWeight: 700, cursor: "pointer",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: "2.5rem" }}>
                                            <p style={{
                                                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                                                letterSpacing: "3px", color: "var(--teal)", marginBottom: "0.75rem",
                                            }}>
                                                Get In Touch
                                            </p>
                                            <h2 style={{
                                                fontSize: "2rem", fontWeight: 900, color: "var(--teal-deep)",
                                                letterSpacing: "-0.5px", marginBottom: "0.75rem",
                                            }}>
                                                Send Us a Message
                                            </h2>
                                            <p style={{ color: "var(--text-body)", fontSize: "0.93rem", lineHeight: 1.7 }}>
                                                We want to hear from you! Whether it&rsquo;s about scholarships, events,
                                                membership or partnerships — we&rsquo;re here to help.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                                            {/* Name + Email row */}
                                            <div className="grid-2" style={{ gap: "1rem" }}>
                                                <div>
                                                    <label style={{
                                                        display: "block", fontSize: "0.78rem", fontWeight: 700,
                                                        color: "var(--teal-deep)", marginBottom: "0.4rem", letterSpacing: "0.5px",
                                                    }}>
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        placeholder="Jane Doe"
                                                        required
                                                        style={inputStyle}
                                                        onFocus={e => (e.target.style.borderColor = "var(--teal)")}
                                                        onBlur={e => (e.target.style.borderColor = "#dce8ea")}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{
                                                        display: "block", fontSize: "0.78rem", fontWeight: 700,
                                                        color: "var(--teal-deep)", marginBottom: "0.4rem", letterSpacing: "0.5px",
                                                    }}>
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        placeholder="jane@example.com"
                                                        required
                                                        style={inputStyle}
                                                        onFocus={e => (e.target.style.borderColor = "var(--teal)")}
                                                        onBlur={e => (e.target.style.borderColor = "#dce8ea")}
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject dropdown */}
                                            <div>
                                                <label style={{
                                                    display: "block", fontSize: "0.78rem", fontWeight: 700,
                                                    color: "var(--teal-deep)", marginBottom: "0.4rem", letterSpacing: "0.5px",
                                                }}>
                                                    Subject
                                                </label>
                                                <select
                                                    name="subject"
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                                                    onFocus={e => (e.target.style.borderColor = "var(--teal)")}
                                                    onBlur={e => (e.target.style.borderColor = "#dce8ea")}
                                                >
                                                    <option value="">Select a topic…</option>
                                                    <option>Membership Enquiry</option>
                                                    <option>Scholarship Information</option>
                                                    <option>Girls in Aviation Day</option>
                                                    <option>Partnership Opportunity</option>
                                                    <option>Event Information</option>
                                                    <option>Media & Press</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label style={{
                                                    display: "block", fontSize: "0.78rem", fontWeight: 700,
                                                    color: "var(--teal-deep)", marginBottom: "0.4rem", letterSpacing: "0.5px",
                                                }}>
                                                    Your Message *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    placeholder="Tell us what's on your mind…"
                                                    required
                                                    rows={6}
                                                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                                                    onFocus={e => (e.target.style.borderColor = "var(--teal)")}
                                                    onBlur={e => (e.target.style.borderColor = "#dce8ea")}
                                                />
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                style={{
                                                    background: loading ? "var(--teal)" : "linear-gradient(135deg, var(--teal-deep), var(--teal))",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "1rem 2.5rem",
                                                    borderRadius: 4,
                                                    fontWeight: 700,
                                                    fontSize: "1rem",
                                                    cursor: loading ? "not-allowed" : "pointer",
                                                    opacity: loading ? 0.8 : 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.6rem",
                                                    transition: "opacity 0.2s",
                                                    letterSpacing: "0.5px",
                                                    alignSelf: "flex-start",
                                                }}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span style={{
                                                            width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)",
                                                            borderTopColor: "white", borderRadius: "50%",
                                                            display: "inline-block", animation: "spin 0.7s linear infinite",
                                                        }} />
                                                        Sending…
                                                    </>
                                                ) : (
                                                    "Send Message →"
                                                )}
                                            </button>
                                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                                            <p style={{ fontSize: "0.78rem", color: "var(--text-body)", opacity: 0.7 }}>
                                                * Required fields. We typically respond within 1–2 business days.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── QUICK LINKS BAR ── */}
                <section style={{ background: "var(--teal-deep)", padding: "4rem 0" }}>
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "1.5rem",
                            textAlign: "center",
                        }}
                    >
                        {[
                            { Icon: GraduationCap, label: "Scholarships", href: "/scholarships" },
                            { Icon: Handshake, label: "Membership", href: "/membership" },
                            { Icon: Users, label: "Meet the Team", href: "/team" },
                            { Icon: Info, label: "About Us", href: "/about" },
                        ].map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                style={{
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    gap: "0.6rem", color: "white", textDecoration: "none",
                                    padding: "1.5rem 1rem",
                                    background: "rgba(255,255,255,0.06)",
                                    borderRadius: 6,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.13)")}
                                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)")}
                            >
                                <l.Icon size={28} strokeWidth={1.5} />
                                <span style={{ fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.5px" }}>{l.label}</span>
                            </a>
                        ))}
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
