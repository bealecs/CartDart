"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateUsername(newName: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const newUsername = newName;

  const { error } = await supabase
    .from("profiles")
    .update({ name: newUsername })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}
