let apikey = '239bae11d331dcd77d8c11343d551dee';
let city;
let form = document.querySelector('.form');
let input = document.querySelector('.input');
let container = document.querySelector('.forecast-weather');

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
}

// Display current time
function displayTime() {
  let today = new Date().toLocaleTimeString();
  let time = document.querySelector('.current-time');
  time.textContent = `${today}`
}

// Eventlistiner on submit
form.addEventListener("submit", e => {
e.preventDefault();
// Clear hourly forecast table onsubmit
container.innerHTML = '';

// input value
city = input.value;
let request_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


if(city !== '') {

fetch(request_url)
.then(response => response.json())
.then(data => {
  addItems(data)
  //message when city is not found
  if(data.cod === '404') alert(data.message);

  console.log(data);
  let lon = data.coord.lon;
  let lat = data.coord.lat;

console.log(lat, lon)

  displayOnSubmit();
  displayTime();



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




// Calling the onecall API using the lat & lon of the inputed city 
let api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
exclude={part}&appid=${apikey}`
fetch(api_url)
.then(response => response.json())
.then(data => {
console.log(data);

let timeIntervalArr = [" ", "1 hour", "2 hrs", "3 hrs", "4 hrs"];
let timeInterval = document.querySelector('.hour1')

//Render Items
for(i = 1; i < 5; i++ ) {
  let div1 = document.createElement('div');
  div1.className = 'forecast-description';
  let div2 = document.createElement('div');
  div2.className = 'hour1';
  div2.innerHTML = timeIntervalArr[i];
  let div3 = document.createElement('div');
  div3.className = 'weather-icon icon1';
  let img = document.createElement('img');
  img.className = 'small-icon';

  // Create icon links
  const {icon} = data.hourly[i].weather[0];

  img.src = `icons/${icon}.png`
  let div4 = document.createElement('div');
  div4.className = 'small-description';
  div4.innerHTML = data.hourly[i].weather[0].main
  div3.appendChild(img)
  div1.appendChild(div2)
  div1.appendChild(div3)
  div1.appendChild(div4)
  container.appendChild(div1)
}
  })
})
  }
  //clear input field
  form.reset();
})

document.addEventListener('DOMContentLoaded', () => {
displayTime();
getData()

})
