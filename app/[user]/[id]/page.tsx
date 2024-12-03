"use server";
import { GetCurrentUser } from "@/app/lib/GetCurrentUser";
import { User } from "@/app/lib/Supabase-Client";
import MapComponent from "@/components/edit-profile-section/Geolocation/MapComponent";
import Favorite from "@/components/edit-profile-section/favorite/Favorite";
import { Navbar } from "@/components/navbar/Navbar";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { user: string; id: string };
}) {
  //URLs make spaces into %20 for some reason. When querying the DB, I need these swapped for spaces
  const swapForSpaces = params.user.replace(/%20/g, " ");

  const supabase = createClient();
  const currentUser: User = await GetCurrentUser();  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("name", swapForSpaces)
    .eq("id", params.id);

  if (error) {
    console.log(error);
    return <div>There was an error loading this profile, please go back</div>;
  }

  if (!profile || profile.length === 0) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="bg-gray-900 text-gray-200 overflow-x-hidden min-h-screen">
  <Navbar />
  {profile.map((profile) => (
    <div key={profile.id} className="container mx-auto px-4 py-8">
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center content-center">
      <Image
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-700 h-[150px] w-[150px] object-cover lg:hidden"
          src={profile.pfp ? profile.pfp : "/default-pfp.svg"}
          alt={profile.name}
        />
        <div className="lg:ml-6 mt-4 lg:mt-0 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-around">
          <Image
          width={150}
          height={150}
          className="rounded-full border-4 w-[150px] h-[150px] object-cover border-gray-700 hidden lg:block"
          src={profile.pfp ? profile.pfp : "/default-pfp.svg"}
          alt={profile.name}
        />
          <h4 className="text-4xl font-semibold">{profile.name}</h4>
          {currentUser && <Favorite id={profile.id} isFavorited={currentUser.favorites.includes(profile.id)} className="p-4"/>}
          </div>
          <p className="lg:mt-8 text-lg">{profile.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold mb-4">{"Today's Special"}</h4>
          <p className="mb-4">
           {profile.special_today ? profile.special_today : "There were no deals found from this vendor"}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Cuisine:</span> {profile.vendor_type ? profile.vendor_type : "No cuisine type specified"}
          </p>
          <div>
            <span className="font-semibold">Menus:</span>
            <div className="flex flex-wrap mt-2">
              {profile.menus ? (
                profile.menus.map((menu, index) => (
                  <a
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-600 mr-4 mb-2"
                    href={menu}
                  >
                    Menu #{index + 1}
                  </a>
                ))
              ) : (
                <p>No menus found for this vendor</p>
              )}
            </div>
          </div>
        </div>

        {profile.Latitude_Longitude_Location && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-semibold mb-4">Location</h4>
            <div className="h-64 w-full bg-gray-700 rounded-lg overflow-hidden">
              <MapComponent coordinates={profile.Latitude_Longitude_Location} />
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
  )
}
