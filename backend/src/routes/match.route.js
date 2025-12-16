import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createMatch, scheduleMatch } from "../controllers/match.controller.js";

export const match_route = express.Router();

match_route.post(
  "/create-match/:tournamentId/matches",
  isAuthenticated,
  createMatch
);

match_route.post(
  "/schedule-match/:tournamentId/matches",
  isAuthenticated,
  scheduleMatch
);

// match_route.patch("/update-match/:matchId")
