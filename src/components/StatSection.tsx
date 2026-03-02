import styles from "./StatSection.module.css";

const stats = [
    { value: "500+", label: "Active Members" },
    { value: "15", label: "Annual Scholarships" },
    { value: "40+", label: "Industry Partners" },
    { value: "10", label: "Regional Events" }
];

export default function StatSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
