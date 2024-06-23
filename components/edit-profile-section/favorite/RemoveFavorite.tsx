"use server";
import { UUID } from "crypto";
import FetchFavorites from "./FetchFavorites";
import { User, supabase } from "@/app/lib/Supabase-Client";
import { GetCurrentUser } from "@/components/home-page-display/GetVendors";

export default async function RemoveFavorite(id: UUID) {

    //fetches current user & their favorites
    const favorites: UUID[] = await FetchFavorites();
    const currentUser: User = await GetCurrentUser();

    //remove the selected user id from the array of current user favorites
    function removeIdFromArray(array, idToRemove) {
        return array.filter(id => id !== idToRemove);
    }
    
    //new list of favorites with the desired favorite removed
    const updatedFavorites: UUID[] = removeIdFromArray(favorites, id);

    const {data, error} = await supabase.from('profiles').update({
        favorites: updatedFavorites
    }).eq('id', currentUser.id);


    if(error){
        console.log(error);
    }

    return data;
}