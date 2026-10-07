import { cp, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const buildDir = path.join(root, "dashboard-app", "dist");
const siteDir = path.join(root, "_site");
const dashboardDir = path.join(siteDir, "dashboard");

await rm(siteDir, { recursive: true, force: true });
await mkdir(dashboardDir, { recursive: true });
await cp(path.join(root, "index.html"), path.join(siteDir, "index.html"));
await cp(path.join(root, "assets"), path.join(siteDir, "assets"), { recursive: true });
await cp(buildDir, dashboardDir, { recursive: true });

const dashboardHtml = await readFile(path.join(dashboardDir, "index.html"), "utf8");
if (!dashboardHtml.includes('<div id="root"></div>')) {
  throw new Error("Dashboard build is missing its React root element.");
}

console.log(`Prepared ${path.relative(root, siteDir)} with the Anatomio landing page and dashboard route.`);
