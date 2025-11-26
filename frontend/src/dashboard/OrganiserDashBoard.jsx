import { NavLink, Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const OrganiserDashBoard = () => {
  return (
    <div className="max-h-dvh">
      <Header data="My Tournaments" backTo="/" />

      {/* Navigate buttons */}
      <nav className="fixed z-[99] w-full bg-base-200 pt-[var(--nav-h)] flex justify-around">
        <NavLink
          to="tournaments"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          My Tournaments
        </NavLink>
        <NavLink
          to="teams"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          Teams
        </NavLink>
        <NavLink
          to="matches"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          Matches
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};
