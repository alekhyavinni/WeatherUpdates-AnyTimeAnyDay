var cityname = document.getElementById("city");
var search =document.querySelector("#weatherupdate")

function getWeatherApi(){
    var requestUrl ='https://api.openweathermap.org/data/2.5/forecast?q='+cityname.value+'&appid=51e1b785d1c53673d1ab963a4ec63b88'
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}


search.addEventListener('click',getWeatherApi)