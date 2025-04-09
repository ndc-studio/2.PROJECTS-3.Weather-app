import { getPictApiKey } from "./modules/city_picture.js";
import { getCountries } from "./modules/countries.js";
import { getMode } from "./modules/mode.js";
import { getWeatherApiKey } from "./modules/weather.js";
import {VITE_PICTURES_API_KEY} from "../env.js";
import {VITE_WEATHER_API_KEY} from "../env.js";

getCountries();
getMode();

let pictApiKey = VITE_PICTURES_API_KEY;

let weatherApiKey = VITE_WEATHER_API_KEY;

// let pictApiKey = "cRYK1UNWamzF3f3MrVKYZ3DXDwA1HyNE8ggWYjpY6ms"

// let weatherApiKey = "33540e55ad4298c6759091a17506103e"

getWeatherApiKey(weatherApiKey);
getPictApiKey(pictApiKey);