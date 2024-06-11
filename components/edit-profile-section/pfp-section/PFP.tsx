"use client";

import { useEffect, useState } from "react";
import FetchPFP from "./FetchPFP";
import Image from "next/image";

interface PFP {
  pfp: string;
}

export default function PFP({ pfp }: PFP) {
  const [pfpLink, setPfpLink] = useState(null);

  useEffect(() => {
    setPfpLink(pfp);
  }, [pfp]);

  return (
    <div>
      <Image
        width={50}
        height={50}
        src={pfpLink ? pfpLink : "/default-pfp.svg"}
        alt="User Profile Picture"
        className="rounded-full"
      />
    </div>
  );
}
