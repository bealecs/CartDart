import { Navbar } from "@/components/Navbar";
import Explore from "@/components/search-bar/Explore";

export default function ExplorePage() {
  return (
    <main className="bg-gray-900 h-screen w-fit">
      <Navbar />
      <Explore />
    </main>
  );
}
