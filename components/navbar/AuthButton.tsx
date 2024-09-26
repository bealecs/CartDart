import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import PFP from "../edit-profile-section/pfp-section/PFP";
import UsernameDisplay from "../edit-profile-section/username-section/UsernameDisplay";
import FetchUsername from "../edit-profile-section/username-section/FetchUsername";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name: string = await FetchUsername();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="items-center gap-2 flex justify-end mb-2 mx-2">
      <a
        href="/profile"
        className="transition duration-300 linear border-2 border-transparent hover:text-gray-400 hover:border-b-gray-400"
      >
        <div className="flex">
        <PFP size={50} className="rounded-full h-[50px] w-[50px] object-cover"/>
        <div className="hidden md:flex items-center ml-2">
        <p className="mr-1">Hey,</p>
        <UsernameDisplay name={name} />
        </div>
        </div>
      </a>
      <form action={signOut}>
        <button className="py-2 px-2 md:px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 w-fit rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Log in
    </Link>
  );
}
