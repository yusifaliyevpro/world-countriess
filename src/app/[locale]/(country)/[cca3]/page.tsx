import { getCountryByCode } from "@yusifaliyevpro/countries";
import countries from "i18n-iso-countries";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CountryUI } from "@/components/CountryUI";
import { countryPageFields } from "@/lib/fields";
import { sharedMetdata } from "@/lib/shared-metadata";
import { Locale, routing } from "@/i18n/routing";

export type CountryPageProps = { params: Promise<{ cca3: string; locale: Locale }> };

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  "use cache";
  cacheLife("weeks");

  const { locale, cca3 } = await params;
  const country = await getCountryByCode({ code: cca3, fields: countryPageFields });
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, cca3: "aze" }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  "use cache";
  cacheLife("weeks");

  const { locale, cca3 } = await params;
  const country = await getCountryByCode({ code: cca3, fields: countryPageFields });
  if (!country) return notFound();

  return (
    <main className="min-h-svh">
      <Breadcrumb cca3={country.cca3} countryName={countries.getName(country.cca2, locale) || "Country Name"} />
      <CountryUI country={country} locale={locale} />
    </main>
  );
}
