import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useGetTournamentInfoQuery } from "../../store/tournamentApi";
import { UserRoundPen } from "lucide-react";
import { defaultAvatar } from "../../utils/noprofilePicHelper";

export const MyTournamentInfo = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data, isLoading } = useGetTournamentInfoQuery(id);

  //format Date
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return (
    <div className="pt-30 max-h-dvh overflow-y-auto flex flex-col items-center p-4">
      <div className="w-full md:w-[70%] flex flex-col gap-8">
        {/* organised information  */}
        <div className="shadow-[0px_0px_8px_rgba(0,0,0,1)] rounded-md bg-base-100">
          <h1 className="pl-2 py-2 bg-base-300 rounded-t-md text-base-content/70 font-extrabold">
            Organiser Detail
          </h1>
          <div className="flex gap-4 py-6 px-2">
            {/* profile picture  */}
            <div>
              {data?.myTournament?.createdBy?.profilePicture === "" ? (
                <div className="rounded-full h-18 w-18 flex items-center justify-center bg-primary">
                  <div className="text-xl font-semibold">
                    {defaultAvatar(data?.myTournament?.createdBy?.playerName)}
                  </div>
                </div>
              ) : (
                <img
                  className="rounded-full h-18 w-18 object-cover"
                  src={data?.myTournament?.createdBy?.profilePicture}
                  alt=""
                />
              )}
            </div>

            {/* organiser detials  */}
            <div className="flex flex-col gap-2">
              <span className="font-bold">
                {data?.myTournament?.createdBy?.playerName}
              </span>
              <div className="flex gap-1 text-base-content/70 text-sm">
                <h1>Tournament Organised :</h1>
                <span>{data?.totalTournaments}</span>
              </div>
              <div className="flex gap-1 text-base-content/70 text-sm">
                <h1>Organiser Number :</h1>
                <span>{data?.myTournament?.createdBy?.number}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament details */}
        {isLoading ? (
          <div className="skeleton h-60 w-full"></div>
        ) : (
          <div className="flex flex-col w-full rounded-md shadow-[0px_0px_10px_rgba(0,0,0,1)]">
            <div className="py-2 bg-base-300 text-base-content/70 flex justify-between rounded-t-md">
              <h1 className="pl-2 font-extrabold">Tournament Detail</h1>

              {/* tournament edit button  */}
              {authUser?.player?._id === data?.myTournament?.createdBy?._id && (
                <NavLink to={`/update-tournament/${id}`} className="pr-3">
                  <UserRoundPen
                    size={26}
                    className="hover:scale-115 transition-all duration-200"
                  />
                </NavLink>
              )}
            </div>

            <div className="flex flex-col p-2 gap-10 md:grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-base-content/60 font-bold">Name</h1>
                <span className="capitalize">
                  {data?.myTournament?.tournamentName}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-base-content/60 font-bold">Date</h1>
                <span className="capitalize">
                  {data?.myTournament?.startDate &&
                  data?.myTournament?.endDate ? (
                    <div className="flex gap-2">
                      <span>
                        {new Date(
                          data?.myTournament?.startDate
                        ).toLocaleDateString("en", options)}
                      </span>
                      to
                      <span>
                        {new Date(
                          data?.myTournament?.endDate
                        ).toLocaleDateString("en", options)}
                      </span>
                    </div>
                  ) : (
                    <span>Not Mentioned Yet</span>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-base-content/60 font-bold">Ground</h1>
                <span className="capitalize">
                  {data?.myTournament?.city}, {data?.myTournament?.ground}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-base-content/60 font-bold">Ball Type</h1>
                <span className="capitalize">
                  {data?.myTournament?.ballType}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-base-content/60 font-bold">Category</h1>
                <span className="capitalize">
                  {data?.myTournament?.tournamentCategory}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* additional Information  */}
        <div className="flex flex-col w-full rounded-md shadow-[0px_0px_10px_rgba(0,0,0,1)]">
          <h1 className="pl-2 py-2 bg-base-300 rounded-t-md text-base-content/70 font-extrabold">
            Additional Information
          </h1>
          {data?.myTournament?.additionalInfo === "" && (
            <p className="capitalize p-3 text-base-content/50">
              No information available yet. The organiser has not added details
              for this tournament. Once updated, you will be able to view entry
              fee, winning prize, rules, and other important information here.
            </p>
          )}
          <p className="capitalize font-bold p-3 italic">
            {data?.myTournament?.additionalInfo}
          </p>
        </div>
      </div>
    </div>
  );
};
