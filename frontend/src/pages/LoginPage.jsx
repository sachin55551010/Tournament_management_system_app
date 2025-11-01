import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [userInput, setUserInput] = useState("");
  const [checkbox, setCheckBox] = useState(false);

  const handleOnChange = (e) => {
    setCheckBox(!checkbox);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleOAuthLogin = (provider) => {
    if (!checkbox) {
      toast.error("Kindly agree to terms before proceeding");
      return;
    }
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/auth/${provider}`;
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center">
      <header className="h-[var(--nav-h)] flex items-center pl-2 gap-3 bg-base-neutral w-full">
        <Link to="/">
          <ArrowLeft size={30} strokeWidth={4} />
        </Link>
        <h1 className="font-bold text-xl">Login</h1>
      </header>

      <form
        onSubmit={handleFormSubmit}
        className=" flex w-full  flex-col md:w-150 "
      >
        <div className="flex gap-2 justify-center py-4 bg-base-200 px-2">
          <input value={checkbox} onChange={handleOnChange} type="checkbox" />
          <p className="text-sm">
            I agree to the <Link to="/info/privacy">Privacy Notice</Link> and
            <Link> Terms of Services</Link>
          </p>
        </div>

        {/* <div className="px-3 mt-8 flex flex-col gap-4">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="email"
            className="border w-full h-10 rounded pl-2 outline-0"
            placeholder="Enter Email Id"
          />
          <button
            className={`${
              userInput ? "bg-primary/80" : "bg-primary/30"
            } rounded py-2 disabled:cursor-not-allowed ${
              userInput && "hover:bg-primary"
            }`}
            disabled={userInput === ""}
          >
            Continue
          </button>
          <p className="text-center">
            Dont Have an account ? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div> */}
        <h1 className="text-center font-bold text-xl mt-6">
          Please Login with below any account
        </h1>
        <div className="flex items-center justify-between px-2 mt-4"></div>
        <div className="px-2 mt-8 flex flex-col gap-6">
          {/* login with google btn */}
          <button
            onClick={() => handleOAuthLogin("google")}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          {/* login with facebook btn */}
          <button
            onClick={() => handleOAuthLogin("facebook")}
            className="btn bg-[#1A77F2] text-white border-[#005fd8]"
          >
            <svg
              aria-label="Facebook logo"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path
                fill="white"
                d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
              ></path>
            </svg>
            Login with Facebook
          </button>

          {/* login with facebook btn */}
          <button className="btn bg-black text-white border-black">
            <svg
              aria-label="Apple logo"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1195 1195"
            >
              <path
                fill="white"
                d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"
              ></path>
            </svg>
            Login with Apple
          </button>
        </div>
      </form>
    </div>
  );
};

// btn ${userInput ? "btn-primary" : "btn-soft"}
