import Image from "next/image";
import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex w-screen justify-around items-center text-sm ">
        <a href="/dashboard">Home</a>
        <a>Explore</a>
        <AuthButton />
      </div>
    </nav>
  );
};
