function Slides({ image, title, description, totalslides, slidenumber }) {
  return (
    <div
      id={`slide${slidenumber}`}
      className="carousel-item relative flex w-full flex-col items-center justify-center gap-5 px-6 py-8 text-center"
    >
      <img
        src={image}
        alt={title}
        className="w-full max-w-sm rounded-[2rem] object-cover shadow-lg"
      />
      <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>

      <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
        <a
          href={slidenumber === 1 ? `#slide${totalslides}` : `#slide${slidenumber - 1}`}
          className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white shadow-lg transition hover:bg-teal-500"
        >
          Prev
        </a>
        <a
          href={slidenumber === totalslides ? `#slide1` : `#slide${slidenumber + 1}`}
          className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white shadow-lg transition hover:bg-teal-500"
        >
          Next
        </a>
      </div>
    </div>
  );
}

export default Slides;
