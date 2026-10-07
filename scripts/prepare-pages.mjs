import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dashboardBuild = path.join(root, "dashboard-app", "dist");
const siteDir = path.join(root, "_site");
const dashboardDir = path.join(siteDir, "dashboard");

await rm(siteDir, { recursive: true, force: true });
await mkdir(dashboardDir, { recursive: true });
await cp(path.join(root, "index.html"), path.join(siteDir, "index.html"));
await cp(path.join(root, "assets"), path.join(siteDir, "assets"), { recursive: true });
await cp(dashboardBuild, dashboardDir, { recursive: true });

let rewrittenImagePaths = 0;
async function fixPublicImagePaths(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await fixPublicImagePaths(filePath);
      continue;
    }
    if (!/\.(html|js|css)$/i.test(entry.name)) continue;

    const original = await readFile(filePath, "utf8");
    const matches = original.match(/(["'`(])\/images\//g) ?? [];
    if (matches.length === 0) continue;

    const updated = original.replace(/(["'`(])\/images\//g, "$1./images/");
    await writeFile(filePath, updated);
    rewrittenImagePaths += matches.length;
  }
}

await fixPublicImagePaths(dashboardDir);
if (!await exists(path.join(dashboardDir, "index.html"))) {
  throw new Error("Dashboard build did not produce dashboard/index.html");
}
if (rewrittenImagePaths === 0) {
  throw new Error("Expected public /images/ paths in the imported dashboard bundle; none were rewritten.");
}

console.log(`Prepared ${path.relative(root, siteDir)} with the Anatomio landing page and dashboard.`);
console.log(`Adjusted ${rewrittenImagePaths} dashboard image paths for the GitHub Pages subdirectory.`);

async function exists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}
