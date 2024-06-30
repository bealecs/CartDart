import HomeDisplay from "@/components/home-page-display/HomeDisplay";
import { Navbar } from "@/components/navbar/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col items-center">
      <header>
        <Navbar />
      </header>
    <main className="w-full">
    <HomeDisplay />

    </main>
    <footer>

    </footer>
    </div>
  );
}
