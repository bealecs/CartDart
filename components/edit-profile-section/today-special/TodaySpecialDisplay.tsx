"use client";
import { useEffect, useState } from "react"
import UpdateSpecial from "./UpdateSpecial";
import FetchSpecial from "./FetchSpecial";

interface Special {
    special_today: string;
}

export default function TodaySpecial({special_today}: Special) {
    const [updatedSpecial, setUpdatedSpecial] = useState<string>(null);
    const [todaySpecial, setTodaySpecial] = useState<string>("")
    const [editting, setEditting] = useState<boolean>(false);

    useEffect(() => {
        setUpdatedSpecial(special_today)
    }, [special_today]);

    const handleChange = (e) => {
        setTodaySpecial(e.target.value);
    }

    const handleSubmit = () => {
        if(todaySpecial.length < 1) {
            return "You must input a special deal to the text box"
        } else {
            setEditting(false);
            setUpdatedSpecial(todaySpecial);
            UpdateSpecial(todaySpecial);
        }
    }

    return (
        <div className="border-2 border-white rounded">
            {editting ? 
                <form className="flex flex-col m-5" action={handleSubmit}>
                    <label htmlFor="special">Add a special {"*hot*"} deal to your page</label>
                    <input value={todaySpecial} className="w-5/12 my-5 text-black p-1" type="text" id="special" onChange={handleChange}/>
                    <div className="flex">
                    <button type="submit" className="text-left">Submit</button>
                    <button onClick={() => {
                        setEditting(false);
                        setUpdatedSpecial(special_today);
                    }}>Discard changes</button>
                    </div>
                </form> : <div>
                    <p className="m-5">{"Today's special:"} {updatedSpecial}</p>
                    <button className="text-left mx-5 mb-5 border-2 border-white rounded p-2" onClick={() => setEditting(true)}>Edit Special Deal</button>
                    </div>}
        </div>
    )
}