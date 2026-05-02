import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="relative h-44 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink to-accent text-xs uppercase tracking-[0.3em] text-white">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl text-ink">{course.title}</h3>
        <p className="text-sm text-slate line-clamp-3">{course.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-ink">
            ${Number(course.price).toFixed(2)}
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="rounded-full border border-ink px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
