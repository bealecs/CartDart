import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-around items-center p-3 text-sm ">
        <a href="/dashboard">Home</a>
        <a>Explore</a>
        <AuthButton />
      </div>
    </nav>
  );
};
