"use client";

import { useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";

export type FaqItem = {
    q: string;
    a: string;
    link?: { label: string; href: string };
};

export default function FaqAccordion({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div className="faq-list">
            {items.map((item, i) => {
                const isOpen = open === i;
                const panelId = `${idPrefix}-panel-${i}`;
                const buttonId = `${idPrefix}-button-${i}`;

                return (
                    <div key={item.q} className={`faq-item ${isOpen ? "faq-item-open" : ""}`}>
                        <h3 style={{ margin: 0 }}>
                            <button
                                type="button"
                                id={buttonId}
                                className="faq-question"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpen(isOpen ? null : i)}
                            >
                                <span>{item.q}</span>
                                <Plus
                                    size={18}
                                    strokeWidth={2.5}
                                    className={`faq-icon ${isOpen ? "faq-icon-open" : ""}`}
                                />
                            </button>
                        </h3>

                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className="faq-answer"
                            hidden={!isOpen}
                        >
                            <p>{item.a}</p>
                            {item.link && (
                                <a
                                    href={item.link.href}
                                    target={item.link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="faq-link"
                                >
                                    {item.link.label}
                                    <ArrowUpRight size={14} strokeWidth={2.5} />
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}

            <style>{`
                .faq-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .faq-item {
                    background: var(--white);
                    border: 1px solid #e4e9ec;
                    border-radius: 6px;
                    overflow: hidden;
                    transition: border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .faq-item-open {
                    border-color: rgba(26,107,124,0.35);
                    box-shadow: 0 8px 28px rgba(8,46,58,0.08);
                }
                .faq-question {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.25rem;
                    padding: 1.35rem 1.6rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--teal-deep);
                    line-height: 1.5;
                }
                .faq-question:hover { color: var(--teal); }
                .faq-icon {
                    flex-shrink: 0;
                    color: var(--teal);
                    transition: transform 0.25s ease;
                }
                .faq-icon-open { transform: rotate(45deg); }
                .faq-answer {
                    padding: 0 1.6rem 1.5rem;
                }
                .faq-answer p {
                    color: var(--text-body);
                    line-height: 1.8;
                    font-size: 0.95rem;
                }
                .faq-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    margin-top: 1rem;
                    font-size: 0.84rem;
                    font-weight: 800;
                    color: var(--teal);
                    border-bottom: 2px solid rgba(26,107,124,0.25);
                    padding-bottom: 2px;
                    transition: border-color 0.2s ease;
                }
                .faq-link:hover { border-color: var(--gold); }
                @media (max-width: 600px) {
                    .faq-question { padding: 1.15rem 1.1rem; font-size: 0.94rem; }
                    .faq-answer { padding: 0 1.1rem 1.25rem; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .faq-item, .faq-icon, .faq-link { transition: none; }
                }
            `}</style>
        </div>
    );
}
