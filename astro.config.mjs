// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatext from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGithubAlerts from "remark-github-alerts";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://ebarthur.github.io",
  integrations: [UnoCSS({
    injectReset: true,
  }), mdx(), sitemap(), react()],

  markdown: {
    shikiConfig: {
      themes: {
        light: "snazzy-light",
        dark: "vitesse-dark",
      },
    },
    remarkPlugins: [remarkGithubAlerts],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatext,
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
});