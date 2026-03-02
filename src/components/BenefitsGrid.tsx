import { Gem, Award, Globe, Plane } from "lucide-react";
import styles from "./BenefitsGrid.module.css";

const benefits = [
    {
        Icon: Gem,
        title: "Elite Mentorship",
        description: "One-on-one guidance from seasoned pilots, engineers, and executives in the Kenyan aviation landscape."
    },
    {
        Icon: Award,
        title: "Prestigious Scholarships",
        description: "Exclusive access to flight training and academic scholarships for aspiring female aviators."
    },
    {
        Icon: Globe,
        title: "Global Network",
        description: "Connect with over 15,000 WAI members worldwide and attend international conferences."
    },
    {
        Icon: Plane,
        title: "Career Advancement",
        description: "Priority notifications for job openings and professional development workshops tailored to your goals."
    }
];

export default function BenefitsGrid() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Why Choose <span className="textGold">WAI Kenya</span>?</h2>
                </div>
                <div className={styles.grid}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>
                                <benefit.Icon size={28} strokeWidth={1.75} />
                            </div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
