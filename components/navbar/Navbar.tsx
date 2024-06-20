import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AuthButton from "./AuthButton";

export const Navbar = () => {
  
  return (
    <nav>
      <div className="flex w-screen md:justify-evenly items-center text-sm pt-4 md:pt-6 bg-gray-900">
        <ul className="hidden md:flex justify-evenly w-6/12">
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="/dashboard">Home</a></li>
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="/explore">Explore</a></li>
          <li><a className="transition duration-300 linear border-b-transparent border-b-2 hover:border-b-gray-400 hover:text-gray-400 w-fit" href="/favorites">My Favorites</a></li>
        </ul>

        <div className="block md:hidden px-1"><MenuOpenIcon fontSize='large' className='text-6xl'/></div>
        <div className="w-6/12">
          <AuthButton />
        </div>
        
      </div>
    </nav>
  );
};
