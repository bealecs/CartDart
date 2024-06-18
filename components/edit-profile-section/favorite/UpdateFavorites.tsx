"use server"
import { supabase } from "@/app/lib/Supabase-Client";
import { UUID } from "crypto";
import FetchFavorites from "./FetchFavorites";

export default async function UpdateFavorites(id: UUID) {

  const favorites: UUID[] = await FetchFavorites();
  favorites.push(id);
  const uniqueFavorites = favorites.filter((item, index) => {
    return favorites.indexOf(item) === index;
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ favorites: uniqueFavorites })
    .eq('id', user.id);

  if (error) {
    throw error;
  }
}