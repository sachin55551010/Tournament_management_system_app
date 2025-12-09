import { useSelector } from "react-redux";
import { useGetTournamentInfoQuery } from "../store/tournamentApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DummyListLoadingSkelton } from "./ui/DummyLoadingSkelton";
import noData from "../../assets/undraw_no-data.svg";
import { defaultAvatar } from "../utils/noprofilePicHelper";
import bat from "../../assets/batsman.svg";
import ball from "../../assets/bowler.svg";
import { BadgeCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { GenerateInviteLinkModal } from "./GenerateInviteLinkModal";
import { useCreateInviteLinkMutation } from "../store/inviteTeamLinkApi";

export const PlayerList = ({ data }) => {
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const { tournamentId } = useParams();
  const { authUser } = useSelector((state) => state.auth);
  const { data: myTournamentInfo, isLoading } =
    useGetTournamentInfoQuery(tournamentId);

  const loggedInUserId = authUser?.player?._id;
  const tournamentOrganiserId = myTournamentInfo?.myTournament?.createdBy?._id;
  const teamAdminId = data?.myTeamPlayers?.createdBy;

  const teamId = data?.myTeamPlayers?._id;
  const [
    createInviteLink,
    { data: inviteLinkUrl, isLoading: inviteLinkLoading },
  ] = useCreateInviteLinkMutation();
  // add player button function
  function handleAddPlayerBtn() {
    setAddPlayerModal(true);
    createInviteLink({ tournamentId, teamId });
  }

  /*
   * getting player list from data
   * if list is null or undefined it will return emppty array
   */
  const playerList = data?.myTeamPlayers?.teamPlayers ?? [];

  // condition to check only team admin or organiser can add more players in team
  const canAddPlayers =
    loggedInUserId === tournamentOrganiserId || loggedInUserId === teamAdminId;

  // dummy data loading screen while data loading from db
  if (isLoading) {
    return <DummyListLoadingSkelton />;
  }

  return (
    <div className="h-dvh pt-24 px-2">
      {!authUser ? (
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[.8rem]">
            Please login to see more option
          </h1>
          <Link to="/login">
            <button className="btn btn-outline btn-info">Login</button>
          </Link>
        </div>
      ) : (
        <div>
          {canAddPlayers ? (
            <div className="flex items-center justify-between">
              <h1 className="font-black">Add more players ?</h1>

              <button
                onClick={handleAddPlayerBtn}
                className="btn btn-outline btn-info"
              >
                Invite player
              </button>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-[.75rem]">
                Please Ask Organiser or Team admin to add more players
              </p>
            </div>
          )}
        </div>
      )}

      {/* player list */}
      <div>
        {playerList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100dvh-10rem)] gap-4">
            <img src={noData} alt="" className="h-60 w-auto" />
            <h1 className="italic">No players found!</h1>
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {playerList.map((player) => {
              return (
                <Link key={player._id} to={`/profile/${player?._id}`}>
                  <li className="shadow-[0px_0px_5px_rgba(0,0,0,.4)] p-2 rounded-md flex gap-1 hover:cursor-pointer">
                    {/* player profile image */}
                    <div className="h-14 w-14 ">
                      {player?.profilePicture === "" ? (
                        <div>{defaultAvatar(player?.playerName)}</div>
                      ) : (
                        <img
                          src={player?.profilePicture}
                          alt=""
                          className="h-full w-full object-cover rounded-full"
                        />
                      )}
                    </div>
                    {/* player detail */}
                    <section className="flex-1 flex flex-col justify-evenly">
                      {/* player name and varification tag */}
                      <section className="flex justify-between items-center">
                        <h1 className="font-bold">{player?.playerName}</h1>
                        {player?.isVarified && (
                          <div>
                            <span className="flex items-center gap-1">
                              <BadgeCheck
                                size={19}
                                className="text-green-500 rounded-full"
                              />
                              <h1 className="font-bold text-[.7rem]">
                                Verified
                              </h1>
                            </span>
                          </div>
                        )}
                      </section>

                      <section className="flex items-center justify-between gap-1">
                        <div className="flex items-center">
                          <img src={bat} alt="" className="h-4 w-auto" />
                          <h1 className="capitalize text-[.65rem] text-base-content/70">
                            {player?.battingStyle}
                          </h1>
                        </div>
                        <div className="flex items-center">
                          <img src={ball} alt="" className="h-3 w-auto" />
                          <h1 className="capitalize text-[.65rem] text-base-content/70">
                            {player?.bowlingStyle}
                          </h1>
                        </div>
                        <div className="flex items-center">
                          <UserRound size={17} />
                          <h1 className="capitalize text-[.65rem] text-base-content/70">
                            {player?.playingRole}
                          </h1>
                        </div>
                      </section>
                    </section>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
      {addPlayerModal && (
        <GenerateInviteLinkModal
          setAddPlayerModal={setAddPlayerModal}
          inviteLinkLoading={inviteLinkLoading}
          inviteLinkUrl={inviteLinkUrl}
          data={data}
        />
      )}
    </div>
  );
};
