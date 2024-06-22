"use client";

import { useEffect, useState } from "react";
import CitySelector from "./CityStateSelectionForm";
import { UpdateCity, UpdateState } from "./UpdateCityState";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

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
        <div>
           {!editting ? (
            <div className="flex items-center">
                <p>{cityValue}, {stateValue}</p>
                <button onClick={() => setEditting(true)}><EditIcon fontSize="small" className="mx-4" /></button>
            </div>
           ): (
           <form action={handleSubmit} className="flex">
            <CitySelector />
            <button type="submit"><CheckIcon className="border-2 border-white bg-btn-background rounded-md mx-2"/></button>
            <button onClick={() => setEditting(false)}><ClearIcon  className="border-2 border-white bg-red-700 rounded-md" /></button>
           </form>
           )} 
        </div>
    )
}