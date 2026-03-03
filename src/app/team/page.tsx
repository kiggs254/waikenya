import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamGrid, { type TeamMember } from "@/components/TeamGrid";

export const metadata: Metadata = {
    title: "The Team | WAI Kenya Chapter",
    description:
        "Meet the passionate team behind Women in Aviation International – Kenya Chapter. Pilots, engineers, dispatchers, and advocates working to advance women in aviation.",
};

const fallbackMembers: TeamMember[] = [
    {
        name: "Una Gertrude Odhiambo",
        role: "Co-Founder",
        tag: "Co-Founder",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Una-Gertrude.jpg",
        shortBio:
            "Flight Dispatcher & Operations Manager at Airkenya Express Ltd. 14 years of aviation experience. BBM in Aviation Management.",
        bio: [
            "Flight Dispatcher. Co-founder Women In Aviation Kenya Chapter. Member IFALDA and KAFDA. Operations Manager at Airkenya Express Ltd. With 14 years experience in aviation. Graduated with BBM in Aviation Management. Mentors young girls in aviation.",
            "One dazzling Friday morning we had an educational tour to Eldoret International. I was fascinated when I saw big cargo planes parked at the ramp. My focus changed to Aircraft -- 'Love at first sight'. This was my path into the aviation industry.",
            "I went to Skypath Aviation College where I pursued Advanced Diploma in Flight Operations and Dispatch for two years. After a week I landed a job in Tanzania as a Flight Dispatcher. My experience in Dar es Salaam was entrancing; I had amazing opportunities at my youthful age but not to say I did not face challenges.",
            "The aviation industry in Africa and more specifically East Africa had not budded and hence opportunities for growth. Again a door opened for me to progress and learn more on Aviation Management. Enrolled for Bachelor in Aviation Management – Moi University.",
            "After graduating from Moi University, my friend Fiona Omondi and I began this journey of exploring more into aviation and creating awareness to those not privileged to know what careers are in aviation. We learned about Women in Aviation and strategized on using this vehicle to mentor young men and Women and especially young girls to pursue careers in aviation.",
            "I can say I'm successful when I'm able to hold the hand of that young girl dreaming to become a pilot, Flight dispatcher, Engineer, Cabin crew, Safety and security personnel — and see them realize their dream through mentorship programs and educative events organized by Women in Aviation.",
            "I advocate for young girls to take up careers in aviation industry for there is a gap that needs to be filled.",
        ],
    },
    {
        name: "Fiona Omondi",
        role: "Co-Founder",
        tag: "Co-Founder",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Captain-1.jpg",
        shortBio:
            "Head of Business Development & Projects at Tradewinds Aviation Services Ltd. Masters from University of Aberdeen, UK.",
        bio: [
            "Fiona Omondi is an enthusiastic Aviator, currently Head of Business Development & Projects at Tradewinds Aviation Services Ltd, a privately owned Ground Handling company operating in the Kenyan aviation industry.",
            "She prides herself on her sufficient experience in business development and project management, across Aviation Training and Ground handling.",
            "She holds a Masters In Business Management from the University of Aberdeen-UK, a Bachelor's degree of Business Management in Aviation from MOI University, and a Certificate in Flight Dispatch from East African School of Aviation.",
            "She is also the Co-founder of Women in Aviation– Kenya Chapter which was founded in 2012, aimed at bridging the gender gap in the Aviation Industry, something very close to her heart. A wife, mother of two, mentor — she loves traveling, cooking and is one heck of a dancer.",
        ],
    },
    {
        name: "Mary Mukulu Kai",
        role: "Financier",
        tag: "Financier",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Captain.jpg",
        shortBio:
            "Former Kenya Airways Captain on B737, B767, B777 & B787. First woman to captain a Boeing aircraft in Kenya. MBA from University of Leicester.",
        bio: [
            "One day while pursuing my college degree I received an email informing me that I was short listed for a scholarship that I had applied for. Three candidates had been shortlisted and we were going to be interviewed during the annual conference held in Nashville, Tennessee, to determine the recipient of the scholarship.",
            "Attending the conference for Women in Aviation International increased my love for Aviation and started my journey as a WIA member. I won the Airbus leadership award/scholarship and the following year AOPA scholarship.",
            "I received my undergraduate degree in B.Sc. in Aeronautics-Aviation Management together with my FAA CPL Multi with an Instrument Rating from St. Louis University. I managed to convert my license to a Kenyan License.",
            "I flew a LET 410 for a company called Aero Kenya at Wilson Airport. At Kenya Airways I joined as a second officer on the Boeing 737 and graduated to a first officer once I finished my training. I flew the Boeing 767 and 777 as a first officer. I became a Captain and flew a Boeing 737, serving the airline for thirteen years.",
            "I graduated with a Masters in Business Administration (MBA) a few years later from University of Leicester.",
            "Fiona and Una approached me while I was a first officer on the B777, with an idea to start a WIAI Kenyan chapter. This was the beginning of my journey with the Kenyan Chapter.",
            "One of my highlights as a WAI Kenyan chapter member was during our first Girls in Aviation Day. We had taken the girls to the Jomo Kenyatta ATC Tower and after a detailed tour one of the girls approached me and asked, 'What can I do to become one of those people?' — pointing to an Air Traffic Controller. At that moment I felt my work had been done.",
            "I took a nine month course called Female Future in conjunction with Norwegian and Kenyan government, which caused me to venture into running our charter company at Wilson Airport.",
        ],
    },
    {
        name: "Irene Koki Mutungi",
        role: "Chairperson",
        tag: "Chairperson",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Captain-3.jpg",
        shortBio:
            "Airline Captain — first African female Boeing 787 'Dreamliner' Captain. Kenya Airways pioneer. Forbes 'Top 20 Youngest Power Women in Africa 2014'.",
        bio: [
            "A member of Women In Aviation International since 1998 to date. Capt. Koki has been a focal point in mentorship of young girls in Aviation. She is a professional pilot in Kenya — the first female on the African continent to become certified as a Captain of the Boeing 787 'Dreamliner' aircraft.",
            "At the age of 17 years, she enrolled in flight school at Nairobi's Wilson Airport, where she obtained her Private Pilot's License. She continued her pilot education in Oklahoma City in the United States where she was awarded the Commercial Pilot's License by the Federal Aviation Authority.",
            "She returned to Kenya in 1995, did some flying for General Aviation, and was then hired by Kenya Airways as their first female pilot. She was the only female pilot at the airline for the next six years.",
            "In 2004, she became the first African woman to qualify to captain a commercial aircraft when she qualified to command the Boeing 737. She subsequently qualified on the Boeing 767, before transitioning to command the Boeing 787 Dreamliner — making her the first African female Boeing 787 Captain in the world.",
            "Her motivation to become a commercial pilot was developed when she was five years old, by observing her father, a pilot for Kenya Airways. In September 2014, Mutungi was one of 39 female pilots at Kenya Airways out of a total of 530.",
            "She is a mother to two amazing boys and was named among 'The 20 Youngest Power Women In Africa 2014' by Forbes Magazine. She was also ranked in the Top Forty Under Forty for 5 consecutive years.",
        ],
    },
    {
        name: "Primerose Njeri",
        role: "Secretary",
        tag: "Secretary",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Captain-2.jpg",
        shortBio:
            "Aircraft Maintenance Technician at Wilson Airport. Diploma in Aeronautical Engineering. Pratt & Whitney scholarship recipient 2018.",
        bio: [
            "My name is Primerose Njeri. I became a member of Women in Aviation, Kenya Chapter in 2016. I currently sit in the capacity of Secretary among the officials.",
            "Women in Aviation has been more than a blessing in my life. I got to learn about it through one member's outreach, and in the spirit of making WAI a household name in Aviation in Kenya, a coffee date was enough to let me know all about WAI — and my mind was set to get my membership sorted. I did, and I've never turned back since.",
            "Resilience is key in any career, but you'd need a lot of it in Aviation. I applied for scholarships in the first year of my membership, and unfortunately it didn't bear much fruit. My breakthrough came in my second year of membership: I received the highly coveted Pratt and Whitney maintenance scholarship in 2018 — 1 among 5 awarded that year.",
            "I was well trained about both Line and Base maintenance of the PW1500G-C series geared turbo fan engines. I now work as an Aircraft Maintenance Technician at Wilson Airport, having completed a Diploma in Aeronautical Engineering, Airframes and Engines option at the East Africa School of Aviation.",
            "WAI has enabled me to see a young girl's dream — who once took a photo next to a small aircraft in an airstrip in Nanyuki — come to life while fixing big aircrafts now, and only aiming for even bigger aircrafts and better challenges.",
        ],
    },
    {
        name: "Faith Syovata",
        role: "Treasurer",
        tag: "Treasurer",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Faith.jpg",
        shortBio:
            "Joined WAI as a university student in 2014. Civil Aviation graduate. Works with the Kenya Civil Aviation Authority. Violin player and chess enthusiast.",
        bio: [
            "Faith Syovata joined WAI as a university student and has been a member since late 2014. She currently serves as the Treasurer in the WAI Kenya Chapter.",
            "She studied Civil Aviation as part of her undergraduate degree, with a keen interest in flight operations. She has worked with the Kenya Civil Aviation Authority and continues to be passionate about aviation.",
            "She is actively involved in mentorship programs that work with young girls, especially from disadvantaged backgrounds, providing better opportunities in aviation careers.",
            "Her hobbies include playing the violin and chess.",
        ],
    },
    {
        name: "Emily Manduku",
        role: "Outreach Chair",
        tag: "Outreach Chair",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/09/Emily-Manduku.jpg",
        shortBio:
            "Flight Operations Inspector – Cabin Safety at Kenya CAA. WAI member since 2017. Formerly a Flight Attendant for 14 years.",
        bio: [
            "Hey, I'm Emily Manduku, a member of WAI-Kenya Chapter since 2017. I am grateful for the opportunity to serve as Outreach Chair in our ever growing chapter.",
            "I joined at what was one of my lowest moments in aviation. Having been retrenched from a Flight Attendant job that I had loved for 14 years, I tried my hand in many things but realized I needed to stay true to my first love — Aviation. I went back to school to pursue a Flight Operations and Dispatch diploma course. It was during my internship that I joined WAI.",
            "My first meeting with the WAI family was during the Girls in Aviation Day of that year. I was convinced that I had finally met my 'tribe'. The sharing, networking and mentoring we did opened my eyes to a new world of aviation enthusiasts and professionals.",
            "I have witnessed successful WAI Scholarship applications by some of our chapter members — a much-appreciated opportunity platform by WAI.",
            "My goal is to reach out and inspire more girls to take up aviation as a career, because they are capable, and to bridge the gender gap in aviation in Kenya. I currently serve in our national CAA as a Flight Operations Inspector-Cabin Safety — a demanding but fulfilling job. In my spare time, I enjoy reading and working out, beside being a mom to my boys.",
        ],
    },
    {
        name: "Frank Nyawa",
        role: "Social Media & Communications",
        tag: "Communications",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/09/Frank-Nyawa.jpg",
        shortBio:
            "Pilot & PR Strategist. Created and manages all WAI Kenya social media platforms. Trained at FTC Wilson Airport, Select Aviation Canada, and Flyby Spain.",
        bio: [
            "A Pilot & a PR strategist. My journey as a pilot came to reality when I met Capt. Mary Kai, a former KQ 737 Captain, who is also a member of WAI Kenya. I met Capt. Mary while doing a PR job for a business forum and found out she was a senior pilot for Kenya Airways.",
            "To cut the long story short, she found out I couldn't afford to pay for my flying and she decided to help by registering me in WAI, with the aim of applying for a scholarship. As a WAI member in the Kenya Chapter, I volunteered to be the social media strategist and created and managed all their social media platforms.",
            "I applied for scholarships but sadly didn't get any. However I met so many pilots who together with Captain Mary started mentoring me — notably Capt. Koki, 787 KQ Captain, and Capt. Rye Thompson, 747 Pilot of United Airlines.",
            "The dream became much more real when I met Rye Thompson, who enrolled me at FTC Wilson Airport, paid for my ground school and bought me the entire pilot kit. I later joined Select Aviation in Canada then Flyby in Spain.",
            "I would like to thank Capt. Mary Kai for her mentorship and most importantly enrolling me to WAI, where I met Capt. Rye Thompson. Not forgetting Capt. Koki and Loise who encouraged me during my early stages as a pilot student, and Una Gertrude who always gave me a listening ear and was always ready to network me with like-minded pilots.",
        ],
    },
    {
        name: "Loise Njoroge",
        role: "Former Chairperson",
        tag: "Former Chair",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Loise-Njoroge.jpg",
        shortBio:
            "State Safety Program Coordinator at KCAA. Former Senior Air Traffic Controller (12 years). M.Sc. Aeronautics from Embry-Riddle. Boeing & Airbus WAI scholarship winner.",
        bio: [
            "Loise is currently the acting State Safety Program Coordinator at Kenya Civil Aviation Authority (KCAA). Before her transfer, she was a Senior Air Traffic Controller at KCAA with 12 years' experience in Aerodrome, Approach procedural and Approach Radar control.",
            "She is also the CANSO (Civil Aviation Navigation Services Organization) Focal Point for KCAA. She graduated in 2016 with an M.Sc. in Aeronautics from Embry-Riddle Aeronautical University (ERAU) in Florida, specializing in Aerospace/Aviation Safety Systems.",
            "While studying for her masters, she won several awards including the ERAU Chief Academic Officer's top 10 award, the Boeing career enhancement scholarship, the Airbus Leadership Grant for exemplary community leadership (both courtesy of WAI), and the Jacque Burdette scholarship from Professional Women Controllers Inc.",
            "Loise previously worked at the International Civil Aviation Organization (ICAO) on an International Aviation Women Association (IAWA) Scholarship — starting in ICAO's Eastern and Southern African Regional Office in Nairobi, then moving to ICAO Headquarters in Montreal in the Airspace Management and Optimization Section.",
            "She is passionate about aviation and is involved in mentorship programs in girls' secondary schools in Kenya. She served as Outreach Chair (2015–2018) and Chairlady (2019) for WAI – Kenya Chapter, and was also Vice President-Technical & Operations for the Kenya Air Traffic Controllers' Association (2015–2017).",
        ],
    },
    {
        name: "Hon John Ogutu Omondi",
        role: "Patron",
        tag: "Patron",
        image: "https://www.waikenyachapter.com/wp-content/uploads/2020/09/Hon-Omondi.jpg",
        shortBio:
            "WAI-Kenya Chapter Patron. Former MP for Embakasi East. Co-founder of Tradewinds Aviation Services. 30+ years in aviation. Women & Girls' Empowerment Champion.",
        bio: [
            "A passionate Aviator, Women and Girls' Empowerment Champion!",
            "WAI-Kenya Chapter Patron Hon John Ogutu Omondi has been a member of Women in Aviation International since 2005 and a founder member of WAI Kenya Chapter since 2012.",
            "He is the former Member of National Assembly for Embakasi East constituency, and the Co-founder of Tradewinds Aviation Services with a strong background in Passenger Handling spanning over 30 years.",
            "With experience working with Executive Jet and Pan AM Airlines, he founded a Ground Handling company at JKIA named Peck Air, and later merged with Barry Tomlinson to form Tradewinds Aviation Services some 15 years ago.",
            "His favourite quote — 'If you educate a woman, you educate a nation' — drives the scholarship and mentorship mission of the WAI Kenya Chapter.",
        ],
    },
];

async function getTeamMembers(): Promise<TeamMember[]> {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    if (!baseUrl) return fallbackMembers;

    try {
        const res = await fetch(`${baseUrl}/wai_team?_embed&per_page=100`, { next: { revalidate: 60 } });
        if (!res.ok) return fallbackMembers;
        const data = await res.json();

        return data.map((item: any) => {
            const rawHtml = item.content?.rendered || "";
            // Parse HTML to extract text paragraphs safely
            const paragraphs = rawHtml.split('</p>')
                .map((p: string) => p.replace(/<[^>]+>/g, '').trim())
                .filter(Boolean);

            return {
                name: item.title?.rendered || "Unknown",
                role: item.meta?.role || "",
                tag: item.meta?.role || "",
                image: item.meta?.external_avatar || item.featured_image_url || "https://www.waikenyachapter.com/wp-content/uploads/2020/08/Captain-1.jpg",
                shortBio: paragraphs[0] ? (paragraphs[0].substring(0, 150) + "...") : "",
                bio: paragraphs,
            };
        }).reverse();
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        return fallbackMembers;
    }
}

export default async function TeamPage() {
    const members = await getTeamMembers();

    return (
        <>
            <Navbar />

            <main>
                {/* ── HERO ── */}
                <section
                    style={{
                        background: "linear-gradient(135deg, var(--teal-deep) 0%, var(--teal) 100%)",
                        padding: "12rem 0 8rem",
                        color: "white",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Decorative rings */}
                    {[500, 700, 900].map((size) => (
                        <div
                            key={size}
                            style={{
                                position: "absolute",
                                width: size,
                                height: size,
                                borderRadius: "50%",
                                border: "1px solid rgba(255,255,255,0.05)",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                                pointerEvents: "none",
                            }}
                        />
                    ))}

                    <div className="container" style={{ position: "relative", zIndex: 2 }}>
                        <p
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                letterSpacing: "4px",
                                textTransform: "uppercase",
                                color: "var(--gold)",
                                marginBottom: "1.25rem",
                            }}
                        >
                            ── WAI Kenya Chapter ──
                        </p>
                        <h1
                            style={{
                                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-2px",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Meet the Team
                        </h1>
                        <p
                            style={{
                                fontSize: "1.1rem",
                                opacity: 0.8,
                                maxWidth: 560,
                                margin: "0 auto",
                                lineHeight: 1.7,
                            }}
                        >
                            The passionate aviators, engineers, mentors and advocates who
                            built and continue to grow the WAI Kenya Chapter.
                        </p>
                    </div>
                </section>

                {/* ── INTRO BAR ── */}
                <section style={{ background: "var(--teal)", padding: "3rem 0" }}>
                    <div
                        className="container"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "2rem",
                            textAlign: "center",
                        }}
                    >
                        {[
                            { num: members.length.toString(), label: "Team Members" },
                            { num: "2012", label: "Chapter Founded" },
                            { num: "500+", label: "Active Members" },
                            { num: "14+", label: "Scholarships Awarded" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p style={{ fontSize: "2.2rem", fontWeight: 900, color: "white", letterSpacing: "-1px", marginBottom: "0.25rem" }}>
                                    {s.num}
                                </p>
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.65)" }}>
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── TEAM GRID ── */}
                <section style={{ padding: "8rem 0", background: "var(--off-white)" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
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
                                Our People
                            </p>
                            <h2
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    color: "var(--teal-deep)",
                                    letterSpacing: "-1px",
                                    marginBottom: "1rem",
                                }}
                            >
                                Leadership & Officials
                            </h2>
                            <p style={{ color: "var(--text-body)", maxWidth: 520, margin: "0 auto" }}>
                                Click on any team member to read their full story.
                            </p>
                        </div>

                        <TeamGrid members={members} />
                    </div>
                </section>

                {/* ── JOIN CTA ── */}
                <section
                    style={{
                        background: "var(--teal-deep)",
                        padding: "7rem 0",
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <div className="container">
                        <p
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "4px",
                                color: "var(--gold)",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Get Involved
                        </p>
                        <h2
                            style={{
                                fontSize: "2.8rem",
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-1px",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Want to be part of our journey?
                        </h2>
                        <p style={{ opacity: 0.75, maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.7 }}>
                            Join the WAI Kenya Chapter and connect with aviation professionals,
                            mentors, and a community that uplifts every aspiring aviator.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <a href="/membership" className="btn-primary">Become a Member →</a>
                            <a
                                href="#contact"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    border: "2px solid rgba(255,255,255,0.4)",
                                    color: "white",
                                    padding: "0.9rem 2.2rem",
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    transition: "all 0.3s",
                                }}
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
