"use client";

import GoogleMapReact from "google-map-react";
import mapStyles from "./maps/mapStyles";

const locations = [
  {
    user: {
      name: "Lukas",
      avatar:
        "https://media.licdn.com/dms/image/D4E03AQH1gEVM4Z7ctw/profile-displayphoto-shrink_800_800/0/1704689086091?e=1723075200&v=beta&t=y8omr6RjU_bQWX9ZCe-hID2aL0E7nBgX5rHOb8olwZw",
    },
    coordinates: {
      lat: -3.745,
      lng: -38.523,
    },
  },
];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function Maps() {
  const defaultProps = {
    center: {
      lat: 50.8687324,
      lng: 9.5485311,
    },
    zoom: 5.5,
  };

  return (
    <div>
      <GoogleMapReact
        options={{
          fullscreenControl: false,
          zoomControl: false,
          styles: mapStyles,
        }}
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <div
          lat={"51.961563"}
          lng={"7.628202"}
          key="and"
          className="bg-red-500 text-2xl"
        >
          Hello
        </div> */}
      </GoogleMapReact>
    </div>
  );
}
