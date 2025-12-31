import { useGetMyTournamentTeamsQuery } from "../store/matchApi";
import { DummyCardLoadingSkelton } from "./ui/DummyLoadingSkelton";
import noData from "../../assets/No data-amico.svg";
import { defaultAvatar } from "../utils/noprofilePicHelper";
import { Calendar, MapPin } from "lucide-react";
export const MatchList = ({ tournamentId }) => {
  const { data, isLoading } = useGetMyTournamentTeamsQuery(tournamentId);

  if (isLoading) {
    return <DummyCardLoadingSkelton />;
  }
  const matches = data?.matches ?? [];
  console.log(matches);

  const statusBg = {
    scheduled: "badge badge-soft badge-warning",
    live: "badge badge-soft badge-info",
    completed: "badge badge-soft badge-success",
    abandoned: "badge badge-soft badge-error",
  };

  //   console.log(statusBg.scheduled);

  const options = { day: "2-digit", month: "short", year: "numeric" };
  return (
    <div className="">
      <div>
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img src={noData} alt="No Data" className="h-60" />
            <h1>No Match found !</h1>
          </div>
        ) : (
          <ul className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => {
              return (
                <li
                  key={match._id}
                  className="border border-base-content/20 rounded-lg p-3"
                >
                  {/* team information section */}
                  <section className="flex flex-col gap-1">
                    {/* match status */}
                    <div className="">
                      <span
                        className={`py-[.4rem] px-3 rounded-xl ${
                          statusBg[match.status]
                        } capitalize font-bold text-[.8rem]`}
                      >
                        {match.status}
                      </span>
                    </div>
                    {/* first team details */}
                    <div className="flex items-center gap-2 mt-2">
                      {/* team logo */}
                      <div>
                        {match.firstTeamId.teamLogo ? (
                          <img
                            src={match.firstTeamId.teamLogo}
                            alt=""
                            className="h-12 w-12 object-cover rounded-full"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full border border-base-content/20 flex items-center justify-center font-extrabold">
                            {defaultAvatar(match.firstTeamId.teamName)}
                          </div>
                        )}
                      </div>
                      {/* team name */}
                      <div>
                        <h1 className="text-base-content/70 font-extrabold capitalize">
                          {match.firstTeamId.teamName}
                        </h1>
                      </div>
                    </div>

                    {/* vs */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-[.05rem] bg-base-content/40 flex-1"></div>
                      <span className="text-sm font-bold text-base-content/60">
                        VS
                      </span>
                      <div className="h-[.05rem] bg-base-content/40 flex-1"></div>
                    </div>

                    {/* second team details */}
                    <div className="flex items-center gap-2">
                      {/* team logo */}
                      <div>
                        {match.secondTeamId.teamLogo ? (
                          <img
                            src={match.secondTeamId.teamLogo}
                            alt=""
                            className="h-12 w-12 object-cover rounded-full"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full border border-base-content/20 flex items-center justify-center font-extrabold">
                            {defaultAvatar(match.secondTeamId.teamName)}
                          </div>
                        )}
                      </div>
                      {/* team name */}
                      <div>
                        <h1 className="text-base-content/70 font-extrabold capitalize">
                          {match.secondTeamId.teamName}
                        </h1>
                      </div>
                    </div>
                  </section>

                  {/* match timing and location */}
                  <section className="flex justify-between gap-2 mt-4">
                    {/* timing */}
                    <div className="flex items-center gap-2 text-sm ">
                      <Calendar size={15} />
                      <span className="text-base-content/80">
                        {new Date(match.matchScheduleDate).toLocaleDateString(
                          "en",
                          options
                        )}
                      </span>
                    </div>
                    {/* location */}
                    <div className="flex gap-2 items-center">
                      <MapPin size={15} />
                      <div className="flex gap-1 text-sm text-base-content/80 capitalize">
                        <span>{match.tournamentId.city},</span>
                        <span>{match.tournamentId.ground}</span>
                      </div>
                    </div>
                  </section>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
