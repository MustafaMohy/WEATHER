//& HTml Elements

// ? Today Data
let todayName = document.querySelector(".today");
let todayNum = document.querySelector(".month-day");
let todayMonth =document.querySelector(".month-name");
let todayLocation = document.querySelector(".location");
let todayDegree = document.querySelector(".num");
let todayConditionImg = document.querySelector(".today-condition-img");
let todayConditionText = document.querySelector(".today-custom");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let windDir = document.querySelector(".wind-dir");

// ^ next days data
let nextDay = document.querySelectorAll(".next-day");
let nextMaxTemp = document.querySelectorAll(".max-temp");
let nextMinTemp = document.querySelectorAll(".min-temp");
let nextConditionImg = document.querySelectorAll(".next-condition-img");
let nextConditionText = document.querySelectorAll(".next-custom");

//* search input
let searchInput = document.querySelector(".search-input");

//^ function
async function getWeatherData(country){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b97bffcb805e418fb19130604240910&q=${country}&days=3`);
    let weatherData =await response.json();
    return weatherData;
}

//~ display today data 
function displayTodyData(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-us", {weekday:"long"})
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", {month:"long"})
    todayNum.innerHTML= todayDate.getDate()
    todayLocation.innerHTML= data.location.name
    todayDegree.innerHTML =data.current.temp_c + `<sup>o</sup>C`
    todayConditionImg.setAttribute("src", data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text
    humidity.innerHTML= data.current.humidity +"%"
    wind.innerHTML=data.current.wind_kph +"km/h"
    windDir.innerHTML=data.current.wind_dir
}

//? Next day
function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for(let i =0 ; i< 2 ; i++){
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us", {weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c + `<sup>o</sup>C`
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c + `<sup>o</sup>C`
        nextConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML= forecastData[i+1].day.condition.text
    }
}

//! Start App
async function startApp(countryName="cairo"){
    let weatherData = await getWeatherData(countryName)
    if(!weatherData.error){
        displayTodyData(weatherData)
        displayNextData(weatherData)
    }   
}

startApp()

searchInput.addEventListener("input", function(){
    startApp(searchInput.value)
})