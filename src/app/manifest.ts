import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "bobi. — O jeito divertido de aprender impressão 3D",
    short_name: "bobi.",
    description: "Microlições e desafios para aprender impressão 3D, sem precisar de impressora.",
    lang: "pt-BR",
    start_url: "/trilha",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFF8EE",
    theme_color: "#FD7301",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
