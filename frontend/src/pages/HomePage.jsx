import { NavBar } from "../components/NavBar";
import { ChangeTheme } from "../components/ChangeTheme";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const { myTheme, chooseTheme } = useSelector((state) => state.theme);

  return (
    <div className="relative min-h-dvh">
      <div
        className={` ${
          chooseTheme ? "blur-sm transition-all duration-200" : ""
        }`}
      >
        <NavBar />
        HomePage
      </div>
      {chooseTheme && <ChangeTheme />}
    </div>
  );
};
