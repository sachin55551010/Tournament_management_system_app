import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      maxlength: 30,
    },

    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    teamPlayers: [
      {
        _id: false,
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
        },
        role: {
          type: String,
          enum: [
            "Batsman",
            "Bowler",
            "All Rounder",
            "Captain",
            "Vice Captain",
            "Wicket Keeper",
          ],
          default: null,
        },
      },
    ],
    city: {
      type: String,
      required: true,
      maxlength: 20,
    },
    captainNumber: {
      type: String,
    },
    captainName: {
      type: String,
      maxlength: 20,
    },

    teamLogo: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
