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
    getAllTournaments: builder.query({
      query: (tournamentCategory) => ({
        url: `/all-tournaments/${tournamentCategory}`,
      }),
      providesTags: ["Tournament"],
    }),
    addTournament: builder.mutation({
      query: (data) => ({
        url: "/add-tournament",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tournament"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message);
        } catch (error) {
          console.log(error);
          toast.error(error.error.data.message);
        }
      },
    }),

    getMyTournament: builder.query({
      query: () => ({
        url: "/my-tournaments",
      }),
      providesTags: ["Tournament"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getTournamentInfo: builder.query({
      query: (id) => ({
        url: `/my-tournaments/${id}`,
        method: "GET",
      }),
      providesTags: ["Tournament"],
    }),

    updateTournamentInfo: builder.mutation({
      query: ({ id, updatedFields }) => ({
        url: `/update-tournament/${id}`,
        method: "PATCH",
        body: updatedFields,
      }),
      invalidatesTags: ["Tournament"],
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

    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/delete-tournament/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tournament"],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          toast.success(data.message);
        } catch (error) {
          toast.error(error.error.data.message);
        }
      },
    }),
  }),
});

export const {
  useAddTournamentMutation,
  useGetMyTournamentQuery,
  useGetTournamentInfoQuery,
  useUpdateTournamentInfoMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
} = tournamentApi;
