import { defineFields } from "@yusifaliyevpro/countries";

export const countryPageFields = defineFields([
  "names",
  "codes",
  "borders",
  "region",
  "capitals",
  "currencies",
  "population",
  "flag",
  "tlds",
  "languages",
  "subregion",
  "flag",
  "timezones",
  "landlocked",
  "classification",
  "memberships",
  "cars",
  "coordinates",
]);

export const countriesPageFields = defineFields(["names", "flag", "capitals", "region", "population", "codes"]);
