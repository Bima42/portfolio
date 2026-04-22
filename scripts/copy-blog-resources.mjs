/**
 * Copies all blog article resource files (images, etc.) from
 * src/blog-content/<slug>/resources/ into public/blog/resources/
 * so Next.js can serve them as static assets.
 *
 * Runs automatically before `dev` and `build` via package.json predev/prebuild.
 */

import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const blogContentDir = join(__dirname, "../src/blog-content");
const destDir = join(__dirname, "../public/blog/resources");

mkdirSync(destDir, { recursive: true });

let copied = 0;
for (const slug of readdirSync(blogContentDir)) {
    const resourcesDir = join(blogContentDir, slug, "resources");
    if (!existsSync(resourcesDir)) continue;

    cpSync(resourcesDir, destDir, { recursive: true });
    copied++;
}

if (copied > 0) {
    console.log(`✓ Copied blog resources from ${copied} article(s) → public/blog/resources/`);
}
