import { countries } from "country-data-list";

export const models = [
  { id: 1, name: "Replicate" },
  { id: 2, name: "Katie Rodgers" },
  { id: 3, name: "Open AI" },
  { id: 4, name: "SDXL" },
];

export const countryNames = countries.all.map((country, idx) => {
  return {
    id: idx + 1,
    name: country.name,
  };
});
