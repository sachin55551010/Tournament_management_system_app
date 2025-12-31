import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/User/LoginPage";
import { useSelector } from "react-redux";
import { useCheckAuthUserQuery } from "./store/authApi";
import { ProfilePage } from "./pages/User/ProfilePage";
import { ToastContainer, toast } from "react-toastify";
import { CareerStats } from "./pages/User/CareerStats";
import { EditProfile } from "./pages/User/EditProfile";
import { CreateTournamentPage } from "./pages/Tournament/CreateTournamentPage";

import { Matches } from "./pages/Match/Matches";
import { MyTournamentList } from "./pages/Tournament/MyTournamentList";
import { Teams } from "./pages/Team/Teams";
import { TournamentInfo } from "./pages/Tournament/TournamentInfo";
import { MyTournamentInfo } from "./pages/Tournament/MyTournamentInfo";
import { MyTournamentTeams } from "./pages/Team/MyTournamentTeams";
import { MyTournamentMatches } from "./pages/Match/MyTournamentMatches";
import { AllTournaments } from "./pages/Tournament/AllTournaments";
import { Allmatches } from "./pages/Match/Allmatches";
import { AllOpenTournaments } from "./pages/Tournament/AllOpenTournaments";
import { AllPanchayatTournaments } from "./pages/Tournament/AllPanchayatTournaments";
import { AllPanchayatOpenTournament } from "./pages/Tournament/AllPanchayatOpenTournament";
import { AllCorporateTournament } from "./pages/Tournament/AllCorporateTournament";
import { NavBar } from "./components/NavBar";
import { ChangeTheme } from "./components/ChangeTheme";
import { UserDashBoard } from "./dashboard/UserDashBoard";
import { OrganiserDashBoard } from "./dashboard/OrganiserDashBoard";
import { createSocket } from "./utils/socket";
import { NotFound } from "./pages/NotFound";
import { CreateTeam } from "./pages/Team/CreateTeam";
import { AddTeamPlayer } from "./pages/Team/AddTeamPlayer";
import { JoinTeamPage } from "./pages/Team/JoinTeamPage";
import { useEffect } from "react";
import { StartMatch } from "./pages/Match/StartMatch";
function App() {
  const { authUser } = useSelector((state) => state.auth);
  const { isLoading } = useCheckAuthUserQuery();
  const { myTheme } = useSelector((state) => state.theme);
  const { chooseTheme } = useSelector((state) => state.theme);

  const socket = createSocket();
  const navigate = useNavigate();
  useEffect(() => {
    const redirectTo = localStorage.getItem("redirectAfterLogin");

    if (authUser && redirectTo) {
      navigate(redirectTo);
      localStorage.removeItem("redirectAfterLogin");
    }
  }, [authUser, navigate]);
  if (isLoading && !authUser) {
    return (
      <div
        data-theme={myTheme}
        className="h-dvh flex flex-col items-center justify-center"
      >
        <span className="loading loading-ring w-20 h-20"></span>
      </div>
    );
  }

  return (
    <div data-theme={myTheme} className={`min-h-dvh`}>
      <div className={`${chooseTheme && "blur-sm overflow-hidden"}`}>
        <NavBar />

        {/* routes  */}
        <Routes>
          {/*
           * user dashboard // app main page
           * contain home page
           * contain all tournament page
           * contain all matches page
           */}
          <Route path="/" element={<UserDashBoard />}>
            <Route index element={<HomePage />} />
            {/*
            all nested tourments routes inside user dashboard
            * contain all open tournament page
            * contain all panchayat tournament page
            * contain all panchayat+open tournament page
            * contain all corporate tournament page
            */}
            <Route path="all-tournaments" element={<AllTournaments />}>
              <Route index element={<Navigate to="open" replace />} />
              <Route path="open" element={<AllOpenTournaments />} />
              <Route path="panchayat" element={<AllPanchayatTournaments />} />
              <Route
                path="panchayat+open"
                element={<AllPanchayatOpenTournament />}
              />
              <Route path="corporate" element={<AllCorporateTournament />} />
            </Route>

            {/*
            all nested matches routes
            */}
            <Route path="all-matches" element={<Allmatches />}></Route>
          </Route>

          {/* login page  */}
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          {/*
          organiser dashboard
          containes info matches and  teams routes
          */}
          <Route
            path="/my-tournament"
            element={
              authUser?.player?.role === "organiser" ? (
                <OrganiserDashBoard />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            {/*
            all nested page inside organiser dashboard
            * contain organiser tournaments
            * contain organiser matches
            * contain organiser teams
             */}
            <Route index element={<Navigate to="tournaments" replace />} />
            <Route path="tournaments" element={<MyTournamentList />} />
            <Route path="matches" element={<Matches />} />
            <Route path="teams" element={<Teams />} />
          </Route>

          {/* my profile page  */}
          <Route path="/profile/:playerId" element={<ProfilePage />} />

          {/* player career stats page  */}
          <Route
            path="/profile/career-stats/:playerId"
            element={<CareerStats />}
          />

          {/*
           edit profile page
           to edit name, age, gender, profile photo etc
            */}
          <Route
            path="/profile/edit-profile/:playerId"
            element={authUser && <EditProfile />}
          />

          {/*
            all routes related with tournaments actions like create edit delete
           */}
          <Route
            path="/add-tournament"
            element={
              authUser ? (
                <CreateTournamentPage mode="create" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/update-tournament/:tournamentId"
            element={
              authUser ? (
                <CreateTournamentPage mode="edit" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/*
           * routes for specific tournament
           * contain tournament info page
           * contain matches info page
           * contain teams info page
           */}
          <Route
            path="/my-tournament/tournaments/:tournamentId"
            element={<TournamentInfo />}
          >
            <Route
              path="tournament-teams/create-team"
              element={authUser && <CreateTeam mode="create" />}
            />
            <Route
              path="tournament-teams/update-team/:teamId"
              element={authUser && <CreateTeam mode="edit" />}
            />
            <Route path="tournament-teams" element={<MyTournamentTeams />} />
            <Route
              path="tournament-teams/add-players/:teamId"
              element={<AddTeamPlayer />}
            />
            <Route index element={<Navigate to="tournament-info" replace />} />

            <Route path="tournament-info" element={<MyTournamentInfo />} />

            <Route
              path="tournament-matches"
              element={<MyTournamentMatches />}
            />
            <Route
              path="tournament-matches/start"
              element={authUser && <StartMatch mode="start" />}
            />
            <Route
              path="tournament-matches/schedule"
              element={authUser && <StartMatch mode="schedule" />}
            />
          </Route>

          <Route path="/all-tournaments" element={<AllTournaments />} />

          {/* team join route */}
          <Route path="/join-team/:token" element={<JoinTeamPage />} />
          {/* for invalid routes */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {chooseTheme && <ChangeTheme />}
      <ToastContainer />
    </div>
  );
}

export default App;
