import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addTournament } from "../controllers/tournament.controller.js";

export const tournament_route = express.Router();

tournament_route.post("/add-tournament", isAuthenticated, addTournament);
