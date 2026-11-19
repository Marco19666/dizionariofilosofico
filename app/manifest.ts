import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dizionario filosofico",
    short_name: "Dizionario",
    description: "Storia universale del pensiero: autori, idee e tradizioni filosofiche.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#334c43",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }]
  };
}
