import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ref, RefObject, useState } from "react";
import { GeoJSON, SuperCluster } from "./types";
import LocationMarker from "./LocationMarker";
import { cn } from "@/lib/utils";

export default function ClusterMarker({
  cluster,
  points,
  mapRef,
  supercluster,
  className,
}: {
  cluster: any;
  points: any[];
  mapRef: RefObject<any>;
  supercluster: SuperCluster;
  className?: string;
}) {
  const [longitude, latitude] = cluster.geometry.coordinates;
  const { cluster: isCluster, point_count: pointCount } = cluster.properties;
  const [open, setOpen] = useState(false);
  return (
    <Tooltip key={cluster.id} open={open} onOpenChange={setOpen}>
      <TooltipTrigger disabled asChild>
        <div
          className={cn(
            "bg-primary ring-offset-background ring-[1.5px] ring-offset-2 ring-primary rounded-full text-white grid place-items-center font-medium text-sm",
            className
          )}
          style={{
            width: `${24 + ((pointCount - 2) / (points.length - 2)) * 8}px`,
            height: `${24 + ((pointCount - 2) / (points.length - 2)) * 8}px`,
          }}
          onClick={() => {
            const expansionZoom = Math.min(
              supercluster.getClusterExpansionZoom(cluster.id),
              12
            );
            if (expansionZoom === 12) {
              setOpen(true);
            }
            console.log("zoom", expansionZoom);
            mapRef.current.setZoom(expansionZoom);
            mapRef.current.panTo({
              lat: latitude,
              lng: longitude,
            });
          }}
        >
          {pointCount}
        </div>
      </TooltipTrigger>
      <TooltipContent className="p-1">
        <div className="grid grid-cols-2 gap-1">
          {[...supercluster.getLeaves(cluster.id)].map((leaf: GeoJSON) => {
            const [longitude, latitude] = leaf.geometry.coordinates;
            return (
              <LocationMarker
                key={leaf.properties.location.id}
                lat={latitude}
                lng={longitude}
                location={leaf.properties.location}
              />
            );
          })}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
