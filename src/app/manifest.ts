import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amit Sharma | Software Engineer & AI/ML Developer",
    short_name: "Amit Sharma",
    description: "Personal portfolio of Amit Sharma, showcasing projects in AI/ML, Full Stack Web Development, and software engineering achievements.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/avatar.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/profile.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
