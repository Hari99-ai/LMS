import React from "react";
import gif7 from "../assets/Images/gif7.gif";

function Header() {
  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/60 bg-white/75 px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <a href="#home" className="text-2xl font-black tracking-tight text-slate-900 transition hover:text-teal-500">
              Code-Scorer
            </a>
            <img
              src={gif7}
              alt="Code-Scorer Animation"
              className="h-12 w-12"
            />
          </div>

          <nav className="flex flex-wrap gap-2 text-sm font-semibold text-slate-700">
            <a href="#home" className="rounded-full px-4 py-2 transition hover:bg-teal-500 hover:text-white">
              Home
            </a>
            <a href="#image-slider" className="rounded-full px-4 py-2 transition hover:bg-teal-500 hover:text-white">
              Image Slider
            </a>
            <a href="#top-educators" className="rounded-full px-4 py-2 transition hover:bg-teal-500 hover:text-white">
              Top Educators
            </a>
            <a href="#student-reviews" className="rounded-full px-4 py-2 transition hover:bg-teal-500 hover:text-white">
              Student Reviews
            </a>
            <a href="#connect" className="rounded-full px-4 py-2 transition hover:bg-teal-500 hover:text-white">
              Let&apos;s Connect
            </a>
            <a href="#footer" className="rounded-full px-4 py-2 transition hover:bg-teal-500 hover:text-white">
              Footer
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Header;
