import styles from "./PageHero.module.css";

/**
 * The banner every interior page opens with. One component so headings,
 * spacing and the aviation motif stay identical across the site.
 */
export default function PageHero({
    eyebrow,
    title,
    lead,
    children,
}: {
    eyebrow: string;
    title: React.ReactNode;
    lead?: string;
    children?: React.ReactNode;
}) {
    return (
        <section className={styles.hero}>
            {/* Decorative flight-path rings */}
            <span className={styles.rings} aria-hidden="true">
                <span /><span /><span />
            </span>

            <div className={`container ${styles.inner}`}>
                <p className={styles.eyebrow}>{eyebrow}</p>
                <h1 className={styles.title}>{title}</h1>
                {lead && <p className={styles.lead}>{lead}</p>}
                {children && <div className={styles.actions}>{children}</div>}
            </div>
        </section>
    );
}
