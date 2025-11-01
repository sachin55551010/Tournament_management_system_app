import { UserRoundPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../store/authApi";
import { Header } from "../components/Header";
import { PreviewProfilePicture } from "../components/PreviewProfilePicture";
import { setPicturePopup } from "../store/authSlice";

export const MyProfile = () => {
  const { authUser, picturePopup } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const defaultPic = authUser?.player?.playerId?.profileImg;

  const { profilePicture } = authUser?.player;
  const { playerName } = authUser?.player;
  const { gender } = authUser?.player;
  const { number } = authUser?.player;
  const { battingStyle } = authUser?.player;
  const { bowlingStyle } = authUser?.player;
  const { playingRole } = authUser?.player;
  const { dateOfBirth } = authUser?.player;

  const handleLogoutBtn = () => {
    logout();
  };
  const dispatch = useDispatch();

  return (
    <div className="relative overflow-x-hidden">
      <div
        className={`flex flex-col items-center ${
          picturePopup && "blur-md transition-all duration-200"
        }`}
      >
        <Header data="Profile" />
        <div className="mt-18 w-[97%] md:w-[60%] lg:w-[50%] flex flex-col items-center gap-2 rounded-lg bg-base-200 p-2">
          <div className="relative w-full">
            <h1 className="text-center font-bold text-xl">My Profile</h1>
            <Link
              to="edit-profile"
              className="flex gap-1 text-info absolute right-0 top-0 font-bold cursor-pointer hover:scale-110 transition-all duration-200"
            >
              <UserRoundPen />
              EDIT
            </Link>
          </div>

          {/* profile info */}
          <div className="flex flex-col items-center gap-2">
            <div>
              <img
                onClick={() => dispatch(setPicturePopup(true))}
                className="rounded-full h-25 w-25 object-cover"
                src={profilePicture || defaultPic || "avatar.jpg"}
                alt=""
              />
            </div>
            <h1 className="font-bold">{playerName}</h1>
          </div>

          {/* basic info */}
          <div className="h-[.15rem] w-full bg-gray-600 mt-2"></div>

          <div className="flex flex-col items-center mt-2 w-full">
            <h1 className="font-bold">Basic Information</h1>
            <div className="grid grid-cols-2 w-full gap-4 place-items-center mt-4">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-sm font-bold">MOBILE NUMBER</h1>
                {number || <p>_</p>}
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-sm font-bold">GENDER</h1>
                {gender?.toUpperCase() || <p>_</p>}
              </div>

              <div className="flex flex-col items-center gap-2">
                <h1 className="text-sm font-bold">PLAYING ROLE</h1>
                {playingRole ? (
                  <span className="capitalize">
                    {playingRole?.replace(/_/g, " ")}
                  </span>
                ) : (
                  <span>_</span>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-sm font-bold">BATTING STYLE</h1>
                {battingStyle ? (
                  <span className="capitalize">
                    {battingStyle?.replace(/_/g, " ")}
                  </span>
                ) : (
                  <span>_</span>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-sm font-bold">BOWLING STYLE</h1>
                {bowlingStyle ? (
                  <span className="capitalize">
                    {bowlingStyle?.replace(/_/g, " ")}
                  </span>
                ) : (
                  <span>_</span>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-sm font-bold">DATE OF BIRTH</h1>
                {dateOfBirth?.slice(0, 10) || <p>_</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-8 mt-6">
            <Link
              to="career-stats"
              className="btn btn-soft btn-info hover:scale-110 transition-all duration-200"
            >
              Career Stats
            </Link>
            <button
              onClick={handleLogoutBtn}
              className="btn btn-soft btn-error px-9 hover:scale-110 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {picturePopup && <PreviewProfilePicture />}
    </div>
  );
};
