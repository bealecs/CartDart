"use client";

import { useEffect, useState } from "react";
import UpdateUsername from "./UpdateUsername";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

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
    <div className="flex items-center w-fit">
      {!edittingUsername ? (
        <>
          <h4 className="text-xl mr-4">{currentUsername}</h4>
          <button onClick={handleClick}><EditIcon fontSize="small"/></button>
        </>
      ) : (
        <form action={handleSubmit}>
          <label htmlFor="newUsername" className="hidden">
            Enter a new username:
          </label>
          <input
            autoFocus
            type="text"
            id="newUsername"
            className="my-2 text-black w-8/12 rounded-md"
            value={username}
            onChange={handleChange}
          />
          
            <button type="submit" className="mx-2"><CheckIcon className="border-2 border-white bg-btn-background rounded-md"/></button>
            <button
              className="mx-2"
              onClick={() => {
                setCurrentUsername(name);
                setEdittingUsername(false);
              }}
            >
              <ClearIcon className="border-2 border-white bg-red-700 rounded-md" />
            </button>
        </form>
      )}
    </div>
  );
}
