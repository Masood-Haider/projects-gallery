export type ProjectCategory = "frontend" | "fullstack";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  techStack: string[];
  liveUrl?: string;       // only shown if deployed
  githubUrl?: string;
  screenshots: string[];  // URLs or paths to screenshots
  thumbnail: string;      // main thumbnail image
  createdAt: string;      // ISO date string
}

export interface Settings {
  yearsOfExperience: number;
  profilePhoto?: string;
}