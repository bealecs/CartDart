"use client";

import { useEffect, useState } from "react";
import UpdateBio from "./UpdateBio";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface Bio {
  bio: string;
}

export default function BioForm({bio}: Bio) {
  const [edittingBio, setEdittingBio] = useState(false);
  const [bioContent, setBioContent] = useState(String);

  useEffect(() => {
    setBioContent(bio);
  }, [bio]);

  const handleSubmit = () => {
    if (bioContent.length < 1) {
      alert("You must input atleast 1 character to submit a new bio");
      return;
    } else {
      UpdateBio(bioContent);
      setEdittingBio(false);
    }
  };
  return (
    <div className="m-4 text-xl font-semibold">
      {!edittingBio ? (
        <div className="flex justify-center">
          <div className="flex">
            <p className="mx-auto">{bioContent}</p>
            <button
              onClick={() => {
                setBioContent("");
                setEdittingBio(true);
              }}
            >
              <EditIcon className="mx-2" fontSize="small" />
            </button>
          </div>
        </div>
      ) : (
        <form className="flex" action={handleSubmit}>
          <label className="text-3xl hidden">New Bio:</label>
          <input
            autoFocus
            type="textarea"
            className="text-black rounded-md w-10/12"
            onChange={(e) => {
              setBioContent(e.target.value);
            }}
            value={bioContent}
          />
          <div className="flex mx-2">
            <button
              className="mr-1 border-2 border-white bg-btn-background rounded-md"
              type="submit"
            >
              <CheckIcon />
            </button>
            <button
              className="ml-1 border-2 border-white bg-red-700 rounded-md"
              onClick={() => {
                setBioContent(bio);
                setEdittingBio(false);
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
