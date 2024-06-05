import { cn } from "@/lib/utils";
import Image from "next/image";
import { WeatherConditions } from "./types";

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
      icon = "few-clouds.png";
      break;
    case "broken clouds":
      icon = "broken-clouds.png";
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
    <Image
      src={`/images/${icon}`}
      alt=""
      width={48}
      height={48}
      style={{ objectFit: "contain" }}
      sizes="300px"
      className={cn("", className)}
    />
  );
}
