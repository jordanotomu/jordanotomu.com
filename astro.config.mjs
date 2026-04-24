import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
    output: "server",
    adapter: vercel({
        webAnalytics: { enabled: false },
    }),
    site: "https://jordanotomu.com",
    trailingSlash: "never",
    build: {
        format: "file",
    },
    prefetch: {
        prefetchAll: false,
        defaultStrategy: "hover",
    },
});
