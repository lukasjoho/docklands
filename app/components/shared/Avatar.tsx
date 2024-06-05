import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Icon from "./Icon";
import Image from "next/image";

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string | null;
}

interface SrcProps extends BaseProps {
  src: string;
  name?: string | null;
}

interface NameProps extends BaseProps {
  src?: string | null;
  name: string;
}

type AvatarProps = SrcProps | NameProps;

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-secondary grid place-items-center aspect-square w-10 h-10 text-muted-foreground rounded-full overflow-hidden relative shrink-0",
        className
      )}
      {...props}
    >
      {!src && !name && <Icon name="User" className="w-3/5 h-3/5" />}
      {name && (
        <span className="font-medium uppercase text-sm">
          {name.slice(0, 2)}
        </span>
      )}
      {src && <Image src={src} alt="" fill sizes="80px" />}
    </div>
  )
);
Avatar.displayName = "Avatar";

export default Avatar;
