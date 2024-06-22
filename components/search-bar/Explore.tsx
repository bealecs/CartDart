"use client";
import { Suspense, useState } from "react";
import FetchSearchResults from "./FetchSearchResults";
import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { User } from "@/app/lib/Supabase-Client";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Loading from "../loading-fallbacks/LoadingEditProfile";

interface SearchResults {
  id: string;
  name: string;
  email: string;
  bio: string;
  pfp: string;
  Latitude_Longitude_Location: number[];
  vendor_type: string;
  menus: string[];
  special_today: string;
  state: string;
  city: string;
}

export default function Explore() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [startedSearch, setStartedSearch] = useState<number>(0);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setStartedSearch(startedSearch + 1);
    FetchSearchResults(query).then((result) => {
      if (result) {
        setSearchResults(
          result.map((resultItem) => ({
            id: resultItem.id,
            name: resultItem.name,
            email: resultItem.email,
            bio: resultItem.bio,
            pfp: resultItem.pfp,
            Latitude_Longitude_Location: resultItem.Latitude_Longitude_Location,
            vendor_type: resultItem.vendor_type,
            menus: resultItem.menus,
            special_today: resultItem.special_today,
            state: resultItem.state,
            city: resultItem.city,
          }))
        );
      }
    });
  };

  return (
    <div className="mx-auto w-9/12 my-12">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl">Vendor Search</h2>
        <div className="flex">
          <input
            autoFocus
            id="query"
            className="text-black p-1 rounded-md my-4 mr-2"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search vendors by name"
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      <div className="flex">
        {!startedSearch && (
          <div className="my-8 mx-auto">
            <p className="text-4xl">Your search starts here</p>
            <Image
              src={"/logo2.svg"}
              alt="logo of Cart Dart"
              width={400}
              height={400}
            />
          </div>
        )}

        {searchResults.length === 0 ? (
          <p className={startedSearch ? "block" : "hidden"}>
            There were no results found for your search, please try another
            vendor name
          </p>
        ) : (
          searchResults.map((result: User, index) => (
            <Suspense fallback={<Loading />}>
              <div
                className="transition duration-500 m-2 linear bg-indigo-400 my-2 lg:w-3/12 md:w-7/12 sm:w-full text-black border-solid border-2 border-white relative"
                key={index}
              >
                <div className="relative mx-auto flex flex-col p-4 h-full">
                  {result.Latitude_Longitude_Location ? (
                    <div className="w-full h-[300px] items-center content-center bg-white text-black">
                      <MapComponent
                        coordinates={result.Latitude_Longitude_Location}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[400px] items-center content-center bg-white text-black">
                      <p className="mx-auto text-center">
                        There was no current location found
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-grow">
                    <h4 className="py-2 text-xl italic text-center">
                      {!result.special_today
                        ? "There are currently no deals highlighted for this vendor"
                        : result.special_today}
                    </h4>
                    <h4 className="py-2">
                      {result.bio
                        ? result.bio
                        : "There is no bio for this vendor yet"}
                    </h4>
                    <div className="flex items-center py-2">
                      <Image
                        height={50}
                        width={50}
                        src={result.pfp ? result.pfp : "/default-pfp.svg"}
                        alt="Profile picture for the vendor specified"
                        className="rounded-full mr-2"
                      />
                      <div className="flex flex-col flex-wrap">
                        <a
                          className="transition duration-300 linear hover:text-indigo-800 h-fit w-fit items-center content-center"
                          href={`/${result.name}/${result.id}`}
                        >
                          {result.name}
                          <span>
                            {" "}
                            <OpenInNewIcon fontSize="small" />
                          </span>
                        </a>
                        <p className=" text-sm border-2 rounded-full w-fit px-1 border-indigo-800 text-indigo-800">
                          <span>
                            <RestaurantMenuIcon fontSize="small" />
                          </span>
                          {!result.vendor_type
                            ? "No vendor type found"
                            : `${result.vendor_type}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          ))
        )}
      </div>
    </div>
  );
}
