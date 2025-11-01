import express from "express";
import {
  logout,
  myProfile,
  updatePlayer,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

export const user_route = express.Router();

user_route.get("/me", isAuthenticated, myProfile);

user_route.post("/logout", logout);

user_route.patch("/update-user", isAuthenticated, updatePlayer);
