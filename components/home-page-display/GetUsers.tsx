"use server";
import { createClient } from "@/utils/supabase/server";

export default async function GetUsers() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data: profiles, error } = await supabase.from('profiles').select('*').eq('state', user.user_metadata.state).eq('city', user.user_metadata.city).range(0, 9);
    
    if(error) {
        throw error;
    }

    return profiles;
}