"use client";

import { useEffect, useState } from "react";
import UpdateVendorType from "./UpdateVendorType";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface VendorType {
  vendor_type: string;
}

export default function VendorTypeDisplay(type: VendorType) {
  const [edittingVendorType, setEdittingVendorType] = useState(false);
  const [vendorType, setVendorType] = useState(String);

  useEffect(() => {
    setVendorType(type.vendor_type);
  }, [type.vendor_type]);

  const handleSubmit = () => {
    if (vendorType.length < 1) {
      alert("You must select a vendor type");
    } else {
      UpdateVendorType(vendorType);
      setEdittingVendorType(false);
    }
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
    <div>
      {!edittingVendorType ? (
        <div>
          <h2 className="text-3xl">Vendor Category Display:</h2>
          <div className="flex">
            <p className=" items-center content-center text-xl">
              {!vendorType
                ? "There is no selected vendor category yet"
                : vendorType.replace(/_/g, " ")}
            </p>

            <div className="flex flex-row justify-start w-full">
              <button
                onClick={() => {
                  setVendorType("");
                  setEdittingVendorType(true);
                }}
              >
                <EditIcon fontSize="small" className="mx-2" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form className="flex h-fit items-center content-center" action={handleSubmit}>
          <label htmlFor="newVendor" className="hidden">
            New Vendor Category:
          </label>
          <select
            className="text-black w-fit p-1 rounded-md my-2"
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
          <div className="flex h-fit content-center items-center">
          <button className="mx-2 border-2 border-white bg-btn-background rounded-md" type="submit">
              <CheckIcon />
            </button>
            <button
              className=" border-2 border-white bg-red-700 rounded-md"
              onClick={() => {
                setVendorType(type.vendor_type);
                setEdittingVendorType(false);
              }}
            >
              <ClearIcon />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
