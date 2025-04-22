import Share from "./Share";
import { ShowMore } from "./ShowMore";
import { Locales } from "@/i18n/routing";
import { countryPageFields } from "@/lib/fields";
import { getCountriesByCodes } from "@yusifaliyevpro/countries";
import { CountryPicker } from "@yusifaliyevpro/countries/types";
import countries from "i18n-iso-countries";
import * as motion from "motion/react-client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function CountryUI({ country, locale }: { country: CountryPicker<typeof countryPageFields>; locale: Locales }) {
  if (!country) return null;
  const borderCountries = await getCountriesByCodes(
    { codes: country.borders as string[], fields: ["name", "cca3", "cca2"] },
    { next: { revalidate: 7 * 24 * 3600 }, cache: "force-cache" },
  );
  const t = await getTranslations("Country");

  return (
    <div className="relative mx-6 mt-5 flex flex-col sm:mx-16">
      <div className="relative mb-12 flex w-full flex-col-reverse justify-between sm:flex-row">
        <div className="items-left relative ml-3 flex flex-col text-left text-lg sm:max-w-[50%]">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 w-fit text-4xl font-bold sm:mt-0 sm:text-nowrap"
            initial={{ opacity: 0, y: -30 }}
            title={country.name.common}
            transition={{ duration: 1, delay: 1.4, type: "spring" }}
          >
            {countries.getName(country.cca3, locale) || country.name.common}
          </motion.h1>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-x-20 sm:flex-row"
            initial={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 2.2, type: "spring" }}
          >
            <div className="flex flex-col gap-y-1 sm:gap-y-2">
              <p className="mt-12 font-bold">
                {t("nativeName")}{" "}
                <span className="font-normal">
                  {country.name.nativeName ? Object.values(country.name.nativeName)[0]?.common : ""}
                </span>
              </p>
              <p className="font-bold">
                {t("region")}{" "}
                <span className="font-normal">{t(`Continents.${country.region.toLowerCase()}`) || country.region}</span>
              </p>
              <p className="truncate font-bold sm:max-w-[250px]">
                {t("capital")}{" "}
                <span className="font-normal" title={country.capital ? country.capital.join(", ") : ""}>
                  {country.capital ? country.capital.join(", ") : ""}
                </span>
              </p>
              <p className="font-bold">
                {t("currencies")}{" "}
                <span className="font-normal">{country.currencies && Object.values(country.currencies)[0]?.name}</span>
                <span>{country.currencies ? ` (${Object.values(country.currencies)[0]?.symbol})` : ""}</span>
              </p>
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
              <p className="mt-12 font-bold">
                {t("population")} <span className="font-normal">{country.population.toLocaleString(locale)}</span>
              </p>
              <p className="font-bold">
                {t("subRegion")} <span className="font-normal">{country.subregion}</span>
              </p>
              <p className="font-bold sm:max-w-[230px] sm:truncate">
                {t("topLevelDomain")}{" "}
                <span className="font-normal" title={country.tld ? Object.values(country.tld).join(", ") : ""}>
                  {" "}
                  {country.tld ? Object.values(country.tld).join(", ") : ""}
                </span>
              </p>
              <p className="font-bold sm:max-w-[200px] sm:truncate">
                {t("languages")}{" "}
                <span className="font-normal" title={country.languages ? Object.values(country.languages).join(", ") : ""}>
                  {" "}
                  {country.languages ? Object.values(country.languages).join(", ") : ""}
                </span>
              </p>
            </div>
          </motion.div>
          {borderCountries && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative flex flex-col items-start sm:mb-auto sm:mr-6 sm:max-w-[700px] sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 2.8, type: "spring" }}
            >
              <p className="mr-2 text-wrap font-bold">{t("borderCountries")} </p>
              <div className="relative mt-6 flex flex-row flex-wrap gap-2 sm:mr-5 sm:mt-auto">
                {borderCountries.map((country, i) => (
                  <Link
                    key={i}
                    className="flex-1 select-none text-nowrap rounded-lg border-1 border-solid p-2 text-center hover:border-black hover:text-neutral-600 sm:flex-none"
                    href={`/${locale}/${country.cca3.toLowerCase()}`}
                  >
                    <p className="font-normal">{countries.getName(country.cca3, locale) || country.name.common}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-5 flex h-auto flex-col items-end gap-y-6 bg-transparent sm:mx-0 sm:max-w-[50%]"
          initial={{ opacity: 0, y: -600 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            type: "spring",
            stiffness: 70,
          }}
        >
          <Image
            alt={country.flags.alt || "Country Flag"}
            className="h-auto select-none rounded-md object-cover shadow-large drop-shadow-2xl"
            height={300}
            src={country.flags.svg}
            width={550}
          />
          <div className="hidden lg:flex">
            <Share country={country} locale={locale} />
          </div>
        </motion.div>
      </div>
      <div className="flex select-none flex-col">
        {/* <div className="flex self-end lg:hidden">
          <Suspense fallback={<p>Loading...</p>}>
            <Share country={country} locale={locale} />
          </Suspense>
        </div> */}
        <ShowMore country={country} />
      </div>
    </div>
  );
}
