"use client";

import { useEffect, useState } from "react";
import UpdateUsername from "./UpdateUsername";

interface Username {
  name: string;
}

export default function ChangeUsername({ name }: Username) {
  const [currentUsername, setCurrentUsername] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);
  const [edittingUsername, setEdittingUsername] = useState<boolean>(false);

  useEffect(() => {
    setCurrentUsername(name);
  }, [name]);

  const handleClick = () => {
    if (!edittingUsername) {
      setEdittingUsername(true);
    } else {
      setEdittingUsername(false);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    UpdateUsername(username);
    setEdittingUsername(false);
    setCurrentUsername(username);
  };

  return (
    <div className="border-2 rounded border-white my-5 p-5">
      <h4 className="text-xl">Current Username: {currentUsername}</h4>
      {!edittingUsername ? (
        <button onClick={handleClick}>Edit username</button>
      ) : (
        <form action={handleSubmit}>
          <label htmlFor="newUsername" className="mr-2">
            Enter a new username:
          </label>
          <input
            type="text"
            id="newUsername"
            className="my-2 text-black w-fit"
            value={username}
            onChange={handleChange}
          />
          <div className="flex my-2">
            <button type="submit">Save changes</button>
            <button
              className="mx-5"
              onClick={() => {
                setCurrentUsername(name);
                setEdittingUsername(false);
              }}
            >
              Discard changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
