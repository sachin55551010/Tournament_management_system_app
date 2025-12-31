import mongoose from "mongoose";
import { Team } from "../models/teamSchema.js";
import { Tournament } from "../models/tournamentSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";
import { io } from "../utils/socket.js";
import { Match } from "../models/matchSchema.js";

// function to create teams
export const createTeam = async (req, res, next) => {
  try {
    let {
      tournamentId,
      teamName,
      teamLogo,
      city,
      captainNumber,
      captainName,
      addMe,
    } = req.body;

    if (!req.user.id)
      return next(
        new CustomErrHandler(401, "You are not allowed to perform this action")
      );

    if (!tournamentId)
      return next(
        new CustomErrHandler(404, "No tournament found or invalid tournament")
      );

    if (!teamName?.trim() || !city?.trim())
      return next(new CustomErrHandler(400, "required fields cannot be empty"));
    if (teamLogo && teamLogo.startsWith("data:image")) {
      let uploadTeamLogo = await cloudinary.uploader.upload(teamLogo, {
        folder: "teamLogo",
      });
      teamLogo = uploadTeamLogo.secure_url;
    }
    const findDuplicateTeam = await Team.findOne({
      tournamentId,
      teamName: teamName.toLowerCase(),
    });

    if (findDuplicateTeam)
      return next(
        new CustomErrHandler(
          400,
          "Team is already exist. please choose different name"
        )
      );
    const team = await Team.create({
      tournamentId,
      teamName: teamName.toLowerCase(),
      city,
      teamLogo: teamLogo,
      captainNumber: captainNumber || "",
      captainName: captainName || "",
      createdBy: req.user.id,
    });

    if (addMe) {
      await Team.findByIdAndUpdate(team._id, {
        $addToSet: { teamPlayers: req.user.id },
      });
    }
    io.emit("createTeam", team);
    return res
      .status(201)
      .json({ message: "Team created successfully", success: true });
  } catch (error) {
    console.log("create team error : ", error);
    next(error);
  }
};

//function to get all teams registered in specific tournamment
export const getTeamsByTournament = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;

    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(
        new CustomErrHandler(
          404,
          "no tournament found or invalid tournament id"
        )
      );
    const myTournamentTeams = await Team.find({ tournamentId }).populate(
      "teamPlayers"
    );

    const countTeams = await Team.countDocuments({ tournamentId });
    return res
      .status(200)
      .json({ myTournamentTeams, countTeams, success: true });
  } catch (error) {
    console.log("get teams by tournament error :", error);
    next(error);
  }
};

//function to add players in a team
export const addTeamPlayers = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    res.status(201).json({ success: true });
  } catch (error) {
    console.log("add team player error : ", error);
    next(error);
  }
};

//function to get all players from a specific team
export const getTeamPlayers = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    if (!teamId)
      return next(
        new CustomErrHandler(
          400,
          "No Team found with this id or team is removed!"
        )
      );

    const myTeamPlayers = await Team.findById(teamId).populate(
      "teamPlayers createdBy"
    );

    if (!myTeamPlayers) return next(new CustomErrHandler(404, "team found"));

    const countPlayers = myTeamPlayers.teamPlayers.length;

    return res.status(200).json({ myTeamPlayers, countPlayers, success: true });
  } catch (error) {
    console.log("get team players error ", error);
    next(error);
  }
};

export const getTeamById = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    if (!teamId || !mongoose.Types.ObjectId.isValid(teamId))
      return next(new CustomErrHandler(403, "Invalid team id"));
    const team = await Team.findById(teamId);
    if (!team) return next(new CustomErrHandler(404, "No team found"));

    return res.status(200).json({ team, success: true });
  } catch (error) {
    console.log("get team by id error : ", error);
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const { teamId, tournamentId } = req.params;

    console.log("team id", teamId);
    console.log("tournament id", tournamentId);
  } catch (error) {
    console.log("update team error : ", error);
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const { tournamentId, teamId } = req.params;
    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(
        new CustomErrHandler(404, "No tourament found or invalid id")
      );
    if (!teamId || !mongoose.Types.ObjectId.isValid(teamId))
      return next(
        new CustomErrHandler(404, "No team found or invalid team id")
      );
    const teamAdminId = await Team.findById(teamId);

    if (!teamAdminId.createdBy.equals(req.user.id))
      return next(
        new CustomErrHandler(400, "Unatherized request. Access denied")
      );
    const tournamentAdminId = await Tournament.findById(tournamentId);
    if (!tournamentAdminId.createdBy.equals(req.user.id))
      return next(
        new CustomErrHandler(400, "Unatherized request. Access denied!")
      );
    const isAlreadyMatchPlayed = await Match.findOne({
      tournamentId,
      $or: [{ firstTeamId: teamId }, { secondTeamId: teamId }],
    });

    if (isAlreadyMatchPlayed)
      return next(
        new CustomErrHandler(
          400,
          "You can’t remove this team because it has already played at least one match in this tournament."
        )
      );
    await Team.findByIdAndDelete(teamId);

    return res
      .status(200)
      .json({ message: "Team deleted successfully", success: true });
  } catch (error) {
    console.log("Delete team error", error);
    next(error);
  }
};
