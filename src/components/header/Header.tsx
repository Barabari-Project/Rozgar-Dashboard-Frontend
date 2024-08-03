// import styles from "./header.module.scss";
// import logo from "../../assets/barabari_logo.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ASSIGNMENT, DASHBOARD, HOME, PROFILE, SIGNIN } from "../../constants/routesEndpoints";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

// const Header = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.user);
//   const location = useLocation();

//   return (
//     <header>
//       <div className={styles.logoContainer} onClick={() => navigate(HOME)} >
//         <div className={styles.img}>
//           <img src={logo} alt="logo-barabari" />
//         </div>
//         <p>Rozgar</p>
//       </div>
//       <button onClick={() => { navigate(DASHBOARD) }}>Dashboard</button>

//       <div className={styles.btnContainer}>
//         <button className={styles.signUp} onClick={() => navigate(ASSIGNMENT)}>
//           {user ? ("Submission") : ("Donation")}
//         </button>
//         {user ? (
//           <div
//             className={styles.profileContainer}
//             onClick={() => navigate(PROFILE)}
//           >
//             <div>UN</div>
//           </div>
//         ) : (

//           <button className={styles.signIn} onClick={() => navigate(location.pathname == HOME ? SIGNIN : HOME)}>
//             {location.pathname == HOME && "Sign In"}
//             {location.pathname == SIGNIN && "Sign Up"}
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

// ------------------------------------------------------------------------------------------------
import logo from "../../assets/barabari_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ASSIGNMENT,
  DASHBOARD,
  HOME,
  PROFILE,
  SIGNIN,
} from "../../constants/routesEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Hamburger.css";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const initials = `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`.toUpperCase();
  const location = useLocation();
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

  return (
    <
      div className=" sticky top-0 z-50" // comment this line for non sticky header
    >
      <header
        id="2nd"
        className={`flex justify-between items-center shadow-md p-2.5 bg-gray-50 h-15`}
      >
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate(HOME)}
        >
          <div className="w-10 h-10">
            <img src={logo} alt="logo-barabari" className="w-full h-full" />
          </div>
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#324498] to-[#FFCB33]">
            Rozgar
          </p>
        </div>
        <button
          className="hidden border-2 border-gray-400 rounded-md py-1 px-3 text-gray-400 hover:bg-gray-400 hover:text-white"
          onClick={() => navigate(DASHBOARD)}
        >
          Dashboard
        </button>
        <div className="hidden md:flex items-center space-x-2">
          <button
            className={`border-2 rounded-md py-1 px-3 border-[rgb(50,68,152)] text-[rgb(50,68,152)] hover:bg-[rgb(50,68,152)] hover:text-white duration-500
          }`}
            onClick={() => navigate(ASSIGNMENT)}
          >
            {user ? "Submission" : "Donation"}
          </button>
          {user ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate(PROFILE)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(50,68,152)] text-white text-xl">
                {initials}
              </div>
            </div>
          ) : (
            <button
              className=" bg-[rgb(215,220,242)]  rounded-md py-1.5 px-3 text-[rgb(50,68,152)] hover:bg-[rgb(50,68,152)] hover:text-white duration-500"
              onClick={() =>
                navigate(location.pathname === HOME ? SIGNIN : HOME)
              }
            >
              {location.pathname === HOME ? "Sign In" : "Sign Up"}
            </button>
          )}
        </div>

        {/* hamburger */}
        <label className="hamburger flex md:hidden">
          <input
            checked={hamburgerOpen}
            onChange={() => {
              setHamburgerOpen(!hamburgerOpen);
              console.log(hamburgerOpen);
            }}
            type="checkbox"
          />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </header>
      <div id="hamburger" className="flex md:hidden duration-1000 relative ">
        {hamburgerOpen && (
          <div
            className={`flex flex-col items-center justify-center bg-[rgb(249,250,251)] text-[rgb(50,68,152)] h-fit py-8 w-screen  duration-1000 absolute top-15 z-50 shadow-xl`}
          >
            {/* hamburger inner content */}
            <div className="flex flex-col gap-5 items-center">
              <button
                className={`border-2 rounded-md py-1 px-3 border-[rgb(50,68,152)] text-[rgb(50,68,152)] hover:bg-[rgb(50,68,152)] hover:text-white duration-500
          }`}
                onClick={() => {
                  setHamburgerOpen(false);
                  navigate(ASSIGNMENT);
                }}
              >
                {user ? "Submission" : "Donation"}
              </button>
              <div className="w-[90%] mx-auto h-[1px] bg-[rgb(50,68,152)] text-[rgb(50,68,152)]" ></div>
              {user ? (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    setHamburgerOpen(false);
                    navigate(PROFILE);
                  }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(50,68,152)] text-white text-xl">
                    UN
                  </div>
                </div>
              ) : (
                <button
                  className=" bg-[rgb(215,220,242)]  rounded-md py-1.5 px-3 text-[rgb(50,68,152)] hover:bg-[rgb(50,68,152)] hover:text-white duration-500"
                  onClick={() => {
                    setHamburgerOpen(false);
                    navigate(location.pathname === HOME ? SIGNIN : HOME);
                  }}
                >
                  {location.pathname === HOME ? "Sign In" : "Sign Up"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
