"use client";

import { useEffect, useState } from "react";
import UpdateBio from "./UpdateBio";

interface Bio {
  bio: string;
}

export default function BioForm(bio: Bio) {
  const [edittingBio, setEdittingBio] = useState(false);
  const [bioContent, setBioContent] = useState(String);

  useEffect(() => {
    setBioContent(bio.bio);
  }, [bio.bio]);

  const handleSubmit = () => {
    if(bioContent.length < 1) {
      alert("You must input atleast 1 character to submit a new bio")
      return;
    } else {
      UpdateBio(bioContent);
      setEdittingBio(false);
    }
  }
  return (
    <div className="border-solid border-2 border-white rounded my-5 p-5">
      {!edittingBio ? (
        <div>
          <h2 className="text-xl">Bio:</h2>
          <p className="w-fit my-2">{bioContent}</p>
          <button
            onClick={() => {
              setBioContent("");
              setEdittingBio(true);
            }}
          >
            Edit my bio
          </button>
        </div>
      ) : (
        <form
          className="flex flex-col"
          action={handleSubmit}
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
            <button
              className="mr-5"
              onClick={() => {
                setBioContent(bio.bio);
                setEdittingBio(false);
              }}
            >
              Discard changes
            </button>
            <button className="mx-5" type="submit">
              Save changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
