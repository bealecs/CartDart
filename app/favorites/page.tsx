import FavoritesPageComponent from "@/components/edit-profile-section/favorite/FavoritesList";
import { Navbar } from "@/components/navbar/Navbar";

export default async function FavoritesPage() {
 
  return (
    <div className="bg-gray-900 h-screen overflow-x-hidden">
        <Navbar />
        <FavoritesPageComponent />
    </div>
  )
}
