import { apiGet, apiPost } from "./http.js";

export const login = (payload) => apiPost("/auth/login", payload);
export const signup = (payload) => apiPost("/auth/signup", payload);
export const getMe = () => apiGet("/auth/me");
