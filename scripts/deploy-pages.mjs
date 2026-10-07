// Builds the site for GitHub Pages and publishes it to the repo's gh-pages branch.
// Usage: npm run deploy   ->  live at https://vmfamaker.github.io/mustard-seed-website/
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const remote = execSync("git remote get-url origin").toString().trim();

rmSync("out", { recursive: true, force: true });
run("npx next build", { env: { ...process.env, PAGES: "1" } });
writeFileSync("out/.nojekyll", ""); // let GitHub Pages serve the _next folder

run("git init -q -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run(`git commit -q -m "Publish site ${new Date().toISOString()}"`, { cwd: "out" });
run(`git push -q -f ${remote} gh-pages`, { cwd: "out" });
console.log("\nPublished: https://vmfamaker.github.io/mustard-seed-website/ (live within a minute or two)");
