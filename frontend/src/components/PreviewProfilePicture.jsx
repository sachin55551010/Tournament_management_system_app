import { useDispatch, useSelector } from "react-redux";
import { setPicturePopup } from "../store/authSlice";
import { X } from "lucide-react";
import { defaultAvatar } from "../utils/noprofilePicHelper";
import { useRemoveProfilePictureMutation } from "../store/authApi";

export const PreviewProfilePicture = () => {
  const { authUser, picturePopup } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [removePhoto] = useRemoveProfilePictureMutation();
  console.log(picturePopup);

  return (
    <div className="fixed z-100 inset-0 w-full flex justify-center pt-20 h-dvh backdrop-blur-lg overflow-hidden">
      <div className="relative h-96 w-96 rounded-full flex flex-col items-center">
        {authUser?.player?.profilePicture === "" ? (
          <div className="rounded-full h-96 w-96 flex items-center justify-center bg-primary">
            <div className="text-8xl font-black">
              {defaultAvatar(authUser?.player?.playerName)}
            </div>
          </div>
        ) : (
          <img
            src={authUser?.player?.profilePicture}
            loading="lazy"
            alt=""
            className="h-[100%] w-[100%] object-cover
           rounded-full
          "
          />
        )}

        <div
          onClick={() => dispatch(setPicturePopup(false))}
          className="absolute bg-base-100 w-fit p-1 rounded-full transition-all duration-300 ease-in-out hover:scale-115 hover:bg-error top-0 right-0"
        >
          <X strokeWidth={5} />
        </div>
        {authUser?.player?.profilePicture !== "" && (
          <button
            onClick={() => removePhoto()}
            className="btn btn-outline btn-error rounded-md mt-4"
          >
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
};
