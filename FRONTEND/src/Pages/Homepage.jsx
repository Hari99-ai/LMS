import React, { useEffect, useRef } from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import { Link } from "react-router-dom";
import homepageImage from "../assets/Images/homePageMainImage.png";
import { useDispatch } from "react-redux";
import { GetUserProfile } from "../Redux/Slices/AuthSlices.js";
import TopEducator from "../Pages/TopEducator.jsx";
import StudentsReviews from "../Pages/StudentsReviews.jsx";
import SocialMedia from "../Pages/SocialMedia.jsx";
import Carousel from "../Pages/ImageSlider.jsx";
import { Typed } from "react-typed";
import gif3 from "../assets/Images/gif3.gif";
import Header from "../components/Header.jsx";

function Homepage() {
  const dispatch = useDispatch();
  const typedElement = useRef(null);

  useEffect(() => {
    dispatch(GetUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!typedElement.current) return undefined;

    const typed = new Typed(typedElement.current, {
      strings: [
        "Affordable online courses.",
        "Industry expert lectures.",
        "24 x 7 doubt support.",
        "Free personal guidance.",
        "Quality mentorship.",
        "Mental health support.",
      ],
      typeSpeed: 45,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  return (
    <Homelayout>
      <section id="home" className="relative overflow-hidden px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 -z-10 opacity-25"
          style={{
            backgroundImage: `url(${gif3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/75 via-white/40 to-teal-100/40" />

        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
              Code-Scorer learning platform
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Keep learning, keep exploring.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Build job-ready skills through guided lessons, expert faculty, and a supportive community that keeps you moving forward.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-lg font-semibold text-teal-500">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Courses</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Mentorship</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Community</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to={"/courses"}>
                <button className="rounded-full bg-teal-500 px-6 py-3 font-bold text-white shadow-lg shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-600">
                  Explore Courses
                </button>
              </Link>
              <Link to={"/contact"}>
                <button className="rounded-full border border-teal-300 bg-white px-6 py-3 font-bold text-teal-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-50">
                  Contact Us
                </button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-black text-slate-900">24/7</p>
                <p className="text-sm text-slate-500">Doubt support</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-black text-slate-900">100+</p>
                <p className="text-sm text-slate-500">Learning modules</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-black text-slate-900">Expert</p>
                <p className="text-sm text-slate-500">Faculty guidance</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-teal-400/20 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.15)] backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950">
                <img
                  src={homepageImage}
                  alt="home page illustration"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.3em] text-teal-200">Next step</p>
                  <h2 className="mt-2 text-2xl font-bold">Start with a course that fits your goals.</h2>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-8 hidden rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg lg:block">
              <p className="text-sm font-semibold text-slate-500">Live learning</p>
              <p className="text-lg font-bold text-slate-900">Fresh lessons every week</p>
            </div>
          </div>
        </div>

        <Header />
      </section>

      <div className="space-y-10">
        <Carousel />
        <TopEducator />
        <StudentsReviews />
        <SocialMedia />
      </div>
    </Homelayout>
  );
}

export default Homepage;
