"use client";
import { useState } from "react";
import FetchSearchResults from "./FetchSearchResults";
import MapComponent from "../edit-profile-section/Geolocation/MapComponent";

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
}

export default function Explore() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
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
          }))
        );
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="query">Vendor Search</label>
        <input
          id="query"
          className="text-black p-1"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search vendors by name here"
        />
        <button type="submit">Enter Search</button>
      </form>
      {searchResults.length === 0
        ? null
        : searchResults.map((result, index) => (
            <div key={index} className="text-white flex flex-col border-2 border-white rounded w-fit my-5">
              <p>Vendor Name: {result.name}</p>
              <p>Vendor Cuisine: {result.vendor_type}</p>
              <div>
                <p>Vendor Location:</p>
                <MapComponent
                  coordinates={result.Latitude_Longitude_Location}
                />
              </div>
            </div>
          ))}
    </div>
  );
}
