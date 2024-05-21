"use server";
import { createClient } from "@/utils/supabase/server";

export default async function FetchUsername() {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) { 
        return;
    }
    const { data:  profiles, error } = await supabase.from('profiles').select('name').eq('id', user.id);

    if(error) {
        throw error;
    }

    return profiles[0].name;

}