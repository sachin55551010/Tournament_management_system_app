import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { data } from "react-router-dom";

export const matchApi = createApi({
  reducerPath: "match_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/match`,
    credentials: "include",
  }),
  tagTypes: ["Match"],
  endpoints: (builder) => ({
    // create match
    createMatch: builder.mutation({
      query: ({ data, tournamentId }) => ({
        url: `/create-match/${tournamentId}/matches`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Match"],
    }),

    //schedule match
    scheduleMatch: builder.mutation({
      query: ({ data, tournamentId }) => ({
        url: `/schedule-match/${tournamentId}/matches`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Match"],
    }),
  }),
});

export const { useCreateMatchMutation, useScheduleMatchMutation } = matchApi;
