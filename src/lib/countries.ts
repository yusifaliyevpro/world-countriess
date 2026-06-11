import { RestCountries } from "@yusifaliyevpro/countries";

export const restCountries = new RestCountries({ apiKey: process.env.REST_COUNTRIES_API_KEY! });
