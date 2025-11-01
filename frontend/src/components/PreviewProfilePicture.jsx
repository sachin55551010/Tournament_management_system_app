import { useDispatch, useSelector } from "react-redux";
import { setPicturePopup } from "../store/authSlice";
import { X } from "lucide-react";

export const PreviewProfilePicture = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const previewImg = authUser?.player?.playerId?.profileImg;

  const highResolutionImg = previewImg.replace("=s96-c", "=s400-c");

  return (
    <div className="absolute inset-0 w-full flex justify-center pt-20 h-dvh">
      <div className="relative h-96 w-96 rounded-full">
        <img
          src={
            authUser?.player?.profilePicture ||
            highResolutionImg ||
            "avatar.jpg"
          }
          alt=""
          className="h-[100%] w-[100%] object-cover
           rounded-full
          "
        />
        <div
          onClick={() => dispatch(setPicturePopup(false))}
          className="absolute bg-base-100 w-fit p-1 rounded-full transition-all duration-300 ease-in-out hover:scale-115 hover:bg-success top-0 right-0"
        >
          <X strokeWidth={5} />
        </div>
      </div>
    </div>
  );
};
