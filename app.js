let apikey = '239bae11d331dcd77d8c11343d551dee';
let city;
let form = document.querySelector('.form');
let input = document.querySelector('.input')

/*
function  getData() {
  let data;
  if (localStorage.getItem("data") === null) {
    data = [];
  } else {
    data = JSON.parse(localStorage.getItem("data"));
  }
  return data
}

function addItems(items) {
  const data = getData();
  data.push(items);
  localStorage.setItem("data", JSON.stringify(data));
}*/


function displayTime() {
  let today = new Date().toLocaleTimeString();
  let time = document.querySelector('.current-time');
  time.textContent = `${today}`
}
  


   // API data
  
   form.addEventListener("submit", e => {
    e.preventDefault();
    city = input.value;
    let request_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
   

    console.log(request_url)
    if(city !== '') {

    fetch(request_url)
   .then(response => response.json())
   .then(data => {
     console.log(data);
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    console.log(lat, lon)

     displayOnSubmit()



    function displayOnSubmit() {
    let city = document.querySelector('.city');
    let description = document.querySelector('.description');
    let wind = document.querySelector('.current-wind span')
    let temperature = document.querySelector('.current-temp span')
    let humidity = document.querySelector('.current-precip span');
    
    description.textContent = data.weather[0].description;
    city.textContent = `${data.name}, ${data.sys.country}`;
    wind.textContent = data.wind.speed;
    temperature.textContent = data.main.temp;
    humidity.textContent= data.main.humidity;
    
    let locationIcon = document.querySelector('.weather-icon');
    const {icon} = data.weather[0];
    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
    }
  
    displayTime();


    // Calling the onecall API using the lat & lon of the input city
    let api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude={part}&appid=${apikey}`
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
    console.log(data);
    
    //Render Items
    for(i = 0; i < 4; i++ ) {
      let container = document.querySelector('.forecast-weather');
      let template = document.querySelector('#task-template')

      let locationIcon = document.querySelector('.icon1');
      let description = document.querySelector('#small-description1')
      let forecastTime = document.querySelector('.hour1')
      const {icon} = data.hourly[0].weather[0];
    
      locationIcon.innerHTML = `<img class="small-icon" src="icons/${icon}.png">`;
      console.log(locationIcon)
      description.textContent = data.hourly[0].weather[0].main;

      
      // Set the timestamp & convert it to normal time
      let utc = data.hourly[0].dt
      dateObj = new Date(utc * 1000); 
      let utcString = dateObj.toUTCString(); 
      let time = utcString.slice(-11, -4); 
      console.log(time);

      forecastTime.textContent = time


      templateElement = document.importNode(template.content, true);
      container.appendChild(templateElement)
      console.log(template)

    }

    



      })
     
    })
      
     }

     form.reset();
     
     
    })


    /* if(inputValue != null) {
     city = inputValue;
     let request_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


   fetch(request_url)
   .then(response => response.json())
   .then(data => {
     console.log(data)
     let country = document.querySelector('.country');
     let city = document.querySelector('.city');
     let description = document.querySelector('.description');
     let wind = document.querySelector('.current-wind span')
     let temperature = document.querySelector('.current-temp span')
     let humidity = document.querySelector('.current-precip span');

     const form = document.querySelector(".form");
     const input = document.querySelector('.input')

    

     description.textContent = data.weather[0].description;
     city.textContent = `${data.name}, ${data.sys.country}`;
     wind.textContent = data.wind.speed;
     temperature.textContent = `${data.main.temp}°c`;
     humidity.textContent= data.main.humidity;

     let locationIcon = document.querySelector('.weather-icon');
     const {icon} = data.weather[0];
     locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

     displayTime()
     
   });

     }
   });
   

    //let request_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey}&q=london&units=metric`;
   
    
  }
  } else {
    alert("You have to allow App to access your location for it to work")
  }*/


  document.addEventListener('DOMContentLoaded', () => {
    displayTime();
    
  })


//https://pro.openweathermap.org/data/2.5/forecast/hourly?q=london&appid=239bae11d331dcd77d8c11343d551dee