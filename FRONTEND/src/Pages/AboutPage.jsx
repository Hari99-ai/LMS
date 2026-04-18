import React from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import AboutImage from "../assets/Images/aboutMainImage.png";
import Slides from "../components/carouselSlides.jsx";
import { arr } from "../constants/AboutpageContants.jsx";
import gif3 from "../assets/Images/gif3.gif";
import rohan from "../assets/Images/rohan.jpg";
import braj from "../assets/Images/brajraj.png";

function AboutPage() {
  return (
    <Homelayout>
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: `url(${gif3})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-500">About us</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Affordable and quality education that meets expectations.
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Our mission is to make quality education accessible and affordable for everyone. We connect aspiring teachers and eager students so they can share skills, creativity, and knowledge in a supportive environment.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-2xl font-black text-slate-900">Learn</p>
                  <p className="text-sm text-slate-500">At your own pace</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-2xl font-black text-slate-900">Grow</p>
                  <p className="text-sm text-slate-500">With guided support</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-2xl font-black text-slate-900">Lead</p>
                  <p className="text-sm text-slate-500">Through practice</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-slate-950 to-teal-950 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <img src={AboutImage} alt="about page illustration" className="w-full rounded-[1.5rem] object-cover" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
              <div className="bg-slate-950 px-6 py-4 text-white">
                <h2 className="text-2xl font-bold">About the Founder</h2>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr] md:items-center">
                <div className="flex justify-center">
                  <img src={rohan} alt="Founder" className="h-40 w-40 rounded-full object-cover ring-8 ring-teal-100" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Rohan Malakar</h3>
                  <p className="mt-1 text-teal-500">Founder, Code-Scorer</p>
                  <ul className="mt-4 space-y-2 text-slate-600">
                    <li><strong className="text-slate-900">Email:</strong> rohanmalakar5091@gmal.com</li>
                    <li><strong className="text-slate-900">Mobile:</strong> +91 9098905595</li>
                    <li><strong className="text-slate-900">Office:</strong> MITS Gwalior, MP 474005</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
              <div className="bg-slate-950 px-6 py-4 text-white">
                <h2 className="text-2xl font-bold">About the Founder</h2>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr] md:items-center">
                <div className="flex justify-center">
                  <img src={braj} alt="Founder" className="h-40 w-40 rounded-full object-cover ring-8 ring-teal-100" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Brajraj Mishra</h3>
                  <p className="mt-1 text-teal-500">Founder, Code-Scorer</p>
                  <ul className="mt-4 space-y-2 text-slate-600">
                    <li><strong className="text-slate-900">Email:</strong> mishrabckt2020@gmail.com</li>
                    <li><strong className="text-slate-900">Mobile:</strong> +91 8418989493</li>
                    <li><strong className="text-slate-900">Office:</strong> MITS Gwalior, MP 474005</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.1)] backdrop-blur-lg">
            <div className="carousel w-full">
              {arr &&
                arr.map((obj, index) => {
                  return (
                    <Slides
                      {...obj}
                      slidenumber={index + 1}
                      key={index}
                      totalslides={arr.length}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </Homelayout>
  );
}

export default AboutPage;
