import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { WAI, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
    title: "FAQ | WAI Kenya Chapter",
    description:
        "Answers on joining and renewing WAI membership, the annual conference, events, scholarships, WAI Together, chapters and Girls in Aviation Day for Junior Members aged 5–15.",
};

const POPULAR: FaqItem[] = [
    {
        q: "How do I reset my password?",
        a: "Membership accounts are held by Women in Aviation International, so passwords are reset on the WAI website. Use the password reset page, enter the email address on your membership, and you will be sent a link to set a new one.",
        link: { label: "Reset your WAI password", href: WAI.forgotPassword },
    },
    {
        q: "How do I renew my membership?",
        a: "Renew directly with WAI International using the email address on your membership. If your dues are adjusted under the Global Access Program, the Kenyan rate is applied automatically at checkout.",
        link: { label: "Renew your membership", href: WAI.renew },
    },
    {
        q: "How do I register for the WAI conference?",
        a: "Registration for the Annual International Women in Aviation Conference opens on the WAI website ahead of each conference. The 2027 conference page carries the dates, venue, programme and registration link.",
        link: { label: "WAI 2027 Conference", href: WAI.conference2027 },
    },
    {
        q: "How do I apply for a scholarship?",
        a: "WAI scholarships are applied for through WAI International, and applications usually open towards the end of the year ahead of the conference. You must be a WAI member to apply. Our Scholarships page explains what Kenyan members have won and how the Chapter can support your application.",
        link: { label: "Apply for a WAI scholarship", href: WAI.scholarships },
    },
];

const CATEGORIES: { title: string; blurb: string; items: FaqItem[] }[] = [
    {
        title: "Membership & Getting Started",
        blurb: "Joining, renewing, managing your membership and what membership gives you.",
        items: [
            {
                q: "Who can join WAI Kenya Chapter?",
                a: "Membership is open to women and men from all segments of the aviation industry, at every stage of a career — students, cabin crew, pilots, engineers, dispatchers, controllers, ground handlers, regulators and enthusiasts. Men are welcome and valued as allies in advancing women in aviation.",
                link: { label: "Membership options", href: "/membership" },
            },
            {
                q: "How do I join?",
                a: "Join Women in Aviation International and select the Kenya Chapter. Your WAI membership gives you the global organisation's scholarships, conference, job board and mentoring, plus everything the Chapter runs here in Kenya.",
                link: { label: "WAI Membership Information", href: WAI.membershipInformation },
            },
            {
                q: "What does membership cost from Kenya?",
                a: "Kenya is covered by WAI's Global Access Program, which automatically adjusts membership dues in selected regions to widen access and participation. The adjusted rate is applied for you at checkout — there is nothing extra to claim.",
                link: { label: "How the Global Access Program works", href: "/membership#global-access" },
            },
            {
                q: "What is Auto-Pay?",
                a: "Auto-Pay renews your membership automatically each year, so your access to scholarships, the conference and member resources is never interrupted by a missed renewal date. You can activate it when you join or renew.",
                link: { label: "Renew and activate Auto-Pay", href: WAI.renew },
            },
            {
                q: "How do I manage my membership details?",
                a: "Sign in to your WAI account to update your contact details, check your renewal date and download receipts.",
                link: { label: "Sign in to WAI", href: WAI.login },
            },
        ],
    },
    {
        title: "Conference",
        blurb: "Registering for and attending the Annual International Women in Aviation Conference.",
        items: [
            {
                q: "What happens at the WAI conference?",
                a: "Keynote speakers, professional development seminars, education sessions, an exhibit hall and the scholarship awards — plus the networking that has launched a good number of Kenyan aviation careers.",
                link: { label: "WAI 2027 Conference", href: WAI.conference2027 },
            },
            {
                q: "Can I attend if I cannot travel?",
                a: "Yes. WAI publishes recorded education sessions after each conference, so you can work through the programme in your own time from Kenya.",
                link: { label: "On-Demand Education Sessions", href: WAI.onDemandEducation },
            },
        ],
    },
    {
        title: "Events",
        blurb: "Upcoming Chapter events and workshops here in Kenya.",
        items: [
            {
                q: "What events does the Kenya Chapter run?",
                a: "Our calendar is built around Girls in Aviation Day each September, the International Women's Day dinner in March, the annual WAI International Conference in February or March, and outreach visits and workshops through the year.",
                link: { label: "See the events calendar", href: "/events" },
            },
            {
                q: "Do I have to be a member to attend?",
                a: "Not for everything. Outreach events and Girls in Aviation Day are open to the public, and we encourage schools and parents to bring young people along. Some member events and the WAI conference require membership.",
                link: { label: "Contact the Chapter", href: "/contact" },
            },
        ],
    },
    {
        title: "Scholarships",
        blurb: "What is available and how to apply.",
        items: [
            {
                q: "What scholarships can I apply for?",
                a: "WAI awards scholarships every year across flight training, type ratings, maintenance and engineering, dispatch, air traffic control and aviation management. Kenyan members have won Airbus, AOPA, Boeing, Pratt & Whitney and Harvard leadership awards among others.",
                link: { label: "Browse WAI scholarships", href: WAI.scholarships },
            },
            {
                q: "Do I need to be a member to apply?",
                a: "Yes — WAI scholarships are open to WAI members, so join before applications open. Junior Members aged 5–15 are not eligible to apply for WAI scholarships.",
                link: { label: "Become a member", href: "/membership" },
            },
            {
                q: "Does the Chapter help with applications?",
                a: "Yes. Chapter members who have won scholarships mentor applicants through the process — what the reviewers look for, how to write the essays and how to prepare for interview. Get in touch well before the deadline.",
                link: { label: "Ask the Chapter for support", href: "/contact" },
            },
        ],
    },
    {
        title: "Community",
        blurb: "WAI Together, virtual meetups and community engagement.",
        items: [
            {
                q: "What is WAI Together?",
                a: "WAI Together is the global online community where members connect between conferences — discussion groups, virtual meetups and direct access to aviation professionals worldwide.",
                link: { label: "Join WAI Together", href: WAI.waiTogether },
            },
            {
                q: "How do I find a mentor?",
                a: "Mentor Connect matches members with mentors across the industry. Most of our own team found their way into aviation through someone who took the time — and many now mentor in turn.",
                link: { label: "Mentor Connect", href: WAI.mentorConnect },
            },
        ],
    },
    {
        title: "Chapters",
        blurb: "WAI chapters and how to connect locally.",
        items: [
            {
                q: "What is a WAI chapter?",
                a: "Chapters are local groups of WAI members who run outreach, mentorship and events in their own country or region. WAI Kenya Chapter was founded in 2012 to bridge the gender gap in Kenyan aviation.",
                link: { label: "Our story", href: "/about" },
            },
            {
                q: "How do I connect with the Kenya Chapter?",
                a: `Email us at ${CONTACT.email}, call the Chapter President, or follow us on social media — we post every event and outreach visit. You are welcome at an event before you commit to joining.`,
                link: { label: "Contact us", href: "/contact" },
            },
            {
                q: "Is there a chapter outside Kenya I can join?",
                a: "WAI has chapters worldwide. If you are moving or studying abroad, you can connect with the chapter closest to you through WAI International.",
                link: { label: "WAI chapters", href: WAI.kenyaChapter },
            },
        ],
    },
    {
        title: "Girls in Aviation Day",
        blurb: "Programmes for Junior Members aged 5–15.",
        items: [
            {
                q: "What is Girls in Aviation Day?",
                a: "A global WAI event held each September. In Kenya we take girls to airports, control towers, hangars and ramps to meet pilots, engineers, dispatchers and controllers — for many of them it is the first time aviation looks like a real option.",
                link: { label: "See past Girls in Aviation Days", href: "/events" },
            },
            {
                q: "How does Junior Membership work?",
                a: "Junior Membership is free for children aged 5–15. Birthday and school information are required at registration. Junior Members are not eligible to apply for WAI scholarships, and membership expires 60 days after the member turns 16 — at which point they can upgrade to Student or Individual Membership.",
                link: { label: "Junior Membership details", href: "/membership#junior" },
            },
            {
                q: "Can boys take part?",
                a: "Yes. Our outreach is aimed at closing the gender gap, but boys attend our school visits and events too, and men are welcome as members and as allies.",
                link: { label: "Youth education resources", href: WAI.youthEducation },
            },
        ],
    },
];

export default function FaqPage() {
    return (
        <>
            <Navbar />

            <main>
                <PageHero
                    eyebrow="Help centre"
                    title="Frequently Asked Questions"
                    lead="Find answers, explore resources, and get the support you need. Start with our most popular questions or browse by category below."
                />

                {/* ── MOST POPULAR ── */}
                <section style={{ padding: "6rem 0 4rem", background: "var(--off-white)" }}>
                    <div className="container" style={{ maxWidth: 860 }}>
                        <p className="section-label">Most popular questions</p>
                        <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2.5rem" }}>
                            Start here
                        </h2>
                        <FaqAccordion items={POPULAR} idPrefix="popular" />
                    </div>
                </section>

                {/* ── CATEGORY JUMP LINKS ── */}
                <section style={{ padding: "0 0 3.5rem", background: "var(--off-white)" }}>
                    <div className="container" style={{ maxWidth: 860 }}>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.6rem",
                                paddingTop: "2.5rem",
                                borderTop: "1px solid #e4e9ec",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 800,
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "var(--gray)",
                                    alignSelf: "center",
                                    marginRight: "0.5rem",
                                }}
                            >
                                Browse by category
                            </span>
                            {CATEGORIES.map((c) => (
                                <a
                                    key={c.title}
                                    href={`#${slug(c.title)}`}
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        color: "var(--teal)",
                                        background: "var(--white)",
                                        border: "1px solid #dde4e8",
                                        borderRadius: 100,
                                        padding: "0.45rem 1rem",
                                    }}
                                >
                                    {c.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CATEGORIES ── */}
                <section style={{ padding: "1rem 0 6rem", background: "var(--off-white)" }}>
                    <div
                        className="container"
                        style={{ maxWidth: 860, display: "flex", flexDirection: "column", gap: "4rem" }}
                    >
                        {CATEGORIES.map((c) => (
                            <div key={c.title} id={slug(c.title)} style={{ scrollMarginTop: "100px" }}>
                                <h2
                                    style={{
                                        fontSize: "1.55rem",
                                        fontWeight: 800,
                                        color: "var(--teal-deep)",
                                        letterSpacing: "-0.5px",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {c.title}
                                </h2>
                                <p style={{ color: "var(--gray)", marginBottom: "1.75rem", fontSize: "0.93rem" }}>
                                    {c.blurb}
                                </p>
                                <FaqAccordion items={c.items} idPrefix={slug(c.title)} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── STILL STUCK ── */}
                <section
                    style={{
                        padding: "6rem 0",
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <div className="container" style={{ maxWidth: 620 }}>
                        <h2
                            style={{
                                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                                fontWeight: 900,
                                color: "white",
                                marginBottom: "1rem",
                            }}
                        >
                            Didn&rsquo;t find your answer?
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.78)", marginBottom: "2.5rem", lineHeight: 1.75 }}>
                            Ask the Chapter directly — we would rather answer a question than lose someone who
                            was nearly ready to join.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link
                                href="/contact"
                                className="btn-primary"
                                style={{ background: "var(--gold)", color: "var(--teal-deep)" }}
                            >
                                Contact WAI Kenya →
                            </Link>
                            <a href={WAI.faqs} target="_blank" rel="noopener noreferrer" className="btn-outline">
                                WAI International FAQs
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function slug(title: string): string {
    return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
