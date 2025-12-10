import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
   // form state (ref: w3 - https://www.w3schools.com/react/react_usestate.asp)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: "",
  });
  const navigate = useNavigate(); // helps move to another page

   // update form when user types (ref: w3 - https://www.w3schools.com/react/react_forms.asp)
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    try{

  // send form data to backend (ref: axios docs - https://axios-http.com/docs/post_example)
    await axios.post("/auth/register", form);
    navigate("/");// go to login page after success 
    }catch(error) {
      // backend errors come here (ref: axios error guide - https://stackoverflow.com/questions/49967779/how-to-handle-axios-errors)
      if (error.response) {
        if (error.response.status === 400) {
          alert("Email already in use");
        }  else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(error.response.data.message || "Something went wrong.");
        }
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("An unexpected error occurred.");
      }
  
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
