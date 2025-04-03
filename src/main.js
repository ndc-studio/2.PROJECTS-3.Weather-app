import { getPictApiKey } from "./modules/city_picture.js";
import { getCountries } from "./modules/countries.js";
import { getMode } from "./modules/mode.js";
import { getWeatherApiKey } from "./modules/weather.js";

getCountries();
getMode();

let pictApiKey = import.meta.env.VITE_PICTURES_API_KEY
let weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

getWeatherApiKey(weatherApiKey);
getPictApiKey(pictApiKey);