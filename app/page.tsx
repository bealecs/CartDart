import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import NoUserDisplay from "@/components/no-user-homepage/Display";
import { Suspense } from "react";

export default async function Index() {
  return (
    <Suspense fallback={<Loading />}>
      <NoUserDisplay />
    </Suspense>
  );
}
