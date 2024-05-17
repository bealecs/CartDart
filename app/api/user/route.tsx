import { createClient } from "@/utils/supabase/server";

export default async function User() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    
    if(!user) {
        return;
    }

    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id);
    
    if(error) {
        throw error;
    }

    return profile[0];

}