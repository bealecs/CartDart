import { Navbar } from "@/components/Navbar";
import HomeDisplay from "@/components/home-page-display/HomeDisplay";
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
    <div className="flex-1 overflow-hidden flex flex-col gap-20 items-center">
      <header>
        <Navbar />
        <HomeDisplay />
      </header>
    <main>

    </main>
    <footer>

    </footer>
    </div>
  );
}
