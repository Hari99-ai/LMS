import React from "react";
import { SiMessenger, SiGoogleads, SiTwitter, SiInstagram } from "react-icons/si";
import { ImLinkedin } from "react-icons/im";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="mt-10 border-t border-white/40 bg-slate-950 text-white">
      <div className="bg-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-slate-300">
            Get connected with us on social networks
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500">
              <SiMessenger size={20} />
            </a>
            <a href="#" className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500">
              <SiTwitter size={20} />
            </a>
            <a href="#" className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500">
              <SiGoogleads size={20} />
            </a>
            <a href="#" className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500">
              <SiInstagram size={20} />
            </a>
            <a href="#" className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500">
              <ImLinkedin size={20} />
            </a>
            <a href="#" className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500">
              <FaGithubSquare size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h6 className="text-lg font-bold text-teal-300">Code-Scorer</h6>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Ultimately, our goal is to uplift individuals and communities by emphasizing the transformative power of education.
          </p>
        </div>

        <div>
          <h6 className="text-lg font-bold text-teal-300">Products</h6>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Frontend Development Course</li>
            <li>Backend Development Course</li>
            <li>FullStack Development Course</li>
            <li>DSA Course with C++</li>
          </ul>
        </div>

        <div>
          <h6 className="text-lg font-bold text-teal-300">Useful Links</h6>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Your Account</li>
            <li>Become an Affiliate</li>
            <li>Shipping Rates</li>
            <li>Help</li>
          </ul>
        </div>

        <div>
          <h6 className="text-lg font-bold text-teal-300">Contact</h6>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
            <li>Gwalior, Gole ka Mandir, 474005, (M.P.), India</li>
            <li>CodeScorer@gmail.com</li>
            <li>Brajraz Mishra - +91-8418989493</li>
            <li>Rohan Malakar - +91-9098905595</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-400">
        © 2020 Copyright: <span className="text-teal-300">CodeScorer.com</span>
      </div>
    </footer>
  );
};

export default Footer;
