import React from "react";
import bhoomi from "../assets/Images/bhoomi.jpg";
import siddhu from "../assets/Images/siddhu.jpg";
import sidharth from "../assets/Images/sidharth.jpg";
import raunak from "../assets/Images/raunak.jpg";
import santosh from "../assets/Images/santosh.jpg";
import ankit from "../assets/Images/ankit.jpg";
import pradumn from "../assets/Images/pradumn.jpg";
import naina from "../assets/Images/naina.jpg";

const testimonials = [
  {
    name: "Bhoomi Garg",
    title: "SDE at Amazon",
    feedback: "Great platform with knowledgeable instructors. Courses are engaging and well-structured.",
    imageUrl: bhoomi,
  },
  {
    name: "Ankit Chandra",
    title: "SWE at Google",
    feedback: "Easy to navigate and offers a wide variety of subjects. The live sessions add real value.",
    imageUrl: ankit,
  },
  {
    name: "Raunak Mandil",
    title: "Graphic Designer at Nykaa",
    feedback: "Loved the hands-on projects and quizzes. They make learning fun and interactive.",
    imageUrl: raunak,
  },
  {
    name: "Santosh Kumar",
    title: "Project Manager at Microsoft",
    feedback: "Instructors are experts and the support is responsive. Overall, a solid platform.",
    imageUrl: santosh,
  },
  {
    name: "Sidharth Sharma",
    title: "Management Head at American Express",
    feedback: "Affordable courses with detailed explanations. Great for beginners looking to get started.",
    imageUrl: sidharth,
  },
  {
    name: "Naina Pandey",
    title: "Frontend Developer at Microsoft",
    feedback: "Flexible schedule and self-paced learning make this perfect for busy professionals.",
    imageUrl: naina,
  },
  {
    name: "Pradumn Gharasiya",
    title: "Marketing Manager at Amazon",
    feedback: "Good platform with helpful resources. The community forum is active and supportive.",
    imageUrl: pradumn,
  },
  {
    name: "Sidharth Singh Kushwah",
    title: "Customer Service Manager at Google",
    feedback: "Excellent value with organized lessons. I appreciated the certificates provided.",
    imageUrl: siddhu,
  },
];

export default function StudentsReviews() {
  return (
    <section id="student-reviews" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-12 shadow-[0_24px_70px_rgba(15,23,42,0.1)] backdrop-blur-lg sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-500">Students</p>
          <h2 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">What students say</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Real feedback from learners who used the platform to build confidence and grow their skills.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.imageUrl}
                  alt={`${testimonial.name} profile picture`}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-white transition group-hover:ring-teal-100"
                />
                <div>
                  <p className="text-lg font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-teal-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{testimonial.feedback}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
