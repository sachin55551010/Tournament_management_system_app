import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuthUser, setAuthUser } from "./authSlice";
import { toast, Zoom } from "react-toastify";
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
      providesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthUser(data));
        } catch (error) {
          console.log("check auth error :", error);
        }
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
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthUser(data));
          toast.success(data.message, {
            autoClose: 1000,
            theme: "colored",
          });
        } catch (error) {
          toast.error(error.error.data.message, {
            theme: "colored",
            autoClose: 1000,
            hideProgressBar: true,
            transition: Zoom,
          });
        }
      },
    }),

    removeProfilePicture: builder.mutation({
      query: () => ({
        url: "/remove-photo",
        method: "PATCH",
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data.message);

          // toast.success(data)
        } catch (error) {
          console.log("remove photo error : ", error);
        }
      },
    }),
  }),
});

export const {
  useCheckAuthUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useRemoveProfilePictureMutation,
} = authApi;
