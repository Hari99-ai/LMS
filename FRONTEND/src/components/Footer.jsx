import React, { useEffect, useState } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { ImLinkedin } from "react-icons/im";
import { SiGoogleads, SiInstagram, SiMessenger, SiTwitter } from "react-icons/si";
import toast from "react-hot-toast";

const defaultFooter = {
  topText: "Get connected with us on social networks",
  socialLinks: [
    { id: 1, icon: "messenger", href: "#", label: "Messenger" },
    { id: 2, icon: "twitter", href: "#", label: "Twitter" },
    { id: 3, icon: "ads", href: "#", label: "Google Ads" },
    { id: 4, icon: "instagram", href: "#", label: "Instagram" },
    { id: 5, icon: "linkedin", href: "#", label: "LinkedIn" },
    { id: 6, icon: "github", href: "#", label: "GitHub" },
  ],
  brandTitle: "Code-Scorer",
  brandText:
    "Ultimately, our goal is to uplift individuals and communities by emphasizing the transformative power of education.",
  products: [
    "Frontend Development Course",
    "Backend Development Course",
    "FullStack Development Course",
    "DSA Course with C++",
  ],
  usefulLinks: ["Your Account", "Become an Affiliate", "Shipping Rates", "Help"],
  contactLines: [
    "Gwalior, Gole ka Mandir, 474005, (M.P.), India",
    "CodeScorer@gmail.com",
    "Brajraz Mishra - +91-8418989493",
    "Rohan Malakar - +91-9098905595",
  ],
  copyrightText: "© 2020 Copyright: CodeScorer.com",
};

const emptySocialLink = {
  icon: "twitter",
  href: "#",
  label: "",
};

const iconMap = {
  messenger: <SiMessenger size={20} />,
  twitter: <SiTwitter size={20} />,
  ads: <SiGoogleads size={20} />,
  instagram: <SiInstagram size={20} />,
  linkedin: <ImLinkedin size={20} />,
  github: <FaGithubSquare size={20} />,
};

const getStoredRole = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("role") || "";
};

const readFooter = () => {
  if (typeof window === "undefined") {
    return defaultFooter;
  }

  try {
    const stored = window.localStorage.getItem("footer-content");
    if (!stored) {
      return defaultFooter;
    }

    const parsed = JSON.parse(stored);
    return parsed || defaultFooter;
  } catch {
    return defaultFooter;
  }
};

const Footer = () => {
  const [footer, setFooter] = useState(readFooter);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const isAdmin = getStoredRole() === "ADMIN";

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("footer-content", JSON.stringify(footer));
    }
  }, [footer]);

  const openEditForm = () => {
    setDraft(JSON.parse(JSON.stringify(footer)));
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

  const handleArrayChange = (field, index, value) => {
    setDraft((currentDraft) => {
      const next = [...currentDraft[field]];
      next[index] = value;
      return {
        ...currentDraft,
        [field]: next,
      };
    });
  };

  const addArrayItem = (field, value) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: [...currentDraft[field], value],
    }));
  };

  const removeArrayItem = (field, index) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: currentDraft[field].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const addSocialLink = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      socialLinks: [...currentDraft.socialLinks, { ...emptySocialLink, id: Date.now() }],
    }));
  };

  const updateSocialLink = (index, field, value) => {
    setDraft((currentDraft) => {
      const next = [...currentDraft.socialLinks];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return {
        ...currentDraft,
        socialLinks: next,
      };
    });
  };

  const removeSocialLink = (index) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      socialLinks: currentDraft.socialLinks.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const saveFooter = (event) => {
    event.preventDefault();

    if (!draft?.brandTitle?.trim() || !draft?.brandText?.trim()) {
      toast.error("Footer title and description are required.");
      return;
    }

    setFooter({
      ...draft,
      brandTitle: draft.brandTitle.trim(),
      brandText: draft.brandText.trim(),
      copyrightText: draft.copyrightText.trim(),
      products: draft.products.filter(Boolean),
      usefulLinks: draft.usefulLinks.filter(Boolean),
      contactLines: draft.contactLines.filter(Boolean),
      socialLinks: draft.socialLinks.filter((link) => link.label || link.href),
    });

    closeForm();
  };

  return (
    <footer id="footer" className="mt-10 border-t border-white/40 bg-slate-950 text-white">
      <div className="bg-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-slate-300">{footer.topText}</p>

          <div className="flex flex-wrap items-center gap-3">
            {footer.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500"
                aria-label={social.label}
              >
                {iconMap[social.icon] || <SiTwitter size={20} />}
              </a>
            ))}

            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsEditing((current) => !current)}
                className="ml-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {isEditing ? "Close editor" : "Edit footer"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <h6 className="text-lg font-bold text-teal-300">{footer.brandTitle}</h6>
            {isAdmin && isEditing && (
              <button
                type="button"
                onClick={openEditForm}
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-teal-500"
                aria-label="Edit footer content"
              >
                <FiEdit2 size={14} />
              </button>
            )}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{footer.brandText}</p>
        </div>

        <div>
          <h6 className="text-lg font-bold text-teal-300">Products</h6>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {footer.products.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="text-lg font-bold text-teal-300">Useful Links</h6>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {footer.usefulLinks.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="text-lg font-bold text-teal-300">Contact</h6>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
            {footer.contactLines.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-400">{footer.copyrightText}</div>

      {draft && isAdmin && isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <form
            onSubmit={saveFooter}
            className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">Edit footer</p>
                <h3 className="text-2xl font-black text-slate-900">Text and links editor</h3>
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
                  Top strip text
                  <input
                    type="text"
                    name="topText"
                    value={draft.topText}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Copyright text
                  <input
                    type="text"
                    name="copyrightText"
                    value={draft.copyrightText}
                    onChange={handleFieldChange}
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Brand title
                <input
                  type="text"
                  name="brandTitle"
                  value={draft.brandTitle}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Brand text
                <textarea
                  name="brandText"
                  value={draft.brandText}
                  onChange={handleFieldChange}
                  rows={4}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                />
              </label>

              <div className="rounded-3xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-slate-900">Top social links</h4>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                  >
                    <FiPlus />
                    Add link
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {draft.socialLinks.map((social, index) => (
                    <div key={social.id || index} className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-[1fr_1fr_auto]">
                      <label className="grid gap-2 text-sm font-semibold text-slate-700">
                        Label
                        <input
                          type="text"
                          value={social.label}
                          onChange={(event) => updateSocialLink(index, "label", event.target.value)}
                          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-semibold text-slate-700">
                        URL
                        <input
                          type="text"
                          value={social.href}
                          onChange={(event) => updateSocialLink(index, "href", event.target.value)}
                          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="self-end rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-900">Products</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem("products", "")}
                      className="rounded-full bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {draft.products.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(event) => handleArrayChange("products", index, event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem("products", index)}
                          className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-slate-900">Useful links</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem("usefulLinks", "")}
                      className="rounded-full bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {draft.usefulLinks.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(event) => handleArrayChange("usefulLinks", index, event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem("usefulLinks", index)}
                          className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-slate-900">Contact lines</h4>
                  <button
                    type="button"
                    onClick={() => addArrayItem("contactLines", "")}
                    className="rounded-full bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {draft.contactLines.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(event) => handleArrayChange("contactLines", index, event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("contactLines", index)}
                        className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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
    </footer>
  );
};

export default Footer;
