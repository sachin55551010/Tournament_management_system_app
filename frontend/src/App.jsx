import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/User/LoginPage";
import { useSelector } from "react-redux";
import { useCheckAuthUserQuery } from "./store/authApi";
import { MyProfile } from "./pages/User/MyProfile";
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
import { useEffect } from "react";
import { CreateTeam } from "./pages/Team/CreateTeam";
function App() {
  const { authUser } = useSelector((state) => state.auth);
  const { isLoading } = useCheckAuthUserQuery();
  const { myTheme } = useSelector((state) => state.theme);
  const { chooseTheme } = useSelector((state) => state.theme);

  const socket = createSocket();

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
    <div data-theme={myTheme} className={`min-h-dvh max-h-dvh`}>
      <div className={`${chooseTheme && "blur-sm overflow-hidden"}`}>
        <NavBar />

        {/* routes  */}
        <Routes>
          {/*
           * user dashboard //?parent component
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
          organser dashboard
          containes all info matches and related related with organiser
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
          <Route
            path="/my-profile"
            element={authUser ? <MyProfile /> : <Navigate to="/login" />}
          />

          {/* player career stats page  */}
          <Route
            path="/my-profile/career-stats"
            element={authUser ? <CareerStats /> : <Navigate to="/login" />}
          />

          {/*
           edit profile page
           to edit name, age, gender, profile photo etc
            */}
          <Route
            path="/my-profile/edit-profile"
            element={authUser ? <EditProfile /> : <Navigate to="/login" />}
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
            path="/update-tournament/:id"
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
            path="/my-tournament/tournaments/:id"
            element={<TournamentInfo />}
          >
            <Route
              path="tournament-teams/create-team"
              element={<CreateTeam />}
            />
            <Route path="tournament-teams" element={<MyTournamentTeams />} />
            <Route index element={<Navigate to="tournament-info" replace />} />

            <Route path="tournament-info" element={<MyTournamentInfo />} />
            <Route
              path="tournament-matches"
              element={<MyTournamentMatches />}
            />
          </Route>

          <Route path="/all-tournaments" element={<AllTournaments />} />

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
