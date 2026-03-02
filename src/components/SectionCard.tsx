import Link from "next/link";
import styles from "./SectionCard.module.css";

interface SectionCardProps {
    icon: string;
    title: string;
    content: string;
    linkHref?: string;
    linkLabel?: string;
}

export default function SectionCard({ icon, title, content, linkHref, linkLabel }: SectionCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.content}>{content}</p>
            {linkHref && (
                <Link href={linkHref} className={styles.link}>
                    {linkLabel || "Learn more"}
                </Link>
            )}
        </div>
    );
}
