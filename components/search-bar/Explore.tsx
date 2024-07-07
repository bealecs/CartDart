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
import { UUID } from "crypto";

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
  vendor: boolean;
  favorites: UUID[];
}

export default function Explore() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [startedSearch, setStartedSearch] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartedSearch(startedSearch + 1);
    setIsLoading(true); // Set loading to true when search starts
    const result = await FetchSearchResults(query);
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
          vendor: resultItem.vendor,
          favorites: resultItem.favorites,
        }))
      );
    }
    setIsLoading(false); // Set loading to false after search completes
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center content-center bg-gray-900 min-h-screen p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-8">
          <h2 className="text-2xl text-white mb-4">Vendor Search</h2>
          <div className="flex items-center">
            <input
              autoFocus
              id="query"
              className="flex-grow text-black p-2 rounded-l-md"
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search vendors by name"
            />
            <button
              type="submit"
              className="bg-btn-background p-2 rounded-r-md"
            >
              <SearchIcon className="text-white" />
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center w-full my-8 gap-4">
          {!startedSearch && (
            <div className="my-8 mx-auto">
              <p className="text-4xl lg:text-5xl text-center md:text-4xl text-gray-300">
                Your search starts here
              </p>
              <Image
                src={"/logo2.svg"}
                alt="logo of Cart Dart"
                width={400}
                height={400}
                className="mx-auto"
              />
            </div>
          )}
          {isLoading ? (
            <div className="items-center h-screen bg-gray-900">
              <div className="text-white text-xl mb-4">Loading...</div>
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mx-auto"></div>
            </div> 
          ) : searchResults.length === 0 && startedSearch ? (
            <p className="text-white">
              There were no results found for your search, please try another
              vendor name
            </p>
          ) : (
            searchResults.map((result: User, index) => (
              <div
                key={index}
                className="transition duration-500 ease-in-out hover:bg-gray-900 bg-gray-800 shadow-lg rounded-lg overflow-hidden lg:w-1/4 md:w-1/3 w-full text-gray-200 border border-gray-700"
              >
                <div className="relative p-4 h-full flex flex-col">
                  {result.Latitude_Longitude_Location ? (
                    <div className="w-full h-64 items-center bg-gray-700 text-white">
                      <MapComponent
                        coordinates={result.Latitude_Longitude_Location}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 items-center bg-gray-700 text-white flex justify-center items-center">
                      <p className="text-center">No location found</p>
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-grow mt-4">
                    <h4 className="text-center text-lg font-semibold text-white">
                      {result.special_today
                        ? result.special_today
                        : "No current deals"}
                    </h4>
                    <p className="text-gray-400 mt-2">
                      {result.bio ? result.bio : "No bio available"}
                    </p>
                    <div className="flex items-center mt-4">
                      <Image
                        height={50}
                        width={50}
                        src={result.pfp ? result.pfp : "/default-pfp.svg"}
                        alt="Profile picture"
                        className="rounded-full mr-2"
                      />
                      <div className="flex flex-col">
                        <a
                          className="text-indigo-400 hover:text-indigo-600 font-bold"
                          href={`/${result.name}/${result.id}`}
                        >
                          {result.name}
                          <OpenInNewIcon fontSize="small" className="ml-1" />
                        </a>
                        <p className="text-sm text-gray-400 mt-1 flex items-center">
                          <RestaurantMenuIcon
                            fontSize="small"
                            className="mr-1"
                          />
                          {result.vendor_type
                            ? result.vendor_type
                            : "No vendor type"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Suspense>
  );
}
