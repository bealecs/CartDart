import { Suspense } from "react";
import Loading from "../loading-fallbacks/LoadingEditProfile";
import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import Image from "next/image";
import GetVendors from "./GetVendors";

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
  vendor: boolean;
}

export default async function HomeDisplay() {
  const users: User[] = await GetVendors();

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
                      <Image
                        height={60}
                        width={60}
                        src={user.pfp ? user.pfp : "/default-pfp.svg"}
                        alt="Profile picture for the vendor specified"
                        className="rounded-full mx-5"
                      />
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
                <div className="w-[400px] h-[400px] items-center content-center bg-white text-black">
                  <MapComponent
                    coordinates={user.Latitude_Longitude_Location}
                  />
                </div>
              ) : (
                <div className="w-[480px] h-[400px] items-center content-center bg-white text-black">
                  <p className="mx-auto text-center">
                    There was no current location found
                  </p>
                </div>
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
