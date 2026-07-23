import fs from "fs";
import path from "path";
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

const dataDir = path.join(process.cwd(), "data");
const projectsFile = path.join(dataDir, "projects.json");
const settingsFile = path.join(dataDir, "settings.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readProjects(): Project[] {
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

function writeProjects(projects: Project[]): void {
  ensureDataDir();
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), "utf-8");
}

function readSettings(): Settings {
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

function writeSettings(settings: Settings): void {
  ensureDataDir();
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf-8");
}

export const getProjects = (): Project[] => {
  return readProjects();
};

export const getProjectById = (id: string): Project | undefined => {
  const projects = readProjects();
  return projects.find((p) => p.id === id);
};

export const addProject = (project: Project): void => {
  const projects = readProjects();
  projects.push(project);
  writeProjects(projects);
};

export const updateProject = (
  id: string,
  updates: Partial<Omit<Project, "id">>
): Project | null => {
  const projects = readProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...updates };
  writeProjects(projects);
  return projects[idx];
};

export const deleteProject = (id: string): boolean => {
  const projects = readProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  writeProjects(filtered);
  return true;
};

export const getSettings = (): Settings => {
  return readSettings();
};

export const updateSettings = (updates: Partial<Settings>): Settings => {
  const current = readSettings();
  const updated = { ...current, ...updates };
  writeSettings(updated);
  return updated;
};
