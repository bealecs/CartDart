"use server";
import { createClient } from "@/utils/supabase/server";

//This only works for clearing supabase DB.
export default async function DeleteMenuFromDB(menuArray, itemToDelete) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const newMenuArray = menuArray.filter((item) => item !== itemToDelete);

  const { error } = await supabase
    .from("profiles")
    .update({ menus: newMenuArray })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}
