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
import Marker from "./Marker";
import HeroMarker from "./HeroMarker";
import useLocations from "@/lib/useLocations";
import AddLocationButton from "./AddLocationButton";
import { getCookie } from "cookies-next";

const libraries: Libraries = ["places"];

export default function MapsButton() {
  const defaultProps = {
    center: {
      lat: 50.8687324,
      lng: 9.5485311,
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
          >
            {locations?.map((location) => (
              <Marker
                key={location.id}
                lat={location.lat}
                lng={location.lng}
                location={location}
              />
            ))}
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
