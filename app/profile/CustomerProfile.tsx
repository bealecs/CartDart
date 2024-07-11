import BioForm from "@/components/edit-profile-section/bio-section/BioForm";
import UploadToS3 from "@/components/edit-profile-section/pfp-section/UploadToS3";
import VendorTypeDisplay from "@/components/edit-profile-section/vendor-type-section/VendorTypeDisplay";
import ChangeUsername from "@/components/edit-profile-section/username-section/ChangeUsername"
import EditCityState from "@/components/edit-profile-section/city-state/EditCityState";
import { Suspense } from "react";
import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import Link from "next/link";
import { User } from "../lib/Supabase-Client";
import { GetCurrentUser } from "../lib/GetCurrentUser";
import FavoritesPageComponent from "@/components/edit-profile-section/favorite/FavoritesList";

export default async function CustomerProfile() {
  const currentUser: User = await GetCurrentUser();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-evenly bg-background">
        <Link
          href="/dashboard"
          className="transition duration-500 linear absolute left-4 top-8 py-1 px-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Dashboard
        </Link>
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
          <div className="border-t-2 ">
            <h4 className="text-2xl text-center font-semibold mt-2">My Favorites:</h4>
            <FavoritesPageComponent />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
