import { useState } from "react";
// local component state
import axios from "../api/axios";
// axios instance used for backend calls 
import "../styles/RideRequest.css";

export default function RideRequest() {

   // store pickup and dropoff inputs
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();// stop page reload 

    // simple validation before calling backend
    if (!pickup || !dropoff) {
      setMessage("Please enter both pickup and drop-off locations.");
      return;
    }

    try {
      // send ride request to backend api
      const { data } = await axios.post("/rides/request", {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
      });
      setMessage(data.message); // backend response message

      // clear inputs after success
      setPickup("");
      setDropoff("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="ride-request">
      <h2>Request a Ride</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <input
          placeholder="Drop-off Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
        />
        <button type="submit">Request Ride</button>
      </form>
      {message && <p>{message}</p>} {/* show message success or error */}
    </div>
  );
}
