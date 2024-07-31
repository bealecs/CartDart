import AuthButton from "./AuthButton";
import HamburgerMenu from './HamburgerMenu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const Navbar = () => {
  
  return (
    <nav>
      <div className="flex w-screen  md:justify-evenly items-center text-sm pt-4 md:pt-6 bg-gray-900 border-b">
        <ul className="hidden md:flex justify-evenly w-6/12">
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="/dashboard">Home</a></li>
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="/explore">Explore</a></li>
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="/favorites">My Favorites</a></li>
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="https://discord.gg/7xt5eKdYc3" target="_blank" rel="ref noopener">Contact Us <OpenInNewIcon fontSize="small"/></a></li>
        </ul>
        <HamburgerMenu />
        <div className="w-full pr-4">
          <AuthButton />
        </div>
        
      </div>
    </nav>
  );
};
