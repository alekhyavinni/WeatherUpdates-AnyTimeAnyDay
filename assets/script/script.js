var cityname = document.getElementById("city");
var search =document.querySelector("#weatherupdate")
var date=document.querySelectorAll(".date");
var temp=document.querySelectorAll(".temp");
var city=document.querySelectorAll(".city");
var humidity=document.querySelectorAll(".humidity");
var wind = document.querySelectorAll(".wind");
var icon =document.querySelectorAll(".icon")


function getWeatherApi(){
    var requestUrl ='https://api.openweathermap.org/data/2.5/forecast?q='+cityname.value+'&appid=51e1b785d1c53673d1ab963a4ec63b88'
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        
        for(let j=0;j<=4;j++){
           const i=j*8;
            date[j].innerHTML=data.list[i].dt_txt;
            temp[j].innerHTML=Math.round(data.list[i].main.temp)+"°F"
            city[j].innerHTML=data.city.name;
            humidity[j].innerHTML=data.list[i].main.humidity+"%"
            wind[j].innerHTML=data.list[i].wind.speed+"Km/Hr"

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
        
    })
   
}


search.addEventListener('click',getWeatherApi)