"use client";
import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import UpdateLocation from "./UpdateLocation";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ClearIcon from "@mui/icons-material/Clear";

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
    <div className="border border-gray-700 rounded-lg shadow-lg w-full md:w-8/12 lg:w-4/12 mx-auto bg-gray-800 my-8 lg:my-0">
      <div className="flex flex-col p-4">
        <h4 className="text-2xl font-semibold">My Current Location:</h4>
        <div className="flex my-4">
          <button
            onClick={getLocation}
            className="border-2 mr-2 border-white rounded p-1 bg-btn-background"
          >
            <PersonPinIcon />
             Push my location
          </button>
          <button
            onClick={clearLocation}
            className="border-2 ml-2 border-white rounded p-1 bg-red-700"
          >
            <ClearIcon />
            Clear my location
          </button>
        </div>
        {coordinates[0] != null ? (
          <div className="h-[300px]">
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
