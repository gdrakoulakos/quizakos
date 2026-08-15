export default function manifest() {
  return {
    name: "Quizakos",
    short_name: "Quizakos",
    description:
      "Διαδραστικά κουίζ για παιδιά του Δημοτικού και μαθητές Ωδείων.",
    start_url: "/",
    display: "standalone",
    background_color: "#4c347c",
    theme_color: "#4c347c",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
