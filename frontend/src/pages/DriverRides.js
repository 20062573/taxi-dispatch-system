import { useEffect, useState } from "react"; // Reference: W3Schools - React Hooks basics
import axios from "../api/axios";   // Reference: Stack Overflow - Using axios in React
import "../styles/DriverRides.css";

export default function DriverRides() {
  const [rides, setRides] = useState([]);    // This state stores the list of available rides

  const fetchRides = async () => {
    const { data } = await axios.get("/rides/available");    // Reference: W3Schools - Async/Await in JavaScript
    setRides(data);
  };

  useEffect(() => {
    fetchRides();        // Reference: Stack Overflow - useEffect with empty dependency array
  }, []);

  const handleAccept = async (id) => {
    await axios.put(`/rides/accept/${id}`);    // This runs when the driver clicks "Accept"
    fetchRides();
  };

  const handleDecline = async (id) => {
    await axios.put(`/rides/decline/${id}`);     // This runs when the driver clicks "Decline"
    fetchRides();
  };

  return (
    <div className="driver-rides">
      <h2>Available Rides</h2>
      {rides.length === 0 && <p>No rides available</p>}.  {/* Show this message if there are no rides */}
      <ul>
        {rides.map((ride) => (         
          <li key={ride._id}>
            <p>🚕 {ride.pickupLocation} → {ride.dropoffLocation}</p> {/* Reference: W3Schools - Array.map() in React */}
            <button onClick={() => handleAccept(ride._id)}>Accept</button>
            <button onClick={() => handleDecline(ride._id)}>Decline</button>
          </li>
        ))}

             
      </ul>
    </div>
  );
}
