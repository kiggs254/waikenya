"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
    id: number;
    title: string;
    imageUrl: string;
    caption?: string;
};

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const open = (i: number) => setLightboxIndex(i);
    const close = () => setLightboxIndex(null);

    const prev = useCallback(() => {
        setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
    }, [images.length]);

    const next = useCallback(() => {
        setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxIndex, prev, next]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [lightboxIndex]);

    const activeImage = lightboxIndex !== null ? images[lightboxIndex] : null;

    return (
        <>
            {/* ── Masonry Grid ── */}
            <div style={{ columns: "3 280px", columnGap: "1.25rem" }}>
                {images.map((img, i) => (
                    <div
                        key={img.id}
                        className="gallery-item"
                        onClick={() => open(i)}
                        style={{
                            breakInside: "avoid",
                            marginBottom: "1.25rem",
                            borderRadius: 8,
                            overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            background: "white",
                            cursor: "zoom-in",
                            position: "relative",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img.imageUrl}
                            alt={img.title || "Gallery image"}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                transition: "transform 0.4s ease",
                            }}
                        />
                        {/* Caption overlay */}
                        {(img.title || img.caption) && (
                            <div
                                className="gallery-overlay"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    padding: "1.25rem",
                                }}
                            >
                                {img.title && (
                                    <p style={{ color: "white", fontWeight: 700, fontSize: "0.9rem", marginBottom: img.caption ? "0.25rem" : 0 }}>
                                        {img.title}
                                    </p>
                                )}
                                {img.caption && (
                                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                                        {img.caption}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ── Lightbox ── */}
            {activeImage && (
                <div
                    onClick={close}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "rgba(0,0,0,0.92)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1.5rem",
                        backdropFilter: "blur(6px)",
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={close}
                        aria-label="Close"
                        style={{
                            position: "absolute", top: "1.25rem", right: "1.25rem",
                            background: "rgba(255,255,255,0.12)", border: "none",
                            borderRadius: "50%", width: 44, height: 44,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "white",
                            transition: "background 0.2s",
                            zIndex: 2,
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    >
                        <X size={22} />
                    </button>

                    {/* Prev arrow */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="Previous image"
                        style={{
                            position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                            background: "rgba(255,255,255,0.12)", border: "none",
                            borderRadius: "50%", width: 52, height: 52,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "white",
                            transition: "background 0.2s",
                            zIndex: 2,
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Image */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={activeImage.imageUrl}
                            src={activeImage.imageUrl}
                            alt={activeImage.title || "Gallery image"}
                            style={{
                                maxWidth: "90vw",
                                maxHeight: "80vh",
                                objectFit: "contain",
                                borderRadius: 6,
                                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                                animation: "slideIn 0.2s ease",
                            }}
                        />
                        {/* Caption + counter */}
                        <div style={{ textAlign: "center" }}>
                            {activeImage.title && (
                                <p style={{ color: "white", fontWeight: 700, fontSize: "1rem", marginBottom: "0.3rem" }}>
                                    {activeImage.title}
                                </p>
                            )}
                            {activeImage.caption && (
                                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                                    {activeImage.caption}
                                </p>
                            )}
                            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", letterSpacing: "1px" }}>
                                {(lightboxIndex ?? 0) + 1} / {images.length}
                            </p>
                        </div>
                    </div>

                    {/* Next arrow */}
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="Next image"
                        style={{
                            position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                            background: "rgba(255,255,255,0.12)", border: "none",
                            borderRadius: "50%", width: 52, height: 52,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "white",
                            transition: "background 0.2s",
                            zIndex: 2,
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            )}

            {/* Lightbox animations */}
            <style>{`
                @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
                .gallery-item img { transition: transform 0.35s ease; }
                .gallery-item:hover img { transform: scale(1.03); }
                .gallery-overlay { opacity: 0; transition: opacity 0.3s ease; }
                .gallery-item:hover .gallery-overlay { opacity: 1; }
            `}</style>
        </>
    );
}
