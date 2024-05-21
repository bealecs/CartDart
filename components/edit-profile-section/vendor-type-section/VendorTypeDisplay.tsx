"use client";

import { useEffect, useState } from "react";
import FetchVendorType from "./FetchVendorType";
import UpdateVendorType from "./UpdateVendorType";

export default function VendorTypeDisplay() {
  const [edittingVendorType, setEdittingVendorType] = useState(false);
  const [vendorType, setVendorType] = useState(String);

  useEffect(() => {
    FetchVendorType().then((vendorType) => {
      if (vendorType) {
        setVendorType(vendorType);
      } else {
        setVendorType("There is no vendor category currently set");
      }
    });
  }, []);

  const handleSubmit = () => {
    UpdateVendorType(vendorType);
    setEdittingVendorType(false);
  };

  const foodVariations = [
    "American",
    "Brazilian",
    "Caribbean",
    "Chinese",
    "Cuban",
    "Dessert",
    "Ethiopian",
    "Filipino",
    "French",
    "Greek",
    "Hawaiian",
    "Indian",
    "Italian",
    "Japanese",
    "Korean",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Peruvian",
    "Thai",
    "Vietnamese",
  ];

  return (
    <div className="border-solid border-2 border-white p-5 my-5 rounded">
      {!edittingVendorType ? (
        <div>
          <div className="flex">
            <h2 className="text-xl">Vendor Category Display:</h2>
            <p className=" items-center content-center mx-2 text-xl">
              {vendorType}
            </p>
          </div>
          <div className="flex flex-row justify-start w-full">
            <button
              onClick={() => {
                setVendorType("");
                setEdittingVendorType(true);
              }}
            >
              Edit Vendor Category
            </button>
          </div>
        </div>
      ) : (
        <form className="flex flex-col" action={handleSubmit}>
          <label htmlFor="newVendor" className="text-xl">New Vendor Category:</label>
          <select
            className="text-black w-fit my-2"
            id="newVendor"
            onChange={(e) => setVendorType(e.target.value)}
            value={vendorType}
          >
            <option value="" disabled>
              Select a category
            </option>
            {foodVariations.map((culture) => (
              <option key={culture} value={culture.replace(" ", "_")}>
                {culture}
              </option>
            ))}
          </select>
          <div className="flex">
            <button
              className="w-fit"
              onClick={() => setEdittingVendorType(false)}
            >
              Discard changes
            </button>
            <button className="w-fit mx-5" type="submit">
              Save changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
