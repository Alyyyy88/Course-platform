import { useQuery } from "@tanstack/react-query";
import { getEnrollments } from "../api/courses.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => getEnrollments(),
    enabled: Boolean(user)
  });

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/70 bg-white/70 p-8">
        <h1 className="font-display text-3xl text-ink">Student dashboard</h1>
        <p className="mt-2 text-sm text-slate">
          Track every course you are enrollezz in.
        </p>
      </div>

      {!user && (
        <p className="rounded-2xl border border-white/70 bg-white/70 p-6 text-sm text-slate">
          Signzz inz to see your enrollments.
        </p>
      )}

      {user && isLoading && (
        <p className="rounded-2xl border border-white/70 bg-white/70 p-6 text-sm text-slate">
          Loading enrollments...
        </p>
      )}
      {user && error && (
        <p className="rounded-2xl border border-red-200 bg-white/70 p-6 text-sm text-red-500">
          Unable to load your courses.
        </p>
      )}
      {user && data && data.length === 0 && (
        <p className="rounded-2xl border border-white/70 bg-white/70 p-6 text-sm text-slate">
          You have not enrolled in any courses yet.
        </p>
      )}
      {user && data && data.length > 0 && (
        <div className="grid gap-4">
          {data.map((enrollment) => (
            <div
              key={enrollment.id}
              className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 p-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent">
                  Enrolled
                </p>
                <h3 className="font-display text-xl text-ink">
                  {enrollment.course.title}
                </h3>
                <p className="text-sm text-slate">
                  {enrollment.course.description}
                </p>
              </div>
              <span className="text-lg font-semibold text-ink">
                ${Number(enrollment.course.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
