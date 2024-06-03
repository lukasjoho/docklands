import { icons } from "lucide-react";
import WeatherIcon, { WeatherConditions } from "./WeatherIcon";
import Icon from "./Icon";

const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=51.961563&lon=7.628202&appid=${process.env.WEATHER_API_KEY}`;
// const URL = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=51.961563&lon=7.628202&date=2024-06-08&appid=${process.env.WEATHER_API_KEY}`;
type DayWeather = {
  dt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: WeatherConditions;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  dt_txt: string;
};

export default async function Weather({ target_date = "2024-06-07" }) {
  const res = await fetch(URL, {
    cache: "no-store",
  });
  let data = await res.json();
  // convert dt property of list property in wheather to date
  if (!data?.list) {
    return;
  }
  let weather: DayWeather = data.list.filter((d: DayWeather) => {
    const day = d.dt_txt.split(" ")[0];
    const time = d.dt_txt.split(" ")[1];
    return day === target_date && time === "12:00:00";
  })[0];
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <WeatherIcon
          className="w-48 h-48"
          weatherConditions={weather.weather[0].description}
        />
        <div className="text-6xl font-semibold relative">
          {kelvinToCelcius(weather.main.temp)}°C
        </div>
      </div>
      <div className="grid grid-cols-3 w-full px-4">
        <PropertyIcon
          icon="Wind"
          label="Wind"
          value={weather.wind.speed.toFixed(0)}
          suffix="km/h"
        />
        <PropertyIcon
          icon="Droplets"
          label="Luftfeuchte"
          value={weather.main.humidity}
          suffix="%"
        />
        <PropertyIcon
          icon="CloudRain"
          label="Regen"
          value={weather.pop}
          suffix="%"
        />
      </div>
      <p className="text-muted-foreground px-4">
        Tipp: Pack' einen Pulli für später ein.
      </p>
    </div>
  );
}

function PropertyIcon({
  icon,
  label,
  value,
  suffix,
}: {
  icon: keyof typeof icons;
  label: string;
  value: string | number;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon name={icon} className="w-5 h-5 mb-1" />
      <div className="text-xl font-semibold">
        {value}
        {suffix && <span className="text-base">{suffix}</span>}
      </div>
      <h2 className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
        {label}
      </h2>
    </div>
  );
}

function kelvinToCelcius(k: number) {
  return (k - 273.15).toFixed(0);
}
