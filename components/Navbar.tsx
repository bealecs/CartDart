import Image from "next/image";
import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex w-screen justify-around items-center text-sm ">
        <Image width={100} height={100} src={"/Logo.svg"} alt="Cart Dash logo" />
        <a href="/dashboard">Home</a>
        <a>Explore</a>
        <AuthButton />
      </div>
    </nav>
  );
};
