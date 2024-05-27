"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateBio(bioState: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const userBio = bioState;

  const { error } = await supabase
    .from("profiles")
    .update({ bio: userBio })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}
