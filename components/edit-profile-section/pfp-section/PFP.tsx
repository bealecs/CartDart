"use server";
import Image from "next/image";
import FetchPFP from "./FetchPFP";

export default async function PFP({ size }: {size: number}) {

  const pfp: string = await FetchPFP();

  return (
    <div>
      <Image
        width={size}
        height={size}
        src={pfp ? pfp : "/default-pfp.svg"}
        alt="User Profile Picture"
        className="rounded-full"
      />
    </div>
  );
}
