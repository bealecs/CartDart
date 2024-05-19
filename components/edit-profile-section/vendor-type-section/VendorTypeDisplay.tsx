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
    "Vietnamese"
  ];
  
  
  return (
    <div className="border-solid border-4 border-white my-5">
      {!edittingVendorType ? (
        <div className="">
          <h2 className="text-xl mx-5">Vendor Category Display:</h2>
          {/* Need to add a suspense boundary here for the bio */}
          <div className="flex flex-row justify-start w-full py-2">
            <p className="mx-5">{vendorType}</p>
            <button
              onClick={() => {
                setVendorType("");
                setEdittingVendorType(true);
              }}
              className="mx-5"
            >
              Edit Vendor Category
            </button>
          </div>
        </div>
      ) : (
        <form className="flex flex-col" action={handleSubmit}>
          <label className="mx-5">New Vendor Category:</label>
          <select
            className="text-black w-fit p-2 m-2 mx-5 "
            onChange={(e) => setVendorType(e.target.value)}
            value={vendorType}
          >
            <option value="" disabled>
              Select a category
            </option>
            {foodVariations.map((culture) => (
              <option key={culture} value={culture.replace(' ', '_')}>
                {culture}
              </option>
            ))}
          </select>
          <button className="w-fit mx-5" onClick={() => setEdittingVendorType(false)}>
            Discard changes
          </button>
          <button className="w-fit mx-5" type="submit">Save changes</button>
        </form>
      )}
    </div>
  );
}
