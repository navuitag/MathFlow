import { readFile, writeFile } from "node:fs/promises";
import { keypointsFromSteps } from "./lesson-keypoints.mjs";

const lessons = JSON.parse(await readFile("data/lessons.json", "utf8"));
let patched = 0;

const nextLessons = lessons.map((lesson) => {
  const steps = keypointsFromSteps(lesson.steps);
  if (steps.length !== lesson.steps.length) patched += 1;
  return { ...lesson, steps };
});

await writeFile("data/lessons.json", `${JSON.stringify(nextLessons, null, 2)}\n`);
console.log(`Patched ${patched}/${lessons.length} lessons with key knowledge points.`);
