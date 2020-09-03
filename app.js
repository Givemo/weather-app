
function displayTime() {
  let today = new Date().toLocaleTimeString();
  let time = document.querySelector('.current-time');

  time.textContent = `${today}`
}


document.addEventListener('DOMContentLoaded', () => {
  let long;
  let lat;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      
    // API data
    let apikey = '239bae11d331dcd77d8c11343d551dee';
   
    let request_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`;


    fetch(request_url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let country = document.querySelector('.country');
      let city = document.querySelector('.city');
      let description = document.querySelector('.description');
      let wind = document.querySelector('.current-wind span')
      let temperature = document.querySelector('.current-temp span')
      let humidity = document.querySelector('.current-precip span')
      

      description.textContent = data.current.weather[0].description;
      city.textContent = data.timezone;
      wind.textContent = data.current.wind_speed;
      temperature.textContent = `${data.current.temp}°c`;
      humidity.textContent= data.current.humidity;

      let locationIcon = document.querySelector('.weather-icon');
      const {icon} = data.current.weather[0];
      locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

      displayTime()
      
    })

    })
  } else {
    alert("You have to allow App to access your location for it to work")
  }

})
