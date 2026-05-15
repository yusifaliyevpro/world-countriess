import { getCountries } from "@yusifaliyevpro/countries";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Countries from "@/components/Countries";
import PaginationUI from "@/components/Pagination";
import Search from "@/components/Search";
import { countriesPageFields } from "@/lib/fields";
import { sharedMetdata } from "@/lib/shared-metadata";
import { routing, validateLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
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

export default async function Home({ params }: PageProps<"/[locale]">) {
  "use cache";
  cacheLife("weeks");

  const { locale } = await params;
  validateLocale(locale);
  const countries = await getCountries({ fields: countriesPageFields });
  if (!countries) notFound();
  const resultCount = Number(countries.length !== undefined ? countries.length : 0);

  return (
    <main className="mt-12 mb-10 min-h-svh">
      <Suspense
        fallback={
          <div>
            <div className="mx-auto mt-6 mb-4 h-11 w-75 animate-pulse rounded-full bg-gray-400 sm:w-125"></div>
          </div>
        }
      >
        <Search />
      </Suspense>
      <Suspense
        fallback={
          <div className="relative mt-5 flex w-full items-center justify-center rounded-xl">
            <div className="h-9 w-59 animate-pulse rounded-xl bg-gray-400"></div>
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
        <Suspense>
          <Countries countriess={countries} locale={locale} />
        </Suspense>
      </motion.div>
    </main>
  );
}
