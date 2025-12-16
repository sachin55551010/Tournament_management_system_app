import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { useGetTeamPlayersQuery } from "../../store/teamApi";
import { DummyListLoadingSkelton } from "../../components/ui/DummyLoadingSkelton";
import { PlayerList } from "../../components/PlayerList";

export const AddTeamPlayer = () => {
  const { teamId } = useParams();
  const { data, isLoading } = useGetTeamPlayersQuery(teamId);
  console.log(data);

  if (isLoading) {
    return <DummyListLoadingSkelton />;
  }

  return (
    <div className="min-h-dvh max-h-dvh overflow-y-scroll">
      <Header data={data?.myTeamPlayers.teamName} />
      <PlayerList data={data} />
    </div>
  );
};
