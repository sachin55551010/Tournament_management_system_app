import { useDispatch } from "react-redux";
import { getSocket } from "../utils/socket";
import { useEffect } from "react";
import noData from "../../assets/No data-amico.svg";
import {
  tournamentApi,
  useGetAllTournamentsQuery,
} from "../store/tournamentApi";
import { useLocation, useNavigate } from "react-router-dom";
import { DummyCardLoadingSkelton } from "./ui/DummyLoadingSkelton";

export const AllTournamentList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const tournamentCategory = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTournamentsQuery(tournamentCategory);

  useEffect(() => {
    const socket = getSocket();

    socket.on("newTournament", (newTournament) => {
      // Update RTK cache manually
      dispatch(
        tournamentApi.util.updateQueryData(
          "getAllTournaments",
          tournamentCategory, // category
          (draft) => {
            draft.allTournaments.unshift(newTournament);
            console.log("Updated tournaments:", draft.allTournaments);
          }
        )
      );
    });

    socket.on("deleteTournament", (deletedId) => {
      dispatch(
        tournamentApi.util.updateQueryData(
          "getAllTournaments",
          tournamentCategory,
          (draft) => {
            draft.allTournaments = draft.allTournaments.filter(
              (t) => t._id !== deletedId
            );
          }
        )
      );
    });

    socket.on("updatedTournament", (updatedTournament) => {
      dispatch(
        tournamentApi.util.updateQueryData(
          "getAllTournaments",
          tournamentCategory,
          (draft) => {
            const index = draft.allTournaments.findIndex(
              (t) => t._id === updatedTournament._id
            );

            if (index !== -1) {
              draft.allTournaments[index] = updatedTournament;
            }
          }
        )
      );
    });

    return () => {
      socket.off("newTournament");
      socket.off("deletedTournament");
      socket.off("updatedTournament");
    };
  }, [dispatch]);

  // get tournament info button
  const handleGetTournamentInfoBtn = (tournamentId) => {
    navigate(`/my-tournament/tournaments/${tournamentId}`);
  };
  const options = { day: "2-digit", month: "short", year: "numeric" };
  if (isLoading) {
    return <DummyCardLoadingSkelton />;
  }
  return (
    <>
      <div
        className={`${
          data?.allTournaments?.length === 0 ||
          data?.allTournaments === undefined ||
          data?.allTournaments === null
            ? "h-[50%] w-auto flex flex-col items-center justify-center"
            : "hidden"
        } `}
      >
        <img src={noData} alt="" className="h-90 w-90 md:h-80" />
        <p>No Tournament found</p>
      </div>

      <ul className="grid px-6 py-4 gap-10 md:grid-cols-3">
        {data?.allTournaments?.map((tournament) => {
          return (
            <li
              onClick={() => handleGetTournamentInfoBtn(tournament._id)}
              key={tournament._id}
              className="relative flex flex-col rounded-lg h-50 bg-base-200 cursor-pointer border border-base-content/20 hover:scale-105  transition-all duration-200"
            >
              {/* header */}
              <div className="h-[70%] p-2 flex flex-col justify-around">
                <h1 className="badge badge-soft badge-info font-extrabold capitalize rounded-md">
                  {tournament.tournamentName}
                </h1>

                {/* organiser info  */}
                <div className="flex gap-1 text-[.7rem] text-base-content/70">
                  <h1>Organiser Name :</h1>
                  <h2 className="font-bold">{tournament.organiserName}</h2>
                </div>
                <div className="flex gap-1 text-[.7rem] text-base-content/70">
                  <h1>Contact :</h1>
                  <h2 className="font-bold">{tournament.phone}</h2>
                </div>

                {/* tournaments start and end date  */}
                <div className="flex justify-between">
                  <div className="flex gap-1 text-[.7rem] text-base-content/70">
                    <h1>Start Date :</h1>
                    <h2 className="font-bold">
                      {tournament.startDate
                        ? new Date(tournament.startDate).toLocaleDateString(
                            "en",
                            options
                          )
                        : "not available"}
                    </h2>
                  </div>
                  <div className="flex gap-1 text-[.7rem] text-base-content/70">
                    <h1>End Date :</h1>
                    <h2 className="font-bold">
                      {tournament.endDate
                        ? new Date(tournament.endDate).toLocaleDateString(
                            "en",
                            options
                          )
                        : "not available"}
                    </h2>
                  </div>
                </div>

                {/* tournament status  */}
                <div className="absolute badge badge-soft badge-warning top-4 right-4 font-semibold rounded-md">
                  {tournament.status}
                </div>
              </div>

              {/* footer */}
              <div className="bg-base-300 flex flex-col gap-2 rounded-b-lg h-[30%] p-2 text-[.7rem]">
                <div className="flex gap-1 text-base-content/60 font-semibold">
                  <h1 className="">Created :</h1>
                  <span>
                    {new Date(tournament.createdAt).toLocaleDateString(
                      "en",
                      options
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base-content/60 font-semibold">
                  <div className="flex gap-1 items-center">
                    <h1>City :</h1>
                    <span className="badge badge-outline badge-success capitalize rounded-md text-[.7rem]">
                      {tournament.city}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <h1>Ground : </h1>
                    <span className="badge text-[.7rem] badge-outline badge-success capitalize rounded-md">
                      {tournament.ground}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
