/**
 * validate-communes.ts
 * Build-time validator for the communes dataset.
 * Reads individual JSON files from data/communes/
 * Run: npx tsx scripts/validate-communes.ts
 */
import fs from "fs";
import path from "path";

interface CommuneRaw {
  name?: string;
  slug?: string;
  region?: string;
  postal_code?: string | null;
  distance_minutes?: number | null;
  response_time_minutes?: number | null;
  building_profile?: string | null;
  nearby_landmarks?: string[];
  common_issues?: string[];
  services?: string[];
  nearby_communes?: string[];
  faq?: { q?: string; a?: string }[];
  last_updated?: string;
}

// ── Load all commune files ──────────────────────────────────────
const communesDir = path.join(process.cwd(), "data", "communes");
const files = fs.readdirSync(communesDir).filter((f) => f.endsWith(".json"));

if (files.length === 0) {
  console.error("❌ No commune JSON files found in data/communes/");
  process.exit(1);
}

const communes: CommuneRaw[] = files.map((file) => {
  const raw = fs.readFileSync(path.join(communesDir, file), "utf-8");
  return JSON.parse(raw) as CommuneRaw;
});

const errors: string[] = [];

// ── 1. Unique slugs ─────────────────────────────────────────────
const slugs = communes.map((c) => c.slug).filter(Boolean) as string[];
const slugSet = new Set(slugs);
if (slugSet.size !== slugs.length) {
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  errors.push(`Duplicate slugs found: ${[...new Set(dupes)].join(", ")}`);
}

// ── 2. Filename must match slug ─────────────────────────────────
for (let i = 0; i < files.length; i++) {
  const expectedFile = `${communes[i].slug}.json`;
  if (files[i] !== expectedFile) {
    errors.push(
      `Filename mismatch: file "${files[i]}" contains slug "${communes[i].slug}" (expected "${expectedFile}")`
    );
  }
}

// ── 3. Per-commune checks ───────────────────────────────────────
for (const c of communes) {
  const id = c.slug ?? c.name ?? "(unknown)";

  // Required string fields
  for (const field of ["name", "slug", "region"] as const) {
    if (!c[field] || typeof c[field] !== "string" || c[field]!.trim() === "") {
      errors.push(`[${id}] Missing or empty required field: "${field}"`);
    }
  }

  // Arrays that should exist
  for (const field of [
    "nearby_landmarks",
    "common_issues",
    "services",
    "nearby_communes",
    "faq",
  ] as const) {
    if (!Array.isArray(c[field])) {
      errors.push(`[${id}] Field "${field}" must be an array.`);
    }
  }

  // Minimum quality gate: at least 2 common_issues OR at least 2 services
  const issueCount = c.common_issues?.length ?? 0;
  const serviceCount = c.services?.length ?? 0;
  if (issueCount < 2 && serviceCount < 2) {
    errors.push(
      `[${id}] Too thin: needs ≥2 common_issues (has ${issueCount}) OR ≥2 services (has ${serviceCount}).`
    );
  }

  // nearby_communes slugs should exist in the dataset
  if (Array.isArray(c.nearby_communes)) {
    for (const ref of c.nearby_communes) {
      if (!slugSet.has(ref)) {
        console.warn(
          `  ⚠ [${id}] nearby_commune "${ref}" does not exist in dataset (yet).`
        );
      }
    }
  }

  // FAQ items must have both q and a
  if (Array.isArray(c.faq)) {
    for (let i = 0; i < c.faq.length; i++) {
      const item = c.faq[i];
      if (!item.q || !item.a) {
        errors.push(`[${id}] FAQ item ${i} is missing "q" or "a".`);
      }
    }
  }

  // last_updated should be a valid ISO string
  if (c.last_updated) {
    const d = new Date(c.last_updated);
    if (isNaN(d.getTime())) {
      errors.push(`[${id}] Invalid last_updated date: "${c.last_updated}"`);
    }
  }
}

// ── Report ──────────────────────────────────────────────────────
console.log(`\n🔍 Validating ${communes.length} commune(s) from ${files.length} files...\n`);

if (errors.length > 0) {
  console.error("❌ Validation FAILED:\n");
  for (const err of errors) {
    console.error(`  • ${err}`);
  }
  console.error(`\n${errors.length} error(s) found.\n`);
  process.exit(1);
} else {
  console.log("✅ All communes passed validation.\n");
  console.log(`  Files: ${files.length}`);
  console.log(`  Communes: ${slugs.join(", ")}`);
  console.log("");
  process.exit(0);
}
