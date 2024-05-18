"use server";
import { createClient } from "@/utils/supabase/server";

export default async function UpdatePFP() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const link = `${process.env.AWS_S3_PFP_LINK}${user.user_metadata.name}pfp`;

  const { error } = await supabase
    .from("profiles")
    .update({ pfp: link })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}
