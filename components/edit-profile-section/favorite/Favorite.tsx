"use client"
import { UUID } from "crypto";
import UpdateFavorites from "./UpdateFavorites";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

interface ID {
    id: UUID;
    isFavorited: boolean;
    className?: string;
}

export default function Favorite({id, isFavorited, className}: ID) {
  const [favorited, setFavorited] = useState(isFavorited);
    
  const handleClick = () => {
    setFavorited(true)
    UpdateFavorites(id);
  };

  return (
    <div className={className}>
      <button onClick={handleClick}>{favorited ? <FavoriteIcon fontSize="large" className="text-indigo-800 selected:text-indigo-800"/> : <FavoriteBorderIcon fontSize="large" className="text-indigo-800"/>}</button>
    </div>
  );
}
