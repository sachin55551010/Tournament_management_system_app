import { Player } from "../models/playerSchema.js";
import cloudinary from "../utils/cloudinary.js";
import { CustomErrHandler } from "../utils/CustomErrHandler.js";

export const myProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const player = await Player.findById(id).populate("playerId");
    if (!player) return next(new CustomErrHandler(404, "User not found"));

    return res.status(200).json({ player, success: true });
  } catch (error) {
    console.log("MyProfile error : ", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return res
      .clearCookie("crickAuthToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      })
      .status(200)
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log("Logout error : ", error);
    next(error);
  }
};

export const updatePlayer = async (req, res, next) => {
  try {
    let player = await Player.findById(req.user.id);

    //? this will take all data except images, like name, numbers
    const updateData = { ...req.body };
    if (
      req.body.profilePicture &&
      req.body.profilePicture.startsWith("data:image")
    ) {
      const uploadResponse = await cloudinary.uploader.upload(
        req.body.profilePicture,
        { folder: "players_img" }
      );
      updateData.profilePicture = uploadResponse.secure_url;
    }
    player = await Player.findByIdAndUpdate(
      player._id,
      {
        $set: updateData,
      },
      { new: true }
    ).populate("playerId");

    return res
      .status(201)
      .json({ player, success: true, message: "Profile Updaded Successfully" });
  } catch (error) {
    console.log("Edit profile error : ", error);
    next(error);
  }
};
