import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetTournamentInfoQuery } from "../../store/tournamentApi";
import { useState } from "react";
import { ChooseMatchActionModal } from "../../components/ui/ChooseMatchActionModal";
export const MyTournamentMatches = () => {
  const [isMatchActionModal, setIsMatchActionModal] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  const { tournamentId } = useParams();

  const { data } = useGetTournamentInfoQuery(tournamentId);

  const organiserId = data?.myTournament?.createdBy?._id;
  const loggedInUserId = authUser?.player?._id;
  const varifiedOrganiser = organiserId === loggedInUserId;

  return (
    <div className="pt-24 h-dvh overflow-y-scroll">
      {varifiedOrganiser && (
        <div className="flex justify-between items-center px-3">
          <h1>Start a new match</h1>
          <button
            onClick={() => setIsMatchActionModal(true)}
            className="btn btn-success"
          >
            Start
          </button>
        </div>
      )}
      {isMatchActionModal && (
        <ChooseMatchActionModal setIsMatchActionModal={setIsMatchActionModal} />
      )}
    </div>
  );
};
