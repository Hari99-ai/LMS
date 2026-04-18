import React from "react";
import { FaTwitter, FaGithub, FaSlackHash } from "react-icons/fa";
import deveshsir from "../assets/Images/deveshsir.png";
import rohitsir from "../assets/Images/rohitsir.jpg";
import manishsir from "../assets/Images/manishsir.png";
import dheerajsir from "../assets/Images/dheerajsir.jpg";
import khushboomaam from "../assets/Images/khushboomaam.jpg";
import manjarimaam from "../assets/Images/manjarimaam.jpg";
import Rohan from "../assets/Images/rohan.jpg";
import prafulasir from "../assets/Images/prafulasir.png";
import jigyasamaam from "../assets/Images/jigyasamaam.png";
import brajraj from "../assets/Images/brajraj.png";

const leadershipData = [
  {
    id: 1,
    name: "Dr. Manish Dixit",
    title: "Head of Department",
    bio: "Leading our team to success with a strong focus on quality, mentorship, and academic excellence.",
    imageUrl: manishsir,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 2,
    name: "Dr. Praphula Kumar Jain",
    title: "Asst. Professor",
    bio: "Innovating our technology stack and helping students think like builders.",
    imageUrl: prafulasir,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 3,
    name: "Prof. Jigyasa Mishra",
    title: "Asst. Professor",
    bio: "Driving operational excellence and making learning feel structured and approachable.",
    imageUrl: jigyasamaam,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 4,
    name: "Dr. Dheeraj Kumar Dixit",
    title: "Asst. Professor",
    bio: "Leading with clarity, practical guidance, and a focus on real-world outcomes.",
    imageUrl: dheerajsir,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 5,
    name: "Dr. Devesh Kumar Lal",
    title: "Asst. Professor",
    bio: "Helping students build confidence through consistent support and strong fundamentals.",
    imageUrl: deveshsir,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 6,
    name: "Prof. Khushboo Agrawal",
    title: "Asst. Professor",
    bio: "Crafting a thoughtful learning journey with care and precision.",
    imageUrl: khushboomaam,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 7,
    name: "Mr. Rohan Malakar",
    title: "Full Stack Developer",
    bio: "Building experiences that are clean, fast, and student-first.",
    imageUrl: Rohan,
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
  },
  {
    id: 8,
    name: "Mr. Brajraj Mishra",
    title: "Full Stack Developer",
    bio: "Shaping product ideas into practical tools students can rely on.",
    imageUrl: brajraj,
    githubUrl: "#",
    slackUrl: "#",
  },
];

const TopEducator = () => (
  <section id="top-educators" className="px-4 py-14 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/60 bg-slate-950 px-6 py-12 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">Faculty</p>
        <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Our Educators</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          A dedicated team of teachers and mentors committed to making learning personal, practical, and motivating.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {leadershipData.map(({ id, name, title, bio, imageUrl, twitterUrl, githubUrl, slackUrl }) => (
          <div
            key={id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-teal-300/40 bg-slate-900 shadow-lg">
              <img src={imageUrl} alt={name} className="h-20 w-20 rounded-full object-cover" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-white">{name}</h3>
            <p className="mt-1 text-sm font-semibold text-teal-300">{title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{bio}</p>
            <div className="mt-5 flex justify-center gap-3">
              <a href={twitterUrl} className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white">
                <FaTwitter />
              </a>
              <a href={githubUrl} className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white">
                <FaGithub />
              </a>
              <a href={slackUrl} className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white">
                <FaSlackHash />
              </a>
            </div>
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-teal-400/10 to-transparent transition-transform duration-700 group-hover:translate-y-0" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TopEducator;
