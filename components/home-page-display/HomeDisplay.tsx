import { Suspense } from "react";
import Loading from "../loading-fallbacks/Loading";
import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import GetUsers from "./GetUsers";
import PFP from "../edit-profile-section/pfp-section/PFP";
import Image from "next/image";

interface User {
  Latitude_Longitude_Location: number[];
  bio: string;
  email: string;
  id: string;
  name: string;
  pfp: string;
  today_special: string;
  vendor_type: string;
}

export default async function HomeDisplay() {
  const users: User[] = await GetUsers();

  return (
    <div className="flex flex-wrap justify-evenly items-center content-center">
      <Suspense fallback={<Loading />}>
        {users.length > 0 ? (
          users.map((user) => (
            <div
              className="border-solid border-2 border-white m-5 rounded flex justify-around"
              key={user.id}
            >
              <div className="m-5">
                <p>Name: {user.name}</p>
                <p>
                  Vendor Cuisine:{" "}
                  {!user.vendor_type
                    ? "No vendor type found"
                    : `${user.vendor_type}`}
                </p>
              </div>
              {user.Latitude_Longitude_Location ? (
                <MapComponent coordinates={user.Latitude_Longitude_Location} />
              ) : (
                <p>There was no current location found</p>
              )}
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </Suspense>
    </div>
  );
}
