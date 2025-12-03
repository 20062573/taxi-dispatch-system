// with reference to w3 schools and stack overflow

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react"; 
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="profile-icon-container">
        <Link to="/profile" className="profile-link" title="View Profile">
          <User className="profile-icon" size={28} />
        </Link>
      </div>

      <h2>Welcome, {user?.name}</h2>
      <p>Role: {user?.role}</p>

      {user?.role === "customer" ? (
        <>
          <Link to="/ride/request" className="dashboard-btn">Request a Ride</Link> 
          <Link to="/ride/history" className="dashboard-btn">View Ride History</Link>
        </>
      ) : (
        <Link to="/driver/rides" className="dashboard-btn">View Available Rides</Link>
      )}

      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
}
