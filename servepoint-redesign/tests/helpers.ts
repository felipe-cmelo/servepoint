import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

/** URL paths of every built page in dist/, for example "/" and "/pricing/". Skips the listed prefixes. */
export function builtRoutes(root = "dist", skip: string[] = []): string[] {
  if (!existsSync(root)) throw new Error(`${root}/ not found. Run npm run build first.`);
  const out: string[] = [];
  (function walk(dir: string) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === "index.html") {
        const rel = full.slice(root.length).replaceAll("\\", "/").replace(/index\.html$/, "");
        const route = rel.startsWith("/") ? rel : "/" + rel;
        if (!skip.some((s) => route.startsWith(s))) out.push(route);
      }
    }
  })(root);
  return out.sort();
}
