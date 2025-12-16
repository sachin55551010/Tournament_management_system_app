import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "./authApi";
import themeReducer from "./themeSlice";
import { tournamentApi } from "./tournamentApi";
import { teamApi } from "./teamApi";
import { inviteLinkApi } from "./inviteTeamLinkApi";
import { matchApi } from "./matchApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tournamentApi.reducerPath]: tournamentApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [inviteLinkApi.reducerPath]: inviteLinkApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      tournamentApi.middleware,
      teamApi.middleware,
      inviteLinkApi.middleware,
      matchApi.middleware
    );
  },
});
