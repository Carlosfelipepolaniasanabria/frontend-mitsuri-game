import { apiRequest } from "./apiClient";

export const authService = {
  register(credentials) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },

  login(credentials) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  }
};