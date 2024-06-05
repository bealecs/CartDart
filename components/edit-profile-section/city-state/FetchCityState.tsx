"use server";
import { supabase } from "@/app/lib/Supabase-Client";
import { User } from "@supabase/supabase-js";

export async function FetchCity() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "There was no user passed with the fetch city function";
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("city")
    .eq("id", user.id);

  if (error) {
    console.log(error);
  }
  //returns the city of the current user from the db value
  return profile[0].city;
}

export async function FetchState() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "There was no user passed with the fetch state function";
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("state")
    .eq("id", user.id);

  if (error) {
    console.log(error);
  }
  //returns the state of the current user from the db value
  return profile[0].state;
}
