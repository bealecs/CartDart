import { Navbar } from "@/components/Navbar";
import BioForm from "@/components/bio-section/BioForm";
import UploadToS3 from "@/components/pfp-section/UploadToS3";
import { createClient } from "@/utils/supabase/server"

export default async function Profile() {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();

    return (
        <div className="flex flex-col justify-evenly w-full">
            <Navbar />
            <UploadToS3 />
            <BioForm />
        </div>
    )
}