import { getPictApiKey } from "./modules/city_picture.js";
import { getCountries, getCountryApiKey } from "./modules/countries.js";
import { getMode } from "./modules/mode.js";
import { getWeatherApiKey } from "./modules/weather.js";

getCountries();
getMode();

/*
let pictApiKey = import.meta.env.VITE_PICTURES_API_KEY;
let weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
*/

let pictApiKey = "cRYK1UNWamzF3f3MrVKYZ3DXDwA1HyNE8ggWYjpY6ms"
let weatherApiKey = "33540e55ad4298c6759091a17506103e"

getWeatherApiKey(weatherApiKey);
getPictApiKey(pictApiKey);
getCountryApiKey(weatherApiKey);
