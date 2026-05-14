import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../api/courses.js";
import CourseCard from "../components/CourseCard.jsx";

export default function LandingPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses
  });

  return (
    <section className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Skill paths curated weekly
          </p>
          <h1 className="font-display text-4xl text-ink md:text-5xl">
            Grow into a new role with focus-driven learning.
          </h1>
          <p className="max-w-xl text-base text-slate">
            Explore bite-sized courses led by industry mentors. Learn at your
            pace and track every milestone from your dashboard.
          </p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 text-sm text-slate shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink">
            <span>Live cohorts</span>
            <span>Starts monthly</span>
          </div>
          <p className="mt-4 text-base text-ink">
            test6
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.18em]">
            <div className="rounded-2xl bg-ink px-3 py-4 text-white">
              18 hrs
            </div>
            <div className="rounded-2xl border border-ink/10 px-3 py-4 text-ink">
              6 projects
            </div>
            <div className="rounded-2xl border border-ink/10 px-3 py-4 text-ink">
              1 mentor
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <p className="rounded-2xl border border-white/70 bg-white/70 p-6 text-sm text-slate">
          Loading courses...
        </p>
      )}
      {error && (
        <p className="rounded-2xl border border-red-200 bg-white/70 p-6 text-sm text-red-500">
          Unable to load courses right now.
        </p>
      )}
      {data && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
