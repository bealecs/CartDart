import { GeoLocationComponent } from "@/components/edit-profile-section/Geolocation/Geolocation";
import { Navbar } from "@/components/Navbar";
import BioForm from "@/components/edit-profile-section/bio-section/BioForm";
import UploadToS3 from "@/components/edit-profile-section/pfp-section/UploadToS3";
import { createClient } from "@/utils/supabase/server"
import VendorTypeDisplay from "@/components/edit-profile-section/vendor-type-section/VendorTypeDisplay";

export default async function Profile() {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();

    return (
        <div className="flex flex-col justify-evenly w-full">
            <Navbar />
            <UploadToS3 />
            <VendorTypeDisplay />
            <BioForm />
            <GeoLocationComponent />
        </div>
    )
}