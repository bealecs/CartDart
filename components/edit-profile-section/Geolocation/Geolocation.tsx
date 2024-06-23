"use client";
import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import UpdateLocation from "./UpdateLocation";

interface Geolocation {
  latitude_longitude_location: number[];
}

export default function GeoLocationComponent(coords: Geolocation) {
  const [coordinates, setCoordinates] = useState<number[]>([]);

  useEffect(() => {
    if (
      coords.latitude_longitude_location &&
      coords.latitude_longitude_location.length === 2
    ) {
      setCoordinates([
        coords.latitude_longitude_location[0],
        coords.latitude_longitude_location[1],
      ]);
    }
    console.log(coords.latitude_longitude_location);
  }, [coords]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          UpdateLocation(latitude, longitude);
          setCoordinates([latitude, longitude]);
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle unsupported browser
    }
  };

  const clearLocation = () => {
    UpdateLocation(null, null);
    setCoordinates([null, null]);
  };

  return (
    <div>
      <div className="flex flex-col">
        <h4 className="text-xl">My Current Location</h4>
        <div className="flex my-4">
          <button
            onClick={getLocation}
            className="border-2 mr-2 border-white rounded p-2"
          >
            Push Current Location
          </button>
          <button
            onClick={clearLocation}
            className="border-2 ml-2 border-white rounded p-2"
          >
            Clear current location
          </button>
        </div>
        {coordinates[0] != null ? (
          <div className="h-[400px]">
            {" "}
            <MapComponent coordinates={coordinates} />{" "}
          </div>
        ) : (
          <p className="h-[400px] content-center">
            There is no current geolocation for this profile.
          </p>
        )}
      </div>
    </div>
  );
}
