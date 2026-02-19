import { useDispatch } from "react-redux";
import { getSocket } from "../utils/socket";
import { useEffect, useMemo } from "react";
import noData from "../../assets/No data-amico.svg";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import {
  tournamentApi,
  useGetAllTournamentsQuery,
} from "../store/tournamentApi";
import { DummyCardLoadingSkelton } from "./modals/DummyLoadingSkelton";
import { Phone, User } from "lucide-react";

export const AllTournamentList = () => {
  const { searchData } = useOutletContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const tournamentCategory = location.pathname.split("/").pop();

  // ✅ Stable query args (IMPORTANT)
  const queryArgs = useMemo(
    () => ({
      tournamentCategory,
      searchData,
    }),
    [tournamentCategory, searchData],
  );

  const { data, isLoading } = useGetAllTournamentsQuery(queryArgs);

  useEffect(() => {
    const socket = getSocket();

    // 🔥 NEW TOURNAMENT
    socket.on("newTournament", (newTournament) => {
      dispatch(
        tournamentApi.util.updateQueryData(
          "getAllTournaments",
          queryArgs,
          (draft) => {
            if (!draft?.allTournaments) return;

            // Optional: prevent duplicate insert
            const exists = draft.allTournaments.some(
              (t) => t._id === newTournament._id,
            );
            if (!exists) {
              draft.allTournaments.unshift(newTournament);
            }
          },
        ),
      );
    });

    // 🔥 DELETE TOURNAMENT
    socket.on("deletedTournament", (deletedId) => {
      dispatch(
        tournamentApi.util.updateQueryData(
          "getAllTournaments",
          queryArgs,
          (draft) => {
            if (!draft?.allTournaments) return;

            draft.allTournaments = draft.allTournaments.filter(
              (t) => t._id !== deletedId,
            );
          },
        ),
      );
    });

    // 🔥 UPDATE TOURNAMENT
    socket.on("updatedTournament", (updatedTournament) => {
      dispatch(
        tournamentApi.util.updateQueryData(
          "getAllTournaments",
          queryArgs,
          (draft) => {
            if (!draft?.allTournaments) return;

            const index = draft.allTournaments.findIndex(
              (t) => t._id === updatedTournament._id,
            );

            if (index !== -1) {
              draft.allTournaments[index] = updatedTournament;
            }
          },
        ),
      );
    });

    return () => {
      socket.off("newTournament");
      socket.off("deletedTournament");
      socket.off("updatedTournament");
    };
  }, [dispatch, queryArgs]);

  const tournamentStatusColor = {
    Upcoming: "badge-info",
    Ongoing: "badge-warning",
    Completed: "badge-success",
    Cancelled: "badge-warning",
  };

  const handleGetTournamentInfoBtn = (tournamentId) => {
    navigate(`/my-tournament/${tournamentId}`);
  };

  const options = { day: "2-digit", month: "short", year: "numeric" };

  if (isLoading) {
    return (
      <div className="mt-10">
        <DummyCardLoadingSkelton />
      </div>
    );
  }

  const noTournaments =
    !data?.allTournaments || data.allTournaments.length === 0;

  return (
    <>
      {noTournaments && (
        <div className="h-[50%] w-auto flex flex-col items-center justify-center">
          <img src={noData} alt="No data" className="h-90 w-90 md:h-80" />
          <p>No Tournament found</p>
        </div>
      )}

      <ul className="grid px-3 py-4 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.allTournaments?.map((tournament) => (
          <li
            onClick={() => handleGetTournamentInfoBtn(tournament._id)}
            key={tournament._id}
            className="relative flex flex-col rounded-lg h-55 bg-base-100 cursor-pointer border border-base-content/20 hover:scale-102 transition-all duration-200"
          >
            {/* Header */}
            <div className="h-[70%] p-2 flex flex-col justify-around">
              <h1 className="badge badge-soft badge-info font-extrabold capitalize rounded-md">
                {tournament.tournamentName}
              </h1>

              <div className="flex gap-1 text-[.7rem] text-base-content/70">
                <User size={17} />
                <h1>Organiser :</h1>
                <h2 className="font-bold">{tournament.organiserName}</h2>
              </div>

              <div className="flex gap-1 text-[.7rem] text-base-content/70">
                <Phone size={17} />
                <h1>Contact :</h1>
                <h2 className="font-bold">{tournament.phone}</h2>
              </div>

              <div className="flex justify-between text-[.7rem] text-base-content/70">
                <div>
                  <h1>Start :</h1>
                  <h2 className="font-bold">
                    {tournament.startDate
                      ? new Date(tournament.startDate).toLocaleDateString(
                          "en",
                          options,
                        )
                      : "N/A"}
                  </h2>
                </div>

                <div>
                  <h1>End :</h1>
                  <h2 className="font-bold">
                    {tournament.endDate
                      ? new Date(tournament.endDate).toLocaleDateString(
                          "en",
                          options,
                        )
                      : "N/A"}
                  </h2>
                </div>
              </div>

              <div
                className={`absolute badge badge-soft ${
                  tournamentStatusColor[tournament.status]
                } top-4 right-4 font-semibold rounded-md`}
              >
                {tournament.status}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-base-300/60 flex flex-col gap-2 rounded-b-lg h-[30%] p-2 text-[.7rem]">
              <div className="flex gap-1 text-base-content/60 font-semibold">
                <h1>Created :</h1>
                <span>
                  {new Date(tournament.createdAt).toLocaleDateString(
                    "en",
                    options,
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base-content/60 font-semibold">
                <div className="badge badge-soft badge-success flex gap-1 items-center text-[.75rem] font-bold">
                  City :<span className="capitalize">{tournament.city}</span>
                </div>

                <div className="badge badge-soft badge-success flex gap-1 items-center text-[.75rem] font-bold">
                  Ground :
                  <span className="capitalize">{tournament.ground}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
