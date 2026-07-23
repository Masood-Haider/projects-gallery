import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { Project, Settings } from "./types";

const seedProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce UI",
    description: "A modern e-commerce front-end built with React and Tailwind.",
    longDescription:
      "A fully responsive e-commerce storefront featuring product listing, cart management, and checkout flow. Built with React 18, Tailwind CSS, and Zustand for state management.",
    category: "frontend",
    techStack: ["React", "Tailwind CSS", "Zustand"],
    liveUrl: "https://example.vercel.app",
    githubUrl: "https://github.com/masoodhaider/ecommerce-ui",
    screenshots: [],
    thumbnail: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Task Manager App",
    description: "Full-stack task manager with auth, REST API and React UI.",
    longDescription:
      "A full-stack task management application with user authentication, real-time updates, and a clean dashboard. Backend powered by Node.js/Express with a PostgreSQL database.",
    category: "fullstack",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/masoodhaider/task-manager",
    screenshots: [],
    thumbnail: "",
    createdAt: new Date().toISOString(),
  },
];

const seedSettings: Settings = {
  yearsOfExperience: 3,
  profilePhoto: "",
};

// Initialize Redis if Vercel KV / Upstash credentials are set
const kvUrl =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.STORAGE_REST_API_URL ||
  process.env.STORAGE_UPSTASH_REDIS_REST_URL ||
  process.env.STORAGE_KV_REST_API_URL;

const kvToken =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.STORAGE_REST_API_TOKEN ||
  process.env.STORAGE_UPSTASH_REDIS_REST_TOKEN ||
  process.env.STORAGE_KV_REST_API_TOKEN;

const redis = kvUrl && kvToken ? new Redis({ url: kvUrl, token: kvToken }) : null;

const PROJECTS_KEY = "portfolio:projects";
const SETTINGS_KEY = "portfolio:settings";

// Local file system fallback
const dataDir = path.join(process.cwd(), "data");
const projectsFile = path.join(dataDir, "projects.json");
const settingsFile = path.join(dataDir, "settings.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readProjectsLocal(): Project[] {
  ensureDataDir();
  if (!fs.existsSync(projectsFile)) {
    fs.writeFileSync(projectsFile, JSON.stringify(seedProjects, null, 2), "utf-8");
    return seedProjects;
  }
  try {
    const data = fs.readFileSync(projectsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return seedProjects;
  }
}

function writeProjectsLocal(projects: Project[]): void {
  ensureDataDir();
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), "utf-8");
}

function readSettingsLocal(): Settings {
  ensureDataDir();
  if (!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, JSON.stringify(seedSettings, null, 2), "utf-8");
    return seedSettings;
  }
  try {
    const data = fs.readFileSync(settingsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return seedSettings;
  }
}

function writeSettingsLocal(settings: Settings): void {
  ensureDataDir();
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf-8");
}

// ==========================================
// Public Store API (Async - Vercel KV + Local Fallback)
// ==========================================

export async function getProjects(): Promise<Project[]> {
  if (redis) {
    try {
      const data = await redis.get<Project[]>(PROJECTS_KEY);
      if (data && Array.isArray(data)) return data;
      // Seed KV if empty
      await redis.set(PROJECTS_KEY, seedProjects);
      return seedProjects;
    } catch (e) {
      console.error("Vercel KV Error (getProjects), falling back to local storage:", e);
    }
  }
  return readProjectsLocal();
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function addProject(project: Project): Promise<void> {
  const projects = await getProjects();
  projects.push(project);
  if (redis) {
    try {
      await redis.set(PROJECTS_KEY, projects);
      return;
    } catch (e) {
      console.error("Vercel KV Error (addProject):", e);
    }
  }
  writeProjectsLocal(projects);
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, "id">>
): Promise<Project | null> {
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...updates };
  if (redis) {
    try {
      await redis.set(PROJECTS_KEY, projects);
      return projects[idx];
    } catch (e) {
      console.error("Vercel KV Error (updateProject):", e);
    }
  }
  writeProjectsLocal(projects);
  return projects[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  if (redis) {
    try {
      await redis.set(PROJECTS_KEY, filtered);
      return true;
    } catch (e) {
      console.error("Vercel KV Error (deleteProject):", e);
    }
  }
  writeProjectsLocal(filtered);
  return true;
}

export async function getSettings(): Promise<Settings> {
  if (redis) {
    try {
      const data = await redis.get<Settings>(SETTINGS_KEY);
      if (data) return data;
      await redis.set(SETTINGS_KEY, seedSettings);
      return seedSettings;
    } catch (e) {
      console.error("Vercel KV Error (getSettings), falling back to local storage:", e);
    }
  }
  return readSettingsLocal();
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  if (redis) {
    try {
      await redis.set(SETTINGS_KEY, updated);
      return updated;
    } catch (e) {
      console.error("Vercel KV Error (updateSettings):", e);
    }
  }
  writeSettingsLocal(updated);
  return updated;
}
