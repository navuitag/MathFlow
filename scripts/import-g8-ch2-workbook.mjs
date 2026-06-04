#!/usr/bin/env node
/**
 * Gộp bài tập rèn luyện Chương 2 Toán 8 (BTCB + chuyên đề) vào data/exercises.json
 * Usage: node scripts/import-g8-ch2-workbook.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE_LABEL = { btcb: "BTCB", chuyen_de: "Chuyên đề" };

async function main() {
  const extraPath = join(ROOT, "data/workbook-g8-ch2-extra.json");
  const exercisesPath = join(ROOT, "data/exercises.json");

  const extra = JSON.parse(await readFile(extraPath, "utf8"));
  const exercises = JSON.parse(await readFile(exercisesPath, "utf8"));

  const existingIds = new Set(exercises.map((e) => e.id));
  const bySkillSource = new Map();
  exercises.forEach((e) => {
    const key = `${e.skill}:${e.source}`;
    bySkillSource.set(key, (bySkillSource.get(key) || 0) + 1);
  });

  let added = 0;
  for (const item of extra.exercises) {
    const src = item.source || "extra";
    const key = `${item.skill}:${src}`;
    const index = (bySkillSource.get(key) || 0) + 1;
    bySkillSource.set(key, index);

    const id = `ex_${item.skill}_${src}_${index}`;
    if (existingIds.has(id)) continue;

    const { skill, source, section, type, question, choices, answer, hint, solution, prompt, tokens } = item;
    exercises.push({
      id,
      skill,
      source,
      type,
      section: section || `M. ${SOURCE_LABEL[src] || src}`,
      question,
      ...(choices ? { choices } : {}),
      ...(prompt ? { prompt } : {}),
      ...(tokens ? { tokens } : {}),
      answer,
      hint: hint || solution || "",
      solution: solution || answer
    });
    existingIds.add(id);
    added += 1;
  }

  await writeFile(exercisesPath, `${JSON.stringify(exercises, null, 2)}\n`);

  const g8ch2 = exercises.filter((e) =>
    ["g8_identity_square", "g8_identity_cube", "g8_identity_sum_diff_cubes", "g8_factorization"].includes(e.skill)
  );
  const extraCount = g8ch2.filter((e) => e.source === "btcb" || e.source === "chuyen_de").length;

  console.log(`✓ Đã thêm ${added} bài tập Chương 2 (lớp 8).`);
  console.log(`  Tổng bài tập g8 chương 2: ${g8ch2.length} (BTCB + Chuyên đề: ${extraCount})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
