"use server";

import { createClient } from "@/utils/supabase/server";
import VendorProfile from "./VendorProfile";
import CustomerProfile from "./CustomerProfile";
import { User } from "../lib/Supabase-Client";
import { GetCurrentUser } from "../lib/GetCurrentUser";
import { redirect } from "next/navigation";

export default async function Profile() {

  const supabase = createClient();

  const {data: {user}, error} = await supabase.auth.getUser();

  if(!user) {
    redirect("/login");
  }

  if(error) {
    return error;
  }

  const currentUser: User = await GetCurrentUser();

  return (
    <div>
      {currentUser.vendor ? <VendorProfile /> : <CustomerProfile />}
    </div>
  )
}