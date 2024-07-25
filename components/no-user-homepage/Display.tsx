import OpenInNew from "@mui/icons-material/OpenInNew";
import Image from "next/image";

export default function NoUserDisplay() {
  return (
    <div className="bg-gray-800 overflow-hidden items-center">
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
                <stop stopColor="#7775D6" />
                <stop offset="1" stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="text-center h-screen items-center content-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find Favorite Food Carts, Fast
            </h2>
            <Image src={"logo2.svg"} alt="Logo of Cart Dart" className="mx-auto" height={400} width={400} />            
            <div className="flex justify-center">
            <a href="/explore">Explore local vendors</a>
            <OpenInNew className="p-1"/>
            </div>
            <div className="mt-12 flex items-center justify-evenly lg:w-5/12 lg:mx-auto">
              <a
                href="/signup"
                className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-btn-background shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
