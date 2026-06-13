import { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { BASE_URL } from "@/lib/constants";
import { restCountries } from "@/lib/countries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("max");

  const { success, countries: countriesData } = await restCountries.getCountries({ fields: ["codes", "names"] });
  const sortedCountries = success ? countriesData.sort((a, b) => a.names.common.localeCompare(b.names.common)) : [];

  const countries = sortedCountries.map((country) => ({
    url: `${BASE_URL}/countries/${country.codes.alpha_3.toLowerCase()}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["/", "/about"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...countries];
}
