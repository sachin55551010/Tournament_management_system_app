import { Player } from "../models/playerSchema.js";
import { Tournament } from "../models/tournamentSchema.js";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";

export const addTournament = async (req, res, next) => {
  try {
    const {
      tournamentName,
      phone,
      city,
      ground,
      startDate,
      endDate,
      ballType,
      tournamentCategory,
      pitchType,
    } = req.body;
    if (
      !tournamentName?.trim() ||
      !phone?.trim() ||
      !city?.trim() ||
      !ballType?.trim() ||
      !tournamentCategory?.trim() ||
      !pitchType?.trim() ||
      !ground?.trim()
    )
      return next(new CustomErrHandler(400, "All fields are required"));
    const isTournamentExists = await Tournament.findOne({
      tournamentName,
      ground,
    });
    if (isTournamentExists)
      return next(
        new CustomErrHandler(
          400,
          `Tournament "${tournamentName}" already exists at ground "${ground} pleaase change the name of Tournament and try again"`
        )
      );
    const tournament = await Tournament.create({
      tournamentName,
      phone,
      createdBy: req.user.id,
      city,
      ground,
      ballType,
      tournamentCategory,
      pitchType,
      startDate: startDate || null,
      endDate: endDate || null,
    });
    if (req.body.role !== "organiser") {
      await Player.findByIdAndUpdate(
        req.user.id,
        { role: "organiser" },
        { new: true }
      );
    }
    res.status(201).json({
      tournament,
      message: "Tournament created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Create tournament error : ", error);
    next(error);
  }
};
