import { getPictApiKey } from "./modules/city_picture.js";
import { getCountries } from "./modules/countries.js";
import { getMode } from "./modules/mode.js";
import { getWeatherApiKey } from "./modules/weather.js";

getCountries();
getMode();

let pictApiKey = "cRYK1UNWamzF3f3MrVKYZ3DXDwA1HyNE8ggWYjpY6ms"

let weatherApiKey = "33540e55ad4298c6759091a17506103e"

getWeatherApiKey(weatherApiKey);
getPictApiKey(pictApiKey);