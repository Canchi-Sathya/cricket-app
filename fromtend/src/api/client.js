import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000"});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getProfile = (userId) => api.get(`/profile/${userId}`);
export const updateProfile = (userId, data) => api.put(`/profile/${userId}`, data);

export const getMatches = (userId) => api.get(`/matches/${userId}`);
export const createMatch = (data) => api.post("/matches", data);
export const updateMatch = (matchId, data) => api.put(`/matches/${matchId}`, data);
export const getStats = (userId) => api.get(`/stats/${userId}`);

export default api;