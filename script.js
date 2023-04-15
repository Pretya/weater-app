const weatherBlock = document.querySelector('#weather');

function getWeather() {
  const select = document.getElementById('select');
  const city = select.value;
  const API_KEY = '71cd29172858c1aa8d37ea57473d5557';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const location = data.name;
      const { country } = data.sys;
      const coordLon = data.coord.lon;
      const coordLat = data.coord.lat;
      const temp = Math.round(data.main.temp);
      const tempMin = Math.round(data.main.temp_min);
      const tempMax = Math.round(data.main.temp_max);
      const feelsLike = Math.round(data.main.feels_like);
      const wind = data.wind.speed;
      const status = data.weather[0].main;
      const { icon } = data.weather[0];
      const countryCode = `${country}`;
      const flagUrl = `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`;
      weatherBlock.innerHTML = `
                <div class="weather__header">
                    <div class="weather__main">
                        <div class="weather__city">
                          ${location} 
                          <img class="country__flag" src="${flagUrl}" alt="${countryCode}" />
                        </div>
                        <div class="weather__status">${status}</div>
                        <div class="weather__coord">
                        <i class="fa-solid fa-globe"></i> <span>lon: ${coordLat}</span>
                        <span>lat: ${coordLon}</span>
                        </div>
                    </div>
                    <div class="weather__icon">
                        <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
                    </div>
                </div>
                <div class="weather__box">
                  <div class="weather__metric">
                      <div class="weather__temp"><i class="fa-solid fa-temperature-half"></i> ${temp}</div>
                      <div class="weather__temp-min">Min: ${tempMin}</div>
                      <div class="weather__temp-max">Max: ${tempMax}</div>
                      <div class="weather__feels-like">Feels like: ${feelsLike}</div>
                  </div>
                  <div class="weather__wind">
                    <div class="weather__wind-speed"><i class="fa-solid fa-wind"></i> ${wind} m/s</div>
                  </div>
                </div>  
            `;
    })
    .catch((error) => {
      error.alert('Oops');
    });
}
getWeather();
setInterval(() => {
  getWeather();
}, 15000);
