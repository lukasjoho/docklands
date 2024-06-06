import { Ref, RefObject, useState } from "react";
import { GeoJSON, SuperCluster } from "./types";
import LocationMarker from "./LocationMarker";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  console.log("points", pointCount, points.length);

  const size =
    points.length <= 2 ? 24 : 24 + ((pointCount - 2) / (points.length - 2)) * 8;
  return (
    <Popover key={cluster.id} open={open} onOpenChange={setOpen}>
      <PopoverTrigger key={cluster.id} disabled asChild>
        <div
          key={cluster.id}
          className={cn(
            "bg-slate-600 w-6 border-[3px] border-slate-500 aspect-square ring-offset-slate-400 ring-[3px] ring-offset-[3px] ring-slate-300 rounded-full text-white text-xs grid place-items-center",
            className
          )}
          style={{
            width: size,
            height: size,
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
      </PopoverTrigger>
      <PopoverContent className="p-1 w-auto">
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
      </PopoverContent>
    </Popover>
  );
}
