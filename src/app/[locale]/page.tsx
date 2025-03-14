import Countries from "@/components/Countries";
import PaginationUI from "@/components/Pagination";
import Search from "@/components/Search";
import { CountriesSkeleton } from "@/components/SuspenseLayouts";
import { Locales, routing } from "@/i18n/routing";
import { getCountriesForHomePage } from "@/lib/utils";
import * as motion from "motion/react-client";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locales }> }) {
  const { locale } = await params;
  const t = await getTranslations("Home.MetaData");
  return {
    title: `${t("title")} | World Countriess`,
    url: `/${locale}`,
    alternates: {
      canonical: `/`,
      languages: {
        "en-US": `/en`,
        "en-GB": `/en`,
        "az-AZ": `/az`,
      },
    },
    openGraph: {
      title: `${t("title")} | World Countriess`,
      url: `/${locale}`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: Locales }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const countries = await getCountriesForHomePage();
  if (!countries) notFound();
  const resultCount = Number(countries.length !== undefined ? countries.length : 0);
  return (
    <main className="mb-10 mt-12 min-h-svh">
      <Suspense
        fallback={
          <div>
            <div className="mx-auto mb-4 mt-6 h-[44px] w-[300px] animate-pulse rounded-full bg-gray-400 sm:w-[500px]"></div>
          </div>
        }
      >
        <Search />
      </Suspense>
      <Suspense
        fallback={
          <div className="relative mt-5 flex w-full items-center justify-center rounded-xl">
            <div className="h-[36px] w-[236px] animate-pulse rounded-xl bg-gray-400"></div>
          </div>
        }
      >
        <PaginationUI count={resultCount} />
      </Suspense>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 600, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          duration: 1.5,
        }}
      >
        <Suspense fallback={<CountriesSkeleton />}>
          {resultCount !== 0 && <Countries countriess={countries} locale={locale} />}
        </Suspense>
      </motion.div>
    </main>
  );
}
