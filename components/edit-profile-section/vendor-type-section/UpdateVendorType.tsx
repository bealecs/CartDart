"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateVendorType(vendorType: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ vendor_type: vendorType })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}
