import { DummyCardLoadingSkelton } from "../../components/modals/DummyLoadingSkelton";
import { useGetMyTournamentQuery } from "../../store/tournamentApi";
import { useNavigate } from "react-router-dom";

export const MyTournamentList = () => {
  const { data, isLoading } = useGetMyTournamentQuery();
  const navigate = useNavigate();

  // function to get tournament information related with tournament id
  const handleOnClickBtn = (tournamentId) => {
    navigate(`/my-tournament/${tournamentId}`);
  };
  //format date
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return (
    <div className="px-4 pt-20 pb-8 max-h-dvh overflow-y-scroll">
      {isLoading ? (
        <DummyCardLoadingSkelton />
      ) : (
        <div>
          {data?.myTournaments?.length === 0 ? (
            <div className="">
              <p>No Tournaments found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 w-full md:grid-cols-2 lg:grid-cols-3">
              {data?.myTournaments?.map((tournament) => {
                return (
                  <div
                    onClick={() => handleOnClickBtn(tournament._id)}
                    key={tournament._id}
                    className="relative flex flex-col rounded-lg h-50 bg-base-200 cursor-pointer border border-base-content/20 hover:scale-102 transition-all duration-200"
                  >
                    {/* header */}
                    <div className="h-[75%]">
                      <h1 className="absolute font-extrabold capitalize top-30 left-1">
                        {tournament.tournamentName}
                      </h1>
                      <div className="absolute badge badge-warning top-4 right-4 font-semibold">
                        {tournament.status}
                      </div>
                    </div>

                    {/* footer */}
                    <div className="bg-base-300 rounded-b-lg h-[25%] p-2 text-sm">
                      <div className="flex gap-1 text-base-content/60 font-semibold text-sm">
                        <h1 className="">Created :</h1>
                        <span>
                          {new Date(tournament.createdAt).toLocaleDateString(
                            "en",
                            options
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-base-content/60 font-semibold">
                        <div className="flex gap-1">
                          <h1>City :</h1>
                          <span className="capitalize">{tournament.city}</span>
                        </div>
                        <div className="flex gap-1">
                          <h1>Ground : </h1>
                          <span className="capitalize">
                            {tournament.ground}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
