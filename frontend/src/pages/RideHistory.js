import { useEffect, useState } from "react";
// axios instance for talking to backend 
import axios from "../api/axios";
import "../styles/RideHistory.css";


export default function RideHistory() {
  // local state to store history 
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // fetch ride history on page load (ref: react useeffect - https://react.dev/reference/react/useEffect)
    axios.get("/rides/history").then((res) => setRides(res.data)); // update list 
  }, []); // empty array so it can run only once when component loads

  return (
    <div className="ride-history">
      <h2>Your Ride History</h2>
      <ul>
        {rides.map((ride) => (
          <li key={ride._id}>
            {ride.pickupLocation} → {ride.dropoffLocation} ({ride.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

//  show each ride in a lists(ref:reactlists - https://react.dev/learn/rendering-lists)