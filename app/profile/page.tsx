import GeoLocationComponent from "@/components/edit-profile-section/Geolocation/Geolocation";
import BioForm from "@/components/edit-profile-section/bio-section/BioForm";
import UploadToS3 from "@/components/edit-profile-section/pfp-section/UploadToS3";
import VendorTypeDisplay from "@/components/edit-profile-section/vendor-type-section/VendorTypeDisplay";
import ChangeUsername from "@/components/edit-profile-section/username-section/ChangeUsername";
import AddMenu from "@/components/edit-profile-section/alter-menus/Menus";
import TodaySpecial from "@/components/edit-profile-section/today-special/TodaySpecialDisplay";
import EditCityState from "@/components/edit-profile-section/city-state/EditCityState";
import { Navbar } from "@/components/navbar/Navbar";
import FetchBio from "@/components/edit-profile-section/bio-section/FetchBio";
import FetchVendorType from "@/components/edit-profile-section/vendor-type-section/FetchVendorType";
import FetchLocation from "@/components/edit-profile-section/Geolocation/FetchLocation";
import {
  FetchCity,
  FetchState,
} from "@/components/edit-profile-section/city-state/FetchCityState";
import FetchUsername from "@/components/edit-profile-section/username-section/FetchUsername";
import { Suspense } from "react";
import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import FetchSpecial from "@/components/edit-profile-section/today-special/FetchSpecial";
import FetchMenus from "@/components/edit-profile-section/alter-menus/FetchMenus";
import FetchPFP from "@/components/edit-profile-section/pfp-section/FetchPFP";
import Link from "next/link";

export default async function Profile() {
  const bio: string = await FetchBio();
  const vendorType: string = await FetchVendorType();
  const coordinates: number[] = await FetchLocation();
  const city: string = await FetchCity();
  const state: string = await FetchState();
  const name: string = await FetchUsername();
  const special: string = await FetchSpecial();
  const menus: string[] = await FetchMenus();
  const pfp: string = await FetchPFP();

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
        <div className="mt-24">
          <UploadToS3 pfp={pfp} />
          <ChangeUsername name={name} />
          <EditCityState city={city} state={state} />
          <TodaySpecial special_today={special} />
          <VendorTypeDisplay vendor_type={vendorType} />
          <BioForm bio={bio} />
          <AddMenu menus={menus} />
          <GeoLocationComponent latitude_longitude_location={coordinates} />
        </div>
      </div>
    </Suspense>
  );
}
