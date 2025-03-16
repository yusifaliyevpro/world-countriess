"use client";

import CoatofArmy from "./CoatofArmy";
import MapModal from "./Map";
import { countryPageFields } from "@/lib/fields";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { CountryPicker } from "@yusifaliyevpro/countries/types";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";

export function ShowMore({ country }: { country: CountryPicker<typeof countryPageFields> }) {
  const t = useTranslations("Country.MoreInfo");
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 w-full sm:w-3/5"
      initial={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.8,
        delay: country.borders ? 4.2 : 3.4,
        type: "spring",
        stiffness: 100,
      }}
    >
      <Accordion>
        <AccordionItem
          key="1"
          aria-label={t("moreInfo")}
          classNames={{
            title: "font-bold text-blue-500 hover:text-blue-600",
            indicator: "text-2xl font-bold text-blue-600",
            heading: "w-fit",
          }}
          title={t("moreInfo")}
        >
          <div className="flex flex-col justify-between text-base sm:flex-row">
            <div className="mb-10 flex flex-col gap-y-1 sm:gap-y-2">
              <p className="font-bold">
                {t("officialName")} <span className="font-normal">{country.name.official}</span>
              </p>
              <p className="text-nowrap font-bold">
                {t("isCountryIndependent")} <span className="font-normal">{country.independent ? t("yes") : t("no")}</span>
              </p>
              <p className="font-bold">
                {t("timezones")}{" "}
                <span className="line-clamp-1 font-normal" title={country.timezones.join(", ")}>
                  {country.timezones.map((timezone, index) => (
                    <span key={index} className="">
                      {index > 0 && ", "}
                      <span>{timezone}</span>
                    </span>
                  ))}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="font-bold">
                {t("traffic")}{" "}
                <span className="font-normal">{country.car.side === "right" ? t("rightHand") : t("leftHand")}</span>
              </p>
              <p className="text-nowrap font-bold">
                {t("isCountryLandlocked")} <span className="font-normal">{country.landlocked ? t("yes") : t("no")}</span>
              </p>
              <p className="mr-5 font-bold" title={t("unAbbr")}>
                {t("memberUN")}: <span className="font-normal"> {country.unMember ? t("yes") : t("no")}</span>
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-y-4 sm:mt-0 sm:flex-row sm:gap-y-0">
            <MapModal latlng={country.latlng[0]} latlng2={country.latlng[1]} />
            {country.coatOfArms.svg && <CoatofArmy alt={country.flags.alt || "Country Flag"} src={country.coatOfArms.svg} />}
          </div>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
