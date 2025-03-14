import { BASE_URL } from "@/lib/constants";
import { getCountries } from "@yusifaliyevpro/countries";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countriesData = await getCountries(
    { fields: ["cca3", "name"] },
    { next: { revalidate: 30 * 24 * 3600 }, cache: "force-cache" },
  );
  const sortedCountries = countriesData?.sort((a, b) => a.name.common.localeCompare(b.name.common)) || [];

  const countries = sortedCountries.map((country) => ({
    url: `${BASE_URL}/countries/${country.cca3.toLowerCase()}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["/", "/about"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...countries];
}
