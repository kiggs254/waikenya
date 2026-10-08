"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Linkedin, ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./ProfileGrid.module.css";

export type Profile = {
    name: string;
    role: string;
    bio: string[];
    image: string;
    company?: string;
    linkedinUrl?: string;
};

/**
 * Photograph → Name → Position → View Profile, with the full profile in a
 * modal. Shared by the Leadership and Volunteers pages so both read as one
 * system, which is what the Chapter asked for.
 */
export default function ProfileGrid({
    members,
    accent = "teal",
}: {
    members: Profile[];
    accent?: "teal" | "gold";
}) {
    const [active, setActive] = useState<Profile | null>(null);
    const close = useCallback(() => setActive(null), []);

    useEffect(() => {
        document.body.style.overflow = active ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [active]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [close]);

    if (members.length === 0) return null;

    return (
        <>
            <div className={styles.grid}>
                {members.map((m) => (
                    <button
                        key={m.name}
                        type="button"
                        className={`${styles.card} ${accent === "gold" ? styles.cardGold : ""}`}
                        onClick={() => setActive(m)}
                        aria-label={`View ${m.name}'s profile`}
                    >
                        <div className={styles.photoWrap}>
                            <Image
                                src={m.image}
                                alt={m.name}
                                fill
                                className={styles.photo}
                                sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 300px"
                            />
                            <span className={styles.photoScrim} aria-hidden="true" />
                        </div>

                        <div className={styles.body}>
                            <h3 className={styles.name}>{m.name}</h3>
                            <p className={styles.role}>{m.role}</p>
                            {m.company && <p className={styles.company}>{m.company}</p>}
                            <span className={styles.viewProfile}>
                                View Profile
                                <ArrowRight size={14} strokeWidth={2.5} />
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {active && (
                <div
                    className={styles.overlay}
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${active.name} profile`}
                >
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button onClick={close} aria-label="Close profile" className={styles.close}>
                            <X size={18} strokeWidth={2.5} />
                        </button>

                        <div className={styles.modalHeader}>
                            <div className={styles.modalPhoto}>
                                <Image
                                    src={active.image}
                                    alt={active.name}
                                    fill
                                    className={styles.photo}
                                    sizes="240px"
                                />
                            </div>
                            <div className={styles.modalIntro}>
                                <p className={styles.modalRole}>{active.role}</p>
                                <h2 className={styles.modalName}>{active.name}</h2>
                                {active.company && <p className={styles.modalCompany}>{active.company}</p>}
                                {active.linkedinUrl && (
                                    <a
                                        href={active.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkedin}
                                    >
                                        <Linkedin size={15} strokeWidth={2.2} />
                                        Connect on LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            {active.bio.length > 0 ? (
                                active.bio.map((para, i) => <p key={i}>{para}</p>)
                            ) : (
                                <p className={styles.noBio}>
                                    A full profile for {active.name} is coming soon.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
