import express from "express";
import { createTeam } from "../controllers/team.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

export const team_route = express.Router();

team_route.post("/create-team", createTeam);
