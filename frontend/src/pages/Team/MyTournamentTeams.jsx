import React from "react";
import { useGetTournamentInfoQuery } from "../../store/tournamentApi";
import { Link, useParams } from "react-router-dom";
import noData from "../../../assets/undraw_no-data.svg";
export const MyTournamentTeams = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetTournamentInfoQuery(id);
  const myTournamentTeams = data?.myTournament?.teams ?? [];

  if (isLoading) {
    return (
      <div className="pt-26 max-h-dvh min-h-dvh p-4">
        {/* loading sceleton  */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 p-2 rounded-md w-full">
          {[...Array(3)].map((elem, index) => {
            return (
              <div className="flex flex-col gap-4 bg-base-200 w-full p-2 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
  return (
    <div className="max-h-dvh min-h-dvh pt-22">
      {myTournamentTeams.length === 0 ? (
        // if no data
        <div className="flex flex-col min-h-[85dvh] items-center justify-center gap-4">
          <img src={noData} alt="" className="h-60 w-60" />
          <p>No Team Found !</p>
          <Link to="create-team">
            <button className="btn btn-soft btn-info">Create Team</button>
          </Link>
        </div>
      ) : (
        //  teams List
        <div></div>
      )}
    </div>
  );
};
