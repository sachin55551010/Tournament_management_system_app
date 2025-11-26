import { Team } from "../models/teamSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";

export const createTeam = async (req, res, next) => {
  try {
    const { teamName, teamLogo, city, captainNumber, captainName } = req.body;

    if (!teamName?.trim() || !city?.trim())
      return next(new CustomErrHandler(400, "required fields cannot be empty"));
    if (teamLogo && teamLogo.starsWith("data:image")) {
      const uploadTeamLogo = await cloudinary.uploader.upload(teamLogo, {
        folder: "teamLogo",
      });
      teamLogo = uploadTeamLogo.secure_url;
    }

    const team = await Team.create({
      teamName,
      city,
      teamLogo: teamLogo || "",
      captainNumber: captainNumber || "",
      captainName: captainName || "",
    });
    return res
      .status(201)
      .json({ team, message: "Team created successfully", success: true });
  } catch (error) {
    console.log("create team error : ", error);
    next(error);
  }
};
