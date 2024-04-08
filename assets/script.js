const queryUrl = "api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}";
const APIKey = "d819c0f02622027c482907b6666513c6";
const submitBtn = document.getElementById('submitBtn');
let cityName = document.getElementById('city-input').val().trim();