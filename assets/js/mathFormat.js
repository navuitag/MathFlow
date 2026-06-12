import { escapeHtml } from "./utils.js";

const FRAC_RE = /(\d+)\/(\d+)/g;
const SUB_RE = /([a-zA-Z])(_\{([^}]+)\}|_(\d+|[a-zA-Z]+))/g;
const SQRT_PAREN_RE = /√\(([^)]+)\)/g;
const SQRT_NUM_RE = /√(\d+)/g;

function wrapFrac(num, den) {
  return `<span class="math-frac" aria-label="${num}/${den}"><span class="math-num">${num}</span><span class="math-den">${den}</span></span>`;
}

function wrapSup(base, exp) {
  const clean = String(exp).replace(/^\{|\}$/g, "").replace(/^\(|\)$/g, "");
  return `<span class="math-inline"><span class="math-base">${base}</span><sup class="math-sup">${clean}</sup></span>`;
}

function wrapSub(base, sub) {
  return `<span class="math-inline"><span class="math-base">${base}</span><sub class="math-sub">${sub}</sub></span>`;
}

function normalizeUnicodeExponents(text) {
  return text
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/⁴/g, "^4")
    .replace(/ⁿ/g, "^n");
}

function replaceExponents(text) {
  const expPart = String.raw`\d+|[a-zA-Z]+`;
  const pattern = new RegExp(
    String.raw`\(([^)]*)\)\^(${expPart})|(?<!\d)([A-Z]{2})\^(${expPart})|(\d+(?:[,.]\d+)?|[a-zA-Z])\^(${expPart})`,
    "g"
  );

  return text.replace(pattern, (match, parenBase, parenExp, twoBase, twoExp, singleBase, singleExp) => {
    if (parenBase != null) return wrapSup(`(${parenBase})`, parenExp);
    if (twoBase != null) return wrapSup(twoBase, twoExp);
    if (singleBase != null) return wrapSup(singleBase, singleExp);
    return match;
  });
}

function replaceFractions(text) {
  return text.replace(FRAC_RE, (_, num, den) => wrapFrac(num, den));
}

function replaceSubscripts(text) {
  return text.replace(SUB_RE, (_, base, __, sub) => wrapSub(base, sub.replace(/^\{|\}$/g, "")));
}

function replaceSqrt(text) {
  return text
    .replace(SQRT_PAREN_RE, (_, inner) => `<span class="math-sqrt"><span class="math-sqrt-sign">√</span><span class="math-sqrt-body">${inner}</span></span>`)
    .replace(SQRT_NUM_RE, (_, n) => `<span class="math-sqrt">√<span class="math-sqrt-body">${n}</span></span>`);
}

function replaceOperators(text) {
  return text
    .replace(/(\d)\*(\d)/g, "$1·$2")
    .replace(/\)\*(\d)/g, ")·$1")
    .replace(/(\d)\*\(/g, "$1·(")
    .replace(/(\d)\*([a-zA-Z])/g, "$1·$2")
    .replace(/([a-zA-Z])\*(\d)/g, "$1·$2")
    .replace(/(\d)\/(\d)\s*\*\s*(\d)/g, "$1/$2 · $3")
    .replace(/\s*\*\s*/g, " · ");
}

/** Chuyển văn bản thuần (2^3, 1/2, x_1) sang HTML toán học an toàn. */
export function formatMathHtml(value) {
  if (value == null || value === "") return "";
  let text = escapeHtml(String(value));

  text = normalizeUnicodeExponents(text);
  text = replaceSqrt(text);
  text = replaceOperators(text);
  text = replaceExponents(text);
  text = replaceSubscripts(text);
  text = replaceFractions(text);

  return text;
}

/** Gắn class math-content cho container sau khi render DOM. */
export function bindMathContent(root = document) {
  root.querySelectorAll(".math-content").forEach((el) => {
    if (el.dataset.mathBound === "1") return;
    el.dataset.mathBound = "1";
  });
}
