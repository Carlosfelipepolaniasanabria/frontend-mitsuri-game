import { apiRequest } from "./apiClient";

export const gameService = {
  getGames() {
    return apiRequest("/games");
  },

  createGame(game) {
    return apiRequest("/games", {
      method: "POST",
      body: JSON.stringify(game)
    });
  }
};