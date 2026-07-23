/**
 * Simple admin password check.
 * Change ADMIN_PASSWORD to whatever you want.
 * For production, store this in an environment variable.
 */
export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? "masood@admin2024";

export const checkAdminPassword = (password: string): boolean =>
  password === ADMIN_PASSWORD;
