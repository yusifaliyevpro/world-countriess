import * as motion from "motion/react-client";
import { Metadata, Route } from "next";
import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { JSX } from "react";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaNpm, FaReact } from "react-icons/fa";
import { SiHeroui, SiNextdotjs, SiVercel } from "react-icons/si";
import { TbApi, TbBrandFramerMotion } from "react-icons/tb";
import { sharedMetdata } from "@/lib/shared-metadata";
import { locales } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About.MetaData");
  return {
    title: t("title"),
    alternates: {
      canonical: `/about`,
      languages: {
        "en-US": `/en/about`,
        "en-GB": `/en/about`,
        "az-AZ": `/az/about`,
      },
    },
    description: t("description"),
    keywords: sharedMetdata.keywords,
    openGraph: {
      title: `${t("title")} | World Countriess`,
      images: sharedMetdata.openGraph.images,
      url: "/about",
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 100, delay, duration: 0.5 },
});

export default async function About() {
  "use cache";
  cacheLife("max");

  const t = await getTranslations("About");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-12 text-center lg:py-20 lg:text-left">
      <motion.h1
        {...fadeUp(0.2)}
        className="bg-linear-to-r from-[rgba(0,57,181,1)] via-[rgba(10,107,222,1)] to-[rgba(0,130,255,1)] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
      >
        {t("aboutTheProject")}
      </motion.h1>

      <motion.p
        {...fadeUp(0.45)}
        className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300"
      >
        {t("text1")}
      </motion.p>

      <motion.h2 {...fadeUp(0.7)} className="mt-14 text-2xl font-bold sm:text-3xl">
        {t("toolsIUsed")}
      </motion.h2>

      <ul className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {tools.map((tool, index) => (
          <motion.li
            key={tool.name}
            {...fadeUp(0.9 + index * 0.08)}
            whileHover={{ y: -4, scale: 1.03 }}
            className="list-none"
          >
            <Link
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-blue-400 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-blue-500 dark:hover:bg-gray-900"
            >
              <span className="text-5xl sm:text-6xl">{tool.icon}</span>
              <span className="line-clamp-2 text-center text-xs leading-tight font-medium break-all">{tool.name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className="mt-14 flex w-full flex-col gap-5">
        {links.map((item, index) => (
          <motion.p
            key={item.t}
            {...fadeUp(1.6 + index * 0.15)}
            className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
          >
            {t(item.t)}
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              {item.linkText}
            </Link>
          </motion.p>
        ))}
      </div>
    </main>
  );
}

type Tool = {
  name: string;
  link: Route;
  icon: JSX.Element;
};

const tools: Tool[] = [
  { name: "NextJS", link: "https://nextjs.org/", icon: <SiNextdotjs /> },
  { name: "Vercel", link: "https://vercel.com/", icon: <SiVercel /> },
  { name: "Countries API", link: "https://restcountries.com/", icon: <TbApi /> },
  {
    name: "@yusifaliyevpro/countries",
    link: "https://www.npmjs.com/package/@yusifaliyevpro/countries",
    icon: <FaNpm />,
  },
  { name: "HeroUI", link: "https://heroui.com/", icon: <SiHeroui /> },
  { name: "Tailwind CSS", link: "https://tailwindcss.com/", icon: <BiLogoTailwindCss className="text-[#38bdf8]" /> },
  {
    name: "React Icons",
    link: "https://react-icons.github.io/react-icons/",
    icon: <FaReact className="text-[#e91e63]" />,
  },
  { name: "Framer Motion", link: "https://www.framer.com/motion/", icon: <TbBrandFramerMotion /> },
];

type LinkItem = {
  t: string;
  linkText: string;
  link: Route;
};

const links: LinkItem[] = [
  { t: "text2", linkText: "Rest Countries Demo", link: "https://rest-api-countries-with-react.netlify.app/" },
  {
    t: "text3",
    linkText: "@yusifaliyevpro/countries",
    link: "https://www.npmjs.com/package/@yusifaliyevpro/countries",
  },
  { t: "myCodes", linkText: "World Countriess Repository", link: "https://github.com/yusifaliyevpro/world-countriess" },
  { t: "buyACoffee", linkText: "kofe.al/@yusifaliyevpro", link: "https://kofe.al/@yusifaliyevpro" },
];
