"use server"
import { createClient } from "@/utils/supabase/server";

//This function grabs the user from supabase authentication to check it against the profiles table in the supabase public DB
//This will fetch all of the data from the public profiles DB schema for the current user
export async function GetCurrentUser() {
    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id);
  
    if (error) {
      throw error;
    }
  
    return profiles[0];
  }