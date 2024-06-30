import { createClient } from "@/utils/supabase/server";
import FetchFavorites from "@/components/edit-profile-section/favorite/FetchFavorites";
import { UUID } from "crypto";
import Image from "next/image";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MapComponent from "@/components/edit-profile-section/Geolocation/MapComponent";
import { User } from "@/app/lib/Supabase-Client";
import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import { Suspense } from "react";
import Favorite from "./Favorite";
import { GetCurrentUser } from "@/app/lib/GetCurrentUser";

async function FavoritesList(id: UUID) {
  const supabase = createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    throw error;
  }

  return profiles[0];
}

export default async function FavoritesPageComponent() {
  // returns a list of all of the user's favorited carts
  const favoritesList: UUID[] = await FetchFavorites();
  const currentUser: User = await GetCurrentUser();

  if (!favoritesList || favoritesList.length < 1) {
    return (
      <div className="items-center content-center text-center h-full">
        <p className="text-center h-fit">
          You have not favorited any carts,
        </p>
        <h4 className="my-4 text-3xl">YET {":)"}</h4>
        <a
          className="text-btn-background my-4 border-2 border-btn-background rounded-xl p-1"
          href="/dashboard"
        >
          Back to home
        </a>
      </div>
    );
  }

  // fetch all favorite profiles concurrently
  const favoritesProfiles: User[] = await Promise.all(
    favoritesList.map((id) => FavoritesList(id))
  );

  return (
    <Suspense fallback={<Loading />}>
     <div className="flex flex-col items-center content-center bg-gray-900 h-full min-h-screen p-4 overflow-x-hidden">
  <div className="flex flex-wrap justify-center w-full my-5 gap-4">
    {favoritesProfiles.map((profile) => (
      <div
      className="transition duration-500 ease-in-out hover:bg-gray-900 m-2 bg-gray-800 shadow-lg rounded-lg overflow-hidden lg:w-1/4 md:w-1/3 w-full text-gray-200 border border-gray-700"
      key={profile.id}
    >
      <div className="relative p-4 h-full flex flex-col">
        {profile.Latitude_Longitude_Location ? (
          <div className="w-full h-64 items-center bg-gray-700 text-white">
            <MapComponent coordinates={profile.Latitude_Longitude_Location} />
          </div>
        ) : (
          <div className="w-full h-64 items-center bg-gray-700 text-white flex justify-center items-center">
            <p className="text-center">No location found</p>
          </div>
        )}
        <div className="flex flex-col justify-between flex-grow mt-4">
          <h4 className="text-center text-lg font-semibold text-white">
            {profile.special_today ? profile.special_today : "No current deals"}
          </h4>
          <p className="text-gray-400 mt-2">{profile.bio ? profile.bio : "No bio available"}</p>
          <div className="flex items-center mt-4">
            <Image
              height={50}
              width={50}
              src={profile.pfp ? profile.pfp : "/default-pfp.svg"}
              alt="Profile picture"
              className="rounded-full mr-2"
            />
            <div className="flex flex-col">
              <a
                className="text-indigo-400 hover:text-indigo-600 font-bold"
                href={`/${profile.name}/${profile.id}`}
              >
                {profile.name}
                <OpenInNewIcon fontSize="small" className="ml-1" />
              </a>
              <p className="text-sm text-gray-400 mt-1 flex items-center">
                <RestaurantMenuIcon fontSize="small" className="mr-1" />
                {profile.vendor_type ? profile.vendor_type : "No vendor type"}
              </p>
            </div>
          </div>
        </div>
        <Favorite
          id={profile.id}
          isFavorited={currentUser.favorites.includes(profile.id)}
          className="absolute bottom-4 right-4 p-2 text-indigo-400 hover:text-indigo-600"
        />
      </div>
    </div>
    ))}
  </div>
</div>
    </Suspense>
  );
}
