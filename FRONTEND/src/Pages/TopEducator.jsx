import React, { useEffect, useState } from "react";
import { FaGithub, FaSlackHash, FaTwitter } from "react-icons/fa";
import { FiEdit2, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import axiosInstance from "../Hellers/axiosinstance.js";
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

const imageMap = {
  manishsir,
  prafulasir,
  jigyasamaam,
  dheerajsir,
  deveshsir,
  khushboomaam,
  rohan: Rohan,
  brajraj,
  rohitsir,
  manjarimaam,
};

const defaultEducators = [
  {
    name: "Dr. Manish Dixit",
    title: "Head of Department",
    bio: "Leading our team to success with a strong focus on quality, mentorship, and academic excellence.",
    imageKey: "manishsir",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 1,
  },
  {
    name: "Dr. Praphula Kumar Jain",
    title: "Asst. Professor",
    bio: "Innovating our technology stack and helping students think like builders.",
    imageKey: "prafulasir",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 2,
  },
  {
    name: "Prof. Jigyasa Mishra",
    title: "Asst. Professor",
    bio: "Driving operational excellence and making learning feel structured and approachable.",
    imageKey: "jigyasamaam",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 3,
  },
  {
    name: "Dr. Dheeraj Kumar Dixit",
    title: "Asst. Professor",
    bio: "Leading with clarity, practical guidance, and a focus on real-world outcomes.",
    imageKey: "dheerajsir",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 4,
  },
  {
    name: "Dr. Devesh Kumar Lal",
    title: "Asst. Professor",
    bio: "Helping students build confidence through consistent support and strong fundamentals.",
    imageKey: "deveshsir",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 5,
  },
  {
    name: "Prof. Khushboo Agrawal",
    title: "Asst. Professor",
    bio: "Crafting a thoughtful learning journey with care and precision.",
    imageKey: "khushboomaam",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 6,
  },
  {
    name: "Mr. Rohan Malakar",
    title: "Full Stack Developer",
    bio: "Building experiences that are clean, fast, and student-first.",
    imageKey: "rohan",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 7,
  },
  {
    name: "Mr. Brajraj Mishra",
    title: "Full Stack Developer",
    bio: "Shaping product ideas into practical tools students can rely on.",
    imageKey: "brajraj",
    imageUrl: "",
    twitterUrl: "#",
    githubUrl: "#",
    slackUrl: "#",
    sortOrder: 8,
  },
];

const emptyEducator = {
  name: "",
  title: "",
  bio: "",
  imageKey: "",
  imageUrl: "",
  twitterUrl: "#",
  githubUrl: "#",
  slackUrl: "#",
};

const getStoredRole = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("role") || "";
};

const resolveEducatorImage = (educator) => {
  if (educator?.imageUrl) {
    return educator.imageUrl;
  }

  if (educator?.imageKey && imageMap[educator.imageKey]) {
    return imageMap[educator.imageKey];
  }

  return "";
};

const TopEducator = () => {
  const [educators, setEducators] = useState(defaultEducators);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = getStoredRole() === "ADMIN";

  useEffect(() => {
    let mounted = true;

    const loadEducators = async () => {
      try {
        const response = await axiosInstance.get("/data/top-educators");
        const list = Array.isArray(response?.data?.data) && response.data.data.length > 0
          ? response.data.data
          : defaultEducators;

        if (mounted) {
          setEducators(list);
        }
      } catch (error) {
        if (mounted) {
          setEducators(defaultEducators);
        }
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadEducators();

    return () => {
      mounted = false;
    };
  }, []);

  const openCreateForm = () => {
    setDraft({ ...emptyEducator });
  };

  const openEditForm = (educator) => {
    setDraft({ ...educator });
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
          imageUrl: String(reader.result || ""),
          imageKey: "",
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const saveEducator = async (event) => {
    event.preventDefault();

    const payload = {
      name: draft?.name?.trim(),
      title: draft?.title?.trim(),
      bio: draft?.bio?.trim(),
      imageKey: draft?.imageUrl ? "" : draft?.imageKey || "",
      imageUrl: draft?.imageUrl || "",
      twitterUrl: draft?.twitterUrl || "#",
      githubUrl: draft?.githubUrl || "#",
      slackUrl: draft?.slackUrl || "#",
      sortOrder: draft?.sortOrder ?? undefined,
    };

    if (!payload.name || !payload.title || !payload.bio) {
      toast.error("Name, title, and bio are required.");
      return;
    }

    try {
      if (draft?.id) {
        const request = axiosInstance.put(`/data/top-educators/${draft.id}`, payload);
        toast.promise(request, {
          loading: "Saving educator...",
          success: "Educator updated",
          error: (error) => error?.response?.data?.message || "Update failed",
        });
        const response = await request;

        const updated = response?.data?.data;
        setEducators((currentEducators) =>
          currentEducators.map((educator) => (educator.id === updated.id ? updated : educator)),
        );
      } else {
        const request = axiosInstance.post("/data/top-educators", payload);
        toast.promise(request, {
          loading: "Adding educator...",
          success: "Educator added",
          error: (error) => error?.response?.data?.message || "Create failed",
        });
        const response = await request;

        const created = response?.data?.data;
        setEducators((currentEducators) => [...currentEducators, created].sort((left, right) => {
          const diff = Number(left.sortOrder ?? 0) - Number(right.sortOrder ?? 0);
          if (diff !== 0) {
            return diff;
          }
          return String(left.createdAt || "").localeCompare(String(right.createdAt || ""));
        }));
      }

      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEducator = async (id) => {
    const shouldDelete = window.confirm("Delete this educator card?");
    if (!shouldDelete) {
      return;
    }

    try {
      const request = axiosInstance.delete(`/data/top-educators/${id}`);
      toast.promise(request, {
        loading: "Deleting educator...",
        success: "Educator deleted",
        error: (error) => error?.response?.data?.message || "Delete failed",
      });
      await request;
      setEducators((currentEducators) => currentEducators.filter((educator) => educator.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      imageUrl: "",
      imageKey: "",
    }));
  };

  return (
    <section id="top-educators" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl rounded-[2rem] border border-white/60 bg-slate-950 px-6 py-12 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">Faculty</p>
            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsEditing((current) => !current)}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 hover:text-slate-950"
              >
                {isEditing ? "Close editor" : "Edit spotlight"}
              </button>
            )}
          </div>
          <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Our Educators</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            A dedicated team of teachers and mentors committed to making learning personal, practical, and motivating.
          </p>
          {isAdmin && isEditing && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={openCreateForm}
                className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                <FiPlus />
                Add educator
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[320px] animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6"
                />
              ))
            : educators.map((educator) => (
                <div
                  key={educator.id || `${educator.name}-${educator.title}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
                >
                  {isAdmin && isEditing && (
                    <div className="absolute right-4 top-4 z-10 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(educator)}
                        className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white"
                        aria-label={`Edit ${educator.name}`}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEducator(educator.id)}
                        className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-rose-500 hover:text-white"
                        aria-label={`Delete ${educator.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}

                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-teal-300/40 bg-slate-900 shadow-lg">
                    {resolveEducatorImage(educator) ? (
                      <img
                        src={resolveEducatorImage(educator)}
                        alt={educator.alt || educator.name}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                        No image
                      </div>
                    )}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">{educator.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-teal-300">{educator.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{educator.bio}</p>
                  <div className="mt-5 flex justify-center gap-3">
                    <a
                      href={educator.twitterUrl || "#"}
                      className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={educator.githubUrl || "#"}
                      className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={educator.slackUrl || "#"}
                      className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white"
                    >
                      <FaSlackHash />
                    </a>
                  </div>
                  <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-teal-400/10 to-transparent transition-transform duration-700 group-hover:translate-y-0" />
                </div>
          ))}
        </div>
      </div>

      {draft && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <form
            onSubmit={saveEducator}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
                  {draft.id ? "Edit educator" : "Add educator"}
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
                  Name
                  <input
                    type="text"
                    name="name"
                    value={draft.name}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Title
                  <input
                    type="text"
                    name="title"
                    value={draft.title}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Bio
                <textarea
                  name="bio"
                  value={draft.bio}
                  onChange={handleFieldChange}
                  rows={4}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-[1fr_1fr]">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Image URL
                  <input
                    type="text"
                    name="imageUrl"
                    value={draft.imageUrl}
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
                  value={draft.alt || ""}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  placeholder="A short description for accessibility"
                />
              </label>

              {resolveEducatorImage(draft) && (
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={resolveEducatorImage(draft)}
                      alt={draft.alt || draft.name || "Preview"}
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                    />
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
    </section>
  );
};

export default TopEducator;
