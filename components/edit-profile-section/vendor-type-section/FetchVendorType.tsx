"use server";
import { createClient } from "@/utils/supabase/server";

export default async function FetchVendorType() {

    const supabase = createClient();

    const {data: { user }} = await supabase.auth.getUser();

    if(!user) {
        return;
    }

    const { data: profile, error } = await supabase.from('profiles').select('vendor_type').eq('id', user.id);
    
    if(error) {
        throw error;
    }

    return profile[0].vendor_type;
}
