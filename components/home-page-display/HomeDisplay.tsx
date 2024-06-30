import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import Image from "next/image";
import Favorite from "../edit-profile-section/favorite/Favorite";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { User } from "@/app/lib/Supabase-Client";
import { Suspense } from "react";
import Loading from "../loading-fallbacks/LoadingEditProfile";
import { GetCurrentUser } from "@/app/lib/GetCurrentUser";
import GetVendors from "./GetVendors";

export default async function HomeDisplay() {
  const users: User[] = await GetVendors();
  const currentUser: User = await GetCurrentUser();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center content-center bg-gray-900 min-h-screen p-4">
        <p className="mt-5 text-lg text-gray-300">
          Showing results from: <span className="font-bold">{currentUser?.city}, {currentUser?.state}</span>
        </p>
        <div className="flex flex-wrap justify-center lg:justify-center w-full my-5 gap-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                className="transition duration-500 ease-in-out hover:bg-gray-900 m-2 bg-gray-800 shadow-lg rounded-lg overflow-hidden lg:w-1/4 md:w-1/3 w-full text-gray-200 border border-gray-700"
                key={user.id}
              >
                <div className="relative p-4 h-full flex flex-col">
                  {user.Latitude_Longitude_Location ? (
                    <div className="w-full h-64 items-center bg-gray-700 text-white">
                      <MapComponent coordinates={user.Latitude_Longitude_Location} />
                    </div>
                  ) : (
                    <div className="w-full h-64 items-center bg-gray-700 text-white flex justify-center items-center">
                      <p className="text-center">No location found</p>
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-grow mt-4">
                    <h4 className="text-center text-lg font-semibold text-white">
                      {user.special_today ? user.special_today : "No current deals"}
                    </h4>
                    <p className="text-gray-400 mt-2">{user.bio ? user.bio : "No bio available"}</p>
                    <div className="flex items-center mt-4">
                      <Image
                        height={50}
                        width={50}
                        src={user.pfp ? user.pfp : "/default-pfp.svg"}
                        alt="Profile picture"
                        className="rounded-full mr-2"
                      />
                      <div className="flex flex-col">
                        <a
                          className="text-indigo-400 hover:text-indigo-600 font-bold"
                          href={`/${user.name}/${user.id}`}
                        >
                          {user.name}
                          <OpenInNewIcon fontSize="small" className="ml-1" />
                        </a>
                        <p className="text-sm text-gray-400 mt-1 flex items-center">
                          <RestaurantMenuIcon fontSize="small" className="mr-1" />
                          {user.vendor_type ? user.vendor_type : "No vendor type"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Favorite
                    id={user.id}
                    isFavorited={currentUser.favorites.includes(user.id)}
                    className="absolute bottom-4 right-4 p-2 text-indigo-400 hover:text-indigo-600"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No users found</p>
          )}
        </div>
      </div>
    </Suspense>
  );
}
