import { Palette, Trophy, UserRound, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setChooseTheme } from "../store/themeSlice";
export const MenuPage = ({ setIsMenuOpen }) => {
  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className="absolute inset-0 top-0 h-dvh z-[100]  flex flex-col bg-black/30">
      <div className="bg-base-200 w-[70%] h-dvh md:w-[40%]">
        <div className="flex justify-between p-2">
          <h1 className="font-bold text-xl">Menu</h1>
          <X size={26} strokeWidth={4} onClick={() => setIsMenuOpen(false)} />
        </div>

        <div>
          {!authUser ? (
            <Link
              to="/login"
              className="border-b py-3 flex items-center px-2 gap-6"
            >
              <UserRound strokeWidth={3} />
              <p className="font-bold">Login</p>
            </Link>
          ) : (
            <Link
              to="/my-profile"
              className="border-b p-3 flex items-center gap-2"
            >
              <img
                src={
                  authUser?.player?.profilePicture ||
                  authUser?.player?.playerId?.profileImg ||
                  "avatar.jpg"
                }
                alt=""
                className="h-10 w-10 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="font-bold">
                  {authUser?.player?.playerId?.name}
                </h1>
                <p className="">{authUser?.player?.playerId?.email}</p>
              </div>
            </Link>
          )}
        </div>

        <div
          onClick={() => dispatch(setChooseTheme(true))}
          className="border-b py-3 px-2 flex items-center gap-6 cursor-pointer"
        >
          <Palette strokeWidth={3} />
          <h1 className="font-bold">Choose Theme</h1>
        </div>
        <Link
          to="/add-tournament"
          className="border-b py-3 px-2 flex items-center gap-6 cursor-pointer"
        >
          <Trophy strokeWidth={3} />
          <h1 className="font-bold">Start Tourmanent</h1>
        </Link>
      </div>
    </div>
  );
};
