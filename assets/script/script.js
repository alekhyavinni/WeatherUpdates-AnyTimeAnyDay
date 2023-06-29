var cityname = document.getElementById("city");
var search =document.querySelector("#weatherupdate")
var date=document.querySelectorAll(".date");
var temp=document.querySelectorAll(".temp");
var city=document.querySelectorAll(".city");
var humidity=document.querySelectorAll(".humidity");
var wind = document.querySelectorAll(".wind");
var icon =document.querySelectorAll(".icon")
var display =document.querySelector('#display')
var autocomplete,button1;



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

function displaycities(){
    var section=document.createElement('div');
    section.style.background= "url(./assets/css/images/ICE.jpeg) no-repeat";
    section.style.textAlign='center';
    button1 =document.createElement('button');
   button1.setAttribute('value','submit');
    button1.style.margin="5px"
    button1.style.borderRadius="10px";
    button1.style.width="80%"
    button1.innerText=cityname.value
    section.append(button1)
    display.append(section)
   
}


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
        }
   
     
    )
}



search.addEventListener('click',function(){
    getWeatherApi()
    displaycities()
})
initMap();


