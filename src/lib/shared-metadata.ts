import { BASE_URL } from "./constants";
import { Metadata } from "next";

const creator = "Yusif Aliyev";
const applicationName = "World Countriess";

export const sharedMetdata = {
  metadataBase: new URL(BASE_URL),
  applicationName: applicationName,
  title: {
    default: "World Countriess",
    template: "%s | World Countriess",
  },
  creator: creator,
  publisher: "Vercel Hosting",
  generator: "Next.js",
  robots: { follow: true, googleBot: { follow: true, index: true }, index: true },
  authors: [{ name: creator, url: "https://yusifaliyevpro.com" }],
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/icon.ico",
    other: { rel: "apple-touch-icon-precomposed", url: "/icon.ico" },
  },
  openGraph: {
    title: applicationName,
    countryName: "Azerbaijan",
    locale: "az_AZ",
    type: "article",
    url: "/",
    images: [{ alt: `${applicationName} Logo`, height: 500, url: "/World-countriess.png", width: 500 }],
  },
  keywords: [
    "World-Countriess",
    "countries",
    "world",
    applicationName,
    "countries information",
    "country flags",
    "yusifaliyevpro",
    "YusifAliyevPro",
    "yusifaliyevpro.com",
    "Yusif Aliyev",
    "yusifaliyevpro",
    "Yusif Aliyev Pro",
    "Full-Stack Developer",
    "Developer",
    "Web Developer",
    "NextJS Developer",
    "Azerbaijan",
  ],
  other: { "google-site-verification": "HNjp-JRQToNMjuOEzQ7iFVr2h4sZi4q26x4Tli62gow" },
} as const satisfies Metadata;
