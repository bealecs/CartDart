"use server";
import { GetCurrentUser } from "@/app/lib/GetCurrentUser";
import { createClient } from "@/utils/supabase/server";

//This field contains all of the properties that exist within the Public Profiles DB table
//These values will be returned from the GetCurrentUsers() function
interface User {
  Latitude_Longitude_Location: number[];
  bio: string;
  email: string;
  id: string;
  name: string;
  pfp: string;
  vendor_type: string;
  menus: string[];
  special_today: string;
  state: string;
  city: string;
  vendor: boolean;
}

//This function uses information from the above function to display vendors local to the current user. 
//fetches the current user and then fetches all of the filtered responses of local vendors from the DB
export default async function GetVendors() {
  const supabase = createClient();

  const supabaseUser: User = await GetCurrentUser();
  //home display; finds all vendors that are in the same city as the current user to display them
  //range 0,9 displays the first 10 results. this is for pagination, and might be removed later
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("state", supabaseUser.state)
    .eq("city", supabaseUser.city)
    .eq("vendor", true)
    .range(0, 9);

  if (error) {
    throw error;
  }

  return profiles;
}
