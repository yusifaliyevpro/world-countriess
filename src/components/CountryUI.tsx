import { CountryPicker } from "@yusifaliyevpro/countries/types";
import countries from "i18n-iso-countries";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { restCountries } from "@/lib/countries";
import { countryPageFields } from "@/lib/fields";
import { Locale } from "@/i18n/routing";
import Share from "./Share";
import { ShowMore } from "./ShowMore";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 120, damping: 20, delay },
});

export async function CountryUI({
  country,
  locale,
}: {
  country: CountryPicker<typeof countryPageFields>;
  locale: Locale;
}) {
  "use cache";
  cacheLife("weeks");

  if (!country) notFound();

  const borderCountries = await Promise.all(
    country.borders?.map((code) =>
      restCountries.getCountryByCode({
        code: code,
        fields: ["names", "codes"],
      }),
    ) || [],
  );

  const t = await getTranslations("Country");

  const infoLeft = [
    {
      label: t("nativeName"),
      value: country.names.native ? Object.values(country.names.native)[0]?.common : "—",
    },
    { label: t("region"), value: t(`Continents.${country.region.toLowerCase()}`) || country.region },
    { label: t("capital"), value: country.capitals.flatMap((c) => c.name)?.join(", ") || "—" },
    {
      label: t("currencies"),
      value: country.currencies
        ? `${Object.values(country.currencies)[0]?.name} (${Object.values(country.currencies)[0]?.symbol})`
        : "—",
    },
  ];

  const infoRight = [
    { label: t("population"), value: country.population.toLocaleString(locale) },
    { label: t("subRegion"), value: country.subregion || "—" },
    { label: t("topLevelDomain"), value: country.tlds?.join(", ") || "—" },
    { label: t("languages"), value: country.languages ? Object.values(country.languages).join(", ") : "—" },
  ];

  return (
    <div className="mx-6 mt-5 sm:mx-16">
      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Info panel */}
        <motion.div {...fadeUp(0.15)} className="flex flex-1 flex-col gap-6">
          <h1 className="text-3xl font-bold sm:text-4xl" title={country.names.common}>
            {countries.getName(country.codes.alpha_3, locale) || country.names.common}
          </h1>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <dl className="flex flex-col gap-2">
              {infoLeft.map((item) => (
                <div key={item.label} className="flex flex-wrap gap-1 text-sm sm:text-base">
                  <dt className="font-semibold">{item.label}</dt>
                  <dd className="text-gray-600 dark:text-gray-400">{item.value}</dd>
                </div>
              ))}
            </dl>
            <dl className="flex flex-col gap-2">
              {infoRight.map((item) => (
                <div key={item.label} className="flex flex-wrap gap-1 text-sm sm:text-base">
                  <dt className="font-semibold">{item.label}</dt>
                  <dd className="max-w-48 truncate text-gray-600 dark:text-gray-400" title={item.value}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {borderCountries && borderCountries.length > 0 && (
            <div className="flex flex-wrap items-start gap-3">
              <span className="font-semibold">{t("borderCountries")}</span>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map(
                  (bc) =>
                    bc && (
                      <Link
                        key={bc.codes.alpha_3}
                        href={`/${locale}/${bc.codes.alpha_3.toLowerCase()}`}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:hover:border-blue-400 dark:hover:text-blue-400"
                      >
                        {countries.getName(bc.codes.alpha_3, locale) || bc.names.common}
                      </Link>
                    ),
                )}
              </div>
            </div>
          )}

          <ShowMore country={country} />
        </motion.div>

        {/* Flag + share */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col items-center gap-4 lg:w-[48%]">
          <Image
            alt={country.flag.description || "Country Flag"}
            className="h-auto w-full rounded-xl object-cover shadow-large drop-shadow-xl select-none"
            height={300}
            src={country.flag.url_svg || "/placeholder_flag.png"}
            width={550}
            priority
          />
          <div className="flex w-full justify-end">
            <Share country={country} locale={locale} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
