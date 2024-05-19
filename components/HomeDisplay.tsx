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
            <div className="my-10" key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Vendor Cuisine: {!user.vendor_type ? "No vendor type found" : `${user.vendor_type}`}</p>
              <div className="flex w-fit">
              <p>Vendor Location:</p>
              <ul className="flex mx-2">
                <li className="mx-2">Latitude: {user.Latitude_Longitude_Location[0]}</li>
                <li className="mx-2">Longitude: {user.Latitude_Longitude_Location[1]}</li>
              </ul>
              </div>
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
