"use client";

import { useEffect, useState } from "react";
import CitySelector from "./CityStateSelectionForm";
import { UpdateCity, UpdateState } from "./UpdateCityState";

interface Residence {
    city: string;
    state: string;
}

export default function EditCityState({city, state}: Residence) {
    const [cityValue, setCityValue] = useState<string>(null);
    const [stateValue, setStateValue] = useState<string>(null);
    const [editting, setEditting] = useState<boolean>(false);

    useEffect(() => {
        if(city && state) {
            setCityValue(city)
            setStateValue(state)
        }
    }, [city, state])

    const handleSubmit = (formData: FormData) => {
        const updatedCity = formData.get('city') as string;
        const updatedState = formData.get('state') as string;
        UpdateCity(updatedCity);
        UpdateState(updatedState);
        setCityValue(updatedCity);
        setStateValue(updatedState);
        setEditting(false)
    }
    return (
        <div className="border-2 border-white rounded flex my-5 justify-evenly">
           {!editting ? (
            <>
            <p>My State: {stateValue}</p>
            <p>My City: {cityValue}</p>
            <button onClick={() => setEditting(true)}>Edit</button>
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