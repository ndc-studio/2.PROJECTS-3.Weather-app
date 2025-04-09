import { getCountryCode, showWeather, getCode, submit } from "./weather.js";

let apiKey;
export function getCountryApiKey(api) {
    apiKey = api;
}

function submitButton(event) {
    event.preventDefault(); // Evite d'actualiser la page lors du submit.
    const lastWeather = document.getElementById('weather-today'); // Tente de récupérer le <div id="weather-today"> 
    // Si il existe on le supprime
    if (lastWeather) {
        lastWeather.remove(); // Supprime l'élément
    }
    const otherWeathers = document.getElementById('other-forecasts'); // Tente de récupérer le <div id="weather-today"> 
    // Si il existe on le supprime
    if (otherWeathers) {
        otherWeathers.remove(); // Supprime l'élément
    }
    const picture = document.getElementById('picture');
    if (picture) {
        picture.remove();
    }
    // Récupère la valeur de <input>
    let input = document.getElementById('user-input');
    let cityName = input.value.trim();

    // Debug
    console.log(cityName);
    // Envoie une requète à l'api Geocoding pour récupérer les données de la ville demandée
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
        .then(function(response) {
            console.log(response); // Debug
            return response.json(); // Récupère les données json
        })
        .then(function(countries) {
            console.log(countries); // Debug
            showResponse(countries); // Appelle la fonction showResponse avec les données de la réponse comme paramètre
        })
        .catch(function(error) {
            console.error('Error fetching data:', error); // Renvoie l'erreur si non trouvé
        });
    input.value = ""; // Reinitialise la valeur de <input> après la manipulation
}


/**
 * 
 * @description --Récupère les données de l'api Geocoding pour une ville demandée
 * 
 */
export function getCountries() {
    const form = document.getElementById('form'); // Récupère le <form>
    /**
     * 
     * @description -- Ajoute un ecouteur d'evenement sur le submit du formulaire
     * 
     */
    form.addEventListener('submit', function(event) {
        submitButton(event);
    });
};

/**
 * 
 * @param {Array} response 
 * @returns 
 * @description -- Crée un div pour contenir les differentes options pour la ville demandée.
 * 
 */
function showResponse(response) {
    let div = document.getElementById('div-select-options'); // Tente de récupérer le <div> contenant les options de choix

    // Si il n'y a qu'une réponse possible
    if (response.length === 1) {
        const city = response[0].name; // Récupère name (le nom de la ville)
        const countryCode = response[0].country; // Recupère country (le code ISO du pays)
        showWeather(city, countryCode); // Appelle la fonction showWeather avec le nom et l'iso pour la ville demandée comme paramètres
        return; // Termine la fonction
    }

    // Si la div n'existe pas on la crée et l'implante dans le html
    if (!div) {
       
        const main = document.getElementById('container'); // Récupère le main (container)
        div = document.createElement('div'); // Crée le <div>
        div.id = 'div-select-options'; // Ajoute un id `div-select-options` au <div>
        main.appendChild(div); // Ajoute le <div> au <main>
        selectOptions(response, div); // Appelle la fonction selectOptions avec la réponse et le <div> comme paramètres
    }

    // Si la div existe déjà on la supprime d'abord
    else {
       
        div.remove(); // Supprime le <div>
        const main = document.getElementById('container'); // Récupère le main (container)
        div = document.createElement('div'); // Crée le <div>
        div.id = 'div-select-options'; // Ajoute un id `div-select-options` au <div>
        main.appendChild(div); // Ajoute le <div> au <main>
        selectOptions(response, div); // Appelle la fonction selectOptions avec la réponse et le <div> comme paramètres
    };
};

/**
 * 
 * @param {HTMLElement} div
 * @param {Array} response
 * @description -- Crée les le select et les options pour la ville demandée
 * 
 */
function selectOptions(response, div) {
    const select = document.createElement('select'); // Crée un élément <select>
    select.id = "select_country"; // Ajout un id à <select>

    // Ajoute un écouteur d'évènement sur le <select>
    select.addEventListener('change', getCountryCode);
        // Itération des données récupérées avec l'api Geocoding
        for (let i = 0; i < response.length; i++) {
            const element = response[i]; // Cibler l'élément qui est itéré
            const option = document.createElement('option'); // Créer une option
            const city = element.name; // Récupérer le nom de la ville
            const country = element.country; // Récupérer le code ISO du pays
            const state = element.state; // Récupérer L'état ou département
            option.innerHTML = `City: ${city} | Country: ${country} | State: ${state}`; // Ajout du contenu dans l'<option>
            option.id = `${city}`; // Ajouter la ville comme id (pour le récupérer plus tard)
            option.classList.add(`${country}`); // Ajouter le code Iso comme class (pour le récupérer plus tard aussi)
            select.appendChild(option); // Ajoute l'<option> au <select>
            select.value = ""; // FIX: Initialise la valeur indefined (Permet de choisir la première option)
        };
    div.appendChild(select); // Ajoute le <select> dans le <div>
};


/**
 * 
 * @description --Récupère les données de l'api Geocoding pour une ville demandée
 * 
 */
export function getAllCountries() {
    const form_compare = document.getElementById('form-1'); // Récupère le <form>
    const apiKey = '33540e55ad4298c6759091a17506103e'; // Initilalise la clé API de openweathermap
    const main = document.getElementById('container');

    let div = document.getElementById('div-compare');
    if (!div) {
        div = document.createElement('div');
        div.id = "div-compare";
        const button = document.createElement('button');
        button.id = 'submit-compare';
        button.type = 'button';
        button.textContent = "submit";
        button.style.display = "none";
        div.appendChild(button);
        main.appendChild(div);
    }
    

    /**
     * 
     * @description -- Ajoute un ecouteur d'evenement sur le submit du formulaire
     * 
     */
    form_compare.addEventListener('submit', function(event) {
        let div1 = document.getElementById('div-1');
        let div2 = document.getElementById('div-2');
        if (div1) {
            div1.remove();
        }
    
        if (div2) {
            div2.remove();
        }
        event.preventDefault(); // Evite d'actualiser la page lors du submit.
        // Récupère la valeur de <input>
        let inputs = [ document.getElementById('input-1'), document.getElementById('input-2') ]
        let cityNames = [ inputs[0].value.trim(), inputs[1].value.trim() ]

        // Debug
        console.log(cityNames);
        
        for (let i = 0; i < cityNames.length; i++) {
            let element = cityNames[i];
            // Envoie une requète à l'api Geocoding pour récupérer les données de la ville demandée
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${element}&limit=5&appid=${apiKey}`)
                .then(function(response) {
                    console.log(response); // Debug
                    return response.json(); // Récupère les données json
                })
                .then(function(data) {
                    console.log(data); // Debug
                    optionData(data, i);

                })
                .catch(function(error) {
                    console.log('Error fetching data:', error); // Renvoie l'erreur si non trouvé
                });

            inputs[0].value = ""; // Reinitialise la valeur de <input> après la manipulation
            inputs[1].value = ""; // Reinitialise la valeur de <input> après la manipulation

        };
    });
};

function optionData(data, index) {
    const main = document.getElementById('container');
    let div = document.getElementById('div-compare');
    let div1 = document.getElementById('div-1');
    let div2 = document.getElementById('div-2');
    if (div1) {
        div1.remove();
    }

    if (div2) {
        div2.remove();
    }
    if (!div) {
        div = document.createElement('div');
        div.id = "div-compare";
        const button = document.createElement('button');
        button.id = 'submit-compare';
        button.type = 'button';
        button.textContent = "submit";
        button.style.display = "none";
        div.appendChild(button);
        main.appendChild(div);
    }
    submit();
    const select = document.createElement('select');

    select.id = `select-codes-${String(index)}`;

    // Itération des données récupérées avec l'api Geocoding
    data.forEach(function(element) {
        const option = document.createElement('option');
        const city = element.name; // Récupérer le nom de la ville
        const country = element.country; // Récupérer le code ISO du pays
        const state = element.state; // Récupérer L'état ou département
        option.innerHTML = `City: ${city} | Country: ${country} | State: ${state}`; // Ajout du contenu dans l'<option>
        option.id = `${city}`; // Ajouter la ville comme id (pour le récupérer plus tard)
        option.classList.add(`${country}`); // Ajouter le code Iso comme class (pour le récupérer plus tard aussi)
        select.appendChild(option); // Ajoute l'<option> au <select>
        select.value = ""; // FIX: Initialise la valeur indefined (Permet de choisir la première option)
    });



    div.appendChild(select);

    select.addEventListener('change', function() {
        getCode(select.id);
    });
}