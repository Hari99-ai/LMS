import React from "react";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Footer from "../components/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutmethod } from "../Redux/Slices/AuthSlices.js";
import gif7 from "../assets/Images/gif7.gif"




function Homelayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  async function handlelogout(e) {
    e.preventDefault();
    const res = await dispatch(logoutmethod());
    
    if (res?.payload?.success) {
      navigate("/");
     }
  }

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-4 lg:px-6">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 rounded-full border border-white/60 bg-slate-950/90 px-4 shadow-[0_18px_50px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-3 shrink-0">
            <Link to={"/"} className="text-xl font-extrabold transition hover:text-teal-400 sm:text-2xl">
              Code-Scorer
            </Link>
            <img
              src={gif7}
              alt="Code-Scorer Animation"
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>

          <ul className="flex min-w-0 flex-1 items-center justify-center gap-4 overflow-hidden whitespace-nowrap text-sm text-slate-200 sm:gap-5 lg:gap-8 lg:text-base">
            <li>
              <Link to={"/"}>
                <span className="font-bold hover:text-teal-300">Home</span>
              </Link>
            </li>
            <li>
              <Link to={"/about"}>
                <span className="font-bold hover:text-teal-300">About</span>
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to={"/chat/community"}>
                  <span className="font-bold hover:text-teal-300">Community Chat</span>
                </Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>
                  <span className="font-bold hover:text-teal-300">Admin Dashboard</span>
                </Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/course/create"}>
                  <span className="font-bold hover:text-teal-300">Create course</span>
                </Link>
              </li>
            )}
            {role !== "ADMIN" && (
              <li>
                <Link to={"/contact"}>
                  <span className="font-bold hover:text-teal-300">Contact</span>
                </Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/contact/showData"}>
                  <span className="font-bold hover:text-teal-300">Contact data</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <>
                <Link to={"/user/profile"}>
                  <span className="btn btn-sm border-transparent bg-teal-300 text-black hover:bg-teal-200 sm:btn-md">
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handlelogout}
                  className="btn btn-sm border-transparent bg-teal-300 text-black hover:bg-teal-200 sm:btn-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <span className="btn btn-sm border-transparent bg-teal-300 text-black hover:bg-teal-200 sm:btn-md">
                    Login
                  </span>
                </Link>
                <Link to={"/signup"}>
                  <span className="btn btn-sm border-transparent bg-teal-300 text-black hover:bg-teal-200 sm:btn-md">
                    Signup
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Homelayout;
