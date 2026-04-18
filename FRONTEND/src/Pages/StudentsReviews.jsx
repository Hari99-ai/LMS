import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import bhoomi from "../assets/Images/bhoomi.jpg";
import siddhu from "../assets/Images/siddhu.jpg";
import sidharth from "../assets/Images/sidharth.jpg";
import raunak from "../assets/Images/raunak.jpg";
import santosh from "../assets/Images/santosh.jpg";
import ankit from "../assets/Images/ankit.jpg";
import pradumn from "../assets/Images/pradumn.jpg";
import naina from "../assets/Images/naina.jpg";

const defaultTestimonials = [
  {
    id: 1,
    name: "Bhoomi Garg",
    title: "SDE at Amazon",
    feedback: "Great platform with knowledgeable instructors. Courses are engaging and well-structured.",
    imageUrl: bhoomi,
    alt: "Bhoomi Garg profile picture",
  },
  {
    id: 2,
    name: "Ankit Chandra",
    title: "SWE at Google",
    feedback: "Easy to navigate and offers a wide variety of subjects. The live sessions add real value.",
    imageUrl: ankit,
    alt: "Ankit Chandra profile picture",
  },
  {
    id: 3,
    name: "Raunak Mandil",
    title: "Graphic Designer at Nykaa",
    feedback: "Loved the hands-on projects and quizzes. They make learning fun and interactive.",
    imageUrl: raunak,
    alt: "Raunak Mandil profile picture",
  },
  {
    id: 4,
    name: "Santosh Kumar",
    title: "Project Manager at Microsoft",
    feedback: "Instructors are experts and the support is responsive. Overall, a solid platform.",
    imageUrl: santosh,
    alt: "Santosh Kumar profile picture",
  },
  {
    id: 5,
    name: "Sidharth Sharma",
    title: "Management Head at American Express",
    feedback: "Affordable courses with detailed explanations. Great for beginners looking to get started.",
    imageUrl: sidharth,
    alt: "Sidharth Sharma profile picture",
  },
  {
    id: 6,
    name: "Naina Pandey",
    title: "Frontend Developer at Microsoft",
    feedback: "Flexible schedule and self-paced learning make this perfect for busy professionals.",
    imageUrl: naina,
    alt: "Naina Pandey profile picture",
  },
  {
    id: 7,
    name: "Pradumn Gharasiya",
    title: "Marketing Manager at Amazon",
    feedback: "Good platform with helpful resources. The community forum is active and supportive.",
    imageUrl: pradumn,
    alt: "Pradumn Gharasiya profile picture",
  },
  {
    id: 8,
    name: "Sidharth Singh Kushwah",
    title: "Customer Service Manager at Google",
    feedback: "Excellent value with organized lessons. I appreciated the certificates provided.",
    imageUrl: siddhu,
    alt: "Sidharth Singh Kushwah profile picture",
  },
];

const emptyTestimonial = {
  name: "",
  title: "",
  feedback: "",
  imageUrl: "",
  alt: "",
};

const storageKey = "student-reviews";

function readStoredTestimonials() {
  if (typeof window === "undefined") {
    return defaultTestimonials;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return defaultTestimonials;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export default function StudentsReviews() {
  const [testimonials, setTestimonials] = useState(readStoredTestimonials);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(testimonials));
    }
  }, [testimonials]);

  const openCreateForm = () => {
    setDraft({
      ...emptyTestimonial,
      id: Date.now(),
    });
  };

  const openEditForm = (testimonial) => {
    setDraft({ ...testimonial });
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
          alt: currentDraft.name ? `${currentDraft.name} profile picture` : "Profile picture",
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const saveTestimonial = (event) => {
    event.preventDefault();

    setTestimonials((currentTestimonials) => {
      const exists = currentTestimonials.some((testimonial) => testimonial.id === draft.id);
      if (exists) {
        return currentTestimonials.map((testimonial) => (testimonial.id === draft.id ? draft : testimonial));
      }

      return [...currentTestimonials, draft];
    });

    closeForm();
  };

  const deleteTestimonial = (id) => {
    const shouldDelete = window.confirm("Delete this testimonial card?");
    if (!shouldDelete) {
      return;
    }

    setTestimonials((currentTestimonials) => currentTestimonials.filter((testimonial) => testimonial.id !== id));
  };

  const removeImage = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      imageUrl: "",
      alt: "",
    }));
  };

  return (
    <section id="student-reviews" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-12 shadow-[0_24px_70px_rgba(15,23,42,0.1)] backdrop-blur-lg sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-500">Students</p>
            <h2 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">What students say</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Real feedback from learners who used the platform to build confidence and grow their skills.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
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
                Add testimonial
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="group relative rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
            >
              {isEditing && (
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(testimonial)}
                    className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-teal-500 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FiEdit2 />
                      Edit
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-md transition hover:bg-rose-500 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FiTrash2 />
                      Delete
                    </span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4">
                {testimonial.imageUrl ? (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.alt || `${testimonial.name} profile picture`}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-white transition group-hover:ring-teal-100"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 ring-4 ring-white">
                    No image
                  </div>
                )}
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-teal-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{testimonial.feedback}</p>
            </article>
          ))}
        </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <form
            onSubmit={saveTestimonial}
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.3)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
                  {draft.id && testimonials.some((testimonial) => testimonial.id === draft.id)
                    ? "Edit testimonial"
                    : "Add testimonial"}
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
                Feedback
                <textarea
                  name="feedback"
                  value={draft.feedback}
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
                  value={draft.alt}
                  onChange={handleFieldChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-300"
                  placeholder="A short description for accessibility"
                />
              </label>

              {draft.imageUrl && (
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    {draft.imageUrl ? (
                      <img
                        src={draft.imageUrl}
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
    </section>
  );
}
