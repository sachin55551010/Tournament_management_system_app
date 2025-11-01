import express from "express";
import passport from "passport";
import { sendCookies } from "../utils/sendCookies.js";
export const auth_router = express.Router();

auth_router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

auth_router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    sendCookies(req.user, res);
  }
);

auth_router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

auth_router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    sendCookies(req.user, res);
  }
);
