import { Button } from "@/components/ui/button";
import Icon from "./Icon";

export default function CategoryButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="none"
      className="flex items-center gap-1.5 blur-cust text-white bg-white/10 rounded-full border border-white h-10 px-4 w-full"
    >
      {icon}
      {label}
    </Button>
  );
}
