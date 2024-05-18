"use client";

import { useEffect, useState } from "react";
import FetchPFP from "./FetchPFP";
import Image from "next/image";

export default function PFP() {

    const [pfpLink, setPfpLink] = useState(null);

    useEffect(() => {
      FetchPFP().then((link) => {
        if (link) {
          setPfpLink(link);
        } else {
          setPfpLink(null);
        }
      });
    }, []);
    return(
        <div>
            {pfpLink != null && <Image width={50} height={50} src={pfpLink} alt="User Profile Picture" className="rounded-full"/>}
        </div>
    )
}