import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex w-screen justify-around items-center text-sm pt-6 bg-gray-900">
        <div className="hidden md:block flex justify-center">
          <a href="/beta">Beta </a>
          <a href="/dashboard">Home</a>
          <a href="/explore">Explore</a>
        </div>

        <div className="block md:hidden">Something</div>
        <AuthButton />
      </div>
    </nav>
  );
};
