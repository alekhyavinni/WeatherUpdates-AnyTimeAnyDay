var cityname = document.getElementById("city");
var search =document.querySelector("#weatherupdate")
var date=document.querySelectorAll(".date");
var temp=document.querySelectorAll(".temp");
var city=document.querySelectorAll(".city");
var humidity=document.querySelectorAll(".humidity");
var wind = document.querySelectorAll(".wind");
var icon =document.querySelectorAll(".icon")
var display =document.querySelector('#display')
let searchHistory = JSON.parse(localStorage.getItem("searchcity")) || [];
var autocomplete;


//call for Google maps API 
function initMap() {
    autocomplete = new google.maps.places.Autocomplete(cityname), {
     types: ['geocode']
    }
    autocomplete.addListener('place_changed', getsearchcity)
}

function getsearchcity(){
cityname.innerHTML=''
 var city=autocomplete.getPlace();
 console.log(city);
}

//Rendering the past cities inside a form  from the local storage
function getdisplaycities(){
    display.innerHTML=''
    for(let i=0;i<searchHistory.length;i++){
    const pasthistory =document.createElement('input');
    pasthistory.setAttribute("type","text");
    pasthistory.setAttribute("readonly",true)
    pasthistory.setAttribute("class","form-control d-block bg-white")
    pasthistory.setAttribute('value',searchHistory[i]);
    pasthistory.style.textAlign="center"
    pasthistory.addEventListener('click',function(){
        cityname.value=pasthistory.value;
        console.log(cityname.value)
         getWeatherApi();
   })
   display.append(pasthistory)
}
}

function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}


//Request the weatherforecast API by passing  the city name
function getWeatherApi(){
    var requestUrl ='https://api.openweathermap.org/data/2.5/forecast?q='+cityname.value+'&appid=51e1b785d1c53673d1ab963a4ec63b88'
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        console.log("Cityname:"+cityname.value)
        for(let j=0;j<=4;j++){
           const i=j*8;
           
            var date1 = data.list[i].dt;
            date[j].innerHTML=moment.unix(date1).format("DD/MM/YYYY");
            temp[j].innerHTML=k2f(data.list[i].main.temp)+"°F"
            city[j].innerHTML=data.city.name;
            humidity[j].innerHTML=data.list[i].main.humidity+"%"
            wind[j].innerHTML=data.list[i].wind.speed+"Km/Hr"

            //the weather icons displayed according to the weather conditions
            if(data.list[i].weather[0].main==="Clear"){
               icon[j].src="./assets/icons/clear.png";
            }
            else if(data.list[i].weather[0].main==="Drizzle"){
                icon[j].src="./assets/icons/shower.png"; 
            }
            else if(data.list[i].weather[0].main==="Rain"){
                icon[j].src="./assets/icons/rain.png"; 
            }
            else if(data.list[i].weather[0].main==="thunderstorm"){
                icon[j].src="./assets/icons/thunder.png"; 
            }
            else if(data.list[i].weather[0].main==="Snow"){
                icon[j].src="./assets/icons/snow.png"; 
            }
            else if(data.list[i].weather[0].main==="Clouds"){
                if(data.list[i].weather[0].description==="Broken clouds"){
                icon[j].src="./assets/icons/broken.png"; 
                }
                 else if(data.list[i].weather[0].description==="Scattered clouds"){
                icon[j].src="./assets/icons/clouds.png"; 
                }
                else if(data.list[i].weather[0].description==="Few clouds"){
                icon[j].src="./assets/icons/few.png"; 
                }
                else{
                    icon[j].src="./assets/icons/clouds.png"; 
                }
            }
           else{
            icon[j].src="./assets/icons/clouds.png"; 
           } 
        }
        }
   
     
    )
}

//on search the weather Api displays the forecast and push to local storage
search.addEventListener('click',function(){
    var citydata= cityname.value;
    getWeatherApi()
    searchHistory.push(citydata)
    localStorage.setItem("serachcity",JSON.stringify(searchHistory))
    getdisplaycities()
})
initMap();


