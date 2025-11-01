import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  firstTeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  secondTeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  tossResult: {
    tossWinnerTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    decision: {
      type: String,
      enum: ["bat", "bowl"],
      required: true,
    },
  },
  date: {
    type: Date,
  },
  result: {
    winnerTeamId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "abandoned"],
      default: "scheduled",
    },
    innings: [
      {
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
        runs: {
          type: Number,
          default: 0,
        },
        wickets: {
          type: Number,
          default: 0,
        },
        over: {
          type: Number,
          default: 0,
        },
        playerStats: [
          {
            playerId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player",
            },
            runs: {
              type: Number,
              default: 0,
            },
            ballsFaced: { type: Number, default: 0 },
            wickets: { type: Number, default: 0 },
            oversBowled: { type: Number, default: 0 },
            fours: { type: Number, default: 0 },
            sixes: { type: Number, default: 0 },
            notOut: { type: Boolean, default: false },
          },
        ],
      },
    ],
  },
});

export const Match = mongoose.model("Match", matchSchema);
