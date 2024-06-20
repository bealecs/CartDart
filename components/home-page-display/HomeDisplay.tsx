import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import Image from "next/image";
import GetVendors, { GetCurrentUser } from "./GetVendors";
import Favorite from "../edit-profile-section/favorite/Favorite";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { User } from "@/app/lib/Supabase-Client";
import { Suspense } from "react";
import Loading from "../loading-fallbacks/LoadingEditProfile";

export default async function HomeDisplay() {
  const users: User[] = await GetVendors();
  const currentUser: User = await GetCurrentUser();

  return (
    <Suspense fallback={<Loading />}>
    <div className="flex flex-col items-center content-center bg-background md:h-screen">
      <p className="mt-5">
        Showing results from: {currentUser?.city}, {currentUser?.state}
      </p>
      <div className="flex flex-wrap justify-evenly my-5">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              className="transition duration-500 m-2 linear bg-indigo-400 my-2 lg:w-3/12 md:w-7/12 sm:w-full text-black border-solid border-2 border-white relative"
              key={user.id}
            >
              <div className="relative mx-auto flex flex-col p-4 h-full">
                {user.Latitude_Longitude_Location ? (
                  <div className="w-full h-[400px] items-center content-center bg-white text-black">
                    <MapComponent coordinates={user.Latitude_Longitude_Location} />
                  </div>
                ) : (
                  <div className="w-full h-[400px] items-center content-center bg-white text-black">
                    <p className="mx-auto text-center">
                      There was no current location found
                    </p>
                  </div>
                )}
                <div className="flex flex-col justify-between flex-grow">
                  <h4 className="py-2 text-xl italic text-center">
                    {!user.special_today
                      ? "There are currently no deals highlighted for this vendor"
                      : user.special_today}
                  </h4>
                  <h4 className="py-2">
                    {user.bio ? user.bio : "There is no bio for this vendor yet"}
                  </h4>
                  <div className="flex items-center py-2">
                    <Image
                      height={50}
                      width={50}
                      src={user.pfp ? user.pfp : "/default-pfp.svg"}
                      alt="Profile picture for the vendor specified"
                      className="rounded-full mr-2"
                    />
                    <div className="flex flex-col flex-wrap">
                      <a
                        className="transition duration-300 linear hover:text-indigo-800 h-fit w-fit items-center content-center"
                        href={`/${user.name}/${user.id}`}
                      >
                        {user.name}
                        <span>
                          {" "}
                          <OpenInNewIcon fontSize="small" />
                        </span>
                      </a>
                      <p className=" text-sm border-2 rounded-full px-1 border-indigo-800 text-indigo-800">
                        <span>
                          <RestaurantMenuIcon fontSize="small" />
                        </span>
                        {!user.vendor_type ? "No vendor type found" : `${user.vendor_type}`}
                      </p>
                    </div>
                  </div>
                </div>
                <Favorite
                  id={user.id}
                  isFavorited={currentUser.favorites.includes(user.id)}
                  className="absolute bottom-4 right-4 p-2"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
    </Suspense>
  );
}
