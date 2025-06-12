import Countries from "@/components/Countries";
import PaginationUI from "@/components/Pagination";
import Search from "@/components/Search";
import { CountriesSkeleton } from "@/components/SuspenseLayouts";
import { Locales, routing } from "@/i18n/routing";
import { countriesPageFields } from "@/lib/fields";
import { sharedMetdata } from "@/lib/shared-metadata";
import { getCountries } from "@yusifaliyevpro/countries";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type HomePageProps = { params: Promise<{ locale: Locales }> };

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  return {
    title: `${t("Home.MetaData.title")} | World Countriess`,
    description: t("About.MetaData.description"),
    alternates: {
      canonical: `/`,
      languages: {
        "en-US": `/en`,
        "en-GB": `/en`,
        "az-AZ": `/az`,
      },
    },
    openGraph: {
      ...sharedMetdata.openGraph,
      title: `${t("Home.MetaData.title")} | World Countriess`,
      description: t("About.MetaData.description"),
      url: `/${locale}`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const countries = await getCountries(
    { fields: countriesPageFields },
    { next: { revalidate: 30 * 24 * 3600 }, cache: "force-cache" },
  );
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
