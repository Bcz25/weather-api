const APIKey = "d819c0f02622027c482907b6666513c6";
const submitBtn = document.getElementById('submitBtn');
const currentCity = document.getElementById('current-search');
const cityName = document.getElementById('city-input');
const savedCity = localStorage.getItem('savedCity');
const searchHistory = document.getElementById('search-history');
if (savedCity) {
    cityNameInput.value = savedCity;
}

function getAPI() {
    const cityName = cityNameInput.value.trim();
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (search) {
            console.log(search);
        })
}

function recentSearches(){
    console.log(savedCity)
    localStorage.setItem('savedCity', cityName);
    const listItem = document.createElement('li');
    listItem.textContent = cityName;
    listItem.classList.add('prev-search');
    searchHistory.appendChild(listItem);
    return;
}
submitBtn.addEventListener('click', getAPI);