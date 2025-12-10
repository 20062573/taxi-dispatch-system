import React, { useEffect, useState } from "react";
import API from "../api";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);// keep list of drivers (ref: w3schools.com)- https://www.w3schools.com/react/react_usestate.asp

  useEffect(() => {
    API.get("/drivers").then(res => setDrivers(res.data)); // fetch drivers when component loads (ref: so - https://stackoverflow.com/questions/53120972/how-to-call-api-inside-useeffect)
  }, []);

  return (
    <div>
      <h2>Drivers</h2>
      <ul>
        {drivers.map(d => (
          <li key={d._id}>{d.name} - {d.status}</li> // show each driver using map (ref: react docs - https://react.dev/learn/rendering-lists)
        ))}
      </ul>
    </div>
  );
}
