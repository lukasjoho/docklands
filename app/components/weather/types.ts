export type DayWeather = {
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

export type WeatherConditions =
  | "few clouds"
  | "clear sky"
  | "scattered clouds"
  | "broken clouds"
  | "shower rain"
  | "rain"
  | "thunderstorm"
  | "snow"
  | "mist";
