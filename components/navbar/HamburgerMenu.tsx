"use client";

import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ClearIcon from '@mui/icons-material/Clear';

export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      <button className="block md:hidden px-2" onClick={handleClick}>
        <MenuOpenIcon fontSize="large" className="text-6xl" />
      </button>
      {menuOpen ? <div className="w-screen h-fit bg-gray-900 absolute top-0 z-10 p-4 border-b-2 border-b-white">
        <button onClick={handleClick}><ClearIcon className="text-btn-background" fontSize="large" /></button>
        <ul className="my-4">
          <li onClick={handleClick} className="my-2"><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit text-2xl" href="/dashboard">Home</a></li>
          <li onClick={handleClick} className="my-2"><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit text-2xl" href="/explore">Explore</a></li>
          <li onClick={handleClick} className="my-2"><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit text-2xl" href="/favorites">My Favorites</a></li>
          <li onClick={handleClick} className="my-2"><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit text-2xl" href="https://discord.gg/7xt5eKdYc3" target="_blank" rel="ref noopener">Contact Us</a></li>
          <li onClick={handleClick} className="my-2"><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit text-2xl" href="/profile">My Profile</a></li>
        </ul>
      </div> : <p></p>}
    </div>
  );
}
