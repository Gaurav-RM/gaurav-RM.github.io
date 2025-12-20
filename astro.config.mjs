import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
 site: "https://gaurav-RM.github.io",
 base: '/gaurav-RM.github.io',
  integrations: [icon()],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

