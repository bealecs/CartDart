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

  return (
    <div>
      {!edittingVendorType ? (
        <div className="my-10">
          <h2 className="text-xl mx-5">Vendor Category Display:</h2>
          {/* Need to add a suspense boundary here for the bio */}
          <div className="flex flex-row justify-center w-full py-5">
            <p>{vendorType}</p>
            <button onClick={() => {
                setVendorType("")
                setEdittingVendorType(true)
            }} className="mx-12 ">Edit Vendor Category</button>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col"
          action={() => {
            UpdateVendorType(vendorType);
            setEdittingVendorType(false);
          }}
        >
          <label>New Vendor Category:</label>
          <input
            type="select"
            className="text-black"
            onChange={(e) => {
              setVendorType(e.target.value);
            }}
            value={vendorType}
          />
          <button onClick={() => setEdittingVendorType(false)}>Discard changes</button>
          <button type="submit">Save changes</button>
        </form>
      )}
    </div>
  );
}
