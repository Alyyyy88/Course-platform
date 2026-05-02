import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enrollCourse, getCourse } from "../api/courses.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId)
  });

  const mutation = useMutation({
    mutationFn: () => enrollCourse({ courseId: Number(courseId) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    }
  });

  const price = useMemo(() => {
    if (!data) {
      return "0.00";
    }
    return Number(data.price).toFixed(2);
  }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 text-sm text-slate">
        Loading course...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-white/70 p-8 text-sm text-red-500">
        Course not found.
      </div>
    );
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        {data.thumbnail ? (
          <img
            src={data.thumbnail}
            alt={data.title}
            className="h-72 w-full rounded-3xl object-cover shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center rounded-3xl bg-gradient-to-br from-ink to-accent text-xs uppercase tracking-[0.3em] text-white shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
            No image
          </div>
        )}
        <div className="space-y-4">
          <h1 className="font-display text-4xl text-ink">{data.title}</h1>
          <p className="text-base text-slate">{data.description}</p>
        </div>
      </div>
      <aside className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Enrollment</p>
        <p className="mt-2 text-3xl font-semibold text-ink">${price}</p>
        <p className="mt-4 text-sm text-slate">
          Includes project prompts, mentor feedback, and certificates.
        </p>
        {user ? (
          <button
            type="button"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="mt-6 w-full rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {mutation.isPending ? "Enrolling..." : "Enroll now"}
          </button>
        ) : (
          <p className="mt-6 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink">
            Sign in to enroll.
          </p>
        )}
        {mutation.isSuccess && (
          <p className="mt-4 text-sm text-aqua">Enrollment confirmed.</p>
        )}
      </aside>
    </section>
  );
}
