import Image from "next/image";
import styles from "./ValueCircle.module.css";

const values = [
    {
        title: "Safety First",
        description: "Upholding the highest standards of safety and operational excellence in everything we do.",
        class: styles.p1
    },
    {
        title: "Global Community",
        description: "Fostering a diverse and inclusive network that spans the entire aviation industry.",
        class: styles.p2
    },
    {
        title: "Future Ready",
        description: "Preparing the next generation for the evolving landscape of aerospace technology.",
        class: styles.p3
    },
    {
        title: "Elite Mentorship",
        description: "Direct connection to industry pioneers who have blazed the trail before us.",
        class: styles.p4
    }
];

export default function ValueCircle() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Excellence in <span className="textGold">Aviation</span> Safety</h2>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.circle}></div>
                    <div className={styles.airplane}>
                        <Image
                            src="/images/plane_top.png"
                            alt="Private Jet Top View"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    {values.map((val, index) => (
                        <div key={index} className={`${styles.point} ${val.class}`}>
                            <h4>{val.title}</h4>
                            <p>{val.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
