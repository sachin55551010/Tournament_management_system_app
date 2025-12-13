import crypto from "crypto";
import { InviteLink } from "../models/inviteLinkSchema.js";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";
import { Team } from "../models/teamSchema.js";
import mongoose from "mongoose";

export const createInviteLink = async (req, res, next) => {
  try {
    const { tournamentId, teamId } = req.params;

    if (!teamId || !mongoose.Types.ObjectId.isValid(teamId))
      return next(new CustomErrHandler(404, "No team found !"));

    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(new CustomErrHandler(400, "No tournament found !"));
    const token = crypto.randomBytes(32).toString("hex");

    const checkLinkExists = await InviteLink.findOne({ teamId });
    if (checkLinkExists) {
      const inviteLinkUrl = `${process.env.FRONTEND_URL}/join-team/${checkLinkExists.token}`;
      return res.status(200).json(inviteLinkUrl);
    }
    await InviteLink.create({
      token,
      teamId,
      tournamentId,
      createdBy: req.user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    const inviteLinkUrl = `${process.env.FRONTEND_URL}/join-team/${token}`;
    return res.status(201).json(inviteLinkUrl);
  } catch (error) {
    console.log("create Invite link : ", error);
    next(error);
  }
};

// function to validate link
// check token validation and expire link 
export const validateInviteLink = async (req, res, next) => {
  try {
    const { token } = req.params;
    console.log(token);

    const inviteLink = await InviteLink.findOne({ token }).populate();
    console.log(inviteLink);

    if (!inviteLink) return next(new CustomErrHandler(400, "Invalid link"));
    if (inviteLink.expiresAt < Date.now())
      return next(new CustomErrHandler(400, "Link is expired"));
    const checkIsAlreadyInTeam = await Team.find({
      tournamentId: inviteLink.tournamentId,
      teamPlayers: req.user.id,
    });
    if (checkIsAlreadyInTeam)
      return next(new CustomErrHandler(400, `You are already in a team`));
    await Team.updateOne({
      _id: inviteLink.teamId,
      $push: { teamPlayers: req.user.id },
    });
    return res.status(201).json({
      inviteLink,
      success: true,
      message: "Added in team successfully",
    });
  } catch (error) {
    console.log("validate token error : ", error);
    next(error);
  }
};
