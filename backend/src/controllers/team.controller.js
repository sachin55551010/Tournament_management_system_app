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
    const { tournamentId } = req.params;
    let { teamName, teamLogo, city, captainNumber, captainName, addMe } =
      req.body;

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

    const findDuplicateTeam = await Team.findOne({
      tournamentId,
      teamName: teamName.toLowerCase(),
    });

    // checking if team with same name already exist or not
    if (findDuplicateTeam)
      return next(
        new CustomErrHandler(
          409,
          "Team is already exist in this tournament. please choose different name"
        )
      );

    // updating team logo
    if (teamLogo && teamLogo.startsWith("data:image")) {
      let uploadTeamLogo = await cloudinary.uploader.upload(teamLogo, {
        folder: "teamLogo",
      });
      teamLogo = uploadTeamLogo.secure_url;
    }

    //checking is player in a team or not
    const checkDuplicatePlayerInOtherTeam = await Team.findOne({
      tournamentId,
      teamPlayers: { playerId: req.user.id },
    });

    if (addMe && checkDuplicatePlayerInOtherTeam)
      return next(
        new CustomErrHandler(
          409,
          "You are already registered with another team in this tournament. Please leave that team before joining a new one."
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
        $addToSet: { teamPlayers: { player: req.user.id } },
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

    const myTeamPlayers = await Team.findById(teamId)
      .select("teamPlayers")
      .populate("teamPlayers.player")
      .lean();

    // console.log(myTeamPlayers);

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
    const team = await Team.findById(teamId).select("");
    if (!team) return next(new CustomErrHandler(404, "No team found"));

    return res.status(200).json({ team, success: true });
  } catch (error) {
    console.log("get team by id error : ", error);
    next(error);
  }
};

// update team function
export const updateTeam = async (req, res, next) => {
  try {
    const { tournamentId, teamId } = req.params;
    let { teamName, city, teamLogo, captainName, captainNumber, addMe } =
      req.body;

    // check team name or city name should not be empty
    if (!teamName?.trim() || !city?.trim())
      return next(new CustomErrHandler(404, "Mendetory fields are required"));
    if (!tournamentId || !mongoose.Types.ObjectId.isValid(tournamentId))
      return next(
        new CustomErrHandler(
          400,
          "No tournament found or invalid tournament id"
        )
      );
    if (!teamId || !mongoose.Types.ObjectId.isValid(teamId))
      return next(
        new CustomErrHandler(400, "No team found or invalid team id")
      );

    const team = await Team.findById(teamId);
    const tournament = await Tournament.findById(tournamentId);

    if (
      !team.createdBy.equals(req.user.id) &&
      !tournament.createdBy.equals(req.user.id)
    )
      return next(
        new CustomErrHandler(400, "Unatherized request. Access denied!")
      );

    const findDuplicateTeam = await Team.findOne({
      tournamentId,
      teamName: teamName.toLowerCase(),
      _id: { $ne: teamId }, // $ne used filter the value.
    });

    // checking if team with same name already exist or not
    if (findDuplicateTeam)
      return next(
        new CustomErrHandler(
          409,
          "Team is already exist in this tournament. please choose different name"
        )
      );

    // check if team played any match in the tournament
    const checkIsMatchPlayed = await Match.findOne({
      tournamentId,
      $or: [{ firstTeamId: teamId }, { secondTeamId: teamId }],
    });

    if (
      checkIsMatchPlayed &&
      team.createdBy.equals(req.user.id) &&
      checkIsMatchPlayed?.status !== "scheduled"
    )
      return next(
        new CustomErrHandler(
          403,
          "You don't have permission to edit this team. Please contact the tournament organiser to update the team details."
        )
      );

    const checkDuplicatePlayerInOtherTeam = await Team.findOne({
      tournamentId,
      teamPlayers: { player: req.user.id },
      _id: { $ne: teamId },
    });

    const checkDuplicatePlayerInSameTeam = await Team.findOne({
      tournamentId,
      _id: teamId,
      teamPlayers: { player: req.user.id },
    });

    if (addMe && checkDuplicatePlayerInOtherTeam)
      return next(
        new CustomErrHandler(
          409,
          "You are already registered with another team in this tournament. Please leave that team before joining a new one."
        )
      );

    if (req.body.teamLogo && req.body.teamLogo.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(teamLogo, {
        folder: "teamLogo",
      });
      teamLogo = uploadRes.secure_url;
    }

    await Team.findOneAndUpdate(
      { _id: teamId },
      {
        teamLogo: teamLogo,
        teamName,
        city,
        captainName: captainName || "",
        captainNumber: captainNumber || "",
      }
    );

    if (addMe && !checkDuplicatePlayerInSameTeam) {
      await Team.findByIdAndUpdate(teamId, {
        $addToSet: { teamPlayers: { player: req.user.id } },
      });
    }
    if (!addMe && checkDuplicatePlayerInSameTeam) {
      await Team.findByIdAndUpdate(teamId, {
        $pull: { teamPlayers: { player: req.user.id } },
      });
    }
    return res
      .status(201)
      .json({ message: "Team updated successfully", success: true });
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
    const tournamentAdminId = await Tournament.findById(tournamentId);

    if (
      !teamAdminId.createdBy.equals(req.user.id) &&
      !tournamentAdminId.createdBy.equals(req.user.id)
    )
      return next(
        new CustomErrHandler(400, "Unatherized request. Access denied")
      );

    const isAlreadyMatchPlayed = await Match.findOne({
      tournamentId,
      $or: [{ firstTeamId: teamId }, { secondTeamId: teamId }],
    });

    if (isAlreadyMatchPlayed)
      return next(
        new CustomErrHandler(
          400,
          "You can't remove this team because it has already played at least one match in this tournament."
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
