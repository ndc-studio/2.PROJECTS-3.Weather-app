import { getPicture } from "./city_picture.js";
import { getDate } from "./timestamp.js";

const apiKey = "33540e55ad4298c6759091a17506103e"; // Clé api

/**
 * 
 * @description -- Recupère l'id et la class de l'option selectionnée
 * 
 */
export function getCountryCode() {
    const div = document.getElementById('div-select-options'); // Récupère le <div> contenant le <select> et les <option>
    const select = document.getElementById('select_country'); // Récupère le <select>
    const selectedOption = select.options[select.selectedIndex]; // Cible l'option selectionnée par l'utilisateur
    const city = selectedOption.id; // Récupère l'Id de l'option (qui est le nom de la ville)
    const countryCode = selectedOption.classList[0]; // Récupère la class (qui, du coup est l'ISO)

    // debug
    console.log("city:", city);
    console.log("code:", countryCode);
   
    div.remove(); // Supprime la div après avoir récupéré les infos
    showWeather(city, countryCode); // Appelle la fonction show weather avec la ville et l'iso comme paramètre
};


let codes = [];
let cities = [];
/**
 * 
 * @description -- Recupère l'id et la class de l'option selectionnée
 * 
 */
export function getCode(id) {
    const select = document.getElementById(id); // Récupère le <select>
    const selectedOption = select.options[select.selectedIndex]; // Cible l'option selectionnée par l'utilisateur
    const city = selectedOption.id; // Récupère l'Id de l'option (qui est le nom de la ville)
    const countryCode = selectedOption.classList[0]; // Récupère la class (qui, du coup est l'ISO)

    // debug
    console.log("city:", city);
    console.log("code:", countryCode);
    cities.push(city);
    codes.push(countryCode);
};


export function submit() {
    codes = [];
    cities = [];
    let btn = document.getElementById('submit-compare');
    btn.style.display = "block";

    btn.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(codes);
        console.log(cities);
        getWeather1(codes[0], cities[0]);
        getWeather2(codes[1], cities[1]);     
    })
    
}


/**
 * 
 * @param {string} city 
 * @param {string} code 
 * @description -- Fait une requète api sur openweathermap pour récupérer la meteo de l'emplacement selectionné par l'utilisateur
 * 
 */
export function showWeather(city, code) {
    // requète api grâce a city et code qui sont respectivement name & country
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${code}&appid=${apiKey}`)
        // Récupère la réponse json
        .then(function(response) {
            console.log(response); // Debug
            return response.json(); // Renvoie la reponse de notre requete API
        })
        // recupère les données contenues dans la reponse
        .then(function(weather) {
            console.log(weather); // Debug
            weatherNow(weather, city); // Appelle weatherNow avec le nom de la ville et la réponse (Tableau d'objets json) comme paramètres
            showOtherForecasts(weather); // Appelle showOtherForecasts avec la réponse en paramètre
        })
        // Attrappe l'erreur en cas d'echec de la requète
        .catch(function(error) {
            console.error('Error fetching data:', error); //Envoie un message d'erreur dans la console
        });
};

/**
 * 
 * @description -- Permet d'afficher la meteo des 3h en cours
 * @param {JSON[Array]} response
 * @param {string} city 
 * 
 */
function weatherNow(response, city) {
    let array = response.list[0]; // Recupère l'array index 0 (la dernière portion de 3h en cours)
    const date = array.dt_txt; // Récupère la date tel qu'elle est enregistrée dans l'API
    const timestamp = array.dt; // Récupère le timestamp
    const temp = (array.main.temp - 273.15).toFixed(1); // Convertit en celsius
    const description = array.weather[0].description; // Récupère la description de l'objet
    const weather = array.weather[0].main; // Récupère la meteo globale (ex: Rain, Clear, Snow, etc..)
    const windSpeed = array.wind.speed; // Récupère la vitesse du vent en m / s  
    const humidity = array.main.humidity; // Récupère le taux d'humidité en %
    showWeatherNow(date, temp, description, weather, windSpeed, humidity, city, timestamp); // Appelle showWeatherNow avec toutes les infos récupérées
};

/**
 * 
 * @param {date} date 
 * @param {string} temp 
 * @param {string} desc 
 * @param {string} weather 
 * @param {number} wind 
 * @param {number} humidity 
 * @param {string} city
 * 
 * @description -- Crée et affiche la meteo sur la page web grâce a toutes les informations récupérées aupréalable
 * 
 */
function showWeatherNow(date, temp, desc, weather, wind, humidity, city, timestamp) {
    const main = document.getElementById('container'); // Récupère le main id="container"
    let div = document.getElementById('weather-today'); // Tente de récupérer l'élément <div> id="weather-today"

    // Si l'élément n'existe pas on le crée
    if (!div) {
        div = document.createElement('div'); // Crée un <div> 
        div.id = 'weather-today'; // Ajoute l'id="weather-today"
    }

    // Si il existe on le supprime avant d'en créer un nouveau
    else {
        div.remove(); // supprime l'element
        div = document.createElement('div'); // Crée un <div>
        div.id = 'weather-today'; // Ajoute l'id="weather-today"
    };

    let icon; //Initialise l'icon undefined

    // Récupère les images en fonction de la description de l'objet de la réponse
    if (desc.toLowerCase().trim() === 'few clouds' || desc.toLowerCase().trim() === 'scattered clouds') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/cloudy.png"; //Partiellement ensoleillé
    } else if (desc.toLowerCase().trim() === 'broken clouds' || desc.toLowerCase().trim() === 'overcast clouds') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/clouds.png"; // Nuageux 
    } else if (weather.toLowerCase().trim() === 'snow') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/snow.png"; // Neige
    } else if (weather.toLowerCase().trim() === 'rain') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/rainy.png"; // Pluie
    } else if (weather.toLowerCase().trim() === 'thunderstorm') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/thunder.png"; // Orage
    } else {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/sunny.png"; // ensoleillé par defaut
    };

    const day = getDate(timestamp);

    // Ajout tout le contenu du div pour afficher la meteo du moment css y compris
    div.innerHTML = `
        <img src="${icon}" class="ico">
        <p class="date"><i class="fa fa-calendar" aria-hidden="true"></i> ${city} ${day} ${date}</p>
        <p class="temp"><i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i> ${temp}°C</p>
        <p class="desc"><i class="fa fa-commenting" aria-hidden="true"></i> ${desc}</p>
        <p class="wind"><i class="fa fa-wind" aria-hidden="true"></i> ${wind} m/s</p>
        <p class="humidity"><i class="fa fa-tint" aria-hidden="true"></i> ${humidity}%</p>
    `
    // Ajoute le <div> au <main>
    main.appendChild(div);
    getPicture(city);
};
/**
 * 
 * @param {JSON[Array]} response 
 * @description -- Affiche la meteo toutes les 3h pour 5 jours
 * 
 */
function showOtherForecasts(response) {
    const main = document.getElementById('container'); // Récupère le <main>
    let divOtherForecasts = document.getElementById('other-forecasts'); // Tente de récupérer le <div id="other-forecasts">

    // Si l'element existe on le supprime
    if (divOtherForecasts) {
        divOtherForecasts.remove(); // Supprime l'élément
    };
    
    divOtherForecasts = document.createElement('div'); // Crée un <div>
    divOtherForecasts.id = 'other-forecasts'; // Lui attribuer l'id="other-forecasts"
    divOtherForecasts.style.overflowX = 'auto'; // Scroll horizontal
    divOtherForecasts.style.whiteSpace = 'nowrap'; // Évite le retour à la ligne
    divOtherForecasts.style.display = 'flex'; // Utilise flex pour les elements
    divOtherForecasts.style.gap = '6px'; // Ajoute un espace de 6px entre chaque elements
    divOtherForecasts.style.padding = '10px'; // Ajoute un espace de 10px entre le texte et le bord du cadre
    divOtherForecasts.style.width = '100%'; // Definit toute la largeur de l'ecran
    divOtherForecasts.style.maxHeight = '350px'; // Évite qu'il prenne trop de place

    // Itère chaque elements de la reponse de l'api
    response.list.forEach((forecast) => {
        const date = forecast.dt_txt; // Récupère la date telle qu'elle est enregistrée dans l'api
        const timestamp = forecast.dt; // Récupère le timestamp
        const temp = (forecast.main.temp - 273.15).toFixed(1); // Convertit en degrès celsius
        const desc = forecast.weather[0].description; // Récupère la description de la meteo
        const weatherType = forecast.weather[0].main; // Récupère le type de meteo (Rain, Clear, Snow, etc..)
        const wind = forecast.wind.speed; // Récupère la vitesse du vent en m / s
        const humidity = forecast.main.humidity; // Récupère le taux d'humidité en % 

        let icon; //Initialise l'icon undefined

        if (desc.toLowerCase().trim() === 'few clouds' || desc.toLowerCase().trim() === 'scattered clouds') {
            icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/cloudy.png"; //Partiellement ensoleillé
        } else if (desc.toLowerCase().trim() === 'broken clouds' || desc.toLowerCase().trim() === 'overcast clouds') {
            icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/clouds.png"; // Nuageux 
        } else if (weatherType.toLowerCase() === 'snow') {
            icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/snow.png"; // Neige
        } else if (weatherType.toLowerCase() === 'rain') {
            icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/rainy.png"; // Pluie
        } else if (weatherType.toLowerCase() === 'thunderstorm') {
            icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/thunder.png"; // Orage
        } else {
            icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/sunny.png"; // Ensoleillé par defaut
        };

        const day = getDate(timestamp); // Récupère le jour (ex: mon, tue, wed, etc..)
        const forecastDiv = document.createElement('div'); // Crée un div
        forecastDiv.className = 'forecast-card'; // Attribue une class="forecast-card"
        forecastDiv.style.border = '1px solid #ccc'; // Crée une bordure solide d'1px
        forecastDiv.style.borderRadius = '8px'; // Arrondis les bords de 8px
        forecastDiv.style.position = 'relative'; // Definit la position relative
        forecastDiv.style.margin = 'auto'; // Applique les marges par defaut
        forecastDiv.style.padding = '10px'; // Ajoute un espace de 10px entre de texte et les bords
        forecastDiv.style.textAlign = 'center'; // Aligne le texte au centre
        forecastDiv.style.width = '400px !important'; // Definit la largeur de l'element
        forecastDiv.style.height = '300px'; // Definit la hauteur de l'element
        forecastDiv.style.backgroundColor = 'rgb(255, 255, 255, 0.5)'; // Ajoute une couleur de fond blanc legerement transparent

        // Ajoute le contenu de l'élément
        forecastDiv.innerHTML = `
            <img src="${icon}" class="ico" style="width: 50px;">
            <p class="date"><i class="fa fa-calendar"></i> ${day} ${date}</p>
            <p class="temp"><i class="fa fa-thermometer-three-quarters"></i> ${temp}°C</p>
            <p class="desc"><i class="fa fa-commenting"></i> ${desc}</p>
            <p class="wind"><i class="fa fa-wind"></i> ${wind} m/s</p>
            <p class="humidity"><i class="fa fa-tint"></i> ${humidity}%</p>
        `;
        // Ajoute l'element au <div id="other-forecasts">
        divOtherForecasts.appendChild(forecastDiv);
    });
    // Ajoute le div contenant tout les éléments au <main>
    main.appendChild(divOtherForecasts);
};

function getWeather1(code, city) {
        // requète api grâce a city et code qui sont respectivement name & country
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${code}&appid=${apiKey}`)
        // Récupère la réponse json
        .then(function(response) {
            console.log(response); // Debug
            return response.json(); // Renvoie la reponse de notre requete API
        })
        // recupère les données contenues dans la reponse
        .then(function(weather) {
            console.log(weather); // Debug
            createCard1(weather, city); // Appelle weatherNow avec le nom de la ville et la réponse (Tableau d'objets json) comme paramètres
        })
        // Attrappe l'erreur en cas d'echec de la requète
        .catch(function(error) {
            console.error('Error fetching data:', error); //Envoie un message d'erreur dans la console
        });
};

function getWeather2(code, city) {
    // requète api grâce a city et code qui sont respectivement name & country
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${code}&appid=${apiKey}`)
        // Récupère la réponse json
        .then(function(response) {
            console.log(response); // Debug
            return response.json(); // Renvoie la reponse de notre requete API
        })
        // recupère les données contenues dans la reponse
        .then(function(weather) {
            console.log(weather); // Debug
            createCard2(weather, city); // Appelle weatherNow avec le nom de la ville et la réponse (Tableau d'objets json) comme paramètres
        })
        // Attrappe l'erreur en cas d'echec de la requète
        .catch(function(error) {
            console.error('Error fetching data:', error); //Envoie un message d'erreur dans la console
        });
};

function createCard1(response, c) {
    const main = document.getElementById('container');
    let div = document.getElementById('div-compare');

    let array = response.list[0]; // Recupère l'array index 0 (la dernière portion de 3h en cours)
    const date = array.dt_txt; // Récupère la date tel qu'elle est enregistrée dans l'API
    const timestamp = array.dt; // Récupère le timestamp
    const day = getDate(timestamp);
    const temp = (array.main.temp - 273.15).toFixed(1); // Convertit en celsius
    const desc = array.weather[0].description; // Récupère la description de l'objet
    const weatherType = array.weather[0].main; // Récupère la meteo globale (ex: Rain, Clear, Snow, etc..)
    const windSpeed = array.wind.speed; // Récupère la vitesse du vent en m / s  
    const humidity = array.main.humidity; // Récupère le taux d'humidité en %
    

    // Si l'élément n'existe pas on le crée
    if (!div) {
        div = document.createElement('div'); // Crée un <div> 
        div.id = 'div-1'; // Ajoute l'id="div-1"
    }

    // Si il existe on le supprime avant d'en créer un nouveau
    else {
        div.remove(); // supprime l'element
        div = document.createElement('div'); // Crée un <div>
        div.id = 'div-1'; // Ajoute l'id="div-1"
    };

    let icon; //Initialise l'icon undefined

    if (desc.toLowerCase().trim() === 'few clouds' || desc.toLowerCase().trim() === 'scattered clouds') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/cloudy.png"; //Partiellement ensoleillé
    } else if (desc.toLowerCase().trim() === 'broken clouds' || desc.toLowerCase().trim() === 'overcast clouds') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/clouds.png"; // Nuageux 
    } else if (weatherType.toLowerCase() === 'snow') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/snow.png"; // Neige
    } else if (weatherType.toLowerCase() === 'rain') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/rainy.png"; // Pluie
    } else if (weatherType.toLowerCase() === 'thunderstorm') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/thunder.png"; // Orage
    } else {
        icon = "/sunny.png"; // Ensoleillé par defaut
    };
    
    div.innerHTML =  `
    <img src="${icon}" class="ico" style="width: 50px;">
    <p class="date"><i class="fa fa-calendar"></i> ${c} ${day} ${date}</p>
    <p class="temp"><i class="fa fa-thermometer-three-quarters"></i> ${temp}°C</p>
    <p class="desc"><i class="fa fa-commenting"></i> ${desc}</p>
    <p class="wind"><i class="fa fa-wind"></i> ${windSpeed} m/s</p>
    <p class="humidity"><i class="fa fa-tint"></i> ${humidity}%</p>
    `;
    
    main.appendChild(div);
}

function createCard2(response, c) {     
    const main = document.getElementById('container'); 
    let div = document.getElementById('div-compare');

    let array = response.list[0]; // Recupère l'array index 0 (la dernière portion de 3h en cours)
    const date = array.dt_txt; // Récupère la date tel qu'elle est enregistrée dans l'API
    const timestamp = array.dt; // Récupère le timestamp
    const day = getDate(timestamp);
    const temp = (array.main.temp - 273.15).toFixed(1); // Convertit en celsius
    const desc = array.weather[0].description; // Récupère la description de l'objet
    const weatherType = array.weather[0].main; // Récupère la meteo globale (ex: Rain, Clear, Snow, etc..)
    const windSpeed = array.wind.speed; // Récupère la vitesse du vent en m / s  
    const humidity = array.main.humidity; // Récupère le taux d'humidité en %
    

    // Si l'élément n'existe pas on le crée
    if (!div) {
        div = document.createElement('div'); // Crée un <div> 
        div.id = 'div-2'; // Ajoute l'id="weather-today"
    }

    // Si il existe on le supprime avant d'en créer un nouveau
    else {
        div.remove(); // supprime l'element
        div = document.createElement('div'); // Crée un <div>
        div.id = 'div-2'; // Ajoute l'id="weather-today"
    };

    let icon; //Initialise l'icon undefined

    if (desc.toLowerCase().trim() === 'few clouds' || desc.toLowerCase().trim() === 'scattered clouds') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/cloudy.png"; //Partiellement ensoleillé
    } else if (desc.toLowerCase().trim() === 'broken clouds' || desc.toLowerCase().trim() === 'overcast clouds') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/clouds.png"; // Nuageux 
    } else if (weatherType.toLowerCase() === 'snow') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/snow.png"; // Neige
    } else if (weatherType.toLowerCase() === 'rain') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/rainy.png"; // Pluie
    } else if (weatherType.toLowerCase() === 'thunderstorm') {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/thunder.png"; // Orage
    } else {
        icon = "https://ndc-studio.github.io/2.PROJECTS-3.Weather-app/public/sunny.png"; // Ensoleillé par defaut
    };
    
    div.innerHTML =  `
    <img src="${icon}" class="ico" style="width: 50px;">
    <p class="date"><i class="fa fa-calendar"></i> ${c} ${day} ${date}</p>
    <p class="temp"><i class="fa fa-thermometer-three-quarters"></i> ${temp}°C</p>
    <p class="desc"><i class="fa fa-commenting"></i> ${desc}</p>
    <p class="wind"><i class="fa fa-wind"></i> ${windSpeed} m/s</p>
    <p class="humidity"><i class="fa fa-tint"></i> ${humidity}%</p>
    `;

    main.appendChild(div);
}

