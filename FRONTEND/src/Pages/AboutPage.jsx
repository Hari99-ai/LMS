import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import Homelayout from "../Layouts/Homelayout.jsx";
import AboutImage from "../assets/Images/aboutMainImage.png";
import Slides from "../components/carouselSlides.jsx";
import { arr } from "../constants/AboutpageContants.jsx";
import gif3 from "../assets/Images/gif3.gif";
import rohan from "../assets/Images/rohan.jpg";
import braj from "../assets/Images/brajraj.png";

const defaultFounders = [
  {
    id: 1,
    sectionTitle: "About the Founder",
    name: "Rohan Malakar",
    role: "Founder, Code-Scorer",
    email: "rohanmalakar5091@gmal.com",
    mobile: "+91 9098905595",
    office: "MITS Gwalior, MP 474005",
    image: rohan,
    alt: "Rohan Malakar portrait",
  },
  {
    id: 2,
    sectionTitle: "About the Founder",
    name: "Brajraj Mishra",
    role: "Founder, Code-Scorer",
    email: "mishrabckt2020@gmail.com",
    mobile: "+91 8418989493",
    office: "MITS Gwalior, MP 474005",
    image: braj,
    alt: "Brajraj Mishra portrait",
  },
];

const emptyFounder = {
  sectionTitle: "About the Founder",
  name: "",
  role: "",
  email: "",
  mobile: "",
  office: "",
  image: "",
  alt: "",
};

const storageKey = "about-page-founders";

function readStoredFounders() {
  if (typeof window === "undefined") {
    return defaultFounders;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return defaultFounders;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultFounders;
  } catch {
    return defaultFounders;
  }
}

function AboutPage() {
  const [founders, setFounders] = useState(readStoredFounders);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(founders));
    }
  }, [founders]);

  const openCreateForm = () => {
    setDraft({
      ...emptyFounder,
      id: Date.now(),
    });
  };

  const openEditForm = (founder) => {
    setDraft({ ...founder });
  };

  const closeForm = () => {
    setDraft(null);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDraft((currentDraft) => {
        if (!currentDraft) {
          return currentDraft;
        }

        return {
          ...currentDraft,
          image: String(reader.result || ""),
          alt: currentDraft.name ? `${currentDraft.name} portrait` : "Founder portrait",
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const saveFounder = (event) => {
    event.preventDefault();

    setFounders((currentFounders) => {
      const exists = currentFounders.some((founder) => founder.id === draft.id);
      if (exists) {
        return currentFounders.map((founder) => (founder.id === draft.id ? draft : founder));
      }

      return [...currentFounders, draft];
    });

    closeForm();
  };

  const deleteFounder = (id) => {
    const shouldDelete = window.confirm("Delete this founder card?");
    if (!shouldDelete) {
      return;
    }

    setFounders((currentFounders) => currentFounders.filter((founder) => founder.id !== id));
  };

  const removeImage = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      image: "",
      alt: "",
    }));
  };

  return (
    <Homelayout>
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{ backgroundImage: `url(${gif3})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-500">About us</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Affordable and quality education that meets expectations.
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Our mission is to make quality education accessible and affordable for everyone. We connect
                aspiring teachers and eager students so they can share skills, creativity, and knowledge in a
                supportive environment.
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

          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.1)] backdrop-blur-lg">
            <div className="flex flex-col gap-3 px-2 py-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">Editable content</p>
                <h2 className="text-2xl font-black text-slate-900">Founder cards</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add, edit, delete, or replace the photo and text for each founder card.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing((current) => !current)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-600"
                >
                  {isEditing ? "Close editor" : "Edit content"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                  >
                    <FiPlus />
                    Add founder
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-6 p-2 lg:grid-cols-2">
              {founders.map((founder) => (
                <section
                  key={founder.id}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className="flex items-center justify-between gap-3 bg-slate-950 px-6 py-4 text-white">
                    <h3 className="text-xl font-bold">{founder.sectionTitle}</h3>
                    {isEditing && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(founder)}
                          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-500"
                        >
                          <FiEdit2 />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFounder(founder.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr] md:items-center">
                    <div className="flex justify-center">
                      {founder.image ? (
                        <img
                          src={founder.image}
                          alt={founder.alt || founder.name}
                          className="h-40 w-40 rounded-full object-cover ring-8 ring-teal-100"
                        />
                      ) : (
                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-100 text-center text-sm font-semibold text-slate-500 ring-8 ring-teal-100">
                          No image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{founder.name}</h3>
                      <p className="mt-1 text-teal-500">{founder.role}</p>
                      <ul className="mt-4 space-y-2 text-slate-600">
                        <li>
                          <strong className="text-slate-900">Email:</strong> {founder.email}
                        </li>
                        <li>
                          <strong className="text-slate-900">Mobile:</strong> {founder.mobile}
                        </li>
                        <li>
                          <strong className="text-slate-900">Office:</strong> {founder.office}
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              ))}
            </div>
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

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <form
            onSubmit={saveFounder}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
                  {draft.id && founders.some((founder) => founder.id === draft.id) ? "Edit founder" : "Add founder"}
                </p>
                <h3 className="text-2xl font-black text-slate-900">Photo and text editor</h3>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              >
                <FiX />
              </button>
            </div>

            <div className="grid gap-5 px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Section title
                  <input
                    type="text"
                    name="sectionTitle"
                    value={draft.sectionTitle}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={draft.name}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Role / subtitle
                <input
                  type="text"
                  name="role"
                  value={draft.role}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-3">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={draft.email}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Mobile
                  <input
                    type="text"
                    name="mobile"
                    value={draft.mobile}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Office
                  <input
                    type="text"
                    name="office"
                    value={draft.office}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-[1fr_1fr]">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Image URL
                  <input
                    type="text"
                    name="image"
                    value={draft.image}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                    placeholder="Paste a link or leave blank after upload"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Upload image
                  <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-3">
                    <FiUpload className="text-teal-500" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" />
                  </div>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Image alt text
                <input
                  type="text"
                  name="alt"
                  value={draft.alt}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  placeholder="A short description for accessibility"
                />
              </label>

              {draft.image && (
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    {draft.image ? (
                      <img
                        src={draft.image}
                        alt={draft.alt || draft.name || "Preview"}
                        className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 ring-4 ring-white">
                        Empty
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-900">Image preview</p>
                      <p className="text-sm text-slate-500">This is what will be saved for the card.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </Homelayout>
  );
}

export default AboutPage;
