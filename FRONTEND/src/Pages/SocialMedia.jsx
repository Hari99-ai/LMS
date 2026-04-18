import React, { useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { FiEdit2, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { SiInstagram, SiMessenger, SiTwitter } from "react-icons/si";
import toast from "react-hot-toast";
import gif7 from "../assets/Images/gif7.gif";

const defaultApps = [
  {
    id: 1,
    icon: "facebook",
    name: "Facebook",
    description: "Connect with friends and share updates with your network.",
    link: "#",
  },
  {
    id: 2,
    icon: "messenger",
    name: "Messenger",
    description: "Chat instantly and stay connected with your contacts.",
    link: "#",
  },
  {
    id: 3,
    icon: "twitter",
    name: "Twitter",
    description: "Stay informed with quick updates and live discussions.",
    link: "#",
  },
  {
    id: 4,
    icon: "instagram",
    name: "Instagram",
    description: "Capture and share moments with friends and followers.",
    link: "#",
  },
];

const defaultBanner = {
  title: "Code-Scorer",
  description: "Build, learn, and connect with a platform designed to keep students moving forward.",
  imageUrl: gif7,
  alt: "Code-Scorer Animation",
};

const emptyApp = {
  icon: "facebook",
  name: "",
  description: "",
  link: "#",
};

const iconMap = {
  facebook: <AiFillFacebook className="text-blue-500" size="32" />,
  messenger: <SiMessenger className="text-blue-400" size="32" />,
  twitter: <SiTwitter className="text-sky-400" size="32" />,
  instagram: <SiInstagram className="text-pink-500" size="32" />,
};

const getStoredRole = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("role") || "";
};

const readJson = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      return fallback;
    }

    const parsed = JSON.parse(stored);
    return parsed || fallback;
  } catch {
    return fallback;
  }
};

const SocialMedia = () => {
  const [appsData, setAppsData] = useState(() => readJson("social-media-apps", defaultApps));
  const [banner, setBanner] = useState(() => readJson("social-media-banner", defaultBanner));
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [bannerDraft, setBannerDraft] = useState(null);
  const isAdmin = getStoredRole() === "ADMIN";

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("social-media-apps", JSON.stringify(appsData));
    }
  }, [appsData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("social-media-banner", JSON.stringify(banner));
    }
  }, [banner]);

  const openCreateForm = () => {
    setDraft({ ...emptyApp, id: Date.now() });
  };

  const openEditForm = (app) => {
    setDraft({ ...app });
  };

  const openBannerForm = () => {
    setBannerDraft({ ...banner });
  };

  const closeForm = () => {
    setDraft(null);
    setBannerDraft(null);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }));
  };

  const handleBannerFieldChange = (event) => {
    const { name, value } = event.target;
    setBannerDraft((currentDraft) => ({
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
      setBannerDraft((currentDraft) => {
        if (!currentDraft) {
          return currentDraft;
        }

        return {
          ...currentDraft,
          imageUrl: String(reader.result || ""),
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const saveApp = (event) => {
    event.preventDefault();

    if (!draft?.name?.trim() || !draft?.description?.trim()) {
      toast.error("Name and description are required.");
      return;
    }

    const nextApp = {
      ...draft,
      name: draft.name.trim(),
      description: draft.description.trim(),
      link: draft.link || "#",
    };

    setAppsData((currentApps) => {
      const exists = currentApps.some((app) => app.id === nextApp.id);
      if (exists) {
        return currentApps.map((app) => (app.id === nextApp.id ? nextApp : app));
      }

      return [...currentApps, nextApp];
    });

    closeForm();
  };

  const saveBanner = (event) => {
    event.preventDefault();
    if (!bannerDraft?.title?.trim() || !bannerDraft?.description?.trim()) {
      toast.error("Banner title and description are required.");
      return;
    }

    setBanner({
      ...bannerDraft,
      title: bannerDraft.title.trim(),
      description: bannerDraft.description.trim(),
      imageUrl: bannerDraft.imageUrl || gif7,
      alt: bannerDraft.alt || "Code-Scorer Animation",
    });

    closeForm();
  };

  const removeApp = (id) => {
    const shouldDelete = window.confirm("Delete this connect card?");
    if (!shouldDelete) {
      return;
    }

    setAppsData((currentApps) => currentApps.filter((app) => app.id !== id));
  };

  const removeBannerImage = () => {
    setBannerDraft((currentDraft) => ({
      ...currentDraft,
      imageUrl: "",
      alt: "",
    }));
  };

  return (
    <section id="connect" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-12 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">Connect</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Let&apos;s connect</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Follow, message, and stay updated wherever you prefer to learn and share.
          </p>

          {isAdmin && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing((current) => !current)}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {isEditing ? "Close editor" : "Edit content"}
              </button>
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                  >
                    <FiPlus />
                    Add card
                  </button>
                  <button
                    type="button"
                    onClick={openBannerForm}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <FiEdit2 />
                    Edit banner
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {appsData.map((app) => (
            <article
              key={app.id}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
            >
              {isAdmin && isEditing && (
                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(app)}
                    className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-teal-500 hover:text-white"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeApp(app.id)}
                    className="rounded-full bg-white/10 p-2 text-teal-200 transition hover:bg-rose-500 hover:text-white"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                {iconMap[app.icon] || iconMap.facebook}
              </div>
              <h3 className="mt-5 text-xl font-bold">{app.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{app.description}</p>
              <a
                href={app.link || "#"}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                <FaLink />
                Connect
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">{banner.title}</p>
            <p className="mt-2 max-w-2xl text-lg leading-8 text-slate-300">{banner.description}</p>
          </div>

          {banner.imageUrl ? (
            <img src={banner.imageUrl} alt={banner.alt || banner.title} className="h-24 w-24 sm:h-28 sm:w-28" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 text-center text-xs text-slate-300 sm:h-28 sm:w-28">
              No image
            </div>
          )}
        </div>
      </div>

      {draft && isAdmin && isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <form
            onSubmit={saveApp}
            className="w-full max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
                  {draft.id ? "Edit connect card" : "Add connect card"}
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
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Icon
                <select
                  name="icon"
                  value={draft.icon}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                >
                  <option value="facebook">Facebook</option>
                  <option value="messenger">Messenger</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                </select>
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

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Description
                <textarea
                  name="description"
                  value={draft.description}
                  onChange={handleFieldChange}
                  rows={4}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Link
                <input
                  type="text"
                  name="link"
                  value={draft.link}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>
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

      {bannerDraft && isAdmin && isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <form
            onSubmit={saveBanner}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">Edit banner</p>
                <h3 className="text-2xl font-black text-slate-900">Connect section banner</h3>
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
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Title
                <input
                  type="text"
                  name="title"
                  value={bannerDraft.title}
                  onChange={handleBannerFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Description
                <textarea
                  name="description"
                  value={bannerDraft.description}
                  onChange={handleBannerFieldChange}
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
                    value={bannerDraft.imageUrl}
                    onChange={handleBannerFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
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
                  value={bannerDraft.alt || ""}
                  onChange={handleBannerFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              {bannerDraft.imageUrl && (
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    <img src={bannerDraft.imageUrl} alt={bannerDraft.alt || bannerDraft.title} className="h-16 w-16 rounded-xl object-cover ring-4 ring-white" />
                    <div>
                      <p className="font-semibold text-slate-900">Image preview</p>
                      <p className="text-sm text-slate-500">This is what will be saved for the banner.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeBannerImage}
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

export default SocialMedia;
