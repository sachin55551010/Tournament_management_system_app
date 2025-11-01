import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    number: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    playingRole: {
      type: String,
      enum: [
        "top_order_batsman",
        "middle_order_batsman",
        "openening_batsman",
        "bowler",
        "all_rounder",
        "wicket_keeper_batter",
        "lower_order_batsman",
        "none",
      ],
    },
    battingStyle: {
      type: String,
      enum: ["right_handed_bat", "left_handed_bat"],
    },
    bowlingStyle: {
      type: String,
      enum: [
        "right_arm_fast",
        "right_arm_fast_medium",
        "right_arm_medium",
        "right_arm_orthodox",
        "right_arm_chinaman",
        "right_arm_off_break",
        "right_arm_leg_break",
        "right_arm_slow",
        "left_arm_fast",
        "left_arm_fast_medium",
        "left_arm_medium",
        "left_arm_orthodox",
        "left_arm_chinaman",
        "left_arm_off_break",
        "left_arm_leg_break",
        "left_arm_slow",
        "none",
      ],
    },

    //* option link to logged in user
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isVarified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "organiser", "superAdmin"],
      default: "user",
    },
    teamId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],

    careerStats: {
      matches: {
        type: Number,
        default: 0,
      },
      batting: {
        innings: { type: Number, default: 0 },
        runs: { type: Number, default: 0 },
        ballsFaced: { type: Number, default: 0 },
        notOuts: { type: Number, default: 0 },
        ducks: { type: Number, default: 0 },
        fours: { type: Number, default: 0 },
        sixes: { type: Number, default: 0 },
        thirties: { type: Number, default: 0 },
        fifties: { type: Number, default: 0 },
        hundreds: { type: Number, default: 0 },
        highestScore: { type: Number, default: 0 },

        // Optional derived stats
        average: { type: Number, default: 0 },
        strikeRate: { type: Number, default: 0 },
      },

      bowling: {
        innings: { type: Number, default: 0 },
        balls: { type: Number, default: 0 },
        runsConceded: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        threes: { type: Number, default: 0 },
        fours: { type: Number, default: 0 },
        five: { type: Number, default: 0 },
        bestBowling: { type: Number, default: 0 },

        // Optional derived stats
        average: { type: Number, default: 0 }, // runsConceded / wickets
        economy: { type: Number, default: 0 }, // runsConceded / oversBowled
        strikeRate: { type: Number, default: 0 }, // ballsPerWicket
      },
    },
  },
  { timestamps: true }
);

export const Player = mongoose.model("Player", playerSchema);
