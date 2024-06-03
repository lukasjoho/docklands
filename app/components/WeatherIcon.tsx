import { cn } from "@/lib/utils";
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

interface WeatherIconProps extends React.HTMLAttributes<HTMLDivElement> {
  weatherConditions: WeatherConditions;
}

export default function WeatherIcon({
  weatherConditions,
  className,
}: WeatherIconProps) {
  let icon = "";
  switch (weatherConditions) {
    case "few clouds":
      icon = "few-clouds.png";
      break;
    case "clear sky":
      icon = "clear-sky.png";
      break;
    case "scattered clouds":
      icon = "scattered-clouds.png";
      break;
    case "shower rain":
      icon = "shower-rain.png";
      break;
    case "rain":
      icon = "rain.png";
      break;
    case "thunderstorm":
      icon = "thunderstorm.png";
      break;
    case "snow":
      icon = "snow.png";
      break;
    default:
      icon = "clear-sky.png";
  }
  return (
    <div className={cn("w-32 h-32 relative", className)}>
      <Image
        src={`/images/${icon}`}
        alt=""
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
