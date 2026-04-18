import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { SiMessenger, SiGoogleads, SiTwitter, SiInstagram, SiTiktok, SiSpotify } from "react-icons/si";
import { FaLink } from "react-icons/fa";
import gif7 from "../assets/Images/gif7.gif";

const appsData = [
  {
    id: 1,
    icon: <AiFillFacebook className="text-blue-500" size="32" />,
    name: "Facebook",
    description: "Connect with friends and share updates with your network.",
  },
  {
    id: 2,
    icon: <SiMessenger className="text-blue-400" size="32" />,
    name: "Messenger",
    description: "Chat instantly and stay connected with your contacts.",
  },
  {
    id: 3,
    icon: <SiTwitter className="text-sky-400" size="32" />,
    name: "Twitter",
    description: "Stay informed with quick updates and live discussions.",
  },
  {
    id: 4,
    icon: <SiInstagram className="text-pink-500" size="32" />,
    name: "Instagram",
    description: "Capture and share moments with friends and followers.",
  },
];

function SocialMedia() {
  return (
    <section id="connect" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-12 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">Connect</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Let's connect</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Follow, message, and stay updated wherever you prefer to learn and share.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {appsData.map((app) => (
            <article key={app.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                {app.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold">{app.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{app.description}</p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-teal-300">
                <FaLink />
                Connect
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Code-Scorer</p>
            <p className="mt-2 max-w-2xl text-lg leading-8 text-slate-300">
              Build, learn, and connect with a platform designed to keep students moving forward.
            </p>
          </div>
          <img src={gif7} alt="Code-Scorer Animation" className="h-24 w-24 sm:h-28 sm:w-28" />
        </div>
      </div>
    </section>
  );
}

export default SocialMedia;
