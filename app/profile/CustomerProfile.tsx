import UploadToS3 from "@/components/edit-profile-section/pfp-section/UploadToS3";
import ChangeUsername from "@/components/edit-profile-section/username-section/ChangeUsername"
import EditCityState from "@/components/edit-profile-section/city-state/EditCityState";
import { Suspense } from "react";
import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import { User } from "../lib/Supabase-Client";
import { GetCurrentUser } from "../lib/GetCurrentUser";
import FavoritesPageComponent from "@/components/edit-profile-section/favorite/FavoritesList";
import PageBackButton from "@/components/PageBackButton";

export default async function CustomerProfile() {
  const currentUser: User = await GetCurrentUser();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-evenly bg-background">
        <PageBackButton text="Dashboard" href="/dashboard" />
        <div className="mt-24 h-screen">
          <div className="flex justify-center items-center">
            <UploadToS3 pfp={currentUser.pfp ? currentUser.pfp : "/default-pfp.svg"} />
            <div className="mx-2 lg:mx-8">
              <ChangeUsername name={currentUser.name} />
              <EditCityState
                city={currentUser.city}
                state={currentUser.state}
              />
              {/* <VendorTypeDisplay vendor_type={currentUser.vendor_type} /> */}
            </div>
          </div>
          {/* <BioForm bio={currentUser.bio} /> */}
          <div className="border-t-2 ">
            <h4 className="text-2xl text-center font-semibold mt-2">My Favorites:</h4>
            <FavoritesPageComponent />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
