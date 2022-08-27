const form   = document.querySelector('#form');
const main   = document.querySelector('#main');
const search = document.querySelector('#search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7cb278732edfc758fdd591191de686d0`;

async function getWeatherByLocation(city) {
    const resp   = await fetch(url(city), { origin: 'cors' });
    const result = await resp.json();
    addWeather(result);
}

function addWeather(data) {
    const celc    = Math.floor(data.main.temp - 273.15);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
            <div class="icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            </div>
            <h1>${celc}°C</h1>
            <p>${data.name}</p>
    `;

    main.innerHTML = '';
    main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if(city) {
        getWeatherByLocation(city)
    }
});