import { useState } from "react"; // Reference: React Official Docs + W3Schools (React hooks)
import axios from "../api/axios";  // Reference: Axios GitHub Docs + Stack Overflow
import { useAuth } from "../context/AuthContext";  // Reference: React Context API + React Docs + ChatGPT explanation
import { useNavigate, Link } from "react-router-dom"; // Reference:  freeCodeCamp
import "../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });  // This state stores the email and password entered by the user
  const { login } = useAuth();  // Reference: ChatGPT
  const navigate = useNavigate();  // Reference: React Router - useNavigate


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });  // Reference:W3Schools + ChatGPT

  // Reference: freeCodeCamp + Stack Overflow + ChatGPT (async/await structure)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
       // Sends a POST request to the server with login details
       // Reference: Axios documentation
      const { data } = await axios.post("/auth/login", form);
      login(data);
      // Reference: React Router Docs
      navigate("/dashboard");
    } catch (error) {
      // Reference: Stack Overflow (Axios error handling) + ChatGPT reasoning
      if (error.response) {
        if (error.response.status === 401) {
          alert("Incorrect email or password. Please try again.");
        }  else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(error.response.data.message || "Something went wrong.");
        }
      } else if (error.request) {
        // Network issue where request was sent but no response was received
        // Reference: MDN + Stack Overflow
        alert("Network error. Please check your internet connection.");
      } else {
         // Reference: ChatGPT
        alert("An unexpected error occurred.");
      }
  
      console.error("Login error:", error);
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Login</h2>
      {/* The form triggers handleSubmit when the user clicks Login */}
      {/* Reference: W3Schools - React forms */}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {/* Reference: MDN - Input type password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      {/* Reference: React Router + freeCodeCamp tutorials */}
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
