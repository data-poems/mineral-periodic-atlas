import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // The build records its base so startup does not depend on a matching shell variable.
  const { base } = JSON.parse(readFileSync(path.join(staticPath, "atlas-base.json"), "utf8"));
  app.use(base, express.static(staticPath));
  if (base !== "/") app.get("/", (_req, res) => res.redirect(base));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    if (!_req.path.startsWith(base) || path.extname(_req.path)) {
      res.sendStatus(404);
      return;
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
