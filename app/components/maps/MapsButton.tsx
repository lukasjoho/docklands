"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CategoryButton from "../home/CategoryButton";
import GoogleMapReact from "google-map-react";
import mapStyles from "./mapStyles";

import { Libraries, useLoadScript } from "@react-google-maps/api";
import useLocations from "@/lib/useLocations";
import AddLocationButton from "./AddLocationButton";
import { getCookie } from "cookies-next";
import { useRef, useState } from "react";

import useSupercluster from "use-supercluster";

import ClusterMarker from "./ClusterMarker";
import { Marker } from "./Marker";
import LocationMarker from "./LocationMarker";
import { GeoJSON } from "./types";
import HeroMarker from "./HeroMarker";

const libraries: Libraries = ["places"];

export default function MapsButton() {
  const defaultProps = {
    center: {
      lat: 53.551086,
      lng: 9.993682,
    },
    zoom: 5,
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  const { locations } = useLocations();

  const userIdCookie = getCookie("userId");

  //Check whether one of the locations has a location.user.cookieUserId that matches the userIdCookie and return boolean
  const hasLocation = locations?.some(
    (location) => location.user.cookieUserId === userIdCookie
  );

  const mapRef = useRef<any>();

  const points: GeoJSON[] =
    locations?.map((location) => ({
      type: "Feature",
      properties: {
        cluster: false,
        location: location,
      },
      geometry: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    })) || [];

  const [bounds, setBounds] = useState<number[] | null>(null);
  const [zoom, setZoom] = useState(1);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  return (
    <Drawer handleOnly>
      <DrawerTrigger asChild>
        <CategoryButton icon="Map" label="Städte" />
      </DrawerTrigger>
      <DrawerContent className="pb-4 px-4" max>
        <DrawerHeader>
          <DrawerTitle>Karte</DrawerTitle>
          <DrawerDescription>
            Hier wohnen wir alle mittlerweile.
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full grow relative rounded-2xl overflow-hidden">
          <GoogleMapReact
            key={locations?.length}
            options={{
              fullscreenControl: false,
              zoomControl: false,
              styles: mapStyles,
              disableDefaultUI: true,
            }}
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
              ]);
            }}
          >
            {clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const { cluster: isCluster } = cluster.properties;

              if (isCluster) {
                return (
                  <>
                    <Marker
                      key={`cluster-${cluster.id}`}
                      lat={latitude}
                      lng={longitude}
                    >
                      <ClusterMarker
                        key={`cluster-${cluster.id}`}
                        cluster={cluster}
                        points={points}
                        supercluster={supercluster}
                        mapRef={mapRef}
                        className="-translate-y-1/2 -translate-x-1/2"
                      />
                    </Marker>
                  </>
                );
              }

              return (
                <LocationMarker
                  key={`${cluster.properties.location.id}`}
                  lat={latitude}
                  lng={longitude}
                  location={cluster.properties.location}
                  className="-translate-x-1/2 -translate-y-1/2"
                />
              );
            })}

            <HeroMarker lat={51.9530264} lng={7.6058791} />
          </GoogleMapReact>
          <div className="p-3 w-full absolute bottom-0 left-0">
            {isLoaded && !hasLocation && <AddLocationButton />}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
