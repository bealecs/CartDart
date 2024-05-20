"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function MapComponent({
  coordinates,
}: {
  coordinates: number[];
}) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: coordinates[0],
        lng: coordinates[1],
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "locator map",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      const geocoder = new google.maps.Geocoder();
      const infowindow = new google.maps.InfoWindow();
      const latlng = {
        lat: coordinates[0],
        lng: coordinates[1],
      };

      geocoder.geocode({ location: latlng }).then((response) => {
        if (response.results[0]) {
          map.setZoom(11);

          const marker = new Marker({
            position: latlng,
            map: map,
          });

          infowindow.setContent(response.results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      });
    };

    initMap();
  }, [coordinates]);

  return (
    <div
      className="rounded"
      style={{ height: "400px", width: "400px", color: "black" }}
      ref={mapRef}
    ></div>
  );
}
