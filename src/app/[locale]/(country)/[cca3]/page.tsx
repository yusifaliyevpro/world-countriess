import { Breadcrumb } from "@/components/Breadcrumb";
import CountryUI from "@/components/Country";
import { CountrySkeleton } from "@/components/SuspenseLayouts";
import { Locales } from "@/i18n/routing";
import { getCountryForPage } from "@/lib/utils";
import countries from "i18n-iso-countries";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ cca3: string; locale: Locales }> }) {
  const { locale, cca3 } = await params;
  const country = await getCountryForPage({ cca3 });
  if (!country) return notFound();

  return {
    title: `${country ? country.name.common : "Loading..."}`,
    url: `/${locale}/countries/${country.cca3}`,
    description: `${country.name.official}`,
    alternates: {
      canonical: `/countries/${country.cca3}`,
      languages: {
        "en-US": `/en/countries/${country.cca3}`,
        "en-GB": `/en/countries/${country.cca3}`,
        "az-AZ": `/az/countries/${country.cca3}`,
      },
    },
    keywords: [
      "countries",
      `${country.name.common}`,
      `${country.name.official}`,
      "world",
      "World-Countriess",
      "World Countriess",
      "world countriess",
      "countries information",
      "country flags",
      "filmisbest.com",
      "filmisbest",
      "yusifaliyevpro",
      "yusifaliyevpro.com",
      "yusifaliyev",
      "yusif",
      "aliyev",
    ],
    openGraph: {
      title: `${country.name.common} | World Countriess`,
      url: `/${locale}/countries/${country.cca3}`,
      description: `${country.name.official}`,
      type: "website",
    },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ cca3: string; locale: Locales }> }) {
  const { locale, cca3 } = await params;
  setRequestLocale(locale);
  const country = await getCountryForPage({ cca3 });
  if (!country) return notFound();

  return (
    <main className="min-h-svh">
      <Suspense fallback={<p>Loading...</p>}>
        <Breadcrumb cca3={country.cca3} countryName={countries.getName(country.cca2, locale) || "Country Name"} />
      </Suspense>
      <Suspense fallback={<CountrySkeleton />}>
        <CountryUI country={country} locale={locale} />
      </Suspense>
    </main>
  );
}
