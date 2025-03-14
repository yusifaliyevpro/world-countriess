import { getCountries, getCountryByCode } from "@yusifaliyevpro/countries";

export async function getCountryForPage({ cca3 }: { cca3: string }) {
  const country = await getCountryByCode(
    {
      code: cca3,
      fields: [
        "name",
        "cca3",
        "cca2",
        "borders",
        "region",
        "capital",
        "currencies",
        "population",
        "flags",
        "tld",
        "languages",
        "subregion",
        "flag",
        "independent",
        "timezones",
        "landlocked",
        "unMember",
        "car",
        "latlng",
        "coatOfArms",
      ],
    },
    { next: { revalidate: 30 * 24 * 3600 }, cache: "force-cache" },
  );
  return country;
}

export async function getCountriesForHomePage() {
  const countries = await getCountries(
    {
      fields: ["name", "flags", "translations", "capital", "region", "population", "cca2", "cca3"],
    },
    { next: { revalidate: 30 * 24 * 3600 }, cache: "force-cache" },
  );
  return countries;
}
