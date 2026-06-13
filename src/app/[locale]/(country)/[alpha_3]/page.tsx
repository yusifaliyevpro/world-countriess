import countries from "i18n-iso-countries";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CountryUI } from "@/components/CountryUI";
import { restCountries } from "@/lib/countries";
import { countryPageFields } from "@/lib/fields";
import { sharedMetdata } from "@/lib/shared-metadata";
import { Locale, routing } from "@/i18n/routing";

export type CountryPageProps = { params: Promise<{ alpha_3: string; locale: Locale }> };

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  "use cache";
  cacheLife("weeks");

  const { locale, alpha_3 } = await params;
  const { success, country } = await restCountries.getCountryByCode({ alpha_3, fields: countryPageFields });
  if (!success) return notFound();

  return {
    title: country.names.common,
    description: `${country.names.official}`,
    alternates: {
      canonical: `/countries/${country.codes.alpha_3}`,
      languages: {
        "en-US": `/en/countries/${country.codes.alpha_3}`,
        "en-GB": `/en/countries/${country.codes.alpha_3}`,
        "az-AZ": `/az/countries/${country.codes.alpha_3}`,
      },
    },
    keywords: [`${country.names.common}`, `${country.names.official}`, ...sharedMetdata.keywords],
    openGraph: {
      title: `${country.names.common} | World Countriess`,
      url: `/${locale}/countries/${country.codes.alpha_3}`,
      description: `${country.names.official}`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, alpha_3: "aze" }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  "use cache";
  cacheLife("weeks");

  const { locale, alpha_3 } = await params;
  const { success, country } = await restCountries.getCountryByCode({ alpha_3, fields: countryPageFields });
  if (!success) return notFound();

  return (
    <main className="min-h-svh">
      <Breadcrumb
        alpha_3={country.codes.alpha_3}
        countryName={countries.getName(country.codes.alpha_2, locale) || "Country Name"}
      />
      <CountryUI country={country} locale={locale} />
    </main>
  );
}
