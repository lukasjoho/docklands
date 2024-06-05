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

export default function Marker({
  lat,
  lng,
  location,
}: {
  lat: number;
  lng: number;
  location: Prisma.LocationGetPayload<{
    include: { user: true };
  }>;
}) {
  const [open, setOpen] = useState(false);
  const userIdCookie = getCookie("userId");
  const isOwnLocation = location.user.cookieUserId === userIdCookie;
  const { removeUser } = useLocations();
  return (
    <TooltipProvider key={location.id} disableHoverableContent={true}>
      <Tooltip delayDuration={0} open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Avatar
            name={location.user.name}
            src={location.user.image}
            className="w-6 h-6 shadow-md -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="py-3 w-[100px]" key={location.id}>
          <div className="flex flex-col items-center gap-2">
            <Avatar
              name={location.user.name}
              src={location.user.image}
              className="w-16 h-16"
            />

            <div className="text-center whitespace-nowrap w-full">
              <p className="font-medium leading-none overflow-hidden text-ellipsis">
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
    </TooltipProvider>
  );
}
