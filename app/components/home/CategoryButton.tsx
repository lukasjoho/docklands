import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Icon from "../shared/Icon";
import { Cat, icons } from "lucide-react";

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
        size="default"
        className={cn(
          "flex items-center gap-1.5 blur-cust text-white bg-white/10 border-[1.5px] border-white w-full",
          className
        )}
        {...props}
      >
        <Icon name={icon} className="w-5 h-5 shrink-0" />
        {label}
      </Button>
    );
  }
);
CategoryButton.displayName = "CategoryButton";

export default CategoryButton;
