import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Background Radar Effect */}
            <div className={styles.radar} />

            {/* Technical Aviation Metadata */}
            <div className={`${styles.techData} ${styles.topLeft}`}>
                FLIGHT PATH: HKJK &gt;&gt; GLOBAL<br />
                LAT: 1.3191° S | LON: 36.9275° E<br />
                ALT: 5327 FT (MSL)
            </div>

            <div className={`${styles.techData} ${styles.bottomRight}`}>
                STATUS: CLEAR FOR TAKEOFF<br />
                VISION: 99.9% CLARITY<br />
                FUEL: 100% AMBITION
            </div>

            {/* Cinematic Image Frame */}
            <div className={styles.frameContainer}>
                <div className={styles.frame}>
                    <Image
                        src="/images/hero_bg.png"
                        alt="Aviation Horizon"
                        fill
                        priority
                        className={styles.image}
                    />
                </div>
            </div>

            {/* Layered Content Overlay */}
            <div className={styles.content}>
                <div className={styles.textWrapper}>
                    <h1 className={styles.title}>
                        BEYOND the <br />
                        <span className="textGold">HORIZON.</span>
                    </h1>
                    <p className={styles.description}>
                        The WAI Kenya Chapter is redefining the future of flight. Linking elite professionals with the next generation of pioneers.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/join" className={styles.primary}>Join the Fleet</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
