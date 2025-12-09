import { Team } from "../models/teamSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";
import { io } from "../utils/socket.js";

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
      teamName,
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
      .json({ team, message: "Team created successfully", success: true });
  } catch (error) {
    console.log("create team error : ", error);
    next(error);
  }
};

//function to get all teams registered in specific tournamment
export const getTeamsByTournament = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;

    if (!tournamentId)
      return next(
        new CustomErrHandler(
          404,
          "no tournament found or invalid tournament id"
        )
      );
    const myTournamentTeams = await Team.find({ tournamentId }).populate(
      "teamPlayers"
    );
    return res.status(200).json({ myTournamentTeams, success: true });
  } catch (error) {
    console.log("get teams my tournament error :", error);
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

    return res.status(200).json({ myTeamPlayers, success: true });
  } catch (error) {
    console.log("get team players error ", error);
    next(error);
  }
};
