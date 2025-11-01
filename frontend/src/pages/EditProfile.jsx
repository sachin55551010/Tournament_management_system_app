import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import { Camera } from "lucide-react";
import { useState } from "react";
import { PLAYING_ROLE } from "../constant/playingRole";
import { BATTING_STYLE } from "../constant/battingStyle";
import { BOWLING_STYLE } from "../constant/bowlingStyle";
import { PreviewProfilePicture } from "../components/PreviewProfilePicture";
import { setPicturePopup } from "../store/authSlice";
import { useUpdateUserMutation } from "../store/authApi";
import { GENDER } from "../constant/gender";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const { authUser, picturePopup } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const defaultPic = authUser?.player?.playerId?.profileImg;

  const { playerName } = authUser?.player;
  const { gender } = authUser?.player;
  const { number } = authUser?.player;
  const { battingStyle } = authUser?.player;
  const { bowlingStyle } = authUser?.player;
  const { playingRole } = authUser?.player;
  const { dateOfBirth } = authUser?.player;
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [playerInfo, setPlayerInfo] = useState({
    profilePicture,
    playerName,
    gender,
    number,
    battingStyle,
    bowlingStyle,
    playingRole,
    dateOfBirth,
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const hdPhoto = defaultPic.replace("=s96-c", "=s400-c");

  const updateProfilePicture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setProfilePicture(base64Image);
      setPlayerInfo((prev) => ({ ...prev, profilePicture: base64Image }));
    };
  };

  const handleOnInput = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setErrorMessage("Please Enter Numbers Only");
    } else {
      setErrorMessage("");
    }
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const validateInputs = () => {
    if (playerInfo.number.length < 10) {
      setErrorMessage("10 digit number required");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitBtn = async (e) => {
    try {
      e.preventDefault();
      if (!validateInputs()) return;
      const updatedField = {};
      for (const key in playerInfo) {
        if (
          playerInfo[key] !== null &&
          playerInfo[key] !== undefined &&
          playerInfo[key].trim() !== ""
        ) {
          updatedField[key] = playerInfo[key];
        }
      }
      await updateUser(updatedField);
      navigate("/my-profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <div
        className={`flex flex-col items-center ${
          picturePopup && "blur-md transition-all duration-200"
        }`}
      >
        <Header data="Edit Profile" />
        <form
          onSubmit={handleSubmitBtn}
          className="mt-18 bg-base-200 flex flex-col items-center p-2 w-full md:w-[90%] lg:w-[70%]"
        >
          <div className="relative flex flex-col items-center">
            <img
              onClick={() => dispatch(setPicturePopup(true))}
              src={
                profilePicture ||
                authUser?.player?.profilePicture ||
                hdPhoto ||
                "avatar.jpg"
              }
              alt=""
              className="object-cover h-25 w-25 rounded-full "
              accept="image/*"
            />
            <label
              htmlFor="photo"
              className="absolute top-17 right-[2.5rem] cursor-pointer"
            >
              <div className="bg-red-500 p-1 rounded-full">
                <Camera />
              </div>
              <input
                onChange={updateProfilePicture}
                id="photo"
                name="profilePicture"
                type="file"
                className="hidden"
              />
            </label>
            <p className="mt-4">Change profile picture</p>
          </div>

          <div className="flex flex-col gap-6 items-center mt-4 w-[90%] md:grid grid-cols-2 md:gap-x-4 md:gap-y-6">
            <label
              htmlFor="player-name"
              className="w-full flex flex-col gap-2 focus-within:text-success"
            >
              Player Name
              <p>{errorMessage}</p>
              <input
                defaultValue={playerName}
                required={true}
                onChange={(e) =>
                  setPlayerInfo({ ...playerInfo, playerName: e.target.value })
                }
                id="player-name"
                type="text"
                name="playerName"
                className="border rounded-lg h-10 w-full outline-none pl-3 "
              />
            </label>
            <label
              htmlFor="mobile-number"
              className="relative w-full flex flex-col gap-2 focus-within:text-success"
            >
              Mobile Number
              <input
                id="mobile-number"
                onInput={handleOnInput}
                defaultValue={number}
                required
                onChange={(e) =>
                  setPlayerInfo({ ...playerInfo, number: e.target.value })
                }
                type="text"
                name="number"
                maxLength={10}
                className="border rounded-lg h-10 w-full outline-none pl-3 "
              />
              <p className="absolute text-error text-[.8rem] top-19">
                {errorMessage}
              </p>
            </label>
            <label
              htmlFor="dob"
              className="w-full flex flex-col gap-2 focus-within:text-success"
            >
              Date of birth
              <input
                id="dob"
                min="1900-01-01"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setPlayerInfo({ ...playerInfo, dateOfBirth: e.target.value })
                }
                type="date"
                name="dateOfBirth"
                className="border rounded-lg h-10 w-full outline-none pl-3 "
              />
            </label>
            <label
              htmlFor="roles"
              className="w-full flex flex-col gap-2 focus-within:text-success"
            >
              Playing Role
              <select
                onChange={(e) =>
                  setPlayerInfo({ ...playerInfo, playingRole: e.target.value })
                }
                name="playingRole"
                defaultValue={playingRole}
                id="roles"
                className="w-full border h-10 rounded-lg"
              >
                {PLAYING_ROLE.map((val, index) => {
                  return (
                    <option
                      key={index}
                      value={val.toLowerCase().replace(/\s+/g, "_")}
                      className="bg-base-300 text-base-content"
                    >
                      {val}
                    </option>
                  );
                })}
              </select>
            </label>

            <label
              htmlFor="batting-style"
              className="w-full flex flex-col gap-2 focus-within:text-success"
            >
              Batting Style
              <select
                onChange={(e) =>
                  setPlayerInfo({ ...playerInfo, battingStyle: e.target.value })
                }
                name="battingStyle"
                defaultValue={battingStyle}
                id="batting-style"
                className="w-full border h-10 rounded-lg"
              >
                {BATTING_STYLE.map((val, index) => {
                  return (
                    <option
                      key={index}
                      value={val.toLowerCase().replace(/\s+/g, "_")}
                      className="bg-base-300 text-base-content"
                    >
                      {val}
                    </option>
                  );
                })}
              </select>
            </label>
            <label
              htmlFor="bowling-style"
              className="w-full flex flex-col gap-2 focus-within:text-success"
            >
              Bolwing Style
              <select
                onChange={(e) =>
                  setPlayerInfo({ ...playerInfo, bowlingStyle: e.target.value })
                }
                name="bowlingStyle"
                defaultValue={bowlingStyle}
                id="bowling-style"
                className="w-full border h-10 rounded-lg"
              >
                {BOWLING_STYLE.map((val, index) => {
                  return (
                    <option
                      key={index}
                      value={val.toLowerCase().replace(/\s+/g, "_")}
                      className="bg-base-300 text-base-content"
                    >
                      {val}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className="flex justify-around w-full">
              {GENDER.map((val, index) => {
                return (
                  <div key={index} className="flex gap-1 items-center">
                    <input
                      className="radio radio-xs"
                      value={val}
                      onChange={(e) =>
                        setPlayerInfo({ ...playerInfo, gender: e.target.value })
                      }
                      type="radio"
                      name="gender"
                    />
                    <h1>{val.charAt(0).toUpperCase() + val.slice(1)}</h1>
                  </div>
                );
              })}
            </div>
            <button
              className={`btn btn-success w-full ${isLoading && "btn-soft"}`}
              disabled={isLoading}
            >
              {isLoading ? "Updating" : "Update"}
              <span className={`${isLoading ? "loading" : ""}`}></span>
            </button>
          </div>
        </form>
      </div>
      {picturePopup && <PreviewProfilePicture />}
    </div>
  );
};
