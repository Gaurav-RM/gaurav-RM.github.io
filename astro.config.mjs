import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import github from "@astrojs/github";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gaurav-rm.github.io/",

  output: "static",

  adapter: github(),

  integrations: [icon()],

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
