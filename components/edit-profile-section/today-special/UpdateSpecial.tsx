"use server";

import { createClient } from "@/utils/supabase/server";

export default async function UpdateSpecial(special: string) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if(!user) {
        return "There is no current user";
    }

    const { data: updatedSpecial, error} = await supabase.from('profiles').update({special_today: special}).eq('id' , user.id);

    if(error) {
        console.log(error);
    }

    return updatedSpecial;
}