import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
export const HomePage = () => {
  const { chooseTheme } = useSelector((state) => state.theme);
  return (
    <div className={`pt-20 max-h-dvh overflow-y-auto px-2`}>
      <h1>Home Page</h1>
    </div>
  );
};
