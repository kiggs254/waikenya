"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";

type NavItem = {
    label: string;
    href?: string;
    children?: { label: string; href: string; description?: string }[];
};

const NAV: NavItem[] = [
    {
        label: "About Us",
        children: [
            { label: "Our Story", href: "/about", description: "WAI International, our history and impact" },
            { label: "Leadership", href: "/leadership", description: "Board of Directors and Patron" },
            { label: "Volunteers & Team", href: "/team", description: "The people running the Chapter" },
        ],
    },
    { label: "Membership", href: "/membership" },
    {
        label: "Events",
        children: [
            { label: "Events Calendar", href: "/events", description: "Upcoming and past Chapter events" },
            { label: "Gallery", href: "/gallery", description: "Photographs from our events" },
        ],
    },
    { label: "Scholarships", href: "/scholarships" },
    { label: "Communication", href: "/communication" },
    { label: "Donate", href: "/donate" },
    {
        label: "Resources",
        children: [
            { label: "Resources", href: "/resources", description: "Learning, mentorship and careers" },
            { label: "FAQ", href: "/faq", description: "Answers to common questions" },
        ],
    },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    // Navigating closes the drawer and any open dropdown. Done on click rather
    // than in an effect on `pathname`, which would cascade an extra render.
    const closeAll = useCallback(() => {
        setMenuOpen(false);
        setOpenDropdown(null);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Escape closes, and a click outside dismisses an open dropdown.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setOpenDropdown(null);
            setMenuOpen(false);
        };
        const onClick = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
        };
        window.addEventListener("keydown", onKey);
        document.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.removeEventListener("click", onClick);
        };
    }, []);

    // The mobile drawer is a full-screen overlay, so stop the page behind it scrolling.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isActive = (item: NavItem) =>
        item.href
            ? pathname === item.href
            : Boolean(item.children?.some((c) => pathname === c.href));

    return (
        <nav
            ref={navRef}
            className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
        >
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} aria-label="WAI Kenya Chapter — home" onClick={closeAll}>
                    <Image
                        src="/images/logo.png"
                        alt=""
                        width={52}
                        height={52}
                        className={styles.logoImg}
                        priority
                    />
                    <span className={styles.logoText}>
                        WAI <span className={styles.logoAccent}>Kenya</span>
                    </span>
                </Link>

                <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
                    {NAV.map((item) =>
                        item.children ? (
                            <div
                                key={item.label}
                                className={styles.dropdown}
                                onMouseEnter={() => setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button
                                    type="button"
                                    className={`${styles.link} ${styles.dropdownToggle} ${isActive(item) ? styles.active : ""}`}
                                    aria-expanded={openDropdown === item.label}
                                    onClick={() =>
                                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                                    }
                                >
                                    {item.label}
                                    <ChevronDown
                                        size={14}
                                        strokeWidth={2.5}
                                        className={`${styles.chevron} ${openDropdown === item.label ? styles.chevronOpen : ""}`}
                                    />
                                </button>

                                <div
                                    className={`${styles.menu} ${openDropdown === item.label ? styles.menuOpen2 : ""}`}
                                >
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className={`${styles.menuItem} ${pathname === child.href ? styles.menuItemActive : ""}`}
                                            onClick={closeAll}
                                        >
                                            <span className={styles.menuItemLabel}>{child.label}</span>
                                            {child.description && (
                                                <span className={styles.menuItemDesc}>{child.description}</span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href!}
                                className={`${styles.link} ${isActive(item) ? styles.active : ""}`}
                                onClick={closeAll}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}

                    <Link href="/membership" className={styles.cta} onClick={closeAll}>
                        Join WAI
                    </Link>
                </div>

                <button
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <span className={menuOpen ? styles.burgerTop : ""} />
                    <span className={menuOpen ? styles.burgerMid : ""} />
                    <span className={menuOpen ? styles.burgerBot : ""} />
                </button>
            </div>
        </nav>
    );
}
