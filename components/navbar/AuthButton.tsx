import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import PFP from "../edit-profile-section/pfp-section/PFP";
import UsernameDisplay from "../edit-profile-section/username-section/UsernameDisplay";
import FetchPFP from "../edit-profile-section/pfp-section/FetchPFP";
import FetchUsername from "../edit-profile-section/username-section/FetchUsername";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pfp: string = await FetchPFP();
  const name: string = await FetchUsername();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 w-fit">
      <PFP pfp={pfp}/>
      <a
        href="/profile"
        className="transition duration-500 linear border-2 border-transparent hover:border-b-white"
      >
        <div className="flex">
          <p className="mr-1">Hey,</p>
          <UsernameDisplay name={name}/>
        </div>
      </a>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Log in
    </Link>
  );
}
