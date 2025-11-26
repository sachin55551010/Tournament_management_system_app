import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teamApi = createApi({
  reducerPath: "team_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/team`,
    credentials: "include",
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // get all teams from specific tournaments
  }),
});
