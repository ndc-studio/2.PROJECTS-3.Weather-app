export function getPicture(cityName) {
    let city = cityName.toLowerCase();
    let apiKey = import.meta.env.VITE_PICTURES_API_KEY
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${apiKey}`)
        .then( function(response) {
            return response.json();
        })

        .then( function(data) {
            console.log(data)
            createPicture(data.results[0]);
        })

        .catch(function(error) {
            console.error('Error fetching data:', error); //Envoie un message d'erreur dans la console
        });
}

function createPicture(imageData) {
    let pictureUrl = imageData.urls.small;
    console.log(pictureUrl);
    let description = imageData.alt_description;
    const main =  document.getElementById('container');
    const img = document.createElement('img');
    img.id = `picture`
    img.classList.add('city_picture');
    img.alt = `${description}`;
    img.src = `${pictureUrl}`;
    main.appendChild(img);
}