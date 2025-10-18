import apiClient from "./apiClient";

export const register = (payload) => apiClient.post("/users/register", payload);
export const login = (payload) => apiClient.post("/users/login", payload);
