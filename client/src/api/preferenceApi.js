import apiClient from "./apiClient";

export const getPreference = async () => apiClient.get("/preferences");
export const sendPreference = async (payload) =>
  apiClient.post("/preferences", payload);
