import mongoose from "mongoose";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";
import { Match } from "../models/matchSchema.js";
import { Tournament } from "../models/tournamentSchema.js";
export const createMatch = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;
    const {
      firstTeamId,
      secondTeamId,
      overs,
      tossWinnerTeamId,
      decision,
      round,
    } = req.body;

    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(
        new CustomErrHandler(
          404,
          "no tournament id found or invalid tournament id"
        )
      );
    const organiserId = await Tournament.findById(tournamentId);

    //check if logged in user id matched with tournament organiser id
    if (!organiserId.createdBy._id.equals(req.user.id))
      return next(new CustomErrHandler(403, "Unauthorized access"));

    const checkRepeatMatch = await Match.findOne({
      $or: [
        { firstTeamId, secondTeamId },
        { firstTeamId: secondTeamId, secondTeamId: firstTeamId },
      ],
    })
      .populate("firstTeamId", "teamName")
      .populate("secondTeamId", "teamName");

    if (checkRepeatMatch?.round === round)
      return next(
        new CustomErrHandler(
          403,
          `A ${checkRepeatMatch.round} match between ${checkRepeatMatch.firstTeamId.teamName} and ${checkRepeatMatch.secondTeamId.teamName} already played. Please choose a different round or schedule another match.`
        )
      );
    if (
      !firstTeamId?.trim() ||
      !secondTeamId?.trim() ||
      !overs ||
      !tossWinnerTeamId ||
      !decision ||
      !round
    )
      return next(new CustomErrHandler(400, "All fields are required"));

    if (firstTeamId === secondTeamId)
      return next(new CustomErrHandler(400, "Both teams cannot be same"));
    const match = await Match.create({
      tournamentId,
      firstTeamId,
      secondTeamId,
      overs,
      tossWinnerTeamId,
      decision,
      round,
    });

    return res.status(201).json({ match, success: true });
  } catch (error) {
    console.log("Create match error : ", error);
    next(error);
  }
};

export const scheduleMatch = (req, res, next) => {
  try {
  } catch (error) {
    console.log("Schedule Match error : ", error);
  }
};
