"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdateMenu(uuid: string, menuArray: string[]) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const link = `${process.env.AWS_S3_MENUS_LINK}${user.user_metadata.name}Menu${uuid}`;
  const menus = [...menuArray, link]
 //fix this to update and add rather than to change the column
  const { error } = await supabase
    .from("profiles")
    .update({ menus: menus })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}
