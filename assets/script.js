const APIKey = "d819c0f02622027c482907b6666513c6";
const submitBtn = document.getElementById('submitBtn');
const currentCity = document.getElementById('current-search');
const searchHistoryElement = document.getElementById('search-history');
const cityNameInput = document.getElementById('city-input');
const newCity = localStorage.getItem('newCity');
let searchHistory = [];

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
    if (newCity) {
        cityNameInput.value = newCity;
    }
    const citySearch = cityNameInput.value.trim();
    console.log(citySearch);

    localStorage.setItem('newCity', citySearch);

    if (citySearch) {
        const listItem = document.createElement('li');
        listItem.textContent = citySearch;
        listItem.classList.add('prev-search');
        searchHistoryElement.appendChild(listItem);
    }
   cityNameInput.value = "";
   saveSearch();
   localStorage.removeItem('newCity');
}

submitBtn.addEventListener('click', newSearch);
document.addEventListener('DOMContentLoaded', () => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
        searchHistory = JSON.parse(storedSearchHistory);
    }
    recentSearches();
});