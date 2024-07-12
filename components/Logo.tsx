"use server";
import Image from "next/image";

interface Logo{
width: number;
height: number;
}

export default function Logo({width, height}: Logo) {
  return (
    <Image
      src={"/logo2.svg"}
      alt="logo of Cart Dart"
      width={width}
      height={height}
      className="mx-auto"
    />
  );
}
