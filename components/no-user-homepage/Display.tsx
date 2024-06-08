import Image from "next/image";

export default function NoUserDisplay() {
  return (
    <div className="bg-gray-800 overflow-hidden">
      <div className="mx-auto ">
        <div className="h-screen relative isolate overflow-hidden bg-gray-900 px-6 lg:pt-0 pt-16 shadow-2xl sm:rounded-3xl">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find Favorite Food Carts, Fast
            </h2>
            <Image src={"/logo2.svg"} alt="logo image for cart dart" width={400} height={400} className="py-6" />
            {/* <p className="hidden mt-6 text-lg leading-8 text-gray-300">
              Explore local vendors to find new favorites
            </p> */}
            <a href="/explore">Explore local vendors <span aria-hidden="true">→</span></a>
            <div className="mt-16 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Create an account
              </a>
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-white"
              >
                Log in <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
