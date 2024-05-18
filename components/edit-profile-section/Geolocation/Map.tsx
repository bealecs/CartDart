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
      <p>{coords[0]}</p>
      <p>{coords[1]}</p>
    </div>
  );
}
