import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: string | number;
  className?: string;
}

const Icon = ({ name, color, size, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} {...props} />;
};

export default Icon;
