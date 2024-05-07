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
    <div>
      {!edittingBio ? (
        <div>
          <div>
            <h4>Bio</h4>
          </div>
          <p>{bioContent}</p>
          <button onClick={() => setEdittingBio(true)}>Edit my bio</button>
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
