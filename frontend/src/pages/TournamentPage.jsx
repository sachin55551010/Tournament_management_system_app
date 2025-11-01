import { useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { BALL_TYPE } from "../constant/ballType";
import { PITCH_TYPE } from "../constant/pitchType";
import { TOURNAMENT_CATEGORY } from "../constant/tournamentCategory";
import toast from "react-hot-toast";
import { useAddTournamentMutation } from "../store/tournamentApi";
import { useNavigate } from "react-router-dom";

export const TournamentPage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);
  const [addTournament, { isLoading }] = useAddTournamentMutation();
  const [tournamentInfo, settournamentInfo] = useState({
    tournamentName: "",
    organiserName: authUser?.player?.playerName || "",
    phone: "",
    city: "",
    ground: "",
    startDate: "",
    endDate: "",
    tournamentCategory: "",
    ballType: "",
    pitchType: "",
  });

  //handle badge selector btn
  const handleBadgeSelectorBtn = (type, val) => {
    settournamentInfo((prev) => ({ ...prev, [type]: val }));
  };

  const validateInputs = (value) => {
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value)) {
      return true;
    } else {
      toast.error("Digits and Special Characters not allowed", {
        duration: 1500,
      });
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !tournamentInfo.tournamentName.trim() ||
        !tournamentInfo.city.trim() ||
        !tournamentInfo.ground.trim() ||
        !tournamentInfo.organiserName.trim() ||
        !tournamentInfo.phone.trim() ||
        !tournamentInfo.tournamentCategory.trim() ||
        !tournamentInfo.ballType.trim() ||
        !tournamentInfo.pitchType.trim()
      ) {
        toast.error("All Fields are required", {
          duration: 1500,
        });

        return;
      } else {
        const updatedField = {};
        for (const key in tournamentInfo) {
          if (
            tournamentInfo[key] !== null &&
            tournamentInfo[key] !== undefined &&
            tournamentInfo[key].trim() !== ""
          ) {
            updatedField[key] = tournamentInfo[key];
          }
        }

        await addTournament(updatedField);
        navigate("/my-tournament");
      }
    } catch (error) {
      console.log("Form submit error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" flex flex-col items-center">
      <Header data="Add a tournament" />
      <form
        onSubmit={handleFormSubmit}
        className="mt-20 w-[95%] flex flex-col items-center pb-6 md:w-[70%] lg:w-[60%] gap-6"
      >
        {/* form input fields */}
        <div className="w-full flex flex-col gap-4 md:grid grid-cols-2">
          <label
            htmlFor="tournament-name"
            className="w-full flex flex-col gap-3"
          >
            <span className="font-bold">Tournament Name *</span>
            <input
              required
              value={tournamentInfo.tournamentName}
              onChange={(e) => {
                const { value } = e.target;
                if (validateInputs(value))
                  settournamentInfo({
                    ...tournamentInfo,
                    tournamentName: e.target.value,
                  });
              }}
              type="text"
              className="border border-base-content/30 w-full h-10 rounded-md outline-0 pl-3 focus:border-base-content capitalize"
              id="tournament-name"
            />
          </label>
          <label htmlFor="city-name" className="w-full flex flex-col gap-3">
            <span className="font-bold">City *</span>
            <input
              required
              value={tournamentInfo.city}
              onChange={(e) => {
                const { value } = e.target;
                if (validateInputs(value))
                  settournamentInfo({
                    ...tournamentInfo,
                    city: e.target.value,
                  });
              }}
              type="text"
              className="border border-base-content/30 w-full h-10 rounded-md outline-0 pl-3 focus:border-base-content capitalize"
              id="city-name"
            />
          </label>
          <label htmlFor="ground-name" className="w-full flex flex-col gap-3">
            <span className="font-bold">Ground *</span>
            <input
              required
              value={tournamentInfo.ground}
              onChange={(e) => {
                const { value } = e.target;
                if (validateInputs(value))
                  settournamentInfo({
                    ...tournamentInfo,
                    ground: e.target.value,
                  });
              }}
              type="text"
              className="border border-base-content/30 w-full h-10 rounded-md outline-0 pl-3 focus:border-base-content capitalize"
              id="ground-name"
            />
          </label>
          <label htmlFor="oraniser-name" className="w-full flex flex-col gap-3">
            <span className="font-bold">Organiser Name *</span>
            <input
              required
              defaultValue={authUser?.player?.playerName || ""}
              onChange={(e) => {
                const { value } = e.target;
                if (validateInputs(value))
                  settournamentInfo({
                    ...tournamentInfo,
                    organiserName: e.target.value,
                  });
              }}
              type="text"
              className="border border-base-content/30 w-full h-10 rounded-md outline-0 pl-3 focus:border-base-content capitalize"
              id="organiser-name"
            />
          </label>
          <label
            htmlFor="oraniser-number"
            className="w-full flex flex-col gap-3"
          >
            <span className="font-bold">Organiser Number *</span>
            <input
              required
              value={tournamentInfo.phone}
              onChange={(e) => {
                const { value } = e.target;
                const regex = /^[0-9]*$/;
                if (regex.test(value))
                  settournamentInfo({
                    ...tournamentInfo,
                    phone: e.target.value,
                  });
              }}
              type="text"
              maxLength={10}
              className="border border-base-content/30 w-full h-10 rounded-md outline-0 pl-3 focus:border-base-content"
              id="organiser-number"
            />
          </label>
          <div className="w-full flex flex-col gap-3">
            <h1 className="font-bold">Organiser Email</h1>
            <div className="border h-10 rounded-md border-base-content/30 flex items-center pl-3 text-base-content/40 cursor-not-allowed">
              {authUser?.player?.playerId?.email}
            </div>
          </div>
        </div>

        {/* tournament start end date */}
        <div className="flex justify-between gap-4 w-full">
          <label htmlFor="" className="flex flex-col gap-3 w-full">
            <span className="font-bold">Start Date</span>
            <input
              value={tournamentInfo.startDate}
              onChange={(e) =>
                settournamentInfo({
                  ...tournamentInfo,
                  startDate: e.target.value,
                })
              }
              type="date"
              className="border border-base-content/30 h-10 rounded-md px-2 focus:border-base-conten"
            />
          </label>
          <label htmlFor="" className="flex flex-col gap-3 w-full">
            <span className="font-bold">End Date</span>
            <input
              value={tournamentInfo.endDate}
              onChange={(e) =>
                settournamentInfo({
                  ...tournamentInfo,
                  endDate: e.target.value,
                })
              }
              type="date"
              className="border border-base-content/30 h-10 rounded-md px-2 focus:border-base-conten"
            />
          </label>
        </div>

        {/* tournament category */}
        <div className="w-full">
          <span className="font-bold">Tournament Category *</span>
          <div className="flex justify-between mt-4 gap-4 md:justify-normal">
            {TOURNAMENT_CATEGORY.map((val, index) => {
              return (
                <div
                  onClick={() =>
                    handleBadgeSelectorBtn("tournamentCategory", val)
                  }
                  key={index}
                  className={`badge badge-soft badge-info rounded-full py-4 transition-all duration-300 cursor-pointer hover:border-info/90 hover:shadow-[0px_0px_10px_var(--color-info)] ${
                    tournamentInfo.tournamentCategory === val &&
                    "scale-110 border-info/90 shadow-[0px_0px_10px_var(--color-info)] font-bold"
                  } `}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ball type */}
        <div className="w-full">
          <span className="font-bold">Select Ball Type *</span>
          <div className="grid grid-cols-4 md:flex gap-4 mt-4 justify-normal">
            {BALL_TYPE.map((val, index) => {
              return (
                <div
                  onClick={() => handleBadgeSelectorBtn("ballType", val)}
                  key={index}
                  className={`badge badge-soft badge-info rounded-full py-4 transition-all duration-300 cursor-pointer hover:border-info/90 hover:shadow-[0px_0px_10px_var(--color-info)] ${
                    tournamentInfo.ballType === val &&
                    "scale-110 border-info/90 shadow-[0px_0px_10px_var(--color-info)] font-bold"
                  } `}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pitch Type */}
        <div className="w-full">
          <span className="font-bold">Select Pitch Type *</span>
          <div className="grid grid-cols-4 md:flex gap-4 mt-4">
            {PITCH_TYPE.map((val, index) => {
              return (
                <div
                  onClick={() => handleBadgeSelectorBtn("pitchType", val)}
                  key={index}
                  className={`badge badge-soft badge-info rounded-full py-4 transition-all duration-300 cursor-pointer hover:border-info/90 hover:shadow-[0px_0px_10px_var(--color-info)] ${
                    tournamentInfo.pitchType === val &&
                    "scale-110 border-info/90 shadow-[0px_0px_10px_var(--color-info)] font-bold"
                  } `}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn btn-soft btn-success w-full rounded-lg">
          Next
        </button>
      </form>
    </div>
  );
};
