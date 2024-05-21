"use client";

import { useEffect, useState } from "react";
import FetchUsername from "./FetchUsername";

export default function UsernameDisplay() {

    const [username, setUsername] = useState<String>(null);

    useEffect(() => {
        FetchUsername().then((username) => {
            if(username) {
                setUsername(username)
            } else {
                return;
            }
        })
    }, [username]);

    return (<div>
        {username ? <p>{username}</p> : <p></p>}
    </div>)
}