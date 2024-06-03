import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Icon from "./Icon";
import { icons } from "lucide-react";

interface CategoryButtonProps extends ButtonProps {
  icon: keyof typeof icons;
  label: string;
}

const CategoryButton = forwardRef<HTMLButtonElement, CategoryButtonProps>(
  ({ icon, label, className, asChild = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="none"
        className={cn(
          "flex items-center gap-1.5 blur-cust text-white bg-white/10 rounded-full border border-white h-10 px-4 w-full",
          className
        )}
        {...props}
      >
        <Icon name={icon} className="w-4 h-4 shrink-0" />
        {label}
      </Button>
    );
  }
);

export default CategoryButton;
