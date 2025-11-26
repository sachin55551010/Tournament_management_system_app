import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
    },

    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

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
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
