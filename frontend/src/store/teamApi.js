import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { getSocket } from "../utils/socket";

export const teamApi = createApi({
  reducerPath: "team_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/team`,
    credentials: "include",
  }),
  tagTypes: ["Team", "Player"],
  endpoints: (builder) => ({
    // get all teams from specific tournaments
    createTeam: builder.mutation({
      query: (teamData) => ({
        url: "/create-team",
        method: "POST",
        body: teamData,
      }),
      invalidatesTags: ["Team", "Player"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log("create team error : ", error);
          toast.error(error.error.data.message);
        }
      },
    }),

    // get teams linked with tournament
    getTeamsByTournament: builder.query({
      query: (tournamentId) => ({
        url: `/my-tournament-teams/${tournamentId}`,
      }),
      providesTags: ["Team"],
      async onCacheEntryAdded(
        tournamentId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("createTeam", (newTeam) => {
            updateCachedData((draft) => {
              draft.myTournamentTeams.push(newTeam);
            });
          });
          await cacheEntryRemoved;
          socket.off("createTeam");
        } catch (error) {
          console.log("get Team by tournament error : ", error);
        }
      },
    }),

    //get players linked with team
    getTeamPlayers: builder.query({
      query: (teamId) => ({
        url: `/team-players/${teamId}`,
        method: "GET",
      }),
      providesTags: ["Player"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsByTournamentQuery,
  useGetTeamPlayersQuery,
} = teamApi;
