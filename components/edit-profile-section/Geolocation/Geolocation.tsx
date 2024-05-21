"use client"
import { useEffect, useState } from "react";
import FetchLocation from "./FetchLocation";
import MapComponent from "./MapComponent";
import UpdateLocation from "./UpdateLocation";



export default function GeoLocationComponent() {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    FetchLocation().then((coordinates) => {
      if (coordinates) {
        setCoordinates([coordinates[0], coordinates[1]]);
      } else {
        setCoordinates([]);
      }
    });
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          UpdateLocation(latitude, longitude);
          alert("Your new location has been posted");
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

  return (
    <div className="my-5 flex border-solid border-2 border-white rounded p-5">
      <div className="flex flex-col">
        <h4 className="text-xl">Update Location</h4>
        {coordinates ? <MapComponent coordinates={coordinates} /> : <p>There is no current geolocation for this profile.</p>}
      </div>
      <div className="flex flex-col content-center items-center mx-auto my-auto">
        <button onClick={getLocation} className="border-2 border-white rounded p-2 m-2">Update Location</button>
        <p className="m-2">OR</p>
        <form className="m-2 flex flex-col items-center content-center">
          <label htmlFor="newAddress">Enter a manual address:</label>
          <input id="newAddress" className="m-2" type="text" />
        </form>
      </div>
    </div>
  );
}
