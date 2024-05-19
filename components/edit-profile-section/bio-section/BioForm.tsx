"use client";

import { useEffect, useState } from "react";
import UpdateBio from "./UpdateBio";
import FetchBio from "./FetchBio";

export default function BioForm() {
  const [edittingBio, setEdittingBio] = useState(false);
  const [bioContent, setBioContent] = useState(String);

  useEffect(() => {
    FetchBio().then((bioData) => {
      if (bioData) {
        setBioContent(bioData);
      } else {
        setBioContent("You have not set your bio yet!");
      }
    });
  }, []);

  return (
    <div className="border-solid border-4 border-white">
      {!edittingBio ? (
        <div>
          <h2 className="text-xl mx-5">Bio:</h2>
          {/* Need to add a suspense boundary here for the bio */}
          <div className="flex flex-row justify-start w-full py-5">
            <p className="w-7/12 mx-5">{bioContent}</p>
            <button onClick={() => setEdittingBio(true)} className="mx-12 ">Edit my bio</button>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col"
          action={() => {
            UpdateBio(bioContent);
            setEdittingBio(false);
          }}
        >
          <label>New Bio</label>
          <input
            type="textarea"
            className="text-black"
            onChange={(e) => {
              setBioContent(e.target.value);
            }}
            value={bioContent}
          />
          <button onClick={() => setEdittingBio(false)}>Discard changes</button>
          <button type="submit">Save changes</button>
        </form>
      )}
    </div>
  );
}
