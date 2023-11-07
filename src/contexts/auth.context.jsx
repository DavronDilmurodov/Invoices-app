import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localData = localStorage.getItem("token");
  const [token, setToken] = useState(localData);

  useEffect(() => {
    if (token) {
      return localStorage.setItem("token", token);
    }

    localStorage.removeItem("token");
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
