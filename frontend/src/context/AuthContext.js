import { createContext, useContext, useState } from "react";

const AuthContext = createContext(); // simple shared auth space (ref: react docs - https://react.dev/reference/react/createContext)

export const AuthProvider = ({ children }) => {
 // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
 // keep user info here (ref: w3 - https://www.w3schools.com/react/react_usestate.asp)
 const [user, setUser] = useState(null);

  const login = (data) => { // save token,user to browser storage (ref: w3 - https://www.w3schools.com/jsref/prop_win_localstorage.asp)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);// update ui with logged-in user
  };

  const logout = () => {
    localStorage.clear(); // remove all saved auth data 
    setUser(null); // reset user in app (ref: react docs)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // easy hook to access auth (ref: react docs - https://react.dev/reference/react/useContext)
