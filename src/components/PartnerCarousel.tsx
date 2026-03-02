"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Partner = {
    name: string;
    logoUrl: string;
    websiteUrl?: string;
};

// Default fallback partners if WP array is empty (or before it's wired)
// Normally, you would fetch these from /wp-json/wp/v2/wai_partner in a real data-fetching layer
const defaultPartners: Partner[] = [
    { name: "Kenya Airways", logoUrl: "/images/partners/kq.png" },
    { name: "Safaricom", logoUrl: "/images/partners/safaricom.png" },
    { name: "KCAA", logoUrl: "/images/partners/kcaa.png" },
    { name: "Boeing", logoUrl: "/images/partners/boeing.png" },
    { name: "Airbus", logoUrl: "/images/partners/airbus.png" },
    { name: "Tradewinds Aviation Services", logoUrl: "/images/partners/tradewinds.png" },
];

export default function PartnerCarousel({ partners = defaultPartners }: { partners?: Partner[] }) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }
    }, []);

    function addAnimation() {
        if (scrollerRef.current && scrollerRef.current.getAttribute("data-animated") !== "true") {
            scrollerRef.current.setAttribute("data-animated", "true");
            const scrollerInner = scrollerRef.current.querySelector(".scroller-inner");

            if (scrollerInner) {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true) as HTMLElement;
                    duplicatedItem.setAttribute("aria-hidden", "true");
                    scrollerInner.appendChild(duplicatedItem);
                });
            }
        }
    }

    return (
        <section style={{ padding: "5rem 0", background: "white", overflow: "hidden" }}>
            <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        color: "var(--teal)",
                        marginBottom: "0.75rem",
                    }}
                >
                    Our Partners & Affiliates
                </p>
                <h2
                    style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "var(--teal-deep)",
                        letterSpacing: "-1px",
                    }}
                >
                    Trusted by Industry Leaders
                </h2>
            </div>

            <div
                ref={scrollerRef}
                className="scroller"
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    WebkitMask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
                    mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
                }}
            >
                <ul
                    className="scroller-inner"
                    style={{
                        paddingBlock: "1rem",
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "4rem",
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        alignItems: "center",
                    }}
                >
                    {partners.map((p, i) => (
                        <li key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {/* Fallback styling for when actual logo images aren't present locally yet */}
                            <div
                                style={{
                                    width: 160,
                                    height: 80,
                                    background: "rgba(8, 46, 58, 0.03)",
                                    border: "1px solid rgba(8, 46, 58, 0.06)",
                                    borderRadius: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "1rem",
                                    position: "relative",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {/* 
                                   Here one would render <Image src={p.logoUrl} .../>.
                                   Since we don't have the partner logo files generated yet locally,
                                   we'll render a beautiful text placeholder instead for now. 
                                */}
                                <span style={{ fontWeight: 800, color: "var(--teal-deep)", opacity: 0.8, fontSize: "0.95rem", textAlign: "center", lineHeight: 1.2 }}>
                                    {p.name}
                                </span>
                                {p.websiteUrl && (
                                    <a
                                        href={p.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ position: "absolute", inset: 0 }}
                                        aria-label={`Visit ${p.name}`}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <style>{`
                .scroller[data-animated="true"] {
                    overflow: hidden;
                }
                .scroller[data-animated="true"] .scroller-inner {
                    width: max-content;
                    animation: scroll 40s linear infinite;
                }
                .scroller-inner:hover {
                    animation-play-state: paused;
                }
                @keyframes scroll {
                    to {
                        transform: translate(calc(-50% - 2rem));
                    }
                }
            `}</style>
        </section>
    );
}
