"use client";

import { useEffect, useState } from "react";
import { FetchCity, FetchState } from "./FetchCityState";
import CitySelector from "./CityStateSelectionForm";
import { UpdateCity, UpdateState } from "./UpdateCityState";

export default function EditCityState(user, profile) {
    const [city, setCity] = useState<string>(null);
    const [state, setState] = useState<string>(null);
    const [editting, setEditting] = useState<boolean>(false);

    useEffect(() => {
        FetchCity().then((city) => {
            if(city) {
                setCity(city);
            } else {
                return;
            }
        })
        FetchState().then((state) => {
            if(state) {
                setState(state);
            } else {
                return;
            }
        })
    })

    const handleSubmit = (formData: FormData) => {
        const updatedCity = formData.get('city') as string;
        const updatedState = formData.get('state') as string;
        UpdateCity(updatedCity);
        UpdateState(updatedState);
        setCity(updatedCity);
        setState(updatedState);
        setEditting(false)
    }
    return (
        <div className="border-2 border-white rounded flex my-5 justify-evenly">
           {!editting ? (
            <>
            <p>My State: {state}</p>
            <p>My City: {city}</p>
            <button onClick={() => setEditting(true)}>Edit my city/state</button>
            </>
           ): (
           <form action={handleSubmit}>
            <CitySelector />
            <button type="submit">Submit changes</button>
            <button onClick={() => setEditting(false)}>cancel changes</button>
           </form>
           )} 
        </div>
    )
}