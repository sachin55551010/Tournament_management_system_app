import React, { useEffect } from "react";
import { AllTournamentList } from "../../components/AllTournamentList";
import { useGetAllTournamentsQuery } from "../../store/tournamentApi";
import { createSocket } from "../../utils/socket";

export const AllPanchayatTournaments = () => {
  return (
    <div className="max-h-dvh overflow-y-auto pt-30 pb-20 ">
      <AllTournamentList />
    </div>
  );
};
