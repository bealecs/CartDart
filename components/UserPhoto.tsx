"use server";
import Image from "next/image";

interface UserPhoto{
width: number;
height: number;
src: string;
alt: string;
className?: string;
}

export default async function UserPhoto({width, height, src, alt, className}: UserPhoto) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
