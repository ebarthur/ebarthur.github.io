import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const writing = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
	schema: z.object({
		createdAt: z.coerce.date(),
		title: z.string(),
		description: z.string(),
		thumbnail: z.string().url().optional(),
		tags: z.array(z.string()).optional()
	}),
});

export const collections = { writing };
``