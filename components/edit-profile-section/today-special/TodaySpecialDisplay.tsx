"use client";
import { useEffect, useState } from "react";
import UpdateSpecial from "./UpdateSpecial";
import FetchSpecial from "./FetchSpecial";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface Special {
  special_today: string;
}

export default function TodaySpecial({ special_today }: Special) {
  const [updatedSpecial, setUpdatedSpecial] = useState<string>(null);
  const [todaySpecial, setTodaySpecial] = useState<string>("");
  const [editting, setEditting] = useState<boolean>(false);

  useEffect(() => {
    setUpdatedSpecial(special_today);
  }, [special_today]);

  const handleChange = (e) => {
    setTodaySpecial(e.target.value);
  };

  const handleSubmit = () => {
    if (todaySpecial.length < 1) {
      return "You must input a special deal to the text box";
    } else {
      setEditting(false);
      setUpdatedSpecial(todaySpecial);
      UpdateSpecial(todaySpecial);
    }
  };

  return (
    <div className="border-2 border-btn-background rounded-md my-8">
      {editting ? (
        <>
          <h4 className="text-3xl text-btn-background text-center my-4">
            {"Today's special:"}
          </h4>
          <form className="flex justify-center my-2" action={handleSubmit}>
            <label htmlFor="special" className="hidden">
              Edit your special deal of the day
            </label>
            <input
              autoFocus
              value={todaySpecial}
              className="w-5/12 text-black p-1 rounded-md"
              type="text"
              id="special"
              onChange={handleChange}
            />
            <div className="flex h-fit">
              <button
                type="submit"
                className="mx-2 border-2 border-white bg-btn-background rounded-md"
              >
                <CheckIcon />
              </button>
              <button
                onClick={() => {
                  setEditting(false);
                  setUpdatedSpecial(special_today);
                }}
                className="border-2 border-white bg-red-700 rounded-md"
              >
                <ClearIcon />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h4 className="text-3xl text-btn-background text-center my-4">
            {"Today's special:"}
          </h4>
          <div className="flex my-2">
            <button className="mx-2" onClick={() => setEditting(true)}>
              <EditIcon fontSize="small" />
            </button>
            <p className="text-xl">{updatedSpecial}</p>
          </div>
        </div>
      )}
    </div>
  );
}
