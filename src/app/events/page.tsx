import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MapPin, Calendar, CheckCheck, Users, Globe, Ticket } from "lucide-react";

export const metadata: Metadata = {
    title: "Events | WAI Kenya Chapter",
    description:
        "Explore past and upcoming events from Women in Aviation International – Kenya Chapter, including Girls in Aviation Day and the Annual WAI Conference.",
};

type Event = {
    id: string;
    title: string;
    hashtags?: string[];
    date: string;
    venue: string;
    category: "Girls in Aviation" | "Conference" | "Outreach";
    edition?: string;
    description: string[];
    highlights?: string[];
    link?: string;
    past: boolean;
};

const fallbackEvents: Event[] = [
    {
        id: "giad-2021",
        title: "Girls in Aviation Day 2021",
        hashtags: ["#GIAD2021", "#mentorshipmatters"],
        date: "Saturday, 20 November 2021",
        venue: "Astral Aerial Aviation, Kenya",
        category: "Girls in Aviation",
        edition: "7th Annual",
        description: [
            "The 2021 Girls in Aviation Day brought together young girls from across Kenya for a day of inspiration, exploration, and mentorship under the powerful theme #MentorshipMatters.",
            "You won't want to miss the inspiring keynote speakers, professional development seminars, education sessions, exhibit hall, scholarship awards, and good times with individuals from all areas of aviation. There's no better place to be inspired.",
        ],
        highlights: [
            "Keynote speakers",
            "Mentorship sessions",
            "Scholarship awards",
            "Exhibit hall",
            "Professional seminars",
        ],
        past: true,
    },
    {
        id: "wai-conference-2021",
        title: "32nd Annual International Women in Aviation Conference",
        hashtags: ["#WAIcon2021"],
        date: "Thursday 11 March – Saturday 13 March 2021",
        venue: "Reno-Sparks Convention Center, Reno, Nevada, USA",
        category: "Conference",
        edition: "32nd Annual",
        description: [
            "Save the dates for the 32nd Annual International Women in Aviation Conference, March 11–13, 2021, at the Reno-Sparks Convention Center in Reno, Nevada.",
            "You won't want to miss the inspiring keynote speakers, professional development seminars, education sessions, exhibit hall, scholarship awards, and good times with individuals from all areas of aviation. There's no better place to be inspired.",
        ],
        highlights: [
            "Keynote speakers",
            "Professional development seminars",
            "Education sessions",
            "Exhibit hall",
            "Scholarship awards",
        ],
        past: true,
    },
    {
        id: "giad-2020",
        title: "Girls in Aviation Day 2020",
        hashtags: ["#GIAD2020"],
        date: "Saturday, 26 September 2020",
        venue: "Digital — Aviation for Girls App (Worldwide)",
        category: "Girls in Aviation",
        edition: "6th Annual",
        description: [
            "The sixth annual international Girls in Aviation Day was scheduled for September 26, 2020.",
            "Thousands of girls, ages 8–17 around the world, were able to experience the Sixth Annual Girls in Aviation Day through a new and exclusive Aviation for Girls App — taking the celebration global in a uniquely digital format.",
        ],
        highlights: [
            "Aviation for Girls App",
            "Virtual experience",
            "Global participation",
            "Girls aged 8–17",
        ],
        past: true,
    },
];

async function getEvents(): Promise<Event[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return fallbackEvents;

    try {
        const res = await fetch(`${baseUrl}/wai_event?_embed&per_page=100`, { next: { revalidate: 60 } });
        if (!res.ok) return fallbackEvents;
        const data = await res.json();

        return data.map((item: any) => {
            const rawHtml = item.content?.rendered || "";
            const paragraphs = rawHtml.split('</p>')
                .map((p: string) => p.replace(/<[^>]+>/g, '').trim())
                .filter(Boolean);

            return {
                id: item.slug || String(item.id),
                title: item.title?.rendered || "Event",
                hashtags: item.meta?.hashtags ? item.meta.hashtags.split(',').map((h: string) => h.trim()) : [],
                date: item.meta?.event_date || "", // Will now come as YYYY-MM-DD
                venue: item.meta?.venue || "",
                category: item.meta?.category as "Girls in Aviation" | "Conference" | "Outreach",
                edition: item.meta?.edition || "",
                description: paragraphs,
                highlights: item.meta?.highlights ? item.meta.highlights.split(',').map((h: string) => h.trim()) : [],
                link: item.meta?.external_url || "",
                past: false, // Calculated later
            };
        });
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return fallbackEvents;
    }
}

const categoryColor: Record<Event["category"], string> = {
    "Girls in Aviation": "var(--teal)",
    "Conference": "var(--gold)",
    "Outreach": "#7c5cbf",
};

const categoryBg: Record<Event["category"], string> = {
    "Girls in Aviation": "rgba(26,107,124,0.08)",
    "Conference": "rgba(212,176,89,0.12)",
    "Outreach": "rgba(124,92,191,0.1)",
};

type ProcessedEvent = Event & { past: boolean; dateDisplay: string };

function EventCard({ event, index, isUpcoming = false }: { event: ProcessedEvent, index: number, isUpcoming?: boolean }) {
    return (
        <div
            className="grid-sidebar"
            style={{
                gap: 0,
                background: "white",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
                border: "1px solid #edf0f3",
            }}
        >
            {/* Left — date panel */}
            <div
                style={{
                    background: isUpcoming
                        ? "linear-gradient(160deg, var(--gold), #dcb95e)"
                        : index === 0
                            ? "linear-gradient(160deg, var(--teal-deep), var(--teal))"
                            : index === 1
                                ? "linear-gradient(160deg, #1a2a4a, #2a4a7a)"
                                : "linear-gradient(160deg, var(--teal), #1a8a9a)",
                    padding: "2.5rem 1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    color: isUpcoming ? "var(--teal-deep)" : "white",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background circle decoration */}
                <div style={{
                    position: "absolute", width: 140, height: 140, borderRadius: "50%",
                    background: isUpcoming ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)", bottom: -40, right: -40,
                    pointerEvents: "none",
                }} />

                {/* Category badge */}
                <span style={{
                    background: isUpcoming ? "var(--teal-deep)" : categoryColor[event.category],
                    color: isUpcoming ? "var(--gold)" : "white",
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.7rem",
                    borderRadius: "100px",
                    alignSelf: "flex-start",
                    marginBottom: "1.25rem",
                }}>
                    {event.category}
                </span>

                {/* Date */}
                <div>
                    {event.edition && (
                        <p style={{
                            fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "1.5px", color: isUpcoming ? "var(--teal-deep)" : "var(--gold)", marginBottom: "0.5rem",
                        }}>
                            {event.edition}
                        </p>
                    )}
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.6, opacity: 0.9 }}>
                        {event.dateDisplay}
                    </p>
                </div>

                {/* Status badge */}
                <span style={{
                    marginTop: "1.25rem",
                    fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "1.5px", color: isUpcoming ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)",
                    borderTop: isUpcoming ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)",
                    paddingTop: "1rem",
                }}>
                    {isUpcoming ? (
                        <><Calendar size={13} style={{ display: "inline", marginRight: 4, verticalAlign: "middle", position: "relative", top: -1 }} /> Upcoming</>
                    ) : (
                        <><CheckCheck size={13} style={{ display: "inline", marginRight: 4, verticalAlign: "middle", position: "relative", top: -1 }} /> Past Event</>
                    )}
                </span>
            </div>

            {/* Right — content */}
            <div style={{ padding: "2.5rem 3rem" }}>
                {/* Hashtags */}
                {event.hashtags && event.hashtags.length > 0 && (
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                        {event.hashtags.map((tag) => (
                            <span key={tag} style={{
                                fontSize: "0.72rem", fontWeight: 700, color: categoryColor[event.category],
                                background: categoryBg[event.category],
                                padding: "0.25rem 0.7rem", borderRadius: "100px",
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <h3 style={{
                    fontSize: "1.5rem", fontWeight: 900, color: "var(--teal-deep)",
                    letterSpacing: "-0.5px", marginBottom: "0.75rem", lineHeight: 1.25,
                }}>
                    {event.title}
                </h3>

                {/* Venue */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    marginBottom: "1.5rem",
                }}>
                    <MapPin size={15} color="var(--teal)" strokeWidth={2} />
                    <p style={{
                        fontSize: "0.82rem", color: "var(--text-body)",
                        fontWeight: 600,
                    }}>
                        {event.venue}
                    </p>
                </div>

                {/* Description */}
                {event.description.map((para, i) => (
                    <p key={i} style={{
                        color: "var(--text-body)", lineHeight: 1.8, fontSize: "0.93rem",
                        marginBottom: "0.85rem",
                    }}>
                        {para}
                    </p>
                ))}

                {/* Highlights pills */}
                {event.highlights && event.highlights.length > 0 && (
                    <div style={{ marginTop: "1.5rem" }}>
                        <p style={{
                            fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "2px", color: "var(--teal)", marginBottom: "0.75rem",
                        }}>
                            Event Highlights
                        </p>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {event.highlights.map((h) => (
                                <span key={h} style={{
                                    background: "var(--off-white)",
                                    color: "var(--teal-deep)",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    padding: "0.35rem 0.9rem",
                                    borderRadius: "100px",
                                    border: "1px solid #dce8ea",
                                }}>
                                    {h}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {event.link && (
                    <div style={{ marginTop: "2rem" }}>
                        <a href={event.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                            {isUpcoming ? <Ticket size={18} /> : <Globe size={18} />}
                            {isUpcoming ? "Register Now" : "View Event Website"}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default async function EventsPage() {
    const rawEvents = await getEvents();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Format YYYY-MM-DD into a human-readable string
    const formatDate = (dateString: string) => {
        if (!dateString) return "TBD";
        // Check if it matches YYYY-MM-DD (CMS Date Picker format)
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        return dateString; // Fallback for old legacy text inputs
    };

    // Calculate Past vs Upcoming and map nice date strings
    const processedEvents = rawEvents.map(event => {
        let isPast = true;
        if (event.date) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
                // Determine using Date Object
                const eventDate = new Date(event.date);
                isPast = eventDate < today;
            } else {
                // If it's a legacy string like "Saturday, 26 September 2020", assume it's past
                isPast = true;
            }
        }
        return {
            ...event,
            past: isPast,
            dateDisplay: formatDate(event.date)
        };
    });

    const upcomingEvents = processedEvents.filter(e => !e.past).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pastEvents = processedEvents.filter(e => e.past).sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        // If legacy string logic prevents parsing, default to maintaining order
        if (isNaN(dateA) || isNaN(dateB)) return 0;
        return dateB - dateA; // Newest past events first
    });

    return (
        <>
            <Navbar />
            <main>

                {/* ── HERO ── */}
                <section
                    style={{
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        padding: "12rem 0 7rem",
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {[360, 580, 800].map((s) => (
                        <div key={s} style={{
                            position: "absolute", width: s, height: s, borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.05)",
                            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                            pointerEvents: "none",
                        }} />
                    ))}
                    <div style={{
                        position: "absolute", top: -60, right: -60, width: 280, height: 280,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(212,176,89,0.18) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    <div className="container" style={{ position: "relative", zIndex: 2 }}>
                        <p style={{
                            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "4px",
                            textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem",
                        }}>
                            ── WAI Kenya Chapter ──
                        </p>
                        <h1 style={{
                            fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900,
                            color: "white", letterSpacing: "-2px", marginBottom: "1.5rem",
                        }}>
                            Events
                        </h1>
                        <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: 540, lineHeight: 1.7 }}>
                            From Girls in Aviation Day to the International WAI Conference —
                            every event is a step towards closing the gender gap in aviation.
                        </p>

                        {/* Mini stats */}
                        <div style={{
                            display: "flex", gap: "3rem", marginTop: "3rem", flexWrap: "wrap",
                        }}>
                            {[["3", "Events Hosted"], ["1,000+", "Girls Reached"], ["2020", "Since"]].map(([n, l]) => (
                                <div key={l}>
                                    <p style={{ fontSize: "2rem", fontWeight: 900, color: "var(--gold)", letterSpacing: "-1px", marginBottom: "0.15rem" }}>{n}</p>
                                    <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", opacity: 0.65 }}>{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── UPCOMING EVENTS ── */}
                {upcomingEvents.length > 0 && (
                    <section style={{ padding: "8rem 0", background: "white" }}>
                        <div className="container">

                            {/* Section header */}
                            <div style={{ marginBottom: "5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                                    <div style={{ width: 36, height: 3, background: "var(--gold)", borderRadius: 2 }} />
                                    <p style={{
                                        fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                                        letterSpacing: "3px", color: "var(--gold)",
                                    }}>
                                        Save the Date
                                    </p>
                                </div>
                                <h2 style={{
                                    fontSize: "2.5rem", fontWeight: 800, color: "var(--teal-deep)",
                                    letterSpacing: "-1px",
                                }}>
                                    Upcoming Events
                                </h2>
                            </div>

                            {/* Timeline-style event list */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                                {upcomingEvents.map((event, index) => (
                                    <EventCard key={event.id} event={event} index={index} isUpcoming />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── PAST EVENTS ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">

                        {/* Section header */}
                        <div style={{ marginBottom: "5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                                <div style={{ width: 36, height: 3, background: "var(--teal)", borderRadius: 2 }} />
                                <p style={{
                                    fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                                    letterSpacing: "3px", color: "var(--teal)",
                                }}>
                                    Past Events
                                </p>
                            </div>
                            <h2 style={{
                                fontSize: "2.5rem", fontWeight: 800, color: "var(--teal-deep)",
                                letterSpacing: "-1px",
                            }}>
                                Our Event History
                            </h2>
                        </div>

                        {/* Timeline-style event list */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                            {pastEvents.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} />
                            ))}
                        </div>
                    </div>
                </section>


                {/* ── GIRLS IN AVIATION DAY BANNER ── */}
                < section
                    style={{
                        background: "var(--gold)",
                        padding: "6rem 0",
                    }}
                >
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "5rem",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <p style={{
                                fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                                letterSpacing: "3px", color: "var(--teal-deep)", opacity: 0.65,
                                marginBottom: "1rem",
                            }}>
                                Our Flagship Event
                            </p>
                            <h2 style={{
                                fontSize: "2.4rem", fontWeight: 900, color: "var(--teal-deep)",
                                letterSpacing: "-1px", lineHeight: 1.2, marginBottom: "1.5rem",
                            }}>
                                Girls in Aviation Day
                            </h2>
                            <p style={{
                                color: "var(--teal-deep)", lineHeight: 1.8, fontSize: "1rem",
                                opacity: 0.85, marginBottom: "2rem",
                            }}>
                                Hosted annually by WAI chapters around the world, Girls in Aviation Day
                                connects girls aged 8–17 with aviation professionals through airport tours,
                                cockpit visits, STEM activities and mentorship sessions. One day can change
                                everything.
                            </p>
                            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                <Link
                                    href="/membership"
                                    style={{
                                        background: "var(--teal-deep)", color: "white",
                                        padding: "0.9rem 2.2rem", fontWeight: 700, fontSize: "0.9rem",
                                        borderRadius: 4, display: "inline-flex", alignItems: "center",
                                        gap: "0.5rem", textDecoration: "none",
                                    }}
                                >
                                    Volunteer with Us →
                                </Link>
                                <Link
                                    href="/scholarships"
                                    style={{
                                        border: "2px solid var(--teal-deep)", color: "var(--teal-deep)",
                                        padding: "0.9rem 2.2rem", fontWeight: 700, fontSize: "0.9rem",
                                        borderRadius: 4, display: "inline-flex", alignItems: "center",
                                        gap: "0.5rem", textDecoration: "none",
                                    }}
                                >
                                    View Scholarships
                                </Link>
                            </div>
                        </div>

                        {/* Key stats */}
                        <div className="grid-2" style={{ gap: "1rem" }}>
                            {[
                                { num: "8–17", label: "Target Age", Icon: Users },
                                { num: "Annual", label: "Frequency", Icon: Calendar },
                                { num: "Global", label: "Scale", Icon: Globe },
                                { num: "Free", label: "Entry", Icon: Ticket },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        background: "rgba(255,255,255,0.35)",
                                        borderRadius: 6,
                                        padding: "1.75rem",
                                        backdropFilter: "blur(4px)",
                                        textAlign: "center",
                                    }}
                                >
                                    <div style={{ marginBottom: "0.5rem", color: "var(--teal-deep)" }}><s.Icon size={26} strokeWidth={1.75} /></div>
                                    <p style={{
                                        fontSize: "1.6rem", fontWeight: 900, color: "var(--teal-deep)",
                                        letterSpacing: "-0.5px", marginBottom: "0.2rem",
                                    }}>
                                        {s.num}
                                    </p>
                                    <p style={{
                                        fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                                        letterSpacing: "1.5px", color: "var(--teal-deep)", opacity: 0.65,
                                    }}>
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section >

                {/* ── CTA ── */}
                < section style={{ background: "var(--teal-deep)", padding: "7rem 0", textAlign: "center" }}>
                    <div className="container">
                        <p style={{
                            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.25rem",
                        }}>
                            Get Involved
                        </p>
                        <h2 style={{
                            fontSize: "2.8rem", fontWeight: 900, color: "white",
                            letterSpacing: "-1px", marginBottom: "1.25rem",
                        }}>
                            Want to attend or sponsor an event?
                        </h2>
                        <p style={{
                            opacity: 0.75, maxWidth: 500, margin: "0 auto 3rem",
                            lineHeight: 1.7, color: "white",
                        }}>
                            Reach out to us to learn more about upcoming events, partnership
                            opportunities, or how you can volunteer and make a difference.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/contact" className="btn-primary">Contact Us →</Link>
                            <Link
                                href="/membership"
                                style={{
                                    display: "inline-flex", alignItems: "center",
                                    border: "2px solid rgba(255,255,255,0.35)",
                                    color: "white", padding: "0.9rem 2.2rem",
                                    fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                                    transition: "all 0.3s",
                                }}
                            >
                                Become a Member
                            </Link>
                        </div>
                    </div>
                </section >

            </main >
            <Footer />
        </>
    );
}
