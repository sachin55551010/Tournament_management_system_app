import { useParams } from "react-router-dom";
import { useValidateInviteLinkMutation } from "../../store/inviteTeamLinkApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const JoinTeamPage = () => {
  const { token } = useParams();

  const { authUser } = useSelector((state) => state.auth);
  console.log(authUser);

  const [joinTeam, { data, isLoading }] = useValidateInviteLinkMutation();

  return (
    <div className="fixed inset-0 z-[999] h-dvh bg-base-300">
      {!authUser ? (
        <div>
          <button>Please login first</button>
        </div>
      ) : (
        <div>hello</div>
      )}
    </div>
  );
};
