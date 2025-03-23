import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aphrasis",
    short_name: "Aphrasis",
    theme_color: "#3454D1",
    lang: "en",
    background_color: "#3454D1",
    start_url: "https://2b8f-103-4-222-252.ngrok-free.app",
    scope: "https://2b8f-103-4-222-252.ngrok-free.app",
    launch_handler: {
      client_mode: "focus-existing",
    },
    display_override: ["fullscreen", "window-controls-overlay"],
    display: "standalone",
    id: "7272005",
    dir: "ltr",
    orientation: "portrait",
    categories: [
      "education",
      "lifestyle",
      "navigation",
      "personalization",
      "productivity",
    ],
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}