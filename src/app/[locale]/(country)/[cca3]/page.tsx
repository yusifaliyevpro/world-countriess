import { Breadcrumb } from "@/components/Breadcrumb";
import { CountryUI } from "@/components/CountryUI";
import { CountrySkeleton } from "@/components/SuspenseLayouts";
import { Locales } from "@/i18n/routing";
import { countryPageFields } from "@/lib/fields";
import { sharedMetdata } from "@/lib/shared-metadata";
import { getCountryByCode } from "@yusifaliyevpro/countries";
import countries from "i18n-iso-countries";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export type CountryPageProps = { params: Promise<{ cca3: string; locale: Locales }> };

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { locale, cca3 } = await params;
  const country = await getCountryByCode(
    { code: cca3, fields: countryPageFields },
    { next: { revalidate: 30 * 24 * 3600 }, cache: "force-cache" },
  );
  if (!country) return notFound();

  return {
    title: country.name.common,
    description: `${country.name.official}`,
    alternates: {
      canonical: `/countries/${country.cca3}`,
      languages: {
        "en-US": `/en/countries/${country.cca3}`,
        "en-GB": `/en/countries/${country.cca3}`,
        "az-AZ": `/az/countries/${country.cca3}`,
      },
    },
    keywords: [`${country.name.common}`, `${country.name.official}`, ...sharedMetdata.keywords],
    openGraph: {
      title: `${country.name.common} | World Countriess`,
      url: `/${locale}/countries/${country.cca3}`,
      description: `${country.name.official}`,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { locale, cca3 } = await params;
  setRequestLocale(locale);
  const country = await getCountryByCode(
    { code: cca3, fields: countryPageFields },
    { next: { revalidate: 30 * 24 * 3600 }, cache: "force-cache" },
  );
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
