const APIKey = "d819c0f02622027c482907b6666513c6";
const submitBtn = document.getElementById('submitBtn');
const currentCity = document.getElementById('current-search');
const searchHistory = document.getElementById('search-history');
const cityNameInput = document.getElementById('city-input');
const savedCity = localStorage.getItem('savedCity');
if (savedCity) {
    cityNameInput.value = savedCity;
}

function recentSearches(){
    const cityName = cityNameInput.value.trim();
    console.log(cityName);

    localStorage.setItem('savedCity', cityName);

    const listItem = document.createElement('li');
    listItem.textContent = cityName;
    listItem.classList.add('prev-search');
    searchHistory.appendChild(listItem);
    return;
}
submitBtn.addEventListener('click', recentSearches);