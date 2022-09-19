const Key = "EtNxhT78BG46tJu7FmHgHXqeRJr0m5M0";

// get weather info

const GetWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${Key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get city info

const GetCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${Key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};
