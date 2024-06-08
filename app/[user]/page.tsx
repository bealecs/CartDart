"use server";
import { Navbar } from "@/components/Navbar";
import MapComponent from "@/components/edit-profile-section/Geolocation/MapComponent";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Page({ params }: { params: { user: string } }) {
  const supabase = createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("name", params.user);

  if (error) {
    console.log(error);
    return <div>There was an error loading this profile, please go back</div>;
  }

  if (!profile || profile.length === 0) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="bg-gray-900 overflow-x-hidden">
      <Navbar />
      {profile.map((profile) => (
        <div key={profile.id} className="m-2">
          <div className="flex items-center justify-start" key={profile.id}>
            {profile.pfp != null ? (
              <Image
                width={50}
                height={50}
                className="rounded"
                src={profile.pfp}
                alt={profile.name}
              />
            ) : (
              <Image
                width={50}
                height={50}
                className="rounded"
                src={"/default-pfp.svg"}
                alt={profile.name}
              />
            )}
            <p className="items-center content-center ml-5">
              {profile.name}
            </p>
          </div>
          <p className="my-4">{profile.bio}</p>
          {/* Add all of the necessary fields here, this will be the page the user sees when they visit a vendor */}
          <p className="my-4">
            <span className="underline">Cuisine:</span>{" "} 
            {profile.vendor_type
              ? profile.vendor_type
              : "No cuisine type specified"}
          </p>
          <p className="my-4">
          <span className="underline">Deal of the day:</span>
            {" "}
            {profile.special_today
              ? profile.special_today
              : "There were no deals found from this vendor"}
          </p>
          <p className="my-1"><span className="underline">Menus:</span></p>
          <div className="flex">
            {profile.menus ? (
              profile.menus.map((menu, index) => {
                return (
                  <a
                    target="_blank"
                    rel="ref noopener"
                    className="mr-5"
                    href={menu}
                  >
                    Menu #{index + 1}
                  </a>
                );
              })
            ) : (
              <p>There were no menus found for this vendor</p>
            )}
          </div>
          {profile.Latitude_Longitude_Location != null ? (
            <MapComponent coordinates={profile.Latitude_Longitude_Location} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
