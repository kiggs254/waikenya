"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSlider.module.css";

const slides = [
    {
        label: "Women in Aviation International – Kenya Chapter",
        title: "Empowering Women Across Every Aviation Career",
        desc: "We are a nonprofit dedicated to the advancement of women in all aviation fields — from cockpits to control towers, from engineering bays to boardrooms.",
        img: "/images/hero_bg.png",
        cta: { text: "Learn More", href: "#about" },
        cta2: { text: "Join Us", href: "/join" },
    },
    {
        label: "Our Pilots. Our Pride.",
        title: "Inspiring the Next Generation of Kenyan Aviators",
        desc: "Our members are astronauts, corporate pilots, air traffic controllers, educators and students — a community that spans the entire spectrum of flight.",
        img: "/images/pilot_kenya.png",
        cta: { text: "Our Programs", href: "#programs" },
        cta2: { text: "Membership Benefits", href: "#membership" },
    },
    {
        label: "Girls in Aviation Day",
        title: "Turning Young Dreamers Into Tomorrow's Pilots",
        desc: "Our flagship outreach program for girls aged 8 to 17 provides hands-on aviation experiences that spark a lifelong passion for the skies.",
        img: "/images/girls_aviation.png",
        cta: { text: "Girls in Aviation", href: "#programs" },
        cta2: { text: "Upcoming Events", href: "#events" },
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setProgress(0);
    }, []);

    const prev = () => {
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
        setProgress(0);
    };

    // Auto-play with 5s interval
    useEffect(() => {
        setProgress(0);
        const timer = setTimeout(next, 5000);
        const prog = setTimeout(() => setProgress(100), 50);
        return () => { clearTimeout(timer); clearTimeout(prog); };
    }, [current, next]);

    return (
        <section className={styles.hero}>
            <div
                className={styles.track}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, i) => (
                    <div key={i} className={styles.slide}>
                        <div className={styles.bg}>
                            <Image src={slide.img} alt={slide.title} fill priority={i === 0} />
                        </div>
                        <div className={styles.overlay} />
                        <div className={styles.content}>
                            <span className={styles.label}>{slide.label}</span>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <p className={styles.desc}>{slide.desc}</p>
                            <div className={styles.actions}>
                                <Link href={slide.cta.href} className="btn-primary">{slide.cta.text} →</Link>
                                <Link href={slide.cta2.href} className="btn-outline">{slide.cta2.text}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className={styles.progress} style={{ width: `${progress}%` }} />

            {/* Arrow Controls */}
            <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">&#8592;</button>
            <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={next} aria-label="Next">&#8594;</button>

            {/* Dot Controls */}
            <div className={styles.controls}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === current ? styles.active : ""}`}
                        onClick={() => { setCurrent(i); setProgress(0); }}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
