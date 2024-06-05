"use server";
import { createClient } from "@/utils/supabase/server";

export async function UpdateCity(city: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ city: city })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

}

export async function UpdateState(state: string) {
    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return;
    }
  
    const { error } = await supabase
      .from("profiles")
      .update({ state: state })
      .eq("id", user.id);
  
    if (error) {
      throw error;
    }
  
  }
  
