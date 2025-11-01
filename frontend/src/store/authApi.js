import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuthUser, setAuthUser } from "./authSlice";
import toast from "react-hot-toast";
export const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    //* function to check user login or not
    checkAuthUser: builder.query({
      query: () => ({
        url: "/me",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setAuthUser(data));
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(clearAuthUser());
        toast.success(data.message);
      },
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/update-user",
        method: "PATCH",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setAuthUser(data));
        toast.success(data.message);
      },
    }),
  }),
});

export const {
  useCheckAuthUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} = authApi;
