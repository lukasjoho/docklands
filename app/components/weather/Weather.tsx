import WeatherIcon from "./WeatherIcon";
import WeatherProperty from "./WeatherProperty";
import { DayWeather } from "./types";
import { kelvinToCelcius } from "./utils";

const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=51.961563&lon=7.628202&appid=${process.env.WEATHER_API_KEY}`;
// const URL = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=51.961563&lon=7.628202&date=2024-06-08&appid=${process.env.WEATHER_API_KEY}`;

export default async function Weather({ target_date = "2024-06-08" }) {
  const res = await fetch(URL);
  let data = await res.json();
  if (!data?.list) {
    return <div>no data</div>;
  }
  let weather: DayWeather = data.list.filter((d: DayWeather) => {
    const day = d.dt_txt.split(" ")[0];
    const time = d.dt_txt.split(" ")[1];
    return day === target_date && time === "12:00:00";
  })[0];
  return (
    <div className="flex flex-col items-center gap-8 grow">
      <div className="w-full grow grid place-items-center">
        <WeatherIcon
          className="h-full w-auto max-h-[220px]"
          weatherConditions={weather.weather[0].description}
        />
      </div>
      <div className="text-6xl font-semibold relative">
        {kelvinToCelcius(weather.main.temp)}°C
      </div>
      <div className="grid grid-cols-3 w-full px-4 pb-4">
        <WeatherProperty
          icon="Wind"
          label="Wind"
          value={weather.wind.speed.toFixed(0)}
          suffix="km/h"
        />
        <WeatherProperty
          icon="Droplets"
          label="Luftfeuchte"
          value={weather.main.humidity}
          suffix="%"
        />
        <WeatherProperty
          icon="CloudRain"
          label="Regen"
          value={weather.pop}
          suffix="%"
        />
      </div>
    </div>
  );
}
