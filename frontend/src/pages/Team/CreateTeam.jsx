import { useState } from "react";
import teamLogo from "../../../assets/team_logo.png";

export const CreateTeam = () => {
  const [teamData, setTeamData] = useState({
    teamLogo: "",
    teamName: "",
    city: "",
    captainNumber: "",
    teamCaptainName: "",
  });
  return (
    <div className="fixed inset-0 h-dvh overflow-y-scroll bg-base-100 pt-20 px-4 flex justify-center ">
      <form className="w-full h-fit shadow-[0px_0px_10px_rgba(0,0,0,.5)] rounded-md flex flex-col items-center bg-base-300/50 p-4 md:w-[70%]">
        {/* team logo or picture  */}
        <div className="flex flex-col items-center gap-2">
          <div className="border h-18 w-18 rounded-full"></div>
          <h4>Team Logo</h4>
        </div>

        {/* input fields  */}
        <div className="grid mt-6 grid-cols-1 gap-4 w-full text-sm md:grid-cols-2 md:gap-8">
          <label
            htmlFor="team-name"
            className="flex flex-col gap-2 text-base-content/50"
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
              className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content"
            />
          </label>
          <label
            htmlFor="city-name"
            className="flex flex-col gap-2 text-base-content/50"
          >
            City*
            <input
              value={teamData.city}
              onChange={(e) =>
                setTeamData({ ...teamData, city: e.target.value })
              }
              id="city-name"
              type="text"
              placeholder="City Name"
              className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content"
            />
          </label>
          <label
            htmlFor="number"
            className="flex flex-col gap-2 text-base-content/50"
          >
            Team Captain/Coordinator Number (Optional)
            <input
              value={teamData.captainNumber}
              onChange={(e) =>
                setTeamData({ ...teamData, captainNumber: e.target.value })
              }
              id="number"
              type="text"
              placeholder="Contact Number"
              className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content"
            />
          </label>
          <label
            htmlFor="captain-name"
            className="flex flex-col gap-2 text-base-content/50"
          >
            Team Captain Name(Optional)
            <input
              value={teamData.teamCaptainName}
              onChange={(e) =>
                setTeamData({ ...teamData, teamCaptainName: e.target.value })
              }
              id="captain-name"
              type="text"
              placeholder="Captain Name"
              className="border border-base-content/30 h-10 rounded-md pl-2 outline-0 text-base-content"
            />
          </label>
        </div>
        <div className="flex w-full mt-6 gap-2">
          <input type="checkbox" />
          <p className="text-sm text-base-content/50">Add my self in team</p>
        </div>
        <button className="btn btn-info w-full rounded-md mt-6">
          Add Team
        </button>
      </form>
    </div>
  );
};
