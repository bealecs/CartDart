import AuthButton from "@/components/navbar/AuthButton";
import Explore from "@/components/search-bar/Explore";
import Link from "next/link";
import { supabase } from "../lib/Supabase-Client";
import { Navbar } from "@/components/navbar/Navbar";

export default async function ExplorePage() {

  const { data: { user } } = await supabase.auth.getUser();
  return (
    <main className="bg-gray-900 overflow-x-hidden h-screen">
      {!user ? <div className="flex justify-between px-8 w-screen py-4">
      <Link
        href="/"
        className="transition duration-500 linear  py-1 px-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Dashboard
      </Link>
      <AuthButton />
      </div> :
      <Navbar />}
      <Explore />
    </main>
  );
}
