import { createCompareSpace } from "./compare.js";
import { getCountries } from "./countries.js";

export function getMode() {
   const mode = document.getElementById('mode')
    mode.value = ``;
    mode.addEventListener('change', function() {
        const selectedOption = mode.options[mode.selectedIndex];
        if (selectedOption.id === "compare") {
            const main = document.getElementById('container')
            main.innerHTML = ``;
            let form = document.getElementById('form');
            if (form) {
                form.remove();
            }
            createCompareSpace();
        } else if (selectedOption.id === "weather") {
            let form1 =  document.getElementById('form-1');
            let header = document.querySelector('header');

            if (form1) {
                form1.remove();
            }

            let form = document.getElementById('form');
            if (!form) {
                location.reload();
            }
            header.appendChild(form)
            getCountries(); // Appelle la fonction getCountries()
        }
    }) 
}
