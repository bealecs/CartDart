import GetUsers from "@/app/api/get-users/route";
import { Suspense } from "react";
import Loading from "./loading-fallbacks/Loading";

interface User {
  Latitude_Longitude_Location: number[];
  bio: string;
  email: string;
  id: string;
  name: string;
  pfp: string;
  today_special: string;
  vendor_type: string;
}

export default async function HomeDisplay() {
  const users: User[] = await GetUsers();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Vendor Type: {!user.vendor_type ? "No vendor type found" : `${user.vendor_type}`}</p>
              {/* Add more user details as needed */}
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </Suspense>
    </div>
  );
}
