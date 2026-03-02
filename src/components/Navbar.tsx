"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.inner}>
                {/* Logo: image + text */}
                <Link href="/" className={styles.logo}>
                    <Image
                        src={scrolled ? "/images/logo-black.png" : "/images/logo-white.png"}
                        alt="WAI Kenya Chapter Logo"
                        width={52}
                        height={52}
                        className={styles.logoImg}
                    />
                    <span className={styles.logoText}>
                        WAI <span className={styles.logoAccent}>Kenya</span>
                    </span>
                </Link>

                <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
                    <Link href="/about" className={styles.link} onClick={() => setMenuOpen(false)}>About Us</Link>
                    <Link href="/team" className={styles.link} onClick={() => setMenuOpen(false)}>The Team</Link>
                    <Link href="/events" className={styles.link} onClick={() => setMenuOpen(false)}>Events</Link>
                    <Link href="/membership" className={styles.link} onClick={() => setMenuOpen(false)}>Membership</Link>
                    <Link href="/scholarships" className={styles.link} onClick={() => setMenuOpen(false)}>Scholarships</Link>
                    <Link href="#pioneers" className={styles.link} onClick={() => setMenuOpen(false)}>Hall of Fame</Link>
                    <Link href="/contact" className={styles.link} onClick={() => setMenuOpen(false)}>Contact</Link>
                    <Link href="/membership" className={styles.cta}>Join Now</Link>
                </div>

                <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className={menuOpen ? styles.burgerTop : ""} />
                    <span className={menuOpen ? styles.burgerMid : ""} />
                    <span className={menuOpen ? styles.burgerBot : ""} />
                </button>
            </div>
        </nav >
    );
}
