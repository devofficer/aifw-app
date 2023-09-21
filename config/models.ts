import { countries } from "country-data-list";

export const models = [
  { id: 0, name: "Choose" },
  { id: 1, name: "Midjourney" },
  { id: 2, name: "Stable Diffusion" },
  { id: 3, name: "OpenAI" },
  { id: 4, name: "Blue Willow" },
  { id: 5, name: "Leonardo" },
  { id: 6, name: "RunwayML" },
  { id: 7, name: "Other" },
];

export const countryNames = [
  { id: 0, name: "Choose" },
  ...countries.all.map((country, idx) => {
    return {
      id: idx + 1,
      name: country.name,
    };
  }),
];
