import { Suspense } from "react";
import Loading from "../loading-fallbacks/LoadingEditProfile";
import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import GetUsers from "./GetUsers";
import Image from "next/image";

interface User {
  Latitude_Longitude_Location: number[];
  bio: string;
  email: string;
  id: string;
  name: string;
  pfp: string;
  vendor_type: string;
  menus: string[];
  special_today: string;
  state: string;
  city: string;
}

export default async function HomeDisplay() {
  const users: User[] = await GetUsers();

  return (
    <div className="flex flex-col items-center content-center">
      <Suspense fallback={<Loading />}>
        {users.length > 0 ? (
          users.map((user) => (
            <div
              className="w-5/12 border-solid border-2 border-white m-5 flex justify-between"
              key={user.id}
            >
              <a href={`/${user.name}`}>
                <div className="mx-auto items-center flex flex-col justify-evenly h-full">
                  <div>
                    <p className="underline">Name:</p>
                    <div className="flex">
                      <p className="items-center content-center">{user.name}</p>
                      {user.pfp ?
                      <Image
                        height={60}
                        width={60}
                        src={user.pfp}
                        alt="Profile picture for the vendor specified"
                        className="rounded-full mx-5"
                      /> : null}
                    </div>
                  </div>

                  <div className="items-center mx-auto flex flex-col">
                    <p className="underline">Vendor Cuisine:</p>
                    <p>
                      {!user.vendor_type
                        ? "No vendor type found"
                        : `${user.vendor_type}`}
                    </p>
                  </div>
                  <div className="items-center mx-auto flex flex-col">
                    <p className="underline">{"Today's Special:"}</p>
                    <p className="items-center content-center mx-auto">
                      {!user.special_today
                        ? "The are currently no deals highlighted for this vendor"
                        : user.special_today}
                    </p>
                  </div>
                </div>
              </a>
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
