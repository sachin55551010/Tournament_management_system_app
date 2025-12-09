import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inviteLinkApi = createApi({
  reducerPath: "inviteLink_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/invite`,
    credentials: "include",
  }),
  tagTypes: ["Invite"],
  endpoints: (builder) => ({
    createInviteLink: builder.mutation({
      query: ({ tournamentId, teamId }) => ({
        url: `/create-invite/${tournamentId}/${teamId}`,
        method: "POST",
      }),
    }),

    validateInviteLink: builder.mutation({
      query: (token) => ({
        url: `/join-team/${token}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateInviteLinkMutation, useValidateInviteLinkMutation } =
  inviteLinkApi;
