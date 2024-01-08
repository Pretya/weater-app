const weatherBlock = document.querySelector('#weather');
const select = document.getElementById('select');
const body = document.getElementById('body');
// !Часовые пояса
function getCurrentTime(selectedCity) {
  const now = new Date();
  let timeZone;

  switch (selectedCity) {
    case 'New York':
      timeZone = 'America/New_York';
      break;
    case 'London':
      timeZone = 'Europe/London';
      break;
    case 'Paris':
      timeZone = 'Europe/Paris';
      break;
    case 'Tokyo':
      timeZone = 'Asia/Tokyo';
      break;
    case 'Cairo':
      timeZone = 'Africa/Cairo';
      break;
    case 'Afin':
      timeZone = 'Europe/Athens';
      break;
    case 'Milan':
      timeZone = 'Europe/Rome';
      break;
    case 'Akkol’':
      timeZone = 'Asia/Almaty';
      break;
    default:
      timeZone = 'Europe/Kiev';
  }

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: `${timeZone}`,
  };

  return new Intl.DateTimeFormat('en-US', options).format(now);
}
// !Смена классов
function setWeatherBackground(status) {
  const weatherClassMapping = {
    Clear: 'sunny-background',
    Rain: 'rainy-background',
    Clouds: 'cloudy-background',
    Haze: 'hazey-background',
    Mist: 'mist-background',
    Snow: 'snowy-background',
    Smoke: 'smoke-background',
  };

  // !Удаляем все классы фона из weatherBlock
  weatherBlock.classList.remove(...Object.values(weatherClassMapping));

  // !Добавляем класс фона в зависимости от статуса погоды
  const weatherClass = weatherClassMapping[status];
  if (weatherClass) {
    weatherBlock.classList.add(weatherClass);
  }
}
// !Смена заднего фона
function setBodyBackground(city) {
  body.classList.remove(
    'kyiv-background',
    'kharkiv-background',
    'newyork-background',
    'london-background',
    'paris-background',
    'tokyo-background',
    'cairo-background',
    'afin-background',
    'milan-background',
    'akkol-background'
  );

  if (city === 'Kyiv') {
    body.classList.add('kyiv-background');
  } else if (city === 'Kharkiv') {
    body.classList.add('kharkiv-background');
  } else if (city === 'New York') {
    body.classList.add('newyork-background');
  } else if (city === 'London') {
    body.classList.add('london-background');
  } else if (city === 'Paris') {
    body.classList.add('paris-background');
  } else if (city === 'Tokyo') {
    body.classList.add('tokyo-background');
  } else if (city === 'Cairo') {
    body.classList.add('cairo-background');
  } else if (city === 'Afin') {
    body.classList.add('afin-background');
  } else if (city === 'Milan') {
    body.classList.add('milan-background');
  } else if (city === 'Akkol’') {
    body.classList.add('akkol-background');
  }
}
// !Виджет
function getWeather(city) {
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
      setWeatherBackground(status);
      setBodyBackground(city);
      const currentTime = getCurrentTime(city);
      weatherBlock.innerHTML = `
                <div class="weather__header">
                    <div class="weather__main">
                        <div class="weather__city">
                          ${location} 
                          <img class="country__flag" src="${flagUrl}" alt="${countryCode}" />
                        </div>
                        <div class="weather__time">${currentTime}</div>
                        <div class="weather__coord">
                          <i class="fa-solid fa-globe"></i> 
                          <span>lon: ${coordLat}</span>,
                          <span>lat: ${coordLon}</span>
                        </div>
                        <div class="weather__wind-speed"><i class="fa-solid fa-wind"></i> ${wind} m/s</div>
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
                  <div class="weather__status">${status}</div>
                    <div class="weather__icon">
                        <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
                    </div>
                  </div>
                </div>  
            `;
    })
    .catch((error) => {
      error.alert('Oops');
    });
}
// !Обновление времени
function updateWeatherAndTime() {
  const selected = document.getElementById('select');
  const city = selected.value;

  getWeather(city);
}

select.addEventListener('change', updateWeatherAndTime);
updateWeatherAndTime();
getWeather();

setInterval(() => {
  getWeather();
}, 15000);
