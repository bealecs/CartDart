"use client";
import Image from "next/image";
import SpeedIcon from "@mui/icons-material/Speed";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";

export default function Beta() {
  const [selected, setSelected] = useState<string>("beta");
  const selectedView =
    "bg-indigo-600 hover:bg-indigo-800 rounded-md border-2 border-gray-700 w-full text-center mx-1";
  const deselectedView =
    "hover:bg-indigo-800 border-2 rounded-md border-gray-700 w-full text-center mx-1";

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 px-6  sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-xl font-semibold leading-7 text-indigo-500">
                Closed Beta Testing
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white-900 sm:text-4xl">
                Creating a great experience
              </h1>
              <p className="mt-6 text-md leading-8 text-indigo-600 border-2 border-indigo-600 rounded-xl text-center w-fit px-1">
                Limited public access
              </p>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <Image
            src={"/logo2.svg"}
            alt="logo for cart dart"
            width={400}
            height={400}
          />
        </div>

        <div className="lg:hidden flex justify-center">
          <a href="https://discord.gg/PMbD7QN22z" target="_blank" rel="noopener noreferrer" className="underline">
            Sign up for beta testing
          </a>
          <OpenInNewIcon className="p-1" />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-white- lg:max-w-lg">
              <div className="">
                <ul className="flex justify-evenly w-full">
                  <li
                    onClick={() => setSelected("beta")}
                    className={
                      selected === "beta" ? selectedView : deselectedView
                    }
                  >
                    BETA
                  </li>
                  <li
                    onClick={() => setSelected("mission")}
                    className={
                      selected === "mission" ? selectedView : deselectedView
                    }
                  >
                    Our Mission
                  </li>
                </ul>
                {selected === "beta" ? (
                  <>
                    <p className="mt-4">
                      Cart Dart is inviting users to receive early-access to
                      participate in a closed beta testing. During this period,
                      only permitted users will be given access to Cart Dart.
                      The purpose of this closed beta testing is as follows:
                    </p>
                    <ul role="list" className="mt-8 space-y-8 text-indigo-500">
                      <li className="flex gap-x-3">
                        <StorefrontIcon />
                        <span className="text-white">
                          <strong className="font-semibold text-indigo-500">
                            Market Validation
                          </strong>{" "}
                          helps to understand if the application meets market
                          needs and expectations.
                        </span>
                      </li>
                      <li className="flex gap-x-3">
                        <ThumbUpAltIcon />
                        <span className="text-white">
                          <strong className="font-semibold text-indigo-500">
                            Real-World Feedback
                          </strong>{" "}
                          is invaluable for identifying usability issues, bugs,
                          and areas for improvement.
                        </span>
                      </li>
                      <li className="flex gap-x-3">
                        <SpeedIcon />
                        <span className="text-white">
                          <strong className="font-semibold text-indigo-500">
                            Performance Testing
                          </strong>{" "}
                          will provide valuable insights into the overall
                          scalability and reliability.
                        </span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <div>
                    <h3 className="my-4 text-2xl">Cart Dart Mission Statement</h3>
                    <p className="my-4">
                      At Cart Dart, our mission is
                      to make finding local food vendors effortless.</p>
                      <p className="my-4"> Cart Dart is committed to providing a
                      platform that allows food vendors to share their locations, menus, and special deals
                      with ease. </p>
                      <p className="my-4">The goal is to help individuals quickly and
                      easily discover and support local food trucks and food
                      stands, especially when visiting new cities. By connecting
                      people to the local food scene, we aim to enhance the
                      experience of exploring and enjoying local culinary
                      offerings.
                    </p>
                  </div>
                )}
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-indigo-500">
                Care to join?
              </h3>
              <p className="mt-6 text-xl font-semibold">
                Sign ups are currently open for the beta testing period!
              </p>
            </div>
            <div className="flex justify-center mt-10">
              <a href="https://discord.gg/PMbD7QN22z" target="_blank" rel="noopener noreferrer" className="underline">
                Sign up for beta testing
              </a>
              <OpenInNewIcon className="p-1" />
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src={"/logo2.svg"}
              alt="logo for cart dart"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
