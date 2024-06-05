import { icons } from "lucide-react";
import Icon from "../shared/Icon";

export default function WeatherProperty({
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
      <Icon name={icon} className="w-5 h-5 mb-0.5" />
      <div className="text-xl font-semibold">
        {value}
        {suffix && <span className="text-base">{suffix}</span>}
      </div>
      <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
        {label}
      </h3>
    </div>
  );
}
