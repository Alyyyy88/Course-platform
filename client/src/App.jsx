import { Routes, Route, NavLink } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AdminCoursesPage from "./pages/AdminCoursesPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const linkBase =
  "text-sm uppercase tracking-[0.2em] transition hover:text-accent";

export default function App() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-mist text-slate">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,122,89,0.18),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(86,197,208,0.22),_transparent_55%)]" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="font-display text-2xl text-ink">Trailhead Academy</div>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-ink" : "text-slate"}`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-ink" : "text-slate"}`
            }
          >
            Dashboard
          </NavLink>
          {user?.role === "ADMIN" && (
            <NavLink
              to="/admin/courses"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-ink" : "text-slate"}`
              }
            >
              Admin
            </NavLink>
          )}
          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-ink" : "text-slate"}`
              }
            >
              Sign in
            </NavLink>
          ) : (
            <button
              type="button"
              onClick={logout}
              className={`${linkBase} text-slate`}
            >
              Sign out
            </button>
          )}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
        </Routes>
      </main>
    </div>
  );
}
