import { MapPin, Share2 } from "lucide-react";
import { defaultAvatar } from "../utils/noprofilePicHelper";
import { useNavigate } from "react-router-dom";
export const TeamList = ({ teamList }) => {
  const navigate = useNavigate();
  const handleTeamClickBtn = (teamId) => {
    navigate(
      `/my-tournament/tournaments/692eddf60ba34a407298ee3d/tournament-teams/add-players/${teamId}`
    );
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 mt-4">
      {teamList?.map((teams) => {
        return (
          <li
            onClick={() => handleTeamClickBtn(teams._id)}
            key={teams._id}
            className="p-2 flex gap-4 rounded-md shadow-[0px_0px_5px_rgba(0,0,0,.5)] cursor-pointer hover:scale-102 duration-300"
          >
            {/* team logo */}
            <div>
              {teams.teamLogo === "" ? (
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center font-extrabold text-bg-content">
                  {defaultAvatar(teams.teamName)}
                </div>
              ) : (
                <img
                  src={teams.teamLogo}
                  alt=""
                  className="h-12 w-14 rounded-full object-cover bg-red-400"
                />
              )}
            </div>

            {/* team details */}
            <div className="flex flex-col justify-between w-full gap-2">
              <h1 className="font-bold text-sm capitalize">{teams.teamName}</h1>

              {/* team captain vice captain info */}
              <div className="flex items-center justify-between">
                <div className="flex-1 flex gap-2 items-center text-[.75rem] text-base-content/60">
                  <div className="badge badge-soft badge-accent p-1 rounded-full">
                    <MapPin size={15} />
                  </div>

                  <h4 className="capitalize font-bold">{teams.city}</h4>
                </div>

                {teams.captainName && (
                  <div className="flex-1 flex gap-2 items-center text-[.75rem] text-base-content/60">
                    <h4 className="badge badge-soft badge-accent rounded-full w-3 h-auto font-bold">
                      C
                    </h4>
                    <h4 className="capitalize font-bold">
                      {teams.captainName || "No info"}
                    </h4>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
