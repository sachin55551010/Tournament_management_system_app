import { NavLink, Outlet } from "react-router-dom";

export const AllTournaments = () => {
  return (
    <div className="">
      <nav className="fixed z-[70] w-full bg-base-200 flex justify-around pt-18 text-[.8rem]">
        <NavLink
          to="open"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          Open
        </NavLink>
        <NavLink
          to="panchayat"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          Panchayat
        </NavLink>
        <NavLink
          to="panchayat+open"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          P + O
        </NavLink>
        <NavLink
          to="corporate"
          className={({ isActive }) =>
            `${
              isActive && "border-b-2 font-extrabold text-success"
            } text-center flex-1 pb-2`
          }
        >
          Corporate
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
