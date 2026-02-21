import mongoose from "mongoose";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";
import { Match } from "../models/matchSchema.js";
import { Tournament } from "../models/tournamentSchema.js";
import { io } from "../utils/socket.js";

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

    console.log(firstTeamId, secondTeamId);

    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(
        new CustomErrHandler(
          404,
          "no tournament id found or invalid tournament id",
        ),
      );
    if (!firstTeamId || !mongoose.Types.ObjectId.isValid(firstTeamId))
      return next(
        new CustomErrHandler(404, "no first team id found or invalid team id"),
      );
    if (!secondTeamId || !mongoose.Types.ObjectId.isValid(secondTeamId))
      return next(
        new CustomErrHandler(404, "no second team id found or invalid team id"),
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
          `A ${checkRepeatMatch.round} match between ${checkRepeatMatch.firstTeamId.teamName} and ${checkRepeatMatch.secondTeamId.teamName} already played. Please choose a different round or schedule another match.`,
        ),
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

    io.emit("newMatch", match);

    return res.status(201).json({ match, success: true });
  } catch (error) {
    console.log("Create match error : ", error);
    next(error);
  }
};

export const scheduleMatch = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;
    const { firstTeamId, secondTeamId, overs, matchScheduleDate, round } =
      req.body;

    if (
      !firstTeamId?.trim() ||
      !secondTeamId?.trim() ||
      !overs ||
      !matchScheduleDate ||
      !round
    )
      return next(new CustomErrHandler(400, "All fields are required"));
    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(new CustomErrHandler(400, "No tournament found"));
    if (!firstTeamId || !mongoose.Types.ObjectId.isValid(firstTeamId))
      return next(
        new CustomErrHandler(404, "no first team id found or invalid team id"),
      );
    if (!secondTeamId || !mongoose.Types.ObjectId.isValid(secondTeamId))
      return next(
        new CustomErrHandler(404, "no second team id found or invalid team id"),
      );
    const organiserId = await Tournament.findById(tournamentId);
    if (!organiserId.createdBy.equals(req.user.id))
      return next(
        new CustomErrHandler(403, "Unautherised request Access denied"),
      );
    if (firstTeamId === secondTeamId)
      return next(new CustomErrHandler(400, "Both teams cannot be same"));
    const checkIsMatchAlreadyExists = await Match.findOne({
      $or: [
        { firstTeamId, secondTeamId },
        { firstTeamId: secondTeamId, secondTeamId: firstTeamId },
      ],
    })
      .populate("firstTeamId", "teamName")
      .populate("secondTeamId", "teamName");

    if (checkIsMatchAlreadyExists && checkIsMatchAlreadyExists.round === round)
      return next(
        new CustomErrHandler(
          403,
          `A ${checkIsMatchAlreadyExists.round} match between ${checkIsMatchAlreadyExists.firstTeamId.teamName} and ${checkIsMatchAlreadyExists.secondTeamId.teamName} already schedule. Please choose a different round or schedule another match.`,
        ),
      );
    const match = await Match.create({
      tournamentId,
      firstTeamId,
      secondTeamId,
      overs,
      matchScheduleDate,
      round,
      createdBy: req.user.id,
    });

    return res
      .status(201)
      .json({ match, success: true, message: "Match Schedule successfully" });
  } catch (error) {
    console.log("Schedule Match error : ", error);
    next(error);
  }
};

//get all matches from specific tournament
export const myTournamentMatches = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;
    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(new CustomErrHandler(400, "No Tournament found"));
    const matches = await Match.find({ tournamentId })
      .populate("firstTeamId", "teamName city teamLogo")
      .populate("secondTeamId", "teamName city teamLogo")
      .populate("tournamentId", "ground city");

    return res.status(200).json({ matches, success: true });
  } catch (error) {
    console.log("get my tournament matches : ", error);
    next(error);
  }
};

export const getAllMatches = async (req, res, next) => {
  try {
    const { tournamentCategory } = req.params;
    console.log(tournamentCategory);

    const allMatches = await Match.aggregate([
      // Join Tournament
      {
        $lookup: {
          from: "tournaments", // ⚠️ collection name in MongoDB (usually lowercase plural)
          localField: "tournamentId",
          foreignField: "_id",
          as: "tournamentId",
        },
      },
      {
        $unwind: "$tournamentId",
      },

      // Filter by category
      {
        $match: {
          "tournamentId.tournamentCategory": tournamentCategory,
        },
      },

      // Join First Team
      {
        $lookup: {
          from: "teams",
          localField: "firstTeamId",
          foreignField: "_id",
          as: "firstTeamId",
        },
      },
      {
        $unwind: "$firstTeamId",
      },

      // Join Second Team
      {
        $lookup: {
          from: "teams",
          localField: "secondTeamId",
          foreignField: "_id",
          as: "secondTeamId",
        },
      },
      {
        $unwind: "$secondTeamId",
      },

      // Select fields like populate(select)
      {
        $project: {
          firstTeamId: {
            teamName: 1,
            teamLogo: 1,
          },
          secondTeamId: {
            teamName: 1,
            teamLogo: 1,
          },
          tournamentId: {
            tournamentName: 1,
            city: 1,
            ground: 1,
          },
          // keep other match fields
          matchScheduleDate: 1,
          status: 1,
        },
      },
    ]);
    if (!allMatches) return next(new CustomErrHandler("invalid request"));
    console.log("All Matches", allMatches);

    return res.status(200).json({ allMatches });
  } catch (error) {
    console.log("get all matches error", error);
    next(error);
  }
};
