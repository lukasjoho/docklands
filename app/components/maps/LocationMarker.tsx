import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import Avatar from "../shared/Avatar";
import { getCookie } from "cookies-next";
import useLocations from "@/lib/useLocations";
import { cn } from "@/lib/utils";

export default function LocationMarker({
  lat,
  lng,
  location,
  className,
}: {
  lat: number;
  lng: number;
  location: Prisma.LocationGetPayload<{
    include: { user: true };
  }>;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const userIdCookie = getCookie("userId");
  const isOwnLocation = location.user.cookieUserId === userIdCookie;
  const { removeUser } = useLocations();
  return (
    <Tooltip key={location.id} open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild key={location.id}>
        <Avatar
          name={location.user.name}
          src={location.user.image}
          className={cn("w-6 h-6 shadow-md", className)}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        />
      </TooltipTrigger>
      <TooltipContent className="py-3 w-[160px]" key={location.id}>
        <div className="flex flex-col items-center gap-2">
          <Avatar
            name={location.user.name}
            src={location.user.image}
            className="w-24 h-24"
          />

          <div className="text-center whitespace-nowrap w-full">
            <p className="font-medium text-lg leading-none overflow-hidden text-ellipsis">
              {location.user.name}
            </p>
            <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
              {location.name}
            </p>
          </div>
          {isOwnLocation && (
            <button
              className="text-xs whitespace-nowrap text-center bg-secondary px-2 py-0.5 rounded-full"
              onClick={() => removeUser(location.user.id)}
            >
              Remove me
            </button>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
