"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * A labelled bank detail with a copy button — donors are usually on a phone,
 * typing an account number into a banking app.
 */
export default function CopyField({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false);
    const [failed, setFailed] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setFailed(false);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard is blocked (insecure context, or permission denied) —
            // say so rather than showing a success state that never happened.
            setFailed(true);
            setTimeout(() => setFailed(false), 2500);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1.05rem 1.25rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
            }}
        >
            <div style={{ minWidth: 0 }}>
                <p
                    style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "1.8px",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: "0.3rem",
                    }}
                >
                    {label}
                </p>
                <p
                    style={{
                        fontSize: "1.02rem",
                        fontWeight: 700,
                        color: "white",
                        wordBreak: "break-word",
                        lineHeight: 1.4,
                    }}
                >
                    {value}
                </p>
            </div>

            <button
                type="button"
                onClick={copy}
                aria-label={`Copy ${label}`}
                style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    background: copied ? "var(--gold)" : "rgba(255,255,255,0.12)",
                    color: copied ? "var(--teal-deep)" : "white",
                    border: "none",
                    borderRadius: 4,
                    padding: "0.55rem 0.9rem",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    fontFamily: "inherit",
                }}
            >
                {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.4} />}
                {copied ? "Copied" : failed ? "Copy failed" : "Copy"}
            </button>
        </div>
    );
}
