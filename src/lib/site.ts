/**
 * Single source of truth for contact details, social accounts, donation
 * banking and the outbound links to Women in Aviation International.
 *
 * Everything the chapter might want to change without touching page code
 * lives here. Every wai.org path below was checked to return 200.
 */

export const CONTACT = {
    /** Chapter President — the number the chapter asked to publish. */
    phone: "+254 721 679 726",
    phoneHref: "tel:+254721679726",
    phoneLabel: "Penina Nginyo, President",
    email: "info@waikenyachapter.com",
    address:
        "Cargo Village, Freight Link Road, Mechanized Freight Terminal, 1st Floor, Nairobi, Kenya",
} as const;

/**
 * Social accounts. A platform with a `null` url is simply not rendered, so
 * the chapter never ships a dead icon — fill the url in to switch it on.
 */
export type SocialKey = "linkedin" | "facebook" | "instagram" | "youtube" | "x";

export const SOCIALS: { key: SocialKey; label: string; url: string | null; handle: string }[] = [
    {
        key: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/women-in-aviation-kenya-chapter/",
        handle: "Women in Aviation Kenya Chapter",
    },
    {
        key: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/WAIKenya/",
        handle: "@WAIKenya",
    },
    {
        key: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/womeninaviation_kenyachapter/",
        handle: "@womeninaviation_kenyachapter",
    },
    {
        key: "youtube",
        label: "YouTube",
        // TODO: chapter has not supplied a YouTube channel yet — add the URL
        // here and the icon appears everywhere it is used.
        url: null,
        handle: "WAI Kenya Chapter",
    },
    { key: "x", label: "X", url: "https://x.com/WAI_Kenya", handle: "@WAI_Kenya" },
];

/** Only the platforms that actually have an account. */
export const ACTIVE_SOCIALS = SOCIALS.filter(
    (s): s is (typeof SOCIALS)[number] & { url: string } => Boolean(s.url),
);

/** Outbound links to Women in Aviation International. */
export const WAI = {
    home: "https://www.wai.org/",
    kenyaChapter: "https://www.wai.org/chapters/kenya",
    membershipInformation: "https://www.wai.org/membership-information",
    register: "https://www.wai.org/register",
    renew: "https://www.wai.org/renew",
    scholarships: "https://www.wai.org/scholarships",
    conference2027: "https://www.wai.org/2027-conference",
    waiTogether: "https://www.wai.org/wai-together",
    onDemandEducation: "https://www.wai.org/products/wai2026-on-demand-education",
    jobsConnect: "https://www.wai.org/jobs-connect",
    mentorConnect: "https://www.wai.org/mentor-connect",
    aviationCareers: "https://www.wai.org/aviation-careers",
    youthEducation: "https://www.wai.org/youth-education",
    // Note: wai.org/girls-in-aviation-day is members-only, so public GIAD
    // information is linked through Youth Education instead.
    faqs: "https://www.wai.org/faqs",
    membershipFaqs: "https://www.wai.org/membership-faqs",
    login: "https://www.wai.org/login",
    forgotPassword: "https://www.wai.org/forgot-password",
    contact: "https://www.wai.org/contact-us",
} as const;

/** Chapter bank account, as supplied by the chapter for the donate page. */
export const DONATION = {
    bank: "Equity Bank",
    accountName: "Women in Aviation Kenyan Chapter",
    accountNumber: "1990287112690",
} as const;
