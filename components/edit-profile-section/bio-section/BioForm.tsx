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
    <div className="border-solid border-2 border-white rounded my-5 p-5">
      {!edittingBio ? (
        <div>
          <h2 className="text-xl">Bio:</h2>
            <p className="w-fit my-2">{bioContent}</p>
            <button onClick={() => {
              setBioContent("");
              setEdittingBio(true)
            }
            }>
              Edit my bio
            </button>
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
          <div className="flex">
            <button className="mr-5" onClick={() => setEdittingBio(false)}>
              Discard changes
            </button>
            <button className="mx-5" type="submit">Save changes</button>
          </div>
        </form>
      )}
    </div>
  );
}
