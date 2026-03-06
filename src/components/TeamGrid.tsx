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
    linkedinUrl?: string;
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
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
                                <button
                                    style={{
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
                                {m.linkedinUrl && (
                                    <a
                                        href={m.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        aria-label={`${m.name} on LinkedIn`}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: 36, height: 36, borderRadius: "50%",
                                            background: "#0077b5", color: "white",
                                            flexShrink: 0, transition: "opacity 0.2s",
                                        }}
                                        onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
                                        onMouseOut={e => (e.currentTarget.style.opacity = "1")}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
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
                            className="grid-sidebar"
                            style={{
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
                                        marginBottom: active.linkedinUrl ? "1.25rem" : 0,
                                    }}
                                >
                                    {active.name}
                                </h2>
                                {active.linkedinUrl && (
                                    <a
                                        href={active.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                            background: "#0077b5", color: "white",
                                            padding: "0.5rem 1.1rem", borderRadius: 4,
                                            fontSize: "0.8rem", fontWeight: 700, textDecoration: "none",
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        Connect on LinkedIn
                                    </a>
                                )}
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
