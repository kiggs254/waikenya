import Link from "next/link";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" style={{ background: "var(--teal-deep)", color: "white" }}>
            {/* Top link bar */}
            <div
                style={{
                    background: "var(--teal)",
                    padding: "1.25rem 0",
                }}
            >
                <div
                    className="container"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                        📍 Cargo Village, Freight Link Road, Mechanized Freight Terminal, 1st Floor, Nairobi, Kenya
                    </p>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <a href="tel:+254720830902" style={{ fontSize: "0.9rem", opacity: 0.85, color: "white", textDecoration: "none" }}>📞 +254 720 830 902</a>
                        <a href="mailto:info@waikenyachapter.com" style={{ fontSize: "0.9rem", opacity: 0.85, color: "white", textDecoration: "none" }}>✉️ info@waikenyachapter.com</a>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container" style={{ padding: "6rem 2.5rem 4rem" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "4rem",
                    }}
                >
                    {/* Brand */}
                    <div style={{ gridColumn: "1 / -1", maxWidth: 400 }}>
                        <h2
                            style={{
                                fontSize: "2rem",
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-1px",
                                marginBottom: "1.5rem",
                            }}
                        >
                            WAI <span style={{ color: "var(--gold)" }}>KENYA</span>
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "2rem" }}>
                            A nonprofit dedicated to the encouragement and advancement of women in all aviation career fields and interests in Kenya.
                        </p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <a href="#" className="footer-social-link" aria-label="X (Twitter)">
                                <Twitter size={18} strokeWidth={2} />
                            </a>
                            <a href="#" className="footer-social-link" aria-label="LinkedIn">
                                <Linkedin size={18} strokeWidth={2} />
                            </a>
                            <a href="https://www.facebook.com/WAIKenya/" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Facebook">
                                <Facebook size={18} strokeWidth={2} />
                            </a>
                            <a href="https://www.instagram.com/womeninaviation_kenyachapter/" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
                                <Instagram size={18} strokeWidth={2} />
                            </a>
                        </div>
                    </div>

                    {/* Nav */}
                    <div>
                        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.75rem" }}>
                            Explore
                        </h4>
                        <ul className="footer-links" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/events">Programs</Link></li>
                            <li><Link href="/membership">Membership</Link></li>
                            <li><Link href="/team">The Team</Link></li>
                            <li><Link href="/events">Events</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.75rem" }}>
                            Programs
                        </h4>
                        <ul className="footer-links" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <li><Link href="/events">Girls in Aviation Day</Link></li>
                            <li><Link href="/scholarships">Scholarships</Link></li>
                            <li><Link href="/events">Education Outreach</Link></li>
                            <li><Link href="/about">Mentorship</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.75rem" }}>
                            Support
                        </h4>
                        <ul className="footer-links" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <li><Link href="/membership">Join the Chapter</Link></li>
                            <li><Link href="/membership">Partner With Us</Link></li>
                            <li><Link href="/contact">Volunteer</Link></li>
                            <li><Link href="/contact">Get in Touch</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        marginTop: "5rem",
                        paddingTop: "2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>
                        &copy; {new Date().getFullYear()} Women in Aviation International – Kenya Chapter. All rights reserved.
                    </p>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", textDecoration: "none" }}>Privacy Policy</Link>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", textDecoration: "none" }}>Terms of Service</Link>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-links a {
                    color: rgba(255,255,255,0.55);
                    text-decoration: none;
                    font-size: 0.92rem;
                    transition: color 0.2s;
                }
                .footer-links a:hover {
                    color: var(--gold);
                }
                .footer-social-link {
                    width: 38px;
                    height: 38px;
                    background: rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    color: white;
                    transition: all 0.2s;
                }
                .footer-social-link:hover {
                    background: var(--gold);
                    color: var(--teal-deep);
                    transform: translateY(-2px);
                }
            `}</style>
        </footer>
    );
}
