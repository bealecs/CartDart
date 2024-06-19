"use client";
import { useState } from "react";
import FetchSearchResults from "./FetchSearchResults";
import MapComponent from "../edit-profile-section/Geolocation/MapComponent";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";

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
  const [startedSearch, setStartedSearch] = useState<boolean>(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setStartedSearch(!startedSearch);
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
          <div> </div>
        )}
        {searchResults.length === 0 ? (
          <p>
            There were no results found for your search, please try another
            vendor name
          </p>
        ) : (
          searchResults.map((result, index) => (
            <div
              key={index}
              className="border-2 p-1 border-white rounded w-fit"
            >
              <div className="text-white flex flex-col">
                <a
                  href={"/" + result.name + "/" + result.id}
                  className="w-full"
                >
                  <div className="flex items-center">
                    <Image
                      src={result.pfp ? result.pfp : "/default-pfp.svg"}
                      alt={"Profile picture for:" + result.name}
                      width={60}
                      height={60}
                      className="rounded"
                    />
                    <p className="mx-5">{result.name}</p>
                  </div>
                  <p>
                    {result.city}, {result.state}
                  </p>
                  <p className="text-left">
                    <span className="underline">Cuisine:</span>{" "}
                    {result.vendor_type
                      ? result.vendor_type
                      : "Cuisine type not specified"}
                  </p>
                  {result.special_today ? (
                    <p>
                      <span className="underline">Deal of the day:</span>{" "}
                      {result.special_today}
                    </p>
                  ) :
                  <br />}
                </a>
              </div>
              <div className="h-[400px] w-[400px]">
                {result.Latitude_Longitude_Location ? (
                  <MapComponent
                    coordinates={result.Latitude_Longitude_Location}
                  />
                ) : (
                  <p>There is no current vendor location</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
