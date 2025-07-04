import { Locales, locales } from "@/i18n/routing";
import { sharedMetdata } from "@/lib/shared-metadata";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiNextui, SiVercel } from "react-icons/si";
import { TbApi, TbBrandFramerMotion } from "react-icons/tb";

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

type AboutPageProps = { params: Promise<{ locale: Locales }> };

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  return (
    <main className="relative mx-7 mt-9 flex items-center justify-center text-center sm:mx-0 lg:mt-0 lg:text-left">
      <div className="relative flex flex-col gap-y-6 rounded-lg p-0 sm:w-[800px] lg:p-12">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[rgba(0,57,181,1)] from-0% via-[rgba(10,107,222,1)] via-50% to-[rgba(0,130,255,1)] to-100% bg-clip-text text-center text-3xl font-bold text-transparent lg:mb-2"
          initial={{ opacity: 0, y: -30 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.5,
            duration: 0.5,
          }}
        >
          {t("aboutTheProject")}
        </motion.h2>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -30 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.8,
            duration: 0.5,
          }}
        >
          {t("text1")}
        </motion.p>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 flex text-2xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 1.4,
            duration: 0.5,
          }}
        >
          {t("toolsIUsed")}
        </motion.p>
        <div className="relative my-8 flex select-none flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:flex-row">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -30 }}
              transition={{
                type: "spring",
                duration: 0.3,
                delay: 1.8 + (index + 1) * 0.3,
                stiffness: 80,
              }}
            >
              <p className="flex flex-col items-center justify-center gap-y-2 rounded-xl p-3 shadow-large drop-shadow-2xl hover:bg-gray-100">
                <span>{tool.name}</span>
                {tool.icon && tool.icon}
              </p>
            </motion.div>
          ))}
        </div>
        {texts.map((text, index) => (
          <motion.p
            key={index}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -30 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 3.7 + (index + 1) * 0.6,
              duration: 0.6,
            }}
          >
            {t(text.t)}
            <Link className="text-nowrap text-blue-600 hover:text-blue-800" href={text.link} target="_blank">
              {text.linkText}
            </Link>
          </motion.p>
        ))}
      </div>
    </main>
  );
}

const tools = [
  {
    name: "NextJS 15",
    link: "https://nextjs.org/",
    icon: <SiNextdotjs className="text-7xl" />,
  },
  {
    name: "Vercel Hosting",
    link: "https://vercel.com/",
    icon: <SiVercel className="text-7xl" />,
  },
  {
    name: "Countries API",
    link: "https://restcountries.com/",
    icon: <TbApi className="text-7xl" />,
  },
  {
    name: "NextUI",
    link: "https://nextui.org/",
    icon: <SiNextui className="text-8xl sm:text-7xl" />,
  },
  {
    name: "Tailwind CSS",
    link: "https://tailwindcss.com/",
    icon: <BiLogoTailwindCss className="text-8xl text-[#38bdf8]" />,
  },
  {
    name: "React Icons",
    link: "https://react-icons.github.io/react-icons/",
    icon: <FaReact className="text-8xl text-[#e91e63]" />,
  },
  {
    name: "Framer Motion",
    link: "https://www.framer.com/motion/",
    icon: <TbBrandFramerMotion className="text-8xl" />,
  },
];

const texts = [
  {
    t: "text2",
    linkText: "Rest Countries Demo",
    link: "https://rest-api-countries-with-react.netlify.app/",
  },
  {
    t: "text3",
    linkText: "@yusifaliyevpro/countries",
    link: "https://www.npmjs.com/package/@yusifaliyevpro/countries",
  },
  {
    t: "myCodes",
    linkText: "World Countriess Repository",
    link: "https://github.com/YusifAliyevPro/World-Countries",
  },
  {
    t: "buyACoffee",
    linkText: "kofe.al/@yusifaliyevpro",
    link: "https://kofe.al/@yusifaliyevpro",
  },
];
