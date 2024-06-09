import Image from "next/image";
import SpeedIcon from "@mui/icons-material/Speed";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function Beta() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden"></div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-xl font-semibold leading-7 text-indigo-500">
                Beta Testing
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white-900 sm:text-4xl">
                Creating a great experience
              </h1>
              <p className="mt-6 text-md leading-8 text-indigo-800 border-2 border-indigo-800 rounded-xl text-center w-fit px-1">
                Limited public access
              </p>
            </div>
          </div>
        </div>

        <Image
          src={"/logo2.svg"}
          alt="logo for cart dart"
          width={400}
          height={400}
        />
        <div className="flex justify-center">
          <a href="/signup" className="underline">
            Sign up for beta testing
          </a>
          <OpenInNewIcon className="p-1" />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-white- lg:max-w-lg">
              <p>
                Cart Dart will be selecting users to receive early-access to
                participate in a closed beta testing. During this period, only
                permitted users will be given access to Cart Dart. The purpose
                of this closed beta testing is as follows:
              </p>
              <ul role="list" className="mt-8 space-y-8 text-indigo-500">
                <li className="flex gap-x-3">
                  <StorefrontIcon />
                  <span className="text-white">
                    <strong className="font-semibold text-indigo-500">
                      Market Validation
                    </strong>{" "}
                    helps to understand if the application meets market needs
                    and expectations.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ThumbUpAltIcon />
                  <span className="text-white">
                    <strong className="font-semibold text-indigo-500">
                      Real-World Feedback
                    </strong>{" "}
                    is invaluable for identifying usability issues, bugs, and
                    areas for improvement.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <SpeedIcon />
                  <span className="text-white">
                    <strong className="font-semibold text-indigo-500">
                      Performance Testing
                    </strong>{" "}
                    will provide valuable insights into the overall scalability
                    and reliability.
                  </span>
                </li>
              </ul>
              <h2 className="mt-8 text-2xl font-bold tracking-tight text-indigo-500">
                Care to join?
              </h2>
              <p className="mt-6">
                Sign ups are currently open for the beta testing period. Along
                with signing up to the application, you will be sent an
                invitation to a discord channel where you will be able to report
                your findings throughout the testing period.
              </p>
            </div>
            <div className="flex justify-center mt-10">
              <a href="/signup" className="underline">
                Sign up for beta testing
              </a>
              <OpenInNewIcon className="p-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
