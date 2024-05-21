"use server";
import { createClient } from "@/utils/supabase/server";

//fetches coordinates of the vendor when they are active
export default async function FetchLocation() {

    const supabase = createClient();

    const {data: { user }} = await supabase.auth.getUser();

    if(!user) {
        return;
    }

    const { data: profile, error } = await supabase.from('profiles').select('Latitude_Longitude_Location').eq('id', user.id);
    
    if(error) {
        throw error;
    }

    return profile[0].Latitude_Longitude_Location;
}


