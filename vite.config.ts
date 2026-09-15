import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

const PROJECT_ROOT = import.meta.dirname;

function normalizeViteBase(raw: string | undefined, mode: string): string {
  if (raw != null && String(raw).trim() !== "") {
    const trimmed = String(raw).trim();
    const withLead = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return withLead.endsWith("/") ? withLead : `${withLead}/`;
  }
  return mode === "production" ? "/periodic/" : "/";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, PROJECT_ROOT, "");
  const base = normalizeViteBase(env.VITE_BASE_PATH, mode);

  return {
    base,
    plugins: [react(), tailwindcss(), {
      name: "atlas-serving-base",
      generateBundle() {
        this.emitFile({ type: "asset", fileName: "atlas-base.json", source: JSON.stringify({ base }) });
      },
    }],
    resolve: {
      alias: {
        "@": path.resolve(PROJECT_ROOT, "client", "src"),
      },
    },
    envDir: PROJECT_ROOT,
    root: path.resolve(PROJECT_ROOT, "client"),
    build: {
      outDir: path.resolve(PROJECT_ROOT, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
    },
  };
});
