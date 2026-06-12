/**
 * Trích lý thuyết + bài tập từ PDF chuyên đề → data/special-topic-study.json
 * Chạy: node scripts/generate-special-topic-study.mjs
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { fixPdfMath, fixPdfMathBlock } from "../assets/js/specialTopicMathFix.js";

const ROOT = "special-topic";
const TEXT_DIR = "docs/special-topic-text";

function cleanText(raw) {
  return fixPdfMathBlock(raw);
}

function cleanLine(line) {
  return fixPdfMath(line.replace(/\s+/g, " ").trim());
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function extractTheorySection(text) {
  const starts = [
    text.search(/A\.\s*L[ÝY]\s*THUY[EÊ]T/i),
    text.search(/TRỌNG\s*TÂM\s*KIẾN\s*THỨC/i)
  ].filter((i) => i >= 0);
  if (!starts.length) return "";
  const start = Math.min(...starts);
  const tail = text.slice(start);
  const endMatch = tail.slice(30).search(/B\.\s*C[ÁA]C\s*D[ẠA]NG|CÁC\s*D[ẠA]NG\s*BÀI|BA\s*\n/i);
  return endMatch >= 0 ? tail.slice(0, 30 + endMatch) : tail.slice(0, 12000);
}

function parseTheoryItems(section) {
  const items = [];
  if (!section) return items;

  for (const m of section.matchAll(/D[ạa]ng\s*(\d+)\s*[:\.]?\s*([^\n]+(?:\n(?!D[ạa]ng\s*\d+|\d+\.)[^\n]+){0,4})/gi)) {
    const body = cleanLine(m[2]);
    if (body.length > 12) {
      items.push({
        kind: "form",
        title: `Dạng ${m[1]}`,
        body
      });
    }
  }

  for (const m of section.matchAll(/(?:^|\n)(\d+)\.\s+([^\n]+(?:\n(?!\d+\.\s|D[ạa]ng\s*\d+)[^\n]+){0,6})/g)) {
    const body = cleanLine(m[2]);
    if (body.length < 12 || body.length > 900) continue;
    if (/^Bài\s*\d/i.test(body)) continue;
    items.push({
      kind: "theory",
      title: `Kiến thức ${m[1]}`,
      body
    });
  }

  const seen = new Set();
  return items.filter((item) => {
    if (/TOÁN HỌC SƠ ĐỒ|TOANMATH\.com/i.test(item.body)) return false;
    const key = item.body.slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractAnswerFromSolution(solution) {
  if (!solution) return "";
  const lines = solution.split("\n").map(cleanLine).filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i];
    if (line.length < 4 || line.length > 120) continue;
    const eq = line.match(/=\s*([^=]{2,80})$/);
    if (eq) return cleanLine(eq[1]);
    const ds = line.match(/Đáp\s*số[^:]*:\s*(.+)/i);
    if (ds) return cleanLine(ds[1]);
  }
  const joined = cleanLine(lines.slice(-3).join(" "));
  const eq = joined.match(/=\s*([^=]{2,60})$/);
  return eq ? cleanLine(eq[1]) : "";
}

function parseExercises(text, topicId) {
  const exercises = [];
  const practiceSection = text.match(/B\.\s*C[ÁA]C\s*D[ẠA]NG[\s\S]*/i)?.[0] || text;
  let baiIndex = 0;

  for (const m of practiceSection.matchAll(/Bài\s*(\d+)\s*[:\.]?\s*([\s\S]*?)(?=\nBài\s*\d+\s*[:\.]|\nD[ạa]ng\s*\d+\s*[:\.]|$)/gi)) {
    baiIndex += 1;
    if (baiIndex > 12) break;

    let block = m[2];
    const giảiIdx = block.search(/\n\s*Giải\s*\n/i);
    let questionPart = giảiIdx >= 0 ? block.slice(0, giảiIdx) : block.slice(0, 700);
    const solutionPart = giảiIdx >= 0 ? block.slice(giảiIdx) : "";

    questionPart = cleanText(questionPart).replace(/\n+/g, " ").slice(0, 420);
    if (questionPart.length < 25) continue;

    const subs = [...questionPart.matchAll(/([a-d])\)\s*([^;]+?)(?=\s*[a-d]\)|$)/gi)];
    const answer = extractAnswerFromSolution(solutionPart);

    if (subs.length >= 2) {
      subs.slice(0, 2).forEach((sub, si) => {
        const q = `${sub[2].trim()}`.slice(0, 280);
        if (q.length < 8) return;
        if (si === 0 && answer) {
          exercises.push({
            id: `st_${topicId}_bai${m[1]}_${sub[1]}`,
            topic: topicId,
            source: "special_topic",
            section: `Bài ${m[1]} — ý ${sub[1]}`,
            type: "input",
            question: `Bài ${m[1]}${sub[1]}): ${q}`,
            answer,
            hint: solutionPart.slice(0, 220).replace(/\s+/g, " ") || "Xem lời giải mẫu trong tài liệu PDF.",
            solution: cleanText(solutionPart).slice(0, 600)
          });
        }
      });
    } else if (/khoanh|chọn|đúng.*sai|Đ\s*S/i.test(questionPart)) {
      exercises.push({
        id: `st_${topicId}_bai${m[1]}_mc`,
        topic: topicId,
        source: "special_topic",
        section: `Bài ${m[1]} — Trắc nghiệm`,
        type: "multiple_choice",
        question: questionPart.slice(0, 320),
        choices: ["Đúng", "Sai", "Không xác định", "Cả A và B"],
        answer: answer && /sai/i.test(answer) ? "Sai" : "Đúng",
        hint: "Đọc kỹ mệnh đề trong tài liệu gốc.",
        solution: cleanText(solutionPart).slice(0, 400)
      });
    } else {
      if (!answer || answer === "đúng") {
        if (solutionPart.length > 80) {
          exercises.push({
            id: `st_${topicId}_bai${m[1]}_tl`,
            topic: topicId,
            source: "special_topic",
            section: `Bài ${m[1]} — Tự luận`,
            type: "multiple_choice",
            question: `${questionPart.slice(0, 300)} (Chọn hướng giải phù hợp)`,
            choices: [
              "Áp dụng hằng đẳng thức / công thức đã học",
              "Đặt nhân tử chung hoặc nhóm hạng",
              "Biến đổi tương đương rồi rút gọn",
              "Thay số và tính trực tiếp"
            ],
            answer: "Áp dụng hằng đẳng thức / công thức đã học",
            hint: cleanText(solutionPart).slice(0, 220),
            solution: cleanText(solutionPart).slice(0, 600)
          });
        }
        continue;
      }
      exercises.push({
        id: `st_${topicId}_bai${m[1]}`,
        topic: topicId,
        source: "special_topic",
        section: `Bài ${m[1]} — Tự luận`,
        type: "input",
        question: questionPart.slice(0, 350),
        answer: answer || "đúng",
        hint: solutionPart.slice(0, 200).replace(/\s+/g, " ") || "Tham khảo lời giải trong PDF.",
        solution: cleanText(solutionPart).slice(0, 600)
      });
    }
  }

  return exercises.slice(0, 15);
}

function sanitizeExercise(exercise) {
  const out = { ...exercise };
  for (const key of ["question", "answer", "hint", "solution", "section"]) {
    if (out[key]) out[key] = fixPdfMath(out[key]);
  }
  if (Array.isArray(out.choices)) {
    out.choices = out.choices.map((c) => fixPdfMath(c));
  }
  return out;
}

function buildMcFromTheory(theoryItems, topicId) {
  const mc = [];
  const pool = theoryItems
    .filter((t) => t.kind === "theory")
    .map((t) => {
      const split = splitColonContent(t.body);
      return split ? { ...t, front: split.front, back: split.back } : null;
    })
    .filter((t) => t && t.back.length > 20 && t.back.length < 200);
  pool.slice(0, 8).forEach((item, i) => {
    const correct = item.back.slice(0, 120);
    const others = pool.filter((x) => x !== item).map((x) => x.back.slice(0, 120));
    const distractors = shuffle(others).slice(0, 3);
    while (distractors.length < 3) distractors.push("Không áp dụng được");
    const choices = shuffle([correct, ...distractors]);
    mc.push({
      id: `st_${topicId}_lt_mc${i + 1}`,
      topic: topicId,
      source: "special_topic",
      section: `Lý thuyết — ${item.title}`,
      type: "multiple_choice",
      question: `${item.front} — chọn công thức/phát biểu đúng:`,
      choices,
      answer: correct,
      hint: item.back,
      solution: item.back
    });
  });
  return mc;
}

function splitColonContent(text) {
  const cleaned = fixPdfMath(text);
  const idx = cleaned.indexOf(":");
  if (idx < 0) return null;
  const front = cleaned.slice(0, idx).trim();
  const back = cleaned.slice(idx + 1).trim();
  if (front.length < 3 || back.length < 3) return null;
  return { front, back };
}

function buildFlashCards(theoryItems, topic) {
  const cards = [];
  cards.push({
    id: `${topic.id}_intro`,
    front: `${topic.code}: ${topic.title}`,
    back: `Chuyên đề ${topic.title} — ôn lý thuyết và luyện bài tập trắc nghiệm/tự luận.`,
    tag: "Giới thiệu"
  });

  const theoryOnly = theoryItems.filter((item) => item.kind === "theory");
  let cardIndex = 0;
  theoryOnly.forEach((item) => {
    const split = splitColonContent(item.body);
    if (!split) return;
    cardIndex += 1;
    cards.push({
      id: `${topic.id}_fc_${cardIndex}`,
      front: split.front,
      back: split.back,
      tag: "Lý thuyết"
    });
  });

  return cards;
}

async function ensureText(pdfPath, baseName) {
  const outPath = join(TEXT_DIR, `${baseName}.txt`);
  try {
    await readFile(outPath, "utf8");
    return outPath;
  } catch {
    execSync(`pdftotext "${pdfPath}" "${outPath}"`, { stdio: "pipe" });
    return outPath;
  }
}

async function main() {
  const catalog = JSON.parse(await readFile("data/special-topics.json", "utf8"));
  const lessons = [];
  const exercises = [];
  const flashDecks = {};

  for (const topic of catalog.topics) {
    if (!topic.pdf) continue;
    const baseName = topic.pdf.split("/").pop().replace(/\.pdf$/i, "");
    const textPath = await ensureText(topic.pdf, baseName);
    const text = cleanText(await readFile(textPath, "utf8"));

    const theorySection = extractTheorySection(text);
    let theoryItems = parseTheoryItems(theorySection);

    if (theoryItems.length < 2) {
      theoryItems = parseTheoryItems(text.slice(0, 15000));
    }

    const cards = buildFlashCards(theoryItems, topic);
    flashDecks[topic.id] = cards;

    lessons.push({
      id: topic.id,
      topicId: topic.id,
      code: topic.code,
      title: topic.title,
      categoryTitle: topic.categoryTitle,
      cardCount: cards.length,
      theoryCount: theoryItems.filter((item) => item.kind === "theory").length
    });

    const baiExercises = parseExercises(text, topic.id).map(sanitizeExercise);
    const mcExercises = buildMcFromTheory(theoryItems, topic.id).map(sanitizeExercise);
    exercises.push(...mcExercises, ...baiExercises);
  }

  const payload = {
    meta: {
      title: "Ôn chuyên đề Toán",
      subtitle: "Flash Study + bài tập trắc nghiệm & tự luận từ tài liệu special-topic",
      topicCount: lessons.length,
      exerciseCount: exercises.length,
      flashCardCount: Object.values(flashDecks).reduce((a, d) => a + d.length, 0)
    },
    lessons,
    flashDecks,
    exercises
  };

  await writeFile("data/special-topic-study.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `✓ special-topic-study.json — ${lessons.length} chủ đề, ${payload.meta.flashCardCount} thẻ, ${exercises.length} bài tập`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
