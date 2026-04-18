import { useState } from "react";
import Homelayout from "../Layouts/Homelayout.jsx";
import toast from "react-hot-toast";
import axiosInstance from "../Hellers/axiosinstance.js";
import technoDoodle from "../assets/Images/techno-doodle.jpg";

function Contact() {
  const [inputText, setInputText] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handelformdata = function (e) {
    const { name, value } = e.target;
    setInputText({
      ...inputText,
      [name]: value,
    });
  };

  async function onsubmitform(e) {
    e.preventDefault();

    if (!inputText.email || !inputText.name || !inputText.message) {
      toast.error("Every field is required");
      return;
    }

    if (
      !inputText.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = axiosInstance.post("data/contact", inputText);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Your message sent successfully",
        error: "Failed to submit your form",
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setInputText({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Homelayout>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-500">Contact</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Get in touch with us
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Whether you need academic assistance, course guidance, or just want to share feedback, we&apos;re here to help.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">Expert Tutors</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Experienced instructors across mathematics, science, language learning, and test preparation.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">Flexible Scheduling</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Learn at your own pace from anywhere, with online classes tailored to your schedule.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">Personalized Learning</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Our courses are designed to adapt to your unique needs and learning style.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
            <div
              className="relative"
              style={{
                backgroundImage: `url(${technoDoodle})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-slate-950/70" />
              <form
                noValidate
                onSubmit={onsubmitform}
                className="relative flex min-h-[560px] flex-col gap-5 p-8 sm:p-10"
              >
                <h2 className="text-3xl font-black text-white">Send us a message</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-200">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Enter your name"
                      name="name"
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
                      onChange={handelformdata}
                      value={inputText.name}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-200">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="Enter your email"
                      name="email"
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
                      onChange={handelformdata}
                      value={inputText.email}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    placeholder="Tell us what you need..."
                    name="message"
                    className="min-h-[180px] w-full flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30"
                    onChange={handelformdata}
                    value={inputText.message}
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-teal-400 px-6 py-3 text-lg font-bold text-slate-950 transition hover:bg-teal-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Homelayout>
  );
}

export default Contact;
