"use server";
import { Navbar } from "@/components/Navbar";
import MapComponent from "@/components/edit-profile-section/Geolocation/MapComponent";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Page({ params }: { params: { user: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select('*')
    .eq("name", params.user);

  if (error) {
    console.log(error);
    return <div>There was an error loading this profile, please go back</div>
  }

  if (!data || data.length === 0) {
    return <div>No profile found.</div>;
  }

 return (
    <div>
      <Navbar />
      {data.map((profile) => (
        <div key={profile.id}>
          <div className="flex">
          <p className="items-center content-center mr-5">Name: {profile.name}</p>
          {profile.pfp != null && <Image width={50} height={50} className="rounded" src={profile.pfp} alt={profile.name} />}
          </div>
          <p className="my-5">Vendor Type: {profile.vendor_type}</p>
          <div className="flex flex-col">
            <p>Location:</p>
            {profile.Latitude_Longitude_Location != null ? <MapComponent coordinates={profile.Latitude_Longitude_Location} /> : <p>There was no location found for this vendor</p>}
          </div>
          {/* You can add more fields from the profile object here */}
        </div>
      ))}
    </div>
  );
}