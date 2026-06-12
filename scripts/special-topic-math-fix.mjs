/**
 * Chuẩn hóa công thức toán trích từ PDF (font Symbol / PUA) → văn bản hiển thị được.
 */

/** Ký tự Private Use Area trong PDF → ký hiệu toán Unicode/ASCII. */
const PUA_MAP = new Map([
  ["\uf020", " "],
  ["\uf022", "-"],
  ["\uf024", "F"],
  ["\uf028", "("],
  ["\uf029", ")"],
  ["\uf02a", "×"],
  ["\uf02b", "+"],
  ["\uf02d", "-"],
  ["\uf031", "1"],
  ["\uf032", "2"],
  ["\uf033", "3"],
  ["\uf03a", ":"],
  ["\uf03c", "<"],
  ["\uf03d", "="],
  ["\uf03e", ">"],
  ["\uf044", "Δ"],
  ["\uf046", "∅"],
  ["\uf04d", "M"],
  ["\uf04e", "N"],
  ["\uf050", "P"],
  ["\uf052", "R"],
  ["\uf056", "Δ"],
  ["\uf05a", "Z"],
  ["\uf05e", "∥"],
  ["\uf067", "+"],
  ["\uf06d", "μ"],
  ["\uf06f", "°"],
  ["\uf070", "π"],
  ["\uf075", "u"],
  ["\uf076", "v"],
  ["\uf077", "w"],
  ["\uf078", "x"],
  ["\uf07b", "{"],
  ["\uf07d", "}"],
  ["\uf07e", "≅"],
  ["\uf084", "⊂"],
  ["\uf085", "⊃"],
  ["\uf0a1", "ℝ"],
  ["\uf0a2", "′"],
  ["\uf0a3", "≤"],
  ["\uf0a5", "≥"],
  ["\uf0a7", "≠"],
  ["\uf0b0", "°"],
  ["\uf0b1", "±"],
  ["\uf0b3", "±"],
  ["\uf0b4", "×"],
  ["\uf0b5", "∠"],
  ["\uf0b6", "∠"],
  ["\uf0b7", "∠"],
  ["\uf0b9", "≠"],
  ["\uf0ba", "⊥"],
  ["\uf0bb", "⌢"],
  ["\uf0bc", "⌢"],
  ["\uf0ce", "∈"],
  ["\uf0d7", "÷"],
  ["\uf0db", "⇔"],
  ["\uf0de", "⇒"],
  ["\uf0e6", "·"],
  ["\uf0e7", "⊥"],
  ["\uf0e8", "²"],
  ["\uf0e9", "√"],
  ["\uf0ea", ""],
  ["\uf0eb", ""],
  ["\uf0ec", ""],
  ["\uf0ed", "|"],
  ["\uf0ee", "∥"],
  ["\uf0ef", "⊥"],
  ["\uf0f3", "∪"],
  ["\uf0f6", ""],
  ["\uf0f7", ""],
  ["\uf0f8", ""],
  ["\uf0f9", ""],
  ["\uf0fa", ""],
  ["\uf0fb", ""],
  ["\uf0fc", "²"],
  ["\uf0fd", "³"],
  ["\uf0fe", "⁴"]
]);

/** Công thức chuẩn thay cho các hằng đẳng thức hay bị lỗi khi trích PDF. */
const KNOWN_FORMULAS = [
  ["Bình phương của một tổng:.*", "Bình phương của một tổng: (A + B)^2 = A^2 + 2AB + B^2"],
  ["Bình phương của một hiệu:.*", "Bình phương của một hiệu: (A - B)^2 = A^2 - 2AB + B^2"],
  ["Hiệu hai bình phương:.*", "Hiệu hai bình phương: A^2 - B^2 = (A - B)(A + B)"],
  ["Lập phương của một tổng:.*", "Lập phương của một tổng: (A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3"],
  ["Lập phương của một hiệu:.*", "Lập phương của một hiệu: (A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3"],
  ["Tổng hai lập phương: A\\^3 \\+ B\\^3 = \\(A \\+ B\\).*- 3AB.*", "Tổng hai lập phương: A^3 + B^3 = (A + B)^3 - 3AB(A + B)"],
  ["Tổng hai lập phương: A\\^3 \\+ B\\^3 = \\(A \\+ B\\).*", "Tổng hai lập phương: A^3 + B^3 = (A + B)(A^2 - AB + B^2)"],
  ["Hiệu hai lập phương:.*", "Hiệu hai lập phương: A^3 - B^3 = (A - B)(A^2 + AB + B^2)"],
  ["Tổng hai bình phương:.*", "Tổng hai bình phương: A^2 + B^2 = (A + B)^2 - 2AB"],
  ["Bình phương của tổng 3 số hạng:.*", "Bình phương của tổng 3 số hạng: (A + B + C)^2 = A^2 + B^2 + C^2 + 2(AB + BC + CA)"],
  ["Lập phương của tổng 3 số hạng:.*", "Lập phương của tổng 3 số hạng: (A + B + C)^3 = A^3 + B^3 + C^3 + 3(A + B)(B + C)(C + A)"],
  ["BC\\^2 = AB\\^2 \\+ AC\\^2", "BC^2 = AB^2 + AC^2"],
  ["a\\^2 \\+ b\\^2 = c\\^2", "a^2 + b^2 = c^2"]
];

function replacePuaChars(text) {
  let out = text;
  for (const [pua, sym] of PUA_MAP) {
    out = out.split(pua).join(sym);
  }
  return out.replace(/[\uf000-\uf8ff]/g, "");
}

/** Gộp dòng chỉ chứa số mũ (2, 3…) vào biểu thức phía trên. */
function fixOrphanExponentLines(text) {
  const lines = text.split("\n");
  const result = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    if (nextLine && /^\s*([2-9])\s*$/.test(nextLine)) {
      const exp = nextLine.trim();
      if (/[A-Za-z0-9)\}=]/.test(line) && !/^(Dạng|Bài|Giải|Phương pháp|\d+\.)/i.test(line.trim())) {
        let fixed = line;
        const parenMatch = line.match(/\([^)]+\)/);
        if (parenMatch && line.includes("=") && !parenMatch[0].includes("^")) {
          fixed = line.replace(parenMatch[0], `${parenMatch[0]}^${exp}`);
        } else if (/=\s*[^=]+$/.test(line)) {
          const eqIdx = line.indexOf("=");
          const lhs = line.slice(0, eqIdx).trim();
          if (lhs.endsWith(")") && !lhs.includes("^")) {
            fixed = line.replace(lhs, `${lhs}^${exp}`);
          }
        }
        result.push(fixed);
        i += 1;
        continue;
      }
    }
    result.push(line);
  }
  return result.join("\n");
}

/** A2, AB2, x2 → dạng mũ (không áp vào tiếng Việt). */
function fixVariableExponents(text) {
  return text
    .replace(/\b([A-Z]{2,3})\s*([2-9])(?![0-9A-Za-zÀ-ỹ])/g, (_, seg, e) => `${seg}^${e}`)
    .replace(/\b([A-Z])\s*([2-9])(?![0-9A-Za-zÀ-ỹ])/g, (_, v, e) => `${v}^${e}`)
    .replace(/(?<=[=(+\-*/\s,]|^)([xyzabcmpqntuvw])\s*([2-9])(?![0-9A-Za-zÀ-ỹ])/gi, (_, v, e) => `${v}^${e}`)
    .replace(/(?<=[=(+\-*/\s]|^)([xyzabcmpqntuvw])\s+([2-9])(?=\s*[,;.)}\]|$|[+\-=])/gi, (_, v, e) => `${v}^${e}`);
}

/** √x-3 → √(x-3); căn thức thiếu dấu √ trước biểu thức A khi ngữ cảnh căn bậc hai. */
function fixSqrtNotation(text) {
  return text
    .replace(/√\s*([A-Za-z0-9]+)\s*-\s*(\d+)/g, "√($1-$2)")
    .replace(/√\s*([A-Za-z0-9]+)\s*\+\s*(\d+)/g, "√($1+$2)")
    .replace(/√\s*([A-Za-z][A-Za-z0-9+\- ]*?)(?=\s*=|\s+[⇔≤≥<>]|$)/g, (_, inner) => {
      const trimmed = inner.trim();
      if (trimmed.includes("(")) return `√${trimmed}`;
      return `√(${trimmed})`;
    })
    .replace(/(\d)\s*√\(/g, "$1√(");
}

function fixMathSpacing(text) {
  return text
    .replace(/(\d)\s+([A-Z(])/g, "$1$2")
    .replace(/(\d)\s+([xyzabcmpqntuvw])(?![A-Za-zÀ-ỹ])/gi, "$1$2")
    .replace(/([A-Za-z)]\)\}])\s*([+\-=])/g, "$1 $2 ")
    .replace(/\s{2,}/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/,\s+/g, ", ")
    .replace(/(\d)\s*,\s*(\d)/g, "$1,$2");
}

function applyKnownFormulas(text) {
  let out = text;
  for (const [pattern, replacement] of KNOWN_FORMULAS) {
    out = out.replace(new RegExp(pattern, "i"), replacement);
  }
  return out;
}

function stripPdfNoise(text) {
  return text
    .replace(/TOÁN HỌC SƠ ĐỒ[^.]*\.(?:TOANMATH\.com)?/gi, "")
    .replace(/THCS\.TOANMATH\.com/gi, "")
    .replace(/\^7hằng/gi, " 7 hằng")
    .replace(/tổng\^3số/gi, "tổng 3 số")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function fixSuperscriptArtifacts(text) {
  return text
    .replace(/\(A \+ B\) - 2AB\s+2\b/g, "(A + B)^2 - 2AB")
    .replace(/\(A \+ B\) - 3AB \(A \+ B\)\s+3\b/g, "(A + B)^3 - 3AB(A + B)")
    .replace(/²\s*2\b/g, "²")
    .replace(/³\s*3\b/g, "³")
    .replace(/\^2\s*2\b/g, "^2")
    .replace(/\^3\s*3\b/g, "^3")
    .replace(/([A-Za-z])\^(\d)\s+\2\b/g, "$1^$2");
}

/** Chuẩn hóa một dòng (không xử lý mũ trên dòng riêng). */
export function fixPdfMathLine(text) {
  if (!text) return "";
  let out = replacePuaChars(text);
  out = fixVariableExponents(out);
  out = fixSqrtNotation(out);
  out = fixMathSpacing(out);
  out = fixSuperscriptArtifacts(out);
  out = applyKnownFormulas(out);
  out = stripPdfNoise(out);
  return out.replace(/\s+/g, " ").trim();
}

/** Chuẩn hóa một đoạn văn bản có công thức toán. */
export function fixPdfMath(raw) {
  if (!raw) return "";
  let text = replacePuaChars(String(raw));
  text = fixOrphanExponentLines(text);
  text = fixVariableExponents(text);
  text = fixSqrtNotation(text);
  text = fixMathSpacing(text);
  text = fixSuperscriptArtifacts(text);
  text = applyKnownFormulas(text);
  text = stripPdfNoise(text);
  return text.replace(/\s+/g, " ").trim();
}

/** Chuẩn hóa cả khối văn bản (giữ xuống dòng). */
export function fixPdfMathBlock(raw) {
  if (!raw) return "";
  let text = String(raw)
    .replace(/\u0000/g, "")
    .replace(/\f/g, "\n");
  text = replacePuaChars(text);
  text = fixOrphanExponentLines(text);
  return text
    .split("\n")
    .map((line) => fixPdfMathLine(line))
    .filter(Boolean)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
