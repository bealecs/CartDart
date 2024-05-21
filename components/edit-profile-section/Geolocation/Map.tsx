import { useEffect, useState } from "react";
import FetchLocation from "./FetchLocation";

export default function Map() {
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    FetchLocation().then((coordinates) => {
      setCoords(coordinates);
    });
  }, []);

  return (
    <div>
      {coords ? (
        <div>
          <p>{coords[0]}</p>
          <p>{coords[1]}</p>
        </div>
      ) : (
        <p>
          There were no coordinates found. Update your location to view your
          coordinates
        </p>
      )}
    </div>
  );
}
