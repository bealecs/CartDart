"use client";

import { useEffect, useState } from "react";

interface Username {
    name: string;
}

export default function UsernameDisplay(nameParam: Username) {

    const [username, setUsername] = useState<String>(null);

    useEffect(() => {
       setUsername(nameParam.name);
    }, [nameParam.name]);

    return (<div>
        {username ? <p>{username}</p> : <p></p>}
    </div>)
}