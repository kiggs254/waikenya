import Image from "next/image";
import Link from "next/link";
import styles from "./NewsSection.module.css";

const news = [
    {
        tag: "Programs",
        title: "Girls in Aviation Day 2026: Inspiring the Next Generation",
        image: "/images/youth.png"
    },
    {
        tag: "Mentorship",
        title: "Breaking Barriers: A New Era of Mentorship in Kenyan Skies",
        image: "/images/mentorship.png"
    }
];

export default function NewsSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <span className="textGold" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Latest News</span>
                        <h2>News & <span className="textGold">Updates</span></h2>
                    </div>
                    <Link href="/news" className={styles.link}>View All Articles</Link>
                </div>
                <div className={styles.grid}>
                    {news.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.tag}>{item.tag}</span>
                                <h3>{item.title}</h3>
                                <Link href="#" className={styles.link}>Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
