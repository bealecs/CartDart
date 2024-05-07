import AuthButton from "./AuthButton";

export const Navbar = () => {
  return (
    <nav>
      <div className="w-screen flex justify-between items-center p-3 text-sm ">
        <a>Home</a>
        <a>Explore</a>
        <a>My Courses</a>
        <a href="">Create a Course</a>
        <a>Subscription Plans</a>
        <AuthButton />
      </div>
    </nav>
  );
};
