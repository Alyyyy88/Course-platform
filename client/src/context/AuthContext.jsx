import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getMe,
  login as loginRequest,
  signup as signupRequest
} from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    getMe()
      .then((data) => {
        setUser(data.user);
        setStatus("authenticated");
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        setUser(null);
        setStatus("idle");
      });
  }, []);

  const login = async (payload) => {
    const response = await loginRequest(payload);
    localStorage.setItem("authToken", response.token);
    setUser(response.user);
    setStatus("authenticated");
  };

  const signup = async (payload) => {
    const response = await signupRequest(payload);
    localStorage.setItem("authToken", response.token);
    setUser(response.user);
    setStatus("authenticated");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setStatus("idle");
  };

  const value = useMemo(
    () => ({ user, status, login, signup, logout }),
    [user, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
