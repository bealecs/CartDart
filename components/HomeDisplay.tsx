import GetUsers from "@/app/api/get-users/route";
import { Suspense } from "react";
import Loading from "./loading-fallbacks/Loading";
import MapComponent from "./MapComponent";

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
    <div className="w-8/12 mx-auto">
      <Suspense fallback={<Loading />}>
        {users.length > 0 ? (
          users.map((user) => (
            <div
              className="border-solid border-2 border-white my-5 rounded flex justify-around"
              key={user.id}
            >
              <div className="content-center items-center m-5">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>
                  Vendor Cuisine:{" "}
                  {!user.vendor_type
                    ? "No vendor type found"
                    : `${user.vendor_type}`}
                </p>
                <p>Vendor Location:</p>
              </div>
              {user.Latitude_Longitude_Location ? 
              <div className="m-5">
                <MapComponent coordinates={user.Latitude_Longitude_Location} />
              </div>
              :
              <p>There was no current location found</p>}
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </Suspense>
    </div>
  );
}
