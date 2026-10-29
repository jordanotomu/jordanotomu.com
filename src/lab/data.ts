// shared content for the /lab design variants. mirrors the live site so the
// variants can be compared on real content; the live pages stay the source of truth.
import { getCollection, render } from "astro:content";

export const links = {
    linkedin: "https://linkedin.com/in/jordanotomu/",
    github: "https://github.com/jordanotomu",
    x: "https://x.com/jordanvsdaworld",
    spotify: "https://open.spotify.com/user/qnooztog40bez8my4wzrvvy2d?si=390aea0c7b624827",
    instagram: "https://instagram.com/nott.jordan",
    resume: "/resume.pdf",
    email: "jotomu@uh.edu",
    ugcEmail: "jordanotomu@gmail.com",
};

export const bio = [
    "hi, i'm jordan. a cs student at the university of houston who interned at snap this past summer and is heading back full-time as a software engineer in nyc in 2027.",
    "most of my time goes into building: systems, infra, saas, and the occasional side experiment. when i'm not writing code i'm trenching crypto markets, watching tv and documentaries, listening to music, or deep in history and geography.",
    "i like small, well-crafted things. i think the best way to learn is to build it badly first, then do it well.",
];

export const motto = { text: "be obsessed or be average.", by: "grant cardone" };

export const ugc = {
    headline: "$30K/mo ugc creator",
    sub: "ai prank videos for consumer apps.",
    stats: [
        { value: "250M+", label: "views in 6 months" },
        { value: "120K+", label: "followers" },
        { value: "16.1M", label: "on one video" },
    ],
    results: [
        { src: "/assets/ugc/yt-studio-28d.jpg", caption: "25M+ views in a single month on YouTube Shorts." },
        { src: "/assets/ugc/tiktok-365d.jpg", caption: "85M+ views and 5M+ likes on TikTok in a year." },
        { src: "/assets/ugc/fb-2026.jpg", caption: "65M+ views on Facebook this year." },
        { src: "/assets/ugc/sideshift-oct.jpg", caption: "$29K+ earned in October from one app program." },
    ],
    brands: [
        { name: "Cantina", logo: "/assets/logos/cantina.png", dates: "Sep 2026 – now", wordmark: true },
        { name: "Halo AI", logo: "/assets/logos/halo.png", dates: "Jan 2026 – now" },
        { name: "Arcads", logo: "/assets/logos/arcads.jpg", dates: "Mar 2026" },
        { name: "Undisclosed brand", nda: true, dates: "under NDA" },
        { name: "Undisclosed brand", nda: true, dates: "under NDA" },
    ] as { name: string; logo?: string; dates: string; wordmark?: boolean; nda?: boolean }[],
    tool: {
        name: "fakechat",
        url: "https://project-fcz9u.vercel.app",
        blurb: "i build my own ugc tools. fakechat is the one i use most: script an imessage-style chat, add an ai hook, export a ready-to-post video. free to use.",
        shot: "/assets/ugc/fakechat-editor.jpg",
        phone: "/assets/ugc/fakechat-phone.jpg",
    },
};

export { onRepeat, albumWall } from "~/data/music";

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) =>
    b.data.order - a.data.order;

async function withContent<T extends { data: any }>(entries: T[]) {
    return Promise.all(
        entries.sort(byOrder).map(async (e) => ({ data: e.data, Content: (await render(e as any)).Content }))
    );
}

export async function loadContent() {
    const [experience, education, projects] = await Promise.all([
        getCollection("experience").then(withContent),
        getCollection("education").then(withContent),
        getCollection("projects").then(withContent),
    ]);
    return { experience, education, projects };
}

// logos that exist as files in /public/assets/logos (others fall back to text)
export const logoSrc: Record<string, string> = {
    snap: "/assets/logos/snap.png",
    jpmc: "/assets/logos/jpmc.png",
    gpisd: "/assets/logos/gpisd.png",
    uh: "/assets/logos/uh.svg",
    sgp: "/assets/logos/sgp.png",
};
