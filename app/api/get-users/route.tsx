"use server";
import { createClient } from "@/utils/supabase/server";

export default async function GET() {
    const supabase = createClient();

    const { data: profiles, error } = await supabase.from('profiles').select('*');
    
    if(error) {
        throw error;
    }

    return profiles;

}