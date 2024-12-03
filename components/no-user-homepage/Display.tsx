import OpenInNew from "@mui/icons-material/OpenInNew";
import CartPusher from "../svg-components/CartPusher";

export default function NoUserDisplay() {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="relative isolate overflow-x-hidden bg-gray-900 px-6 py-10 lg:py-16 shadow-2xl sm:rounded-3xl max-w-4xl w-full">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 lg:h-[64rem] lg:w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
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

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find Favorite Food, Fast
          </h2>
          <div className="flex justify-center items-center">
            <CartPusher />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <a
              href="/explore"
              className="text-lg text-white underline hover:text-gray-300"
            >
              Explore local vendors
            </a>
            <OpenInNew className="text-white" />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/signup"
              className="rounded-md bg-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
              Create an account
            </a>
            <a
              href="/login"
              className="text-sm font-semibold leading-6 text-white hover:underline"
            >
              Log in <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
