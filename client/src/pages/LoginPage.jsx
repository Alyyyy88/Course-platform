import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
      <h1 className="font-display text-3xl text-ink">Welcome back</h1>
      <p className="mt-2 text-sm text-slate">
        Sign in to enroll and track your courses.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
          className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-accent disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate">
        New here?{" "}
        <Link className="text-ink underline" to="/signup">
          Create an account
        </Link>
      </p>
    </section>
  );
}
