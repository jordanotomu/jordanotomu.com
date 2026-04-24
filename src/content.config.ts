import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const experience = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
    schema: z.object({
        company: z.string(),
        role: z.string(),
        place: z.string(),
        dates: z.string(),
        start: z.coerce.date(),
        logo: z.string(),
        logoAlt: z.string().optional(),
        sub: z.string().optional(),
        order: z.number().default(0),
    }),
});

const education = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
    schema: z.object({
        school: z.string(),
        degree: z.string(),
        place: z.string(),
        dates: z.string(),
        start: z.coerce.date(),
        logo: z.string(),
        logoAlt: z.string().optional(),
        order: z.number().default(0),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        url: z.string().optional(),
        tag: z.string().optional(),
        tier: z.enum(["hero", "featured", "sandbox"]).default("sandbox"),
        stack: z.array(z.string()).default([]),
        metrics: z
            .array(z.object({ value: z.string(), label: z.string() }))
            .default([]),
        order: z.number().default(0),
    }),
});

const wins = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/wins" }),
    schema: z.object({
        title: z.string(),
        org: z.string(),
        year: z.string(),
        emblem: z.string().optional(),
        order: z.number().default(0),
    }),
});

const lore = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/lore" }),
    schema: z.object({
        q: z.string(),
        order: z.number().default(0),
    }),
});

export const collections = { experience, education, projects, wins, lore };
