// Import useState and useEffect hooks from React\
// Reference: React Official Docs + W3Schools
import { useEffect, useState } from "react";

// Import axios for API requests
// Reference: Axios Docs + Stack Overflow
import axios from "../api/axios";

// Import styling for Profile page
import "../styles/Profile.css";

export default function Profile() {

  // Stores user profile data from the database
  // Reference: W3Schools - useState
  const [profile, setProfile] = useState({});

  // Stores form data for editing
  // Reference: freeCodeCamp - React forms
  const [form, setForm] = useState({});

  // Reference: ChatGPT 
  const [editMode, setEditMode] = useState(false);

   // Stores success or error message
  const [message, setMessage] = useState("");


  // Reference: React useEffect - Official Docs + GeeksforGeeks
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        setProfile(res.data);  // Store profile for display
        setForm(res.data);  // Copy data into the form for editing
      })
      .catch((err) => console.error(err)); // Show error in console 
  }, []);


  // Updates normal input values (name, email, phone)
  // Reference: W3Schools + MDN + Stack Overflow
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Reference: GeeksforGeeks 
  // ChatGPT for logic
  const handleVehicleChange = (e) => {
    setForm({
      ...form,
      vehicleDetails: {
        ...form.vehicleDetails,
        [e.target.name]: e.target.value,
      },
    });
  };
  
  // Sends updated data to the backend
  // Reference: Axios PUT request - W3Schools + ChatGPT
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put("/profile", form);
      // Update displayed profile with new data
      setProfile(data.user);
      setMessage("Profile updated successfully!");
      // Exit edit mode
      setEditMode(false);
    } catch (err) {
      setMessage("Failed to update profile");
    }
  };

  // Reference: MDN - window.confirm + Stack Overflow + ChatGPT
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await axios.delete("/profile");
      alert("Account deleted");
      // Redirect to home page after deleting
      // Reference: MDN - window.location
      window.location.href = "/";
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {!editMode ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || "Not added"}</p>
          <p><strong>Role:</strong> {profile.role}</p>
            {/* Reference: React Conditional Rendering - FreeCodeCamp */}
          {profile.role === "driver" && (
            <>
              <h3>Vehicle Details</h3>
              <p><strong>Model:</strong> {profile.vehicleDetails?.model || "Not added"}</p>
              <p><strong>License Plate:</strong> {profile.vehicleDetails?.licensePlate || "Not added"}</p>
              <p><strong>Color:</strong> {profile.vehicleDetails?.color || "Not added"}</p>

              <h3>Total Earnings</h3>
              <p>₹ {profile.totalEarnings || 0}</p>
            </>
          )}

          <div className="profile-buttons">
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
          </div>
        </div>
      ) : (
        <div className="profile-edit">
          <input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone || ""} onChange={handleChange} />
          {/* Reference: React conditional rendering - W3Schools */}
          {profile.role === "driver" && (
            <>
              <h3>Vehicle Information</h3>
              <input
                name="model"
                placeholder="Vehicle Model"
                value={form.vehicleDetails?.model || ""}
                onChange={handleVehicleChange}
              />
              <input
                name="licensePlate"
                placeholder="License Plate"
                value={form.vehicleDetails?.licensePlate || ""}
                onChange={handleVehicleChange}
              />
              <input
                name="color"
                placeholder="Color"
                value={form.vehicleDetails?.color || ""}
                onChange={handleVehicleChange}
              />
            </>
          )}

          <div className="profile-buttons">
            <button className="save-btn" onClick={handleUpdate}>Save</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
      {/* Show success or error message */}
      {message && <p className="msg">{message}</p>}
    </div>
  );
}
