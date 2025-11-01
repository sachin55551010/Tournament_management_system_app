import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { useSelector } from "react-redux";
import { Organiser } from "./dashboard/Organiser";
import { useCheckAuthUserQuery } from "./store/authApi";
import { MyProfile } from "./pages/MyProfile";
import { Toaster } from "react-hot-toast";
import { CareerStats } from "./pages/CareerStats";
import { EditProfile } from "./pages/EditProfile";
import { TournamentPage } from "./pages/TournamentPage";
import { MyTournaments } from "./pages/MyTournaments";
function App() {
  const { authUser } = useSelector((state) => state.auth);
  const { isLoading } = useCheckAuthUserQuery();
  const { myTheme } = useSelector((state) => state.theme);

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
  console.log(authUser);

  return (
    <div data-theme={myTheme} className="min-h-dvh">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/my-tournament"
          element={
            authUser?.player?.role === "organiser" ? (
              <MyTournaments />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/my-profile"
          element={authUser ? <MyProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-profile/career-stats"
          element={authUser ? <CareerStats /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-profile/edit-profile"
          element={authUser ? <EditProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-tournament"
          element={authUser ? <TournamentPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
