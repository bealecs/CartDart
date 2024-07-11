import PageBackButton from "@/components/PageBackButton";
import Explore from "@/components/search-bar/Explore";

export default async function ExplorePage() {

  return (
    <main className="bg-gray-900 overflow-x-hidden h-screen">
      <PageBackButton text="Dashboard" href="/dashboard" />
      <Explore />
    </main>
  );
}
