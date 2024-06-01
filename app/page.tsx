import Image from "next/image";

export default async function Index() {
  

  return (
    <div>
      <a href="/login" className="text-2xl">Log in</a>
      <Image src={"/logo2.svg"} height={400} width={400} alt="something" />
    </div>
  );
}
