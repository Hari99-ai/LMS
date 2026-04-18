import React, { useEffect, useState } from "react";
import prafulasir from "../assets/Images/prafulasir.png";
import jigyasamaam from "../assets/Images/jigyasamaam.png";
import brajraj from "../assets/Images/brajraj.png";
import rohan from "../assets/Images/rohan.jpg";
import manishsir from "../assets/Images/manishsir.png";
import dheerajsir from "../assets/Images/dheerajsir.jpg";
import deveshsir from "../assets/Images/deveshsir.png";
import rohitsir from "../assets/Images/rohitsir.jpg";
import khushboomaam from "../assets/Images/khushboomaam.jpg";

const Carousel = () => {
  const slides = [deveshsir, manishsir];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % slides.length);

  return (
    <section id="image-slider" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-lg lg:grid-cols-[1fr_1.05fr]">
        <div className="relative min-h-[420px] bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 p-6 sm:p-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={slide}
                className="h-full w-full object-cover opacity-90"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent" />
            </div>
          ))}

          <button
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/30"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>
          <button
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/30"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <span className="text-2xl leading-none">›</span>
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-teal-300" : "w-2.5 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 px-6 py-10 sm:px-10 lg:px-12">
          <div className="inline-flex w-fit rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            Faculty spotlight
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Meet the educators behind the experience.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Our faculty blends academic expertise with practical mentorship, giving students the clarity and confidence to keep progressing.
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 px-4 py-3">
              <p className="font-bold text-slate-900">Mentorship</p>
              <p>Guided learning</p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3">
              <p className="font-bold text-slate-900">Practical</p>
              <p>Real-world focus</p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3">
              <p className="font-bold text-slate-900">Support</p>
              <p>Always available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
