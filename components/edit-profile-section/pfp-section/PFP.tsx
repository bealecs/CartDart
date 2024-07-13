"use server";
import Image from "next/image";
import FetchPFP from "./FetchPFP";

interface PFP {
  size: number;
  className?: string;
}
export default async function PFP({ size, className }: PFP) {

  const pfp: string = await FetchPFP();
  const timestamp = new Date().getTime();
  
  return (
    <div>
      <Image
        width={size}
        height={size}
        src={pfp ? pfp + "?v=" + timestamp : "/default-pfp.svg"}
        alt="User Profile Picture"
        className={className}
      />
    </div>
  );
}
