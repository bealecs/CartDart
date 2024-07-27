"use server";

import { supabase } from "@/app/lib/Supabase-Client";

export default async function FetchSearchResults(query: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .textSearch('name', `${query}`);

  if (error) {
    console.log(error);
  }

  return data;
}

export async function FetchSearchResultsByCity(city: string) {
  const { data, error } = await supabase
  .from('profiles')
  .select()
  .textSearch('city', `${city}`);

if (error) {
  console.log(error);
}

return data;
}

export async function FetchSearchResultsByCuisine(cuisine: string) {
  const { data, error } = await supabase
  .from('profiles')
  .select()
  .textSearch('vendor_type', `${cuisine}`);

if (error) {
  console.log(error);
}

return data;
}