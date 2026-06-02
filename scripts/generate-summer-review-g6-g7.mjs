/**
 * Sinh nội dung Ôn hè Toán lớp 6 → lớp 7 (6 chủ đề + 10 đề).
 * Nguồn: Tài liệu ôn hè TOÁN Lớp 6 lên 7 (10 chuyên đề).
 * Chạy: node scripts/generate-summer-review-g6-g7.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE =
  "Tài liệu ôn hè Toán lớp 6 lên lớp 7 — 10 chuyên đề (nội dung tương tác biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr6_sets",
    order: 1,
    title: "Tập hợp",
    emoji: "📋",
    description: "Ký hiệu ∈, ∉; liệt kê tập hợp; giao, hiệu; đếm phần tử.",
    prerequisite: [],
    xp: 50,
    keypoints: [
      "Tập hợp liệt kê trong { } hoặc mô tả tính chất đặc trưng.",
      "x ∈ A: x thuộc A; x ∉ A: x không thuộc A.",
      "A ∩ B: phần tử thuộc cả A và B.",
      "Số phần tử dãy cách đều = (cuối − đầu) : bước + 1."
    ],
    questions: [
      ["input", "Cho P = các chữ cái trong NGÂN HÀNG (bỏ trùng, dùng A G H N). |P| = ?", "4", "4 chữ cái khác nhau."],
      ["input", "B = {số chẵn tự nhiên nhỏ hơn 8}. Viết B (cách nhau bằng ;)", "0; 2; 4; 6", "0, 2, 4, 6."],
      ["input", "M = {1;2;3;4;5;6}, N = {8;7;6;5;4}. M ∩ N = ? (dạng 4;5;6)", "4; 5; 6", "Phần tử chung."],
      ["input", "M = {1;2;3;4;5;6}, N = {8;7;6;5;4}. M \\ N = ? (phần tử thuộc M không thuộc N)", "1; 2; 3", "1, 2, 3."],
      ["input", "Số số lẻ 3 chữ số có bao nhiêu phần tử?", "450", "101→999, bước 2: (999-101):2+1."],
      ["input", "Số số chẵn tự nhiên nhỏ hơn 200?", "100", "0,2,4,…,198 → 100 số."],
      ["input", "Đánh số trang sách 105 trang cần bao nhiêu chữ số?", "207", "9 + 180 + 18 = 207."],
      ["multiple_choice", "A = {1;3;5}, B = {2;3;4}. A ∩ B là?", ["{1;2;3;4;5}", "{3}", "{1;5}", "∅"], "{3}", "Chỉ 3 chung."],
      ["input", "Số tự nhiên lẻ > 10 và < 200 có bao nhiêu phần tử?", "95", "11→199, bước 2: 95 số."],
      ["input", "Tập {x ∈ N | x < 5} có bao nhiêu phần tử?", "5", "0,1,2,3,4 → 5 phần tử."]
    ]
  },
  {
    id: "sr6_divisibility",
    order: 2,
    title: "Số tự nhiên & chia hết",
    emoji: "🔢",
    description: "Tính nhanh, lũy thừa, dấu hiệu chia hết 2, 3, 5, 9.",
    prerequisite: ["sr6_sets"],
    xp: 50,
    keypoints: [
      "Giao hoán, kết hợp, phân phối với cộng/trừ/nhân.",
      "Chia có dư: a = b×q + r (0 ≤ r < b).",
      "Chia hết cho 2/5: chữ số cuối; cho 3/9: tổng chữ số.",
      "a^m × a^n = a^(m+n); (a^m)^n = a^(m×n)."
    ],
    questions: [
      ["input", "Tính nhanh: 392 + 46 + 54 + 308 = ?", "800", "(392+308)+(46+54)=800."],
      ["input", "Tính: 282 - 12 + 212 - 82 = ?", "400", "Nhóm (282-82)+(212-12)."],
      ["input", "2^5 × 2^3 = 2^? (gõ số mũ)", "8", "2^(5+3)=2^8."],
      ["input", "282 + 21 + 3003 - 27 có chia hết cho 3 không? (gõ co hoac khong)", "co", "Tổng CS = 3279, 3279:3=1093."],
      ["input", "295 - 281 + 910 + 14875 có chia hết cho 5 không? (gõ co hoac khong)", "co", "Chữ số cuối 5."],
      ["input", "10^3 = ?", "1000", "10×10×10."],
      ["input", "a^0 = ? (a ≠ 0, gõ 1)", "1", "Quy ước a^0 = 1."],
      ["input", "Tính: 2^4 + 3^2 = ?", "25", "16+9=25."],
      ["input", "Số 123456 có chia hết cho 9 không? (gõ co hoac khong)", "co", "Tổng CS = 21, chia 9."],
      ["multiple_choice", "Số nào chia hết cho cả 2 và 5?", ["123", "130", "135", "143"], "130", "Chữ số cuối 0."]
    ]
  },
  {
    id: "sr6_primes",
    order: 3,
    title: "Ước, bội & số nguyên tố",
    emoji: "🔍",
    description: "Ước, bội, SNT, hợp số, phân tích thừa số nguyên tố.",
    prerequisite: ["sr6_divisibility"],
    xp: 55,
    keypoints: [
      "SNT: chỉ có ước 1 và chính nó (>1).",
      "Hợp số: có hơn 2 ước.",
      "Kiểm tra SNT: không chia cho p nào với p² ≤ n.",
      "Phân tích TSNT: tách thành tích các SNT."
    ],
    questions: [
      ["input", "Số ước dương của 45?", "6", "1,3,5,9,15,45."],
      ["input", "Số bội dương của 12 và nhỏ hơn 80?", "5", "12,24,36,48,72."],
      ["input", "315 phân tích TSNT (dạng 3^a×5×7)", "3^2×5×7", "315=9×35=9×5×7."],
      ["input", "1021 có phải SNT không? (gõ co hoac khong)", "co", "Không chia cho p≤31."],
      ["input", "Trong (1990;2006) có bao nhiêu SNT? (1993,1997,1999,2003)", "4", "Loại 1991 vì chia 11."],
      ["input", "2414 + 9218 là hợp số? (gõ co hoac khong)", "co", "Tổng chẵn > 2 → chia 2."],
      ["input", "Tìm x ∈ N sao cho 41×x là SNT. x = ?", "1", "41×1=41 là SNT."],
      ["input", "150 = 2 × 3 × ? × 5", "5", "150=2×3×5×5."],
      ["multiple_choice", "Số nào là SNT?", ["21", "29", "33", "39"], "29", "29 chỉ chia 1 và 29."],
      ["input", "ƯCLN(24, 54) = ?", "6", "24=2³×3, 54=2×3³ → 2×3=6."]
    ]
  },
  {
    id: "sr6_gcd_lcm",
    order: 4,
    title: "ƯCLN & BCNN",
    emoji: "🔗",
    description: "Thuật toán ƯCLN, BCNN; bài toán chia nhóm, xếp hàng.",
    prerequisite: ["sr6_primes"],
    xp: 55,
    keypoints: [
      "ƯCLN: lấy TSNT chung, mũ nhỏ nhất.",
      "BCNN: lấy TSNT chung và riêng, mũ lớn nhất.",
      "ƯCLN×BCNN = a×b (với a, b nguyên dương).",
      "Chia nhóm đều: dùng ƯCLN."
    ],
    questions: [
      ["input", "BCNN(24, 18) = ?", "72", "2³×3²=72."],
      ["input", "ƯCLN(48, 36) = ?", "12", "2²×3=12."],
      ["input", "BCNN(15, 20) = ?", "60", "2²×3×5=60."],
      ["input", "Lớp 28 nam, 21 nữ. Chia tối đa bao nhiêu tổ (mỗi tổ cùng số nam/nữ)?", "7", "ƯCLN(28,21)=7."],
      ["input", "ƯCLN(12, 18) × BCNN(12, 18) = ? (bằng 12×18)", "216", "6×36=216=12×18."],
      ["input", "BCNN(8, 12) = ?", "24", "2³×3=24."],
      ["input", "ƯCLN(35, 49) = ?", "7", "7² chung."],
      ["input", "Hai số có tích 180, ƯCLN = 6. BCNN = ?", "30", "180:6=30."],
      ["multiple_choice", "ƯCLN(14, 21) bằng?", ["1", "7", "42", "294"], "7", "14=2×7, 21=3×7."],
      ["input", "BCNN(5, 9) = ?", "45", "5 và 9 nguyên tố cùng nhau."]
    ]
  },
  {
    id: "sr6_integers_fractions",
    order: 5,
    title: "Số nguyên & phân số",
    emoji: "➗",
    description: "Phép tính số nguyên; phân số; so sánh; tìm x; bài toán phân số.",
    prerequisite: ["sr6_gcd_lcm"],
    xp: 55,
    keypoints: [
      "Số nguyên: quy tắc dấu khi cộng/trừ/nhân/chia.",
      "Phân số cùng mẫu: cộng/trừ tử, giữ mẫu.",
      "Nhân phân số: tử×tử, mẫu×mẫu.",
      "So sánh PS cùng dấu: mẫu dương, tử lớn hơn thì PS lớn hơn."
    ],
    questions: [
      ["input", "341 : (-11) - 2^3 × 11 = ?", "-119", "-31 - 88 = -119."],
      ["input", "(-3) × (-4) × (-2) = ?", "-24", "12×(-2)=-24."],
      ["input", "(x - 125) × 21 = 0. x = ?", "125", "x - 125 = 0."],
      ["input", "1/2 + 1/3 = ? (dạng a/b rút gọn)", "5/6", "3/6+2/6=5/6."],
      ["input", "2/5 của 100 m là bao nhiêu m?", "40", "100×2:5=40."],
      ["input", "So sánh -2/9 và -3/11: gõ >, < hoặc =", ">", "-2/9 ≈ -0.22 > -0.27."],
      ["input", "3/4 - 1/2 = ?", "1/4", "3/4-2/4=1/4."],
      ["input", "2x + 3 = 5/3 (dạng phân số). x = ?", "-2/3", "2x=5/3-3= -4/3, x=-2/3."],
      ["input", "Giỏ 40 cam; táo = 9/10 cam; cam = 10/11 xoài. Tổng quả?", "76", "36+40=76."],
      ["input", "(-12) + 8 = ?", "-4", "8-12=-4."]
    ]
  },
  {
    id: "sr6_decimals_geometry",
    order: 6,
    title: "Thập phân & hình học",
    emoji: "📐",
    description: "Số thập phân, phần trăm; chu vi, diện tích; đối xứng; góc.",
    prerequisite: ["sr6_integers_fractions"],
    xp: 55,
    keypoints: [
      "Thập phân: nhân/chia trước, cộng/trừ sau.",
      "162% của x = 81 → x = 81 : 1.62.",
      "S_HCN = d×r; S_tam giác = đáy×cao:2.",
      "Trục đối xứng: hai nửa hình đối nhau qua đường thẳng."
    ],
    questions: [
      ["input", "(-2.24 + 34.6) : 0.25 = ?", "129.44", "32.36:0.25=129.44."],
      ["input", "3.9x + 0.1x = 2.7. x = ?", "0.675", "4x=2.7, x=0.675."],
      ["input", "162% của một số bằng 81. Số đó?", "50", "81:1.62=50."],
      ["input", "5 và 8: tỉ số % của 5 so với 8 = ? % (gõ 62.5)", "62.5", "5:8×100=62.5%."],
      ["input", "HCN AB=3, AD=4. Chu vi = ? (đơn vị cùng đề)", "14", "(3+4)×2=14."],
      ["input", "Tam giác vuông đáy 6 cm, cao 4 cm. Diện tích = ? cm2", "12", "6×4:2=12."],
      ["input", "n điểm, không 3 thẳng hàng, 120 đoạn thẳng. n = ?", "16", "n(n-1):2=120 → n=16."],
      ["input", "Thoi đường chéo 6 cm và 8 cm. Diện tích = ? cm2", "24", "6×8:2=24."],
      ["input", "AB=4 cm, O trung điểm. OA = ? cm", "2", "4:2=2."],
      ["multiple_choice", "Hình nào luôn có trục đối xứng?", ["Tam giác bất kỳ", "Chữ cái H", "Parallelogram tùy ý", "Số 7"], "Chữ cái H", "H đối xứng trái-phải."]
    ]
  }
];

function buildTopicQuestions() {
  const questions = [];
  for (const topic of topics) {
    topic.questions.forEach((q, i) => {
      const id = `${topic.id}_q${i + 1}`;
      if (q[0] === "multiple_choice") {
        questions.push({
          id,
          skill: topic.id,
          topic: topic.id,
          type: "multiple_choice",
          question: q[1],
          choices: q[2],
          answer: q[3],
          hint: q[4]
        });
      } else {
        questions.push({
          id,
          skill: topic.id,
          topic: topic.id,
          type: "input",
          question: q[1],
          answer: q[2],
          hint: q[3]
        });
      }
    });
  }
  return questions;
}

const examDefs = [
  {
    n: 1,
    items: [
      { type: "input", q: "Đề 1 (CD1) — Số lẻ 3 chữ số có bao nhiêu phần tử?", a: "450", h: "101→999." },
      { type: "input", q: "Đề 1 — M∩N với M={1..6}, N={4..8} (giao) = ? (4;5;6)", a: "4; 5; 6", h: "Phần tử chung." },
      { type: "input", q: "Đề 1 — Đánh số 105 trang cần ? chữ số", a: "207", h: "9+180+18." },
      {
        type: "multiple_choice",
        q: "Đề 1 — Ký hiệu x thuộc A?",
        choices: ["x ⊂ A", "x ∈ A", "x ∉ A", "A ∈ x"],
        a: "x ∈ A",
        h: "∈ nghĩa là thuộc."
      },
      { type: "input", q: "Đề 1 — Tập số chẵn < 8 có mấy phần tử?", a: "4", h: "0,2,4,6." }
    ]
  },
  {
    n: 2,
    items: [
      { type: "input", q: "Đề 2 (CD2) — 392+46+54+308 = ?", a: "800", h: "Tính nhanh." },
      { type: "input", q: "Đề 2 — 282+21+3003-27 chia 3? (co/khong)", a: "co", h: "Tổng CS chia 3." },
      { type: "input", q: "Đề 2 — 2^6 = ?", a: "64", h: "2×2×2×2×2×2." },
      {
        type: "multiple_choice",
        q: "Đề 2 — Số chia hết cho 5?",
        choices: ["123", "240", "331", "442"],
        a: "240",
        h: "CS cuối 0 hoặc 5."
      },
      { type: "input", q: "Đề 2 — 10^4 = ?", a: "10000", h: "10 nghìn." }
    ]
  },
  {
    n: 3,
    items: [
      { type: "input", q: "Đề 3 (CD3) — ƯCLN(24,54) = ?", a: "6", h: "2×3." },
      { type: "input", q: "Đề 3 — 1021 là SNT? (co/khong)", a: "co", h: "Kiểm tra p²≤1021." },
      { type: "input", q: "Đề 3 — Số ước của 45?", a: "6", h: "6 ước." },
      {
        type: "multiple_choice",
        q: "Đề 3 — Số nào là hợp số?",
        choices: ["17", "23", "39", "41"],
        a: "39",
        h: "39=3×13."
      },
      { type: "input", q: "Đề 3 — 315 = 3^2 × 5 × ?", a: "7", h: "315=9×35." }
    ]
  },
  {
    n: 4,
    items: [
      { type: "input", q: "Đề 4 (CD4) — BCNN(24,18) = ?", a: "72", h: "2³×3²." },
      { type: "input", q: "Đề 4 — 28 nam, 21 nữ. Chia tối đa ? tổ", a: "7", h: "ƯCLN(28,21)." },
      { type: "input", q: "Đề 4 — ƯCLN(12,18) × BCNN(12,18) = ?", a: "216", h: "=12×18." },
      {
        type: "multiple_choice",
        q: "Đề 4 — BCNN(4,6) = ?",
        choices: ["2", "12", "24", "10"],
        a: "12",
        h: "2²×3."
      },
      { type: "input", q: "Đề 4 — ƯCLN(35,49) = ?", a: "7", h: "7 chung." }
    ]
  },
  {
    n: 5,
    items: [
      { type: "input", q: "Đề 5 (CD5) — 341:(-11)-2^3×11 = ?", a: "-119", h: "Số nguyên." },
      { type: "input", q: "Đề 5 — (x-125)×21=0. x = ?", a: "125", h: "x=125." },
      { type: "input", q: "Đề 5 — (-5)×(-6) = ?", a: "30", h: "Cùng dấu → dương." },
      {
        type: "multiple_choice",
        q: "Đề 5 — (-8)+3 = ?",
        choices: ["-11", "-5", "5", "11"],
        a: "-5",
        h: "3-8=-5."
      },
      { type: "input", q: "Đề 5 — (-20):4 = ?", a: "-5", h: "Khác dấu → âm." }
    ]
  },
  {
    n: 6,
    items: [
      { type: "input", q: "Đề 6 (CD6) — 1/2+1/3 = ? (a/b)", a: "5/6", h: "QS mẫu 6." },
      { type: "input", q: "Đề 6 — 2/5 của 100 = ?", a: "40", h: "Nhân 2:5." },
      { type: "input", q: "Đề 6 — 3/4-1/2 = ?", a: "1/4", h: "Trừ PS." },
      {
        type: "multiple_choice",
        q: "Đề 6 — -2/9 so với -3/11?",
        choices: ["-2/9 > -3/11", "-2/9 < -3/11", "Bằng nhau"],
        a: "-2/9 > -3/11",
        h: "Gần 0 hơn."
      },
      { type: "input", q: "Đề 6 — 2/3 × 3/4 = ?", a: "1/2", h: "6/12=1/2." }
    ]
  },
  {
    n: 7,
    items: [
      { type: "input", q: "Đề 7 (CD7) — (-2.24+34.6):0.25 = ?", a: "129.44", h: "Chia STP." },
      { type: "input", q: "Đề 7 — 162% của x = 81. x = ?", a: "50", h: "81:1.62." },
      { type: "input", q: "Đề 7 — 3.9x+0.1x=2.7. x = ?", a: "0.675", h: "4x=2.7." },
      {
        type: "multiple_choice",
        q: "Đề 7 — 5.730 và 5.73?",
        choices: ["5.730 > 5.73", "5.730 < 5.73", "5.730 = 5.73"],
        a: "5.730 = 5.73",
        h: "Bớt 0 không đổi."
      },
      { type: "input", q: "Đề 7 — 5:8 = ? % (gõ 62.5)", a: "62.5", h: "5:8×100." }
    ]
  },
  {
    n: 8,
    items: [
      { type: "input", q: "Đề 8 (CD8) — HCN 3×4, chu vi = ?", a: "14", h: "(3+4)×2." },
      { type: "input", q: "Đề 8 — HV cạnh 5 cm, diện tích = ? cm2", a: "25", h: "5×5." },
      { type: "input", q: "Đề 8 — Tam giác đáy 10, cao 6. S = ? cm2", a: "30", h: "10×6:2." },
      {
        type: "multiple_choice",
        q: "Đề 8 — Thoi có đường chéo vuông góc?",
        choices: ["Luôn đúng", "Không bao giờ", "Chỉ khi vuông", "Không xác định"],
        a: "Luôn đúng",
        h: "Tính chất thoi."
      },
      { type: "input", q: "Đề 8 — Thoi đường chéo 10 và 8. S = ? cm2", a: "40", h: "10×8:2." }
    ]
  },
  {
    n: 9,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 9 (CD9) — Hình có tâm đối xứng?",
        choices: ["Chữ H", "Chữ F", "Tam giác tùy ý", "Hình bất kỳ"],
        a: "Chữ H",
        h: "Quay 180° trùng nhau."
      },
      { type: "input", q: "Đề 9 — AB=4 cm, O trung điểm. OA = ? cm", a: "2", h: "4:2." },
      { type: "input", q: "Đề 9 — Thoi có nửa đường chéo OA=3, OB=2 cm. S = ? cm2", a: "12", h: "6×4:2=12." },
      {
        type: "multiple_choice",
        q: "Đề 9 — Trục đối xứng của chữ A?",
        choices: ["Không có", "1 trục dọc", "2 trục", "Vô số"],
        a: "1 trục dọc",
        h: "Đối xứng trái-phải."
      },
      { type: "input", q: "Đề 9 — HV cạnh 6. Chu vi = ? cm", a: "24", h: "6×4." }
    ]
  },
  {
    n: 10,
    items: [
      { type: "input", q: "Đề 10 (CD10) — n điểm, 120 đoạn, n = ?", a: "16", h: "n(n-1):2=120." },
      { type: "input", q: "Đề 10 — Tia Ox, OA=3, OB=6. A là trung điểm OB? (co/khong)", a: "co", h: "3=6:2." },
      {
        type: "multiple_choice",
        q: "Đề 10 — Góc bẹt bằng bao nhiêu độ?",
        choices: ["90", "180", "360", "0"],
        a: "180",
        h: "Góc bẹt = 180°."
      },
      { type: "input", q: "Đề 10 — Góc vuông = ? độ", a: "90", h: "Vuông = 90°." },
      { type: "input", q: "Đề 10 — Đoạn AB=8 cm, M trung điểm. AM = ? cm", a: "4", h: "8:2=4." }
    ]
  }
];

function buildExamQuestions() {
  const questions = [];
  for (const exam of examDefs) {
    exam.items.forEach((item, idx) => {
      const base = {
        id: `exam6_${exam.n}_q${idx + 1}`,
        skill: `exam6_${exam.n}`,
        exam: `exam6_${exam.n}`
      };
      if (item.type === "multiple_choice") {
        questions.push({
          ...base,
          type: "multiple_choice",
          question: item.q,
          choices: item.choices,
          answer: item.a,
          hint: item.h
        });
      } else {
        questions.push({
          ...base,
          type: "input",
          question: item.q,
          answer: item.a,
          hint: item.h
        });
      }
    });
  }
  return questions;
}

const topicLessons = topics.map((t) => ({
  id: t.id,
  title: t.title,
  topic: t.id,
  source: SOURCE,
  xp: t.xp,
  steps: [
    { type: "intro", title: "Mục tiêu chủ đề", content: t.description },
    {
      type: "keypoints",
      title: "Kiến thức cần nhớ",
      content: "Nắm vững các ý sau trước khi luyện:",
      points: t.keypoints
    },
    {
      type: "summary",
      title: "Sẵn sàng thử thách?",
      content: `Hoàn thành ${t.questions.length} câu để nhận sao và mở khóa đề tiếp theo!`
    }
  ]
}));

const exams = examDefs.map((exam, i) => ({
  id: `exam6_${exam.n}`,
  order: exam.n,
  title: `Đề ôn số ${exam.n}`,
  questionCount: 5,
  xp: 60,
  passScore: 4,
  prerequisite: i === 0 ? ["sr6_sets"] : [`exam6_${exam.n - 1}`]
}));

const payload = {
  meta: {
    id: "summer_g6_g7",
    packId: "g6-g7",
    title: "Ôn hè Toán lớp 6 → lớp 7",
    subtitle: "6 chủ đề tương tác + 10 đề tổng hợp (10 chuyên đề)",
    gradeFrom: 6,
    gradeTo: 7,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g6-g7.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `✓ summer-review-g6-g7.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`
);
