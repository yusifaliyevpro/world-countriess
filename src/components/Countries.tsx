"use client";

import { CountryPicker } from "@yusifaliyevpro/countries/types";
import Fuse from "fuse.js";
import countriesTranslation from "i18n-iso-countries";
import azeLocale from "i18n-iso-countries/langs/az.json";
import turLocale from "i18n-iso-countries/langs/tr.json";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import { useMemo } from "react";
import { countriesPageFields } from "@/lib/fields";
import { searchParams } from "@/lib/searchParams";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";

type CountriesProps = {
  countriess: CountryPicker<typeof countriesPageFields>[];
  locale: Locale;
};

export default function Countries({ countriess, locale }: CountriesProps) {
  const [searchQuery] = useQueryState("q", searchParams.q);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [pageQuery] = useQueryState("p", searchParams.p);

  countriesTranslation.registerLocale(azeLocale);
  countriesTranslation.registerLocale(turLocale);

  const t = useTranslations("Country");

  const countries = useMemo(
    () =>
      countriess.map((country) => ({
        ...country,
        name: {
          ...country.names,
          officialAze: countriesTranslation.getName(country.codes.alpha_3, "az"),
        },
      })),
    [countriess],
  );

  const fuse = useMemo(
    () =>
      new Fuse(countries, {
        keys: ["name.common", "name.official", "name.officialAze", "capital"],
        threshold: 0.4,
      }),
    [countries],
  );

  const filteredCountries = (() => {
    if (!debouncedSearchQuery)
      return [...countries]
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .slice((pageQuery - 1) * 30, pageQuery * 30);

    return fuse.search(debouncedSearchQuery).map((r) => r.item);
  })();

  if (filteredCountries.length === 0) {
    return (
      <div className="justify-content-center mx-2.5 flex min-h-[60dvh] flex-wrap items-center justify-center gap-x-10 text-3xl">
        There is no match for your search
      </div>
    );
  }
  return (
    <div className="justify-content-center mx-4 flex flex-wrap items-center justify-center gap-x-10">
      <AnimatePresence>
        {filteredCountries.map((country, i) => (
          <motion.div
            key={country.codes.alpha_3}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            initial={{ opacity: 0, y: 200 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link
                className="justify-content-center relative mt-10 inline-block w-81.25 items-center justify-center rounded-xl bg-gray-200 text-center shadow-medium select-none"
                href={`/${country.codes.alpha_3.toLowerCase()}`}
              >
                <div className="relative">
                  <Image
                    alt={country.flag.description || "Country Flag"}
                    className="h-46.25 w-full rounded-t-xl object-cover"
                    height={185}
                    src={country.flag.url_svg}
                    width={325}
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                </div>
                <p className="my-3 mr-6 ml-8 truncate text-left text-2xl font-bold text-black">
                  {countriesTranslation.getName(country.codes.alpha_3, locale) || country.names.common}
                </p>
                <p className="text-md my-3 ml-8 text-left text-slate-900">
                  <span className="font-bold">{t("capital")} </span> {country.capitals[0].name}
                </p>
                <p className="text-md my-3 ml-8 text-left text-slate-900">
                  <span className="font-bold">{t("region")} </span>{" "}
                  {t(`Continents.${country.region.toLowerCase()}`) || country.region}
                </p>
                <p className="text-md my-3 ml-8 text-left text-slate-900">
                  <span className="font-bold">{t("population")} </span> {country.population.toLocaleString(locale)}
                </p>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
