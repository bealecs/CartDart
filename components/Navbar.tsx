import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex w-screen justify-around items-center text-sm pt-6 bg-gray-900">
        <a href="/beta">Beta </a>
        <a href="/dashboard">Home</a>
        <a href="/explore">Explore</a>
        <AuthButton />
      </div>
    </nav>
  );
};
