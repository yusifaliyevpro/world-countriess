import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "World Countriess",
    short_name: "World Countriess",
    description: "World Countriess is a website which you can get information about countries all around world",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007bff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/en/icon.png",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
