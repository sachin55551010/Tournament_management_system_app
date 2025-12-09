import express from "express";
import {
  addTeamPlayers,
  createTeam,
  getTeamPlayers,
  getTeamsByTournament,
} from "../controllers/team.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

export const team_route = express.Router();

team_route.post("/create-team", isAuthenticated, createTeam);

team_route.get("/my-tournament-teams/:tournamentId", getTeamsByTournament);

team_route.post("/add-players/:teamId", isAuthenticated, addTeamPlayers);

team_route.get("/team-players/:teamId", getTeamPlayers);
