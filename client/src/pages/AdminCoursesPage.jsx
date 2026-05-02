import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../api/courses.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: ""
  });

  const mutation = useMutation({
    mutationFn: () =>
      createCourse({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        thumbnail: form.thumbnail || null
      }),
    onSuccess: () => {
      setForm({ title: "", description: "", price: "", thumbnail: "" });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    }
  });

  if (!user || user.role !== "ADMIN") {
    return (
      <section className="rounded-3xl border border-white/70 bg-white/80 p-8 text-sm text-slate">
        Admin access required.
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
      <div>
        <h1 className="font-display text-3xl text-ink">Create a course</h1>
        <p className="mt-2 text-sm text-slate">
          Thumbnails are optional. Students will not see courses they are
          enrolled in.
        </p>
      </div>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        <input
          type="text"
          name="title"
          required
          placeholder="Course title"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, title: event.target.value }))
          }
          className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
        />
        <textarea
          name="description"
          required
          placeholder="Course description"
          rows={4}
          value={form.description}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, description: event.target.value }))
          }
          className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, price: event.target.value }))
            }
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          />
          <input
            type="url"
            name="thumbnail"
            placeholder="Thumbnail URL (optional)"
            value={form.thumbnail}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, thumbnail: event.target.value }))
            }
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          />
        </div>
        {mutation.isError && (
          <p className="text-sm text-red-500">Unable to create course.</p>
        )}
        {mutation.isSuccess && (
          <p className="text-sm text-aqua">Course created.</p>
        )}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-accent disabled:opacity-70"
        >
          {mutation.isPending ? "Saving..." : "Create course"}
        </button>
      </form>
    </section>
  );
}
