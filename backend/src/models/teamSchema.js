import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
    },

    teamPlayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
      {
        type: String,
        role: [
          "captain",
          "vice_captain",
          "wicket_keeper",
          "batsman",
          "bowler",
          "all_rounder",
        ],
        default: "player",
      },
    ],
    teamLogo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
