class Forecast {
  constructor(){
    this.theKey = "EtNxhT78BG46tJu7FmHgHXqeRJr0m5M0"
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/"
    this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search"
  }

  async UpdateCity(city){
    const cityDets = await this.GetCity(city)
    const weather = await this.GetWeather(cityDets.Key)
    return {cityDets,weather}
  }

  // get city info
  async GetCity(city){
    const query = `?apikey=${this.theKey}&q=${city}`;

  const response = await fetch(this.cityURI + query);
  const data = await response.json();

  return data[0];
  }

  // get weather info
  async GetWeather(id){
    const query = `${id}?apikey=${this.theKey}`;

  const response = await fetch(this.weatherURI + query);
  const data = await response.json();

  return data[0];

  }
}
