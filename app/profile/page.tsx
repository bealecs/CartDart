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

export default async function Profile() {
     
    const bio: string  = await FetchBio();
    const vendorType: string = await FetchVendorType();
    const coordinates: number[] | null = await FetchLocation(); 

    return (
        <div className="flex flex-col justify-evenly bg-background">
            <Navbar />
            <EditCityState/>
            <ChangeUsername />
            <UploadToS3 />
            <TodaySpecial />
            <VendorTypeDisplay vendor_type={vendorType} />
            <BioForm bio={bio}/>
            <AddMenu />
            <GeoLocationComponent latitude_longitude_location={coordinates}/>
        </div>
    )
}