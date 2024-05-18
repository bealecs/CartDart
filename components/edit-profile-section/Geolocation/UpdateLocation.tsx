"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateLocation(
  latitude: number,
  longitude: number
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ Latitude_Longitude_Location: [latitude, longitude] })
    .eq("id", user.id);

  if (error) {
    throw error;
  }
}

export async function UpdateStatus(bool: boolean) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }
  const { error } = await supabase
    .from("profiles")
    .update({ location_active: bool })
    .eq("id", user.id);

  if (error) {
    throw error;
  }
}
