import Image from "next/image";

export default function NoUserDisplay() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8 sm:text-5xl">
        Find Favorite Food, Fast
      </h1>

      {/* Image */}
      <Image
        src="/logo.png"
        alt="Cart Dart logo"
        width={550}
        height={550}
        className="rounded-lg mb-8 w-[400px] h-[400px] lg:w-[550px] lg:h-[550px]"
      />

      {/* Anchor and Buttons */}
      <div className="text-center space-y-4">
        <a
          href="/explore"
          className="block text-lg font-medium underline hover:text-gray-300"
        >
          Explore local vendors
        </a>
        <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-4">
          <a
            href="/signup"
            className="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400"
          >
            Create an account
          </a>
          <a
            href="/login"
            className="mt-4 sm:mt-0 text-sm font-semibold leading-6 text-white hover:underline"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}