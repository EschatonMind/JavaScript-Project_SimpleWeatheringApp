const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// update UI

const UpdateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  // update the night/day & icon img

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  // remove the d-none class if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// update city

const UpdateCity = async (city) => {
  const cityDets = await GetCity(city);
  const weather = await GetWeather(cityDets.Key);
  return { cityDets, weather };
};

// eventlistener for input in searchbar

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update UO with new city
  UpdateCity(city)
    .then((data) => UpdateUI(data))
    .catch((err) => console.log(err));

  // set local storage
  localStorage.setItem('city', city)

});

if(localStorage.getItem('city')){
  UpdateCity(localStorage.getItem('city')).then(data => UpdateUI(data)).catch(err => console.log(err))
}