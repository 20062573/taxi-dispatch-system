import { BrowserRouter, Routes, Route } from "react-router-dom";// routing system for react
import { AuthProvider, useAuth } from "./context/AuthContext"; // global auth state using context api
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RideRequest from "./pages/RideRequest";
import RideHistory from "./pages/RideHistory";
import DriverRides from "./pages/DriverRides";
import Profile from "./pages/Profile";

// simple guard that stops users from seeing private pages
// if no user then send back to login
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route
          /* protected routes allowed only if logged in */
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ride/request"
            element={
              <ProtectedRoute>
                <RideRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ride/history"
            element={
              <ProtectedRoute>
                <RideHistory />
              </ProtectedRoute>
            }
          />
        <Route
            path="/driver/rides"
            element={
              <ProtectedRoute>
                <DriverRides />
              </ProtectedRoute>
            }
          />
                  <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}


// routes protected : https://stackoverflow.com/questions/67318149/protected-route-in-react-router