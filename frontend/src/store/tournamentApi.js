import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

export const tournamentApi = createApi({
  reducerPath: "tournament_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/tournament`,
    credentials: "include",
  }),
  tagTypes: ["Tournament"],
  endpoints: (builder) => ({
    addTournament: builder.mutation({
      query: (data) => ({
        url: "/add-tournament",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          toast.success(data.message);
        } catch (error) {
          console.log(error);
          toast.error(error.error.data.message);
        }
      },
    }),
  }),
});

export const { useAddTournamentMutation } = tournamentApi;
