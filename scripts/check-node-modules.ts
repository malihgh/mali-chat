#!/usr/bin/env bun

import { existsSync } from "fs";

const forbiddenPaths = [
  "apps/api/node_modules",
  "apps/mobile/node_modules",
  "packages/*/node_modules",
];

let found = false;

for (const path of forbiddenPaths) {
  if (path.includes("*")) {
    // simple glob handling
    const base = path.replace("/*/node_modules", "");
    if (existsSync(base)) {
      const dirs = Bun.spawnSync([
        "find",
        base,
        "-type",
        "d",
        "-name",
        "node_modules",
      ]).stdout.toString();
      if (
        dirs.includes("node_modules") &&
        !dirs.includes("node_modules/.bun")
      ) {
        console.error(`❌ Found unexpected node_modules in ${base}`);
        found = true;
      }
    }
  } else if (existsSync(path)) {
    console.error(`❌ Found forbidden folder: ${path}`);
    found = true;
  }
}

if (found) {
  console.error("\n🚨 Clean your workspace first!");
  process.exit(1);
}

console.log("✅ No unwanted node_modules found");
