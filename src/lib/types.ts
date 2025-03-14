import { getCountriesForHomePage, getCountryForPage } from "./utils";

export type CountryForPage = Exclude<Awaited<ReturnType<typeof getCountryForPage>>, null>;
export type CountriesForHomePage = Exclude<Awaited<ReturnType<typeof getCountriesForHomePage>>, null>;
