import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import SocialIcon from "@/components/SocialIcon";
import { CONTACT, ACTIVE_SOCIALS } from "@/lib/site";
import { MapPin, Mail, Phone, GraduationCap, Handshake, Users, Info, HelpCircle, Heart } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | WAI Kenya Chapter",
    description:
        "Get in touch with Women in Aviation International – Kenya Chapter. Call the Chapter President, email us, follow us on social media, or send an enquiry.",
};

const QUICK_LINKS = [
    { Icon: GraduationCap, label: "Scholarships", href: "/scholarships" },
    { Icon: Handshake, label: "Membership", href: "/membership" },
    { Icon: Users, label: "Our Team", href: "/team" },
    { Icon: Heart, label: "Donate", href: "/donate" },
    { Icon: HelpCircle, label: "FAQ", href: "/faq" },
    { Icon: Info, label: "About Us", href: "/about" },
];

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="We would love to hear from you"
                    title="Contact Us"
                    lead="Questions about membership, scholarships, mentorship, school visits or partnerships — reach the Chapter directly."
                />

                <section style={{ padding: "6.5rem 0", background: "var(--off-white)" }}>
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.15fr)",
                            gap: "4rem",
                            alignItems: "start",
                        }}
                        id="contact-grid"
                    >
                        {/* ── LEFT: details ── */}
                        <div>
                            <p className="section-label">Get in touch</p>
                            <h2 className="section-title" style={{ fontSize: "2.1rem", marginBottom: "2.5rem" }}>
                                Chapter contact details
                            </h2>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2.5rem" }}>
                                <ContactRow Icon={Phone} label="Call the Chapter">
                                    <a href={CONTACT.phoneHref} className="contact-value">{CONTACT.phone}</a>
                                    <span className="contact-note">{CONTACT.phoneLabel}</span>
                                </ContactRow>

                                <ContactRow Icon={Mail} label="Email us">
                                    <a href={`mailto:${CONTACT.email}`} className="contact-value">{CONTACT.email}</a>
                                    <span className="contact-note">We aim to reply within two working days</span>
                                </ContactRow>

                                <ContactRow Icon={MapPin} label="Our office">
                                    <span className="contact-value" style={{ fontSize: "0.98rem", lineHeight: 1.65 }}>
                                        {CONTACT.address}
                                    </span>
                                </ContactRow>
                            </div>

                            {ACTIVE_SOCIALS.length > 0 && (
                                <div style={{ marginBottom: "2.5rem" }}>
                                    <p
                                        style={{
                                            fontSize: "0.74rem",
                                            fontWeight: 800,
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            color: "var(--gray)",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        Follow the Chapter
                                    </p>
                                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                        {ACTIVE_SOCIALS.map((s) => (
                                            <a
                                                key={s.key}
                                                href={s.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`WAI Kenya on ${s.label}`}
                                                className="contact-social"
                                            >
                                                <SocialIcon platform={s.key} size={17} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8184068946437!2d36.92458647501837!3d-1.3192419356193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f0f8c61d77b37%3A0xa4aff72b0c82f8e2!2sJomo%20Kenyatta%20International%20Airport!5e0!3m2!1sen!2ske!4v1700000000000"
                                    width="100%"
                                    height="240"
                                    style={{ border: 0, display: "block" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="WAI Kenya Chapter location"
                                />
                            </div>
                        </div>

                        {/* ── RIGHT: form ── */}
                        <div
                            style={{
                                background: "var(--white)",
                                padding: "3rem",
                                borderRadius: 8,
                                boxShadow: "0 10px 40px rgba(8,46,58,0.09)",
                                border: "1px solid #e9edf0",
                            }}
                        >
                            <h2 style={{ fontSize: "1.6rem", color: "var(--teal-deep)", marginBottom: "0.6rem" }}>
                                Send us a message
                            </h2>
                            <p style={{ color: "var(--text-body)", marginBottom: "2.25rem", fontSize: "0.94rem" }}>
                                Tell us what you need and the right person in the Chapter will get back to you.
                            </p>

                            <EnquiryForm
                                formName="contact"
                                submitLabel="Send message"
                                fields={[
                                    { name: "name", label: "Your name", required: true },
                                    { name: "email", label: "Email address", type: "email", required: true },
                                    {
                                        name: "subject",
                                        label: "What is this about?",
                                        type: "select",
                                        required: true,
                                        placeholder: "Choose a topic…",
                                        options: [
                                            "Membership",
                                            "Scholarships",
                                            "Mentorship",
                                            "School or outreach visit",
                                            "Volunteering",
                                            "Partnership or sponsorship",
                                            "Donations",
                                            "Press or media",
                                            "Something else",
                                        ],
                                    },
                                    { name: "message", label: "Your message", type: "textarea", required: true, rows: 5 },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* ── QUICK LINKS ── */}
                <section style={{ padding: "5rem 0", background: "var(--white)" }}>
                    <div className="container">
                        <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: "2.5rem", fontSize: "0.92rem" }}>
                            You might find what you need here first
                        </p>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                                gap: "1rem",
                                maxWidth: 1000,
                                margin: "0 auto",
                            }}
                        >
                            {QUICK_LINKS.map(({ Icon, label, href }) => (
                                <Link key={label} href={href} className="quick-link">
                                    <Icon size={22} strokeWidth={1.8} />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                @media (max-width: 920px) {
                    #contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                }
                .contact-value {
                    display: block;
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--teal-deep);
                }
                a.contact-value:hover { color: var(--teal); }
                .contact-note {
                    display: block;
                    font-size: 0.83rem;
                    color: var(--gray);
                    margin-top: 0.2rem;
                }
                .contact-social {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--white);
                    border: 1px solid #dde4e8;
                    color: var(--teal);
                    transition: all 0.2s ease;
                }
                .contact-social:hover {
                    background: var(--teal);
                    border-color: var(--teal);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .quick-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 1.6rem 1rem;
                    background: var(--off-white);
                    border: 1px solid #e9edf0;
                    border-radius: 6px;
                    color: var(--teal);
                    font-size: 0.86rem;
                    font-weight: 700;
                    text-align: center;
                    transition: all 0.25s ease;
                }
                .quick-link:hover {
                    background: var(--teal);
                    border-color: var(--teal);
                    color: #fff;
                    transform: translateY(-4px);
                }
                @media (prefers-reduced-motion: reduce) {
                    .contact-social, .quick-link { transition: none; }
                }
            `}</style>
        </>
    );
}

function ContactRow({
    Icon,
    label,
    children,
}: {
    Icon: typeof Phone;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start" }}>
            <span
                style={{
                    flexShrink: 0,
                    width: 46,
                    height: 46,
                    borderRadius: 8,
                    background: "rgba(26,107,124,0.1)",
                    color: "var(--teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Icon size={20} strokeWidth={1.9} />
            </span>
            <div style={{ minWidth: 0 }}>
                <p
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: "1.8px",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: "0.35rem",
                    }}
                >
                    {label}
                </p>
                {children}
            </div>
        </div>
    );
}
