import GeoLocationComponent from "@/components/edit-profile-section/Geolocation/Geolocation";
import BioForm from "@/components/edit-profile-section/bio-section/BioForm";
import UploadToS3 from "@/components/edit-profile-section/pfp-section/UploadToS3";
import VendorTypeDisplay from "@/components/edit-profile-section/vendor-type-section/VendorTypeDisplay";
import ChangeUsername from "@/components/edit-profile-section/username-section/ChangeUsername";
import AddMenu from "@/components/edit-profile-section/alter-menus/Menus";
import TodaySpecial from "@/components/edit-profile-section/today-special/TodaySpecialDisplay";
import EditCityState from "@/components/edit-profile-section/city-state/EditCityState";
import { Suspense } from "react";
import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import { User } from "../lib/Supabase-Client";
import { GetCurrentUser } from "../lib/GetCurrentUser";
import PageBackButton from "@/components/PageBackButton";

export default async function VendorProfile() {
  const currentUser: User = await GetCurrentUser();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-evenly bg-background">
        <PageBackButton text="Dashboard" href="/dashboard"/>
        <div className="mt-24 h-screen">
          <div className="flex justify-center items-center">
            <UploadToS3 pfp={currentUser.pfp ? currentUser.pfp : "/default-pfp.svg"} />
            <div className="mx-2 lg:mx-8">
              <ChangeUsername name={currentUser.name} />
              <EditCityState
                city={currentUser.city}
                state={currentUser.state}
              />
              <VendorTypeDisplay vendor_type={currentUser.vendor_type} />
            </div>
          </div>
          <BioForm bio={currentUser.bio} />
          <div className="lg:flex lg:justify-evenly  w-full lg:w-10/12 mx-auto lg:my-12 border-t py-4 bg-gray-900 p-4">
            <div className="border border-gray-700 rounded-lg shadow-lg w-full md:w-8/12 lg:w-4/12 bg-gray-800">
              <TodaySpecial special_today={currentUser.special_today} />
              <AddMenu menus={currentUser.menus} />
            </div>
            <GeoLocationComponent
              latitude_longitude_location={
                currentUser.Latitude_Longitude_Location
              }
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
