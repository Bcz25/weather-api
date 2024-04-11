const apiKey = "d819c0f02622027c482907b6666513c6";
const apiCurrent = 'https://api.openweathermap.org/data/2.5/weather';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const cityNameInput = document.getElementById('city-input');
const container = document.getElementById("forecast-container");
const submitBtn = document.getElementById('submitBtn');
const currentCityContainer = document.getElementById('current-search-container');
const searchHistoryElement = document.getElementById('search-history');
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function currentWeather(event) {
    event.preventDefault();
    const cityName = cityNameInput.value.trim();
    const fetchCurrent = `${apiCurrent}?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetch(fetchCurrent)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then (data => {
            console.log(data)
            const temperatureFahrenheit = data.main.temp;
            const currentDate = new Date().toLocaleDateString();
            const decs = data.weather[0].description;
            const max = data.main.temp_max;
            const min = data.main.temp_min;     
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
            let currentCity = document.createElement('div')
            currentCity.classList.add("current-search")
            let heading = document.createElement("h2");
            let currentTemp = document.createElement("h3")
            let weatherInfo = document.createElement("p")
            let icon = document.createElement('img');
            icon.src = iconUrl;
            heading.textContent = `${cityName}: ${currentDate}`;
            weatherInfo.textContent = `The projected Temperature for today is a high of ${max}°F and a low of ${min}°F`;
            currentTemp.textContent = `${temperatureFahrenheit}°F and ${decs}`
            currentCityContainer.innerHTML = '';
            currentCityContainer.appendChild(currentCity)
            currentCity.appendChild(heading);
            currentCity.appendChild(currentTemp);
            heading.appendChild(icon);
            currentCity.appendChild(weatherInfo);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        

}       

function forecastWeather(event){
    event.preventDefault();
    const cityName = cityNameInput.value.trim();
    const fetchForecast = `${apiForecast}?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetch(fetchForecast)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const forecasts = processForecastData(data);
            container.innerHTML = ''; // Clear previous content
            forecasts.forEach(forecast => {
                const forecastCard = createForecastCard(forecast);
                container.appendChild(forecastCard); // Append forecast card to the container
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function processForecastData(data) {
    const forecasts = [];
    // Get the current date to compare with forecast dates
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    // Iterate over each forecast entry
    data.list.forEach(item => {
        // Get the date of the forecast entry
        const forecastDate = new Date(item.dt_txt);
        const forecastDay = forecastDate.getDate();

        // If the forecast date is different from the current date and occurs at the same time (e.g., 12:00:00), add it to the forecasts array
        if (forecastDay !== currentDay && forecastDate.getHours() === 12) {
            // Process the forecast entry and extract relevant information
            const formattedDate = forecastDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const date = item.dt_txt;
            const maxTemp = item.main.temp_max;
            const minTemp = item.main.temp_min;
            const humidity = item.main.humidity;
            const description = item.weather[0].description;
            const iconCode = item.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            // Create forecast object and push it to forecasts array
            forecasts.push({
                date: formattedDate,
                maxTemp: maxTemp,
                minTemp: minTemp,
                humidity: humidity,
                description: description,
                iconUrl: iconUrl
            });
        }
    });

    return forecasts;
}

function createForecastCard(forecast) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-2', 'five-day');
    
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = forecast.date;

    const cardBody = document.createElement('div');
    cardBody.textContent = forecast.description;

    const cardTextContainer = document.createElement('ul');

    const cardMax = document.createElement('li');
    cardMax.textContent = `High: ${forecast.maxTemp}°F`;

    const cardMin = document.createElement('li');
    cardMin.textContent = `Low: ${forecast.minTemp}°F`;

    const cardHumid = document.createElement('li');
    cardHumid.textContent = `Humidity: ${forecast.humidity}%`;

    const icon = document.createElement('img');
    icon.src = forecast.iconUrl;

    
    card.appendChild(cardTitle);
    card.appendChild(cardBody);
    card.appendChild(cardTextContainer);
    cardTextContainer.appendChild(cardMax);
    cardTextContainer.appendChild(cardMin);
    cardTextContainer.appendChild(cardHumid);
    cardBody.appendChild(icon);

    return card;
}
function recentSearches(){
    searchHistory.forEach(searchItem => {
        const listItem = document.createElement('li');
        listItem.textContent = searchItem;
        listItem.classList.add('prev-search');
        searchHistoryElement.appendChild(listItem);
    });
}

function saveSearch() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function newSearch(event){
    event.preventDefault();
    const citySearch = cityNameInput.value.trim();
    searchHistory.push(citySearch);
    saveSearch();
    const listItem = document.createElement('li');
    listItem.textContent = citySearch;
    listItem.classList.add('prev-search');
    searchHistoryElement.appendChild(listItem);
    cityNameInput.value = "";

}

submitBtn.addEventListener('click', currentWeather);
submitBtn.addEventListener('click', forecastWeather);
submitBtn.addEventListener('click', newSearch);
document.addEventListener('DOMContentLoaded', () => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
        searchHistory = JSON.parse(storedSearchHistory);
    }
    recentSearches();
});