#!/usr/bin/env node
/**
 * Bulk GLB optimizer.
 *
 * Walks public/models/, runs each .glb through gltf-pipeline with Draco
 * mesh compression, replaces it in place. Prints before/after sizes so
 * you can sanity-check the savings.
 *
 * Usage:
 *   npm run optimize:glb              # optimize every GLB
 *   npm run optimize:glb -- --dry     # report only, no writes
 *   npm run optimize:glb -- path.glb  # optimize a single file
 *
 * Tip: commit the original files BEFORE running this. Optimization is
 * lossless on mesh data with Draco's default settings, but a few odd
 * exporters need lower compression levels — keep the originals around
 * in case you need to re-encode.
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";
import gltfPipeline from "gltf-pipeline";

const { processGlb } = gltfPipeline;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const modelsDir = path.join(projectRoot, "public", "models");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry");
const explicit = args.find((a) => a.endsWith(".glb"));

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

function pct(before, after) {
  const saved = ((before - after) / before) * 100;
  return saved.toFixed(1) + "%";
}

async function optimizeOne(absPath) {
  const rel = path.relative(projectRoot, absPath);
  const before = (await stat(absPath)).size;
  const buf = await readFile(absPath);

  // Draco settings tuned for web: lossless for the position attribute,
  // lightly quantized everywhere else. Default for most assets.
  const options = {
    dracoOptions: {
      compressionLevel: 7,
      quantizePositionBits: 14,
      quantizeNormalBits: 10,
      quantizeTexcoordBits: 12,
      quantizeColorBits: 8,
      quantizeGenericBits: 12,
      unifiedQuantization: false,
    },
  };

  let result;
  try {
    result = await processGlb(buf, options);
  } catch (err) {
    console.error(`✗ ${rel}\n   (${err.message})`);
    return { before, after: before, ok: false };
  }

  const out = result.glb;
  const after = out.length;

  if (after >= before) {
    console.log(
      `~ ${rel}  ${fmtKB(before)} → ${fmtKB(after)} (no gain, skipped)`,
    );
    return { before, after: before, ok: true };
  }

  if (!dryRun) {
    await writeFile(absPath, out);
  }

  const tag = dryRun ? "DRY" : "OK ";
  console.log(
    `${tag} ${rel}  ${fmtKB(before)} → ${fmtKB(after)}  (-${pct(before, after)})`,
  );
  return { before, after, ok: true };
}

async function main() {
  if (!existsSync(modelsDir)) {
    console.error(`Models dir not found: ${modelsDir}`);
    process.exit(1);
  }

  const files = explicit
    ? [path.resolve(projectRoot, explicit)]
    : (await glob("**/*.glb", { cwd: modelsDir })).map((f) =>
        path.join(modelsDir, f),
      );

  if (files.length === 0) {
    console.log("No .glb files found under public/models/.");
    return;
  }

  console.log(
    `${dryRun ? "[DRY RUN] " : ""}Optimizing ${files.length} GLB file(s)…\n`,
  );

  let totalBefore = 0;
  let totalAfter = 0;
  for (const f of files) {
    const { before, after } = await optimizeOne(f);
    totalBefore += before;
    totalAfter += after;
  }

  console.log("\n— Totals —");
  console.log(`  Before: ${fmtKB(totalBefore)}`);
  console.log(`  After:  ${fmtKB(totalAfter)}`);
  console.log(
    `  Saved:  ${fmtKB(totalBefore - totalAfter)}  (-${pct(totalBefore, totalAfter)})`,
  );

  if (dryRun) {
    console.log("\nDry run — no files were written.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
