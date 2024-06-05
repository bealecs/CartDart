import GeoLocationComponent from "@/components/edit-profile-section/Geolocation/Geolocation";
import { Navbar } from "@/components/Navbar";
import BioForm from "@/components/edit-profile-section/bio-section/BioForm";
import UploadToS3 from "@/components/edit-profile-section/pfp-section/UploadToS3";
import VendorTypeDisplay from "@/components/edit-profile-section/vendor-type-section/VendorTypeDisplay";
import ChangeUsername from "@/components/edit-profile-section/username-section/ChangeUsername";
import AddMenu from "@/components/edit-profile-section/alter-menus/Menus";
import TodaySpecial from "@/components/edit-profile-section/today-special/TodaySpecialDisplay";
import EditCityState from "@/components/edit-profile-section/city-state/EditCityState";


export default async function Profile() {
     
    return (
        <div className="flex flex-col justify-evenly">
            <Navbar />
            <EditCityState/>
            <ChangeUsername />
            <UploadToS3 />
            <TodaySpecial />
            <VendorTypeDisplay />
            <BioForm />
            <AddMenu />
            <GeoLocationComponent />
        </div>
    )
}