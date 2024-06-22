"use client";

import { useEffect, useState } from "react";
import UpdateBio from "./UpdateBio";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

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
    if (bioContent.length < 1) {
      alert("You must input atleast 1 character to submit a new bio");
      return;
    } else {
      UpdateBio(bioContent);
      setEdittingBio(false);
    }
  };
  return (
    <div>
      {!edittingBio ? (
        <div>
          <h2 className="text-3xl">Bio:</h2>
          <div className="flex">
            <p className="w-fit">{bioContent}</p>
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
            type="textarea"
            className="text-black rounded-md w-7/12"
            onChange={(e) => {
              setBioContent(e.target.value);
            }}
            value={bioContent}
          />
          <div className="flex">
          <button className="mx-2 border-2 border-white bg-btn-background rounded-md" type="submit">
              <CheckIcon />
            </button>
            <button
              className="mx-2 border-2 border-white bg-red-700 rounded-md"
              onClick={() => {
                setBioContent(bio.bio);
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
