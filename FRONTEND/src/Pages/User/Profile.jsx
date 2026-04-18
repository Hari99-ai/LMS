import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../Redux/Slices/AuthSlices.js";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { Link } from "react-router-dom";
import { cancelSubscribe } from "../../Redux/Slices/RazorpaySlice.js";
import { BsPersonCircle } from "react-icons/bs";
import { FiMail, FiUser, FiCreditCard } from "react-icons/fi";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  async function DownloadData() {
    await dispatch(GetUserProfile());
  }
  const cancelSubscribemethod= async function () {
    await dispatch(cancelSubscribe())
    DownloadData()
  }
  useEffect(() => {
    DownloadData();
  }, []);

  return (
    <Homelayout>
      <div className="min-h-[calc(100vh-3rem)] px-4 py-16 sm:py-20 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef7f6_100%)]">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-teal-200/70 bg-white shadow-[0_20px_60px_rgba(13,148,136,0.18)]">
            <div className="grid lg:grid-cols-[340px_1fr]">
              <div className="flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-teal-400 via-teal-300 to-cyan-300 px-8 py-12 text-slate-900">
                <div className="rounded-full border-4 border-white/80 bg-white/50 p-3 shadow-lg">
                  {userData?.avatar?.secure_url ? (
                    <img
                      className="h-40 w-40 rounded-full object-cover"
                      src={userData.avatar.secure_url}
                      alt="avatar"
                    />
                  ) : (
                    <BsPersonCircle className="h-40 w-40 text-white" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700/80">
                    Profile
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold capitalize">
                    {userData?.fullName}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {userData?.role || "USER"}
                  </p>
                </div>
                <Link to={"/user/editprofile"} className="w-full">
                  <button className="w-full rounded-full bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">
                    Edit Profile
                  </button>
                </Link>
              </div>

              <div className="px-6 py-10 sm:px-10 lg:px-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">Account Details</h2>
                  <p className="mt-2 text-slate-500">
                    Manage your personal info and subscription status from one place.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-3 text-slate-500">
                      <FiUser className="text-teal-500" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        Full Name
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-slate-900 capitalize">
                      {userData?.fullName || "Not set"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-3 text-slate-500">
                      <FiMail className="text-teal-500" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        Email
                      </span>
                    </div>
                    <p className="mt-3 break-words text-lg font-semibold text-slate-900">
                      {userData?.email || "Not set"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-3 text-slate-500">
                      <FiCreditCard className="text-teal-500" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        Role
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      {userData?.role || "USER"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-3 text-slate-500">
                      <FiCreditCard className="text-teal-500" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        Subscription
                      </span>
                    </div>
                    <p
                      className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                        userData?.subscription?.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {userData?.subscription?.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {userData?.subscription?.status === "active" && (
                    <button
                      onClick={cancelSubscribemethod}
                      className="rounded-full border border-rose-200 bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-600"
                    >
                      Cancel Subscription
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Homelayout>
  );
}

export default Profile;
