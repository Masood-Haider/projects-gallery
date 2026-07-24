"use client";

import { useEffect, useState } from "react";
import { Project, ProjectCategory, Settings } from "@/lib/types";
import Image from "next/image";
import clsx from "clsx";
import toast, { Toaster } from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "login" | "list" | "add" | "edit" | "settings";

interface FormState {
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  techStack: string; // comma-separated in the form
  liveUrl: string;
  githubUrl: string;
  thumbnail: string;
  screenshots: string; // newline-separated URLs
}

const emptyForm: FormState = {
  title: "",
  description: "",
  longDescription: "",
  category: "frontend",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  thumbnail: "",
  screenshots: "",
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [view, setView] = useState<View>("login");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<Settings>({ yearsOfExperience: 3, profilePhoto: "" });
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Load data once authenticated ──
  const loadData = async () => {
    const [resProj, resSet] = await Promise.all([
      fetch("/api/projects"),
      fetch("/api/settings")
    ]);
    const projData = await resProj.json();
    const setData = await resSet.json();
    setProjects(projData);
    if(setData.yearsOfExperience !== undefined) setSettings(setData);
  };

  useEffect(() => {
    if (view === "list" || view === "settings") loadData();
  }, [view]);

  // ── Auth ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      setView("list");
    } else {
      setAuthError("Incorrect password. Try again.");
    }
  };

  // ── Add / Edit submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      password,
      title: form.title.trim(),
      description: form.description.trim(),
      longDescription: form.longDescription.trim(),
      category: form.category,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      thumbnail: form.thumbnail.trim(),
      screenshots: form.screenshots
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = editId ? `/api/projects/${editId}` : "/api/projects";
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      toast.success(editId ? "Project updated successfully!" : "Project added successfully!");
      setForm(emptyForm);
      setEditId(null);
      await loadData();
      setTimeout(() => {
        setView("list");
      }, 1200);
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Something went wrong.");
    }
  };

  // ── Save Settings ──
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        password, 
        yearsOfExperience: settings.yearsOfExperience,
        profilePhoto: settings.profilePhoto
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Settings updated successfully!");
      await loadData();
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Something went wrong.");
    }
  };

  // ── Delete ──
  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    const res = await fetch(`/api/projects/${deleteId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    
    if (res.ok) {
      toast.success("Project deleted.");
      await loadData();
    } else {
      toast.error("Failed to delete project.");
    }
    setDeleteId(null);
  };

  // ── Open edit ──
  const openEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      category: project.category,
      techStack: project.techStack.join(", "),
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      thumbnail: project.thumbnail,
      screenshots: project.screenshots.join("\n"),
    });
    setEditId(project.id);
    setView("edit");
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Views
  // ─────────────────────────────────────────────────────────────────────────────

  if (view === "login") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-charcoal/10 bg-charcoal/5 p-8 backdrop-blur-sm shadow-xl">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal/5 border border-charcoal/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-7 w-7 text-charcoal"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>

            <h1 className="mb-1 text-center text-2xl font-bold text-charcoal">
              Admin Login
            </h1>
            <p className="mb-6 text-center text-sm text-charcoal/70">
              Enter your password to manage projects.
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal/70">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-charcoal/10 bg-base px-4 py-2.5 text-sm text-charcoal placeholder-charcoal/40 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                />
                {authError && (
                  <p className="mt-2 text-xs text-red-500">{authError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-charcoal py-2.5 text-sm font-semibold text-base hover:bg-gold disabled:opacity-50 transition-colors"
              >
                {loading ? "Checking…" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (view === "settings") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Toaster position="bottom-center" />
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => {
              setView("list");
            }}
            className="flex items-center gap-1.5 text-sm text-charcoal/40 hover:text-gold transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-charcoal">
            Global Settings
          </h1>
        </div>

        <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
          <Field label="Years of Experience">
            <input
              type="number"
              min="0"
              required
              value={settings.yearsOfExperience}
              onChange={(e) => setSettings({ ...settings, yearsOfExperience: parseInt(e.target.value) || 0 })}
              className={inputCls}
            />
          </Field>
          
          <Field 
            label="Profile Photo URL" 
            hint="A direct link to an image (e.g. from Imgur, GitHub, or LinkedIn). Leave blank for default."
          >
            <input
              type="url"
              value={settings.profilePhoto || ""}
              onChange={(e) => setSettings({ ...settings, profilePhoto: e.target.value })}
              placeholder="https://i.imgur.com/your-image.png"
              className={inputCls}
            />
            {settings.profilePhoto && (
              <div className="mt-2 relative h-20 w-20 overflow-hidden rounded-full border-2 border-charcoal/10 shadow-sm bg-base">
                <Image
                  src={settings.profilePhoto}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </Field>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-charcoal px-6 py-2.5 text-sm font-semibold text-base hover:bg-gold disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Toaster position="bottom-center" />
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-charcoal">
              Admin <span className="text-gold">Dashboard</span>
            </h1>
            <p className="mt-1 text-sm text-charcoal/60">
              {projects.length} project{projects.length !== 1 ? "s" : ""} in your showcase
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setView("settings");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-charcoal/20 bg-base px-5 py-2.5 text-sm font-semibold text-charcoal hover:border-gold hover:text-gold transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              Settings
            </button>
            <button
              onClick={() => {
                setForm(emptyForm);
                setEditId(null);
                setView("add");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-charcoal px-5 py-2.5 text-sm font-semibold text-base hover:bg-gold transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Project
            </button>
          </div>
        </div>

        {/* Project list */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-charcoal/20 py-24 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-16 w-16 text-charcoal/20 mb-4"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9l-3 3 3 3M15 9l3 3-3 3M13 7l-2 10" />
            </svg>
            <p className="text-charcoal/60 font-medium">No projects yet</p>
            <p className="text-charcoal/40 text-sm mt-1">
              Click &ldquo;Add Project&rdquo; to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 rounded-xl border border-charcoal/10 bg-base p-4 hover:border-gold hover:shadow-md transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-charcoal/5 border border-charcoal/10">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-charcoal/5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-charcoal/20">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 9l-3 3 3 3M15 9l3 3-3 3" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-charcoal truncate">
                    {project.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span
                      className={clsx(
                        "rounded-md border px-2 py-0.5 text-xs font-medium",
                        project.category === "frontend"
                          ? "border-charcoal/10 text-charcoal/70 bg-base shadow-sm"
                          : "border-charcoal/10 text-charcoal/70 bg-base shadow-sm"
                      )}
                    >
                      {project.category === "frontend" ? "Frontend" : "Full Stack"}
                    </span>
                    {project.liveUrl && (
                      <span className="flex items-center gap-1 rounded-md bg-green-100 border border-green-200 px-2 py-0.5 text-xs text-green-700 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Live
                      </span>
                    )}
                    <span className="text-xs text-charcoal/40">
                      {project.techStack.slice(0, 3).join(" · ")}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`/projects/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-charcoal/10 bg-base p-2 text-charcoal/40 hover:border-gold hover:text-gold transition-colors shadow-sm"
                    title="Preview"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </a>
                  <button
                    onClick={() => openEdit(project)}
                    className="rounded-lg border border-charcoal/10 bg-base p-2 text-charcoal/40 hover:border-gold hover:text-gold transition-colors shadow-sm"
                    title="Edit"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteId(project.id)}
                    className="rounded-lg border border-charcoal/10 bg-base p-2 text-charcoal/40 hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal/40 backdrop-blur-sm">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-charcoal/10 bg-base p-6 shadow-2xl mx-4">
              <h3 className="text-lg font-bold text-charcoal">Delete Project</h3>
              <p className="text-sm text-charcoal/70">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="mt-2 flex justify-end gap-3">
                <button 
                  onClick={() => setDeleteId(null)} 
                  disabled={loading}
                  className="rounded-xl bg-charcoal/5 px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal/10 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  disabled={loading}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Add / Edit form ──
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Toaster position="bottom-center" />
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => {
            setView("list");
          }}
          className="flex items-center gap-1.5 text-sm text-charcoal/40 hover:text-gold transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-charcoal">
          {editId ? "Edit Project" : "Add New Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Project Title *">
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="My Awesome App"
              className={inputCls}
            />
          </Field>

          <Field label="Category *">
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as ProjectCategory,
                })
              }
              className={inputCls}
            >
              <option value="frontend">Frontend</option>
              <option value="fullstack">Full Stack</option>
            </select>
          </Field>
        </div>

        <Field label="Short Description *">
          <input
            type="text"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="One-line summary shown on the project card"
            className={inputCls}
          />
        </Field>

        <Field label="Full Description">
          <textarea
            rows={5}
            value={form.longDescription}
            onChange={(e) =>
              setForm({ ...form, longDescription: e.target.value })
            }
            placeholder="Detailed description shown on the project detail page…"
            className={inputCls}
          />
        </Field>

        <Field
          label="Tech Stack"
          hint="Comma-separated, e.g. React, Node.js, PostgreSQL"
        >
          <input
            type="text"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            placeholder="React, Tailwind CSS, Node.js"
            className={inputCls}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Live URL"
            hint="Leave blank if not deployed yet"
          >
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              placeholder="https://myapp.vercel.app"
              className={inputCls}
            />
          </Field>

          <Field label="GitHub URL">
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="https://github.com/masoodhaider/repo"
              className={inputCls}
            />
          </Field>
        </div>

        <Field
          label="Thumbnail URL"
          hint="Main image shown on the project card"
        >
          <input
            type="url"
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            placeholder="https://example.com/thumbnail.png"
            className={inputCls}
          />
          {form.thumbnail && (
            <div className="mt-2 relative h-32 w-full overflow-hidden rounded-xl border border-charcoal/10">
              <Image
                src={form.thumbnail}
                alt="Thumbnail preview"
                fill
                className="object-cover"
              />
            </div>
          )}
        </Field>

        <Field
          label="Screenshot URLs"
          hint="One URL per line"
        >
          <textarea
            rows={4}
            value={form.screenshots}
            onChange={(e) =>
              setForm({ ...form, screenshots: e.target.value })
            }
            placeholder={
              "https://example.com/screen1.png\nhttps://example.com/screen2.png"
            }
            className={inputCls}
          />
        </Field>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setView("list");
            }}
            className="rounded-xl border border-charcoal/10 bg-base px-5 py-2.5 text-sm font-medium text-charcoal/60 hover:border-gold hover:text-gold transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-charcoal px-6 py-2.5 text-sm font-semibold text-base hover:bg-gold disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading
              ? "Saving…"
              : editId
              ? "Update Project"
              : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-charcoal/10 bg-base px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/60 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition shadow-sm";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-charcoal/40 uppercase tracking-wide">
        {label}
      </label>
      {hint && <p className="text-xs text-charcoal/60 -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}
