import { createClient } from "@/utils/supabase/server";
import FetchFavorites from "@/components/edit-profile-section/favorite/FetchFavorites";
import { UUID } from "crypto";
import Image from "next/image";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MapComponent from "@/components/edit-profile-section/Geolocation/MapComponent";
import { User } from "@/app/lib/Supabase-Client";

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

  if (favoritesList.length < 1) {
    return (
      <div className="items-center content-center text-center">
        <p className="text-center h-fit mt-24 my-4">
          You have no carts favorited, yet :/
        </p>
        <a className="text-btn-background border-2 border-btn-background rounded-xl p-1" href="/dashboard">Back to home</a>
      </div>
    );
  }

  // fetch all favorite profiles concurrently
  const favoritesProfiles: User[] = await Promise.all(
    favoritesList.map((id) => FavoritesList(id))
  );

  return (
    <div className="flex flex-wrap justify-evenly py-8">
      {favoritesProfiles.map((favoritee) => (
        <div
          className="transition duration-500 linear bg-indigo-400 w-11/12 md:w-6/12 lg:w-3/12 text-black border-solid border-2 border-white relative"
          key={favoritee.id}
        >
          <div className="relative mx-auto flex flex-col p-4">
            {favoritee.Latitude_Longitude_Location ? (
              <div className="w-full h-[400px] items-center content-center bg-white text-black">
                <MapComponent
                  coordinates={favoritee.Latitude_Longitude_Location}
                />
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
                {!favoritee.special_today
                  ? "There are currently no deals highlighted for this vendor"
                  : favoritee.special_today}
              </h4>
              <h4 className="py-2">
                {favoritee.bio
                  ? favoritee.bio
                  : "There is no bio for this vendor yet"}
              </h4>
              <div className="flex items-center py-2">
                <Image
                  height={50}
                  width={50}
                  src={favoritee.pfp ? favoritee.pfp : "/default-pfp.svg"}
                  alt="Profile picture for the vendor specified"
                  className="rounded-full mr-2"
                />
                <div className="flex flex-col flex-wrap">
                  <a
                    className="transition duration-300 linear hover:text-indigo-800 h-fit w-fit items-center content-center"
                    href={`/${favoritee.name}/${favoritee.id}`}
                  >
                    {favoritee.name}
                    <span>
                      {" "}
                      <OpenInNewIcon fontSize="small" />
                    </span>
                  </a>
                  <p className=" text-sm border-2 rounded-full px-1 border-indigo-800 text-indigo-800">
                    <span>
                      <RestaurantMenuIcon fontSize="small" />
                    </span>
                    {!favoritee.vendor_type
                      ? "No vendor type found"
                      : `${favoritee.vendor_type}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
