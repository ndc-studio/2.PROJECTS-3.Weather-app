import { getAllCountries } from "./countries.js";
import { getMode } from "./mode.js";

export function createCompareSpace() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <h1>Weather, wherever you are, whenever you want..</h1>
        <select id="mode">
          <option id="weather">Weather forecasts</option>
          <option id="compare">Compare</option>
        </select>
        <form id="form-1">
          <p class="slogan"><i class="fa fa-arrow-down" aria-hidden="true"></i> Enter two city names to get to compare weather forecast. <i class="fa fa-arrow-down" aria-hidden="true"></i></p>
          <input type="text" id="input-1">
          <input type="text" id="input-2">
          <button type="submit" id="submit1"><i class="fas fa-search"></i> Search</button>
        </form>
    `
    getAllCountries();
    getMode();
};

