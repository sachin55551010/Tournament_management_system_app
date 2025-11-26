import { CalendarDays, Mars, Pen, Phone, UserRoundPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/authApi";
import { Header } from "../../components/Header";
import { setPicturePopup } from "../../store/authSlice";
import { defaultAvatar } from "../../utils/noprofilePicHelper";
import allRounder from "../../../assets/all_rounder.svg";
import { PreviewProfilePicture } from "../../components/PreviewProfilePicture";
export const MyProfile = () => {
  const { authUser, picturePopup } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const { profilePicture } = authUser?.player;
  const { playerName } = authUser?.player;
  const { gender } = authUser?.player;
  const { number } = authUser?.player;
  const { battingStyle } = authUser?.player;
  const { bowlingStyle } = authUser?.player;
  const { playingRole } = authUser?.player;
  const { dateOfBirth } = authUser?.player;

  const navigate = useNavigate();
  const handleLogoutBtn = () => {
    logout();
    navigate("/");
  };
  const dispatch = useDispatch();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const playerDetails = [
    { icon: <Phone />, label: "Phone Number", value: number },
    { icon: <Mars />, label: "Gender", value: gender },
    {
      icon: (
        <img
          src={allRounder}
          alt=""
          className="h-[100%] w-[100%] object-contain"
        />
      ),
      label: "Playing Role",
      value: playingRole,
    },
    {
      icon: (
        <img
          src={allRounder}
          alt=""
          className="h-[100%] w-[100%] object-contain"
        />
      ),
      label: "Batting Style",
      value: battingStyle,
    },
    {
      icon: (
        <img
          src={allRounder}
          alt=""
          className="h-[100%] w-[100%] object-contain"
        />
      ),
      label: "Bowling Style",
      value: bowlingStyle,
    },
    {
      icon: <CalendarDays />,
      label: "Date Of Birth",
      value: new Date(dateOfBirth?.slice(0, 10)).toLocaleDateString(
        "en",
        options
      ),
    },
  ];

  return (
    <div className={`h-dvh flex flex-col overflow-hidden`}>
      <Header data="My Profile" />
      <div
        className={`flex-1 overflow-y-auto pt-18 px-6 items-center flex flex-col custom-scrollbar ${
          picturePopup && "overflow-hidden"
        }`}
      >
        {/* top gradient div */}
        <section className="relative w-full flex-shrink-0 h-85 md:w-[95%] lg:w-[85%] shadow-[0px_0px_10px_rgba(0,0,0,.4)] rounded-xl">
          {/* gredient div */}
          <div className="h-[40%] bg-gradient-to-br from-primary to-secondary rounded-t-xl"></div>

          {/* display user image */}
          <div
            onClick={() => dispatch(setPicturePopup(true))}
            className="absolute hover:cursor-pointer top-[20%] left-1/2 -translate-x-1/2 bg-red-400 rounded-full h-30 w-30 border-2 border-white md:left-[15%]"
          >
            {profilePicture === "" ? (
              <div className="rounded-full h-[100%] w-[100%] border-1 flex items-center justify-center bg-primary">
                <div className="text-4xl font-black">
                  {defaultAvatar(playerName)}
                </div>
              </div>
            ) : (
              <img
                className="rounded-full h-[100%] w-[100%] object-cover"
                src={profilePicture}
                alt="img"
              />
            )}
          </div>

          {/* player information section */}
          <div className="bg-base-100 h-[60%] rounded-b-xl flex flex-col items-center">
            <div className=" mt-18 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center md:absolute top-[31%] left-[28%] gap-2 lg:left-[23%]">
                <h1 className="text-2xl font-extrabold">{playerName}</h1>
                <h4 className="font-semibold capitalize">
                  {playingRole || ""}
                </h4>
              </div>

              <Link
                to="edit-profile"
                className="md:absolute top-[34%] right-[5%]"
              >
                <button className="btn btn-info flex justify-center items-center">
                  <Pen size={20} />
                  <span className="font-bold">Edit Profile</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* player all basic details gender number playing role etc */}
        <section className="w-full rounded-xl md:w-[95%] lg:w-[85%] mt-4 mb-6">
          <ul className=" grid grid-cols-1 gap-3 md:grid-cols-2 mb-6">
            {playerDetails.map((player, index) => {
              return (
                <li
                  key={index}
                  className="rounded-lg flex gap-3 items-center p-3 shadow-[0px_0px_10px_rgba(0,0,0,.4)]"
                >
                  <div className="badge badge-soft badge-info flex items-center justify-center h-9 w-9 rounded-lg p-[.5rem]">
                    {player.icon}
                  </div>
                  <div>
                    <h1>{player.label}</h1>
                    <h1 className="capitalize">{player.value || "_"}</h1>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-4">
            <Link to="career-stats" className="btn btn-info flex-1">
              Career Stats
            </Link>
            <button onClick={handleLogoutBtn} className="btn btn-error flex-1">
              Log Out
            </button>
          </div>
        </section>
      </div>
      {picturePopup && <PreviewProfilePicture />}
    </div>
  );
};
