import apiClient from "./apiClient";

export const getVotesByUser = async () => apiClient.get("/votes");
export const addVote = async (payload) => apiClient.post("/votes", payload);
