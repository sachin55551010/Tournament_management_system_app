import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateTeamMutation } from "../../store/teamApi";
import { validateInputs } from "../../utils/validateInputs";
import { Camera } from "lucide-react";
export const CreateTeam = () => {
  const [selectTeamLogo, setSelectTeamLogo] = useState(null);
  const { tournamentId } = useParams();

  const navigate = useNavigate();
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const [teamData, setTeamData] = useState({
    tournamentId,
    teamLogo: "",
    teamName: "",
    city: "",
    captainNumber: "",
    captainName: "",
    addMe: false,
  });

  //function to upload image
  const uploadLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectTeamLogo(base64Image);
      setTeamData((prev) => ({ ...prev, teamLogo: base64Image }));
    };
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    await createTeam(teamData).unwrap();
    navigate(`/my-tournament/tournaments/${tournamentId}/tournament-teams`);
  };

  return (
    <div className="fixed inset-0 h-dvh overflow-y-scroll bg-base-100 pt-20 px-4 flex justify-center ">
      <fieldset
        disabled={isLoading}
        className={`${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        } flex items-center justify-center w-full`}
      >
        <form
          onSubmit={handleSubmitBtn}
          className="w-full h-fit shadow-[0px_0px_10px_rgba(0,0,0,.5)] rounded-md flex flex-col items-center bg-base-300/50 p-4 md:w-[70%]"
        >
          {/* team logo or picture  */}
          <div className="flex flex-col items-center gap-3">
            {/*team logo image section */}
            <div className="h-22 w-22 rounded-full relative">
              <img
                src={selectTeamLogo || "/avatar.jpg"}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
              <label htmlFor="image">
                <div className="bg-warning p-1 w-fit absolute rounded-full top-[70%] right-[-5%]">
                  <Camera size={22} />
                </div>
                <input
                  onChange={uploadLogo}
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-sm ">Choose Team Logo</p>
          </div>

          {/* input fields  */}
          <div className="grid mt-6 grid-cols-1 gap-4 w-full text-sm md:grid-cols-2 md:gap-8">
            <label
              htmlFor="team-name"
              className="flex flex-col gap-2 text-base-content/50 "
            >
              Team Name*
              <input
                value={teamData.teamName}
                onChange={(e) =>
                  setTeamData({ ...teamData, teamName: e.target.value })
                }
                id="team-name"
                type="text"
                placeholder="Team Name"
                className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content capitalize"
              />
            </label>
            <label
              htmlFor="city-name"
              className="flex flex-col gap-2 text-base-content/50"
            >
              City*
              <input
                value={teamData.city}
                onChange={(e) => {
                  const { value } = e.target;
                  if (validateInputs(value)) {
                    setTeamData({ ...teamData, city: value });
                  }
                }}
                id="city-name"
                type="text"
                placeholder="City Name"
                className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content capitalize"
              />
            </label>
            <label
              htmlFor="number"
              className="flex flex-col gap-2 text-base-content/50"
            >
              Team Captain/Coordinator Number (Optional)
              <input
                value={teamData.captainNumber}
                onChange={(e) => {
                  const { value } = e.target;
                  const regex = /^[0-9]*$/;
                  if (regex.test(value)) {
                    setTeamData({ ...teamData, captainNumber: value });
                  }
                }}
                id="number"
                type="text"
                maxLength={10}
                placeholder="Contact Number"
                className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content"
              />
            </label>
            <label
              htmlFor="captain-name"
              className="flex flex-col gap-2 text-base-content/50 capitalize"
            >
              Team Captain Name(Optional)
              <input
                value={teamData.captainName}
                onChange={(e) => {
                  const { value } = e.target;
                  if (validateInputs(value)) {
                    setTeamData({ ...teamData, captainName: value });
                  }
                }}
                id="captain-name"
                type="text"
                placeholder="Captain Name"
                className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content capitalize"
              />
            </label>
          </div>
          <div className="flex w-full mt-6 gap-2">
            <input
              value={teamData.addMe}
              onChange={(e) =>
                setTeamData({ ...teamData, addMe: e.target.checked })
              }
              type="checkbox"
            />
            <p className="text-sm text-base-content/50">Add my self in team</p>
          </div>
          <button
            className={`btn btn-info w-full rounded-md mt-6`}
            disabled={isLoading}
          >
            {isLoading ? <span className="loading"></span> : "Add Team"}
          </button>
        </form>
      </fieldset>
    </div>
  );
};
