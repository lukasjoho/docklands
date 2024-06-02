import Image from "next/image";

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

interface WeatherIconProps {
  weatherConditions: WeatherConditions;
}

export default function WeatherIcon({ weatherConditions }: WeatherIconProps) {
  let icon = "";
  switch (weatherConditions) {
    case "few clouds":
      icon = "few-clouds.png";
      break;
    case "clear sky":
      icon = "clear-sky.png";
      break;
    default:
      icon = "clear-sky.png";
  }
  return (
    <div>
      <Image src={`/images/${icon}`} alt="" width={100} height={100} />
    </div>
  );
}
