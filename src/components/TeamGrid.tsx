"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export type TeamMember = {
    name: string;
    role: string;
    shortBio: string;
    bio: string[];
    image: string;
    tag?: string;
};

export default function TeamGrid({ members }: { members: TeamMember[] }) {
    const [active, setActive] = useState<TeamMember | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [active]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <>
            {/* ── GRID ── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "2rem",
                }}
            >
                {members.map((m) => (
                    <div
                        key={m.name}
                        onClick={() => setActive(m)}
                        style={{
                            background: "white",
                            borderRadius: 4,
                            overflow: "hidden",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                            cursor: "pointer",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            border: "1px solid #edf0f3",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(26,107,124,0.18)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
                        }}
                    >
                        {/* Photo */}
                        <div style={{ position: "relative", height: 280, overflow: "hidden", background: "var(--teal-deep)" }}>
                            <Image
                                src={m.image}
                                alt={m.name}
                                fill
                                style={{ objectFit: "cover", objectPosition: "top" }}
                                sizes="320px"
                            />
                            {/* Gold overlay on hover handled via parent */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(8,46,58,0.7) 0%, transparent 50%)",
                                }}
                            />
                            {/* Role badge */}
                            {m.tag && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "1rem",
                                        left: "1rem",
                                        background: "var(--gold)",
                                        color: "var(--teal-deep)",
                                        fontSize: "0.65rem",
                                        fontWeight: 800,
                                        letterSpacing: "1.5px",
                                        textTransform: "uppercase",
                                        padding: "0.3rem 0.75rem",
                                        borderRadius: "100px",
                                    }}
                                >
                                    {m.tag}
                                </span>
                            )}
                        </div>

                        {/* Info */}
                        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <p
                                style={{
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    color: "var(--teal)",
                                }}
                            >
                                {m.role}
                            </p>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--teal-deep)", lineHeight: 1.3 }}>
                                {m.name}
                            </h3>
                            <p style={{ fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.65, flex: 1 }}>
                                {m.shortBio}
                            </p>
                            <button
                                style={{
                                    marginTop: "1rem",
                                    alignSelf: "flex-start",
                                    background: "none",
                                    border: "1.5px solid var(--teal)",
                                    color: "var(--teal)",
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    padding: "0.5rem 1.25rem",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget).style.background = "var(--teal)";
                                    (e.currentTarget).style.color = "white";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget).style.background = "none";
                                    (e.currentTarget).style.color = "var(--teal)";
                                }}
                            >
                                Read Story →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── MODAL ── */}
            {active && (
                <div
                    onClick={() => setActive(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "rgba(8,30,40,0.75)",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2rem",
                        animation: "fadeIn 0.25s ease",
                    }}
                >
                    <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>

                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: "white",
                            borderRadius: 6,
                            maxWidth: 780,
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            position: "relative",
                            animation: "slideUp 0.3s ease",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setActive(null)}
                            aria-label="Close"
                            style={{
                                position: "absolute",
                                top: "1.25rem",
                                right: "1.25rem",
                                width: 36,
                                height: 36,
                                background: "rgba(8,46,58,0.08)",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--teal-deep)",
                                zIndex: 10,
                                transition: "background 0.2s",
                            }}
                        >
                            <X size={18} strokeWidth={2} />
                        </button>

                        {/* Header section */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "200px 1fr",
                                gap: 0,
                            }}
                        >
                            {/* Photo */}
                            <div style={{ position: "relative", minHeight: 240, background: "var(--teal-deep)" }}>
                                <Image
                                    src={active.image}
                                    alt={active.name}
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                    sizes="200px"
                                />
                            </div>

                            {/* Name + role */}
                            <div
                                style={{
                                    background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                                    padding: "2.5rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "3px",
                                        color: "var(--gold)",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {active.role}
                                </p>
                                <h2
                                    style={{
                                        fontSize: "1.8rem",
                                        fontWeight: 900,
                                        color: "white",
                                        letterSpacing: "-0.5px",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {active.name}
                                </h2>
                            </div>
                        </div>

                        {/* Bio */}
                        <div style={{ padding: "2.5rem" }}>
                            {active.bio.map((para, i) => (
                                <p
                                    key={i}
                                    style={{
                                        color: "var(--text-body)",
                                        lineHeight: 1.85,
                                        marginBottom: "1.15rem",
                                        fontSize: "0.97rem",
                                    }}
                                >
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
