/**
 * Sinh nội dung Ôn hè Toán lớp 2 → lớp 3 (4 chủ đề + 19 đề).
 * Chạy: node scripts/generate-summer-review-g2-g3.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE = "Chuyên đề Ôn hè Toán lớp 2 - lên 3 (nội dung tương tác tự biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr2_arithmetic",
    order: 1,
    title: "Số học",
    emoji: "🔢",
    description: "Cấu tạo số đến 1000, cộng trừ, nhân chia, tìm số chưa biết.",
    prerequisite: [],
    xp: 45,
    keypoints: [
      "Số 3 chữ số: hàng trăm, chục, đơn vị (267 = 2 trăm 6 chục 7 đơn vị).",
      "Giá trị chữ số phụ thuộc vị trí: trong 856, chữ số 8 có giá trị 800.",
      "Số liền trước/sau; số tròn chục, tròn trăm.",
      "Cộng/trừ đặt tính; nhân/chia bảng; tìm y trong phép tính."
    ],
    questions: [
      ["input", "Viết số: hai trăm sáu mươi bảy.", "267", "2 trăm 6 chục 7 đơn vị = 267."],
      ["input", "Số có 9 trăm, 6 chục, 2 đơn vị viết là?", "962", "9 trăm 6 chục 2 đơn vị = 962."],
      ["input", "Số liền trước của 356 là?", "355", "356 - 1 = 355."],
      ["input", "Số liền sau của 999 là?", "1000", "999 + 1 = 1000."],
      ["multiple_choice", "Chữ số 8 trong số 856 có giá trị là?", ["800 đơn vị", "80 đơn vị", "8 đơn vị"], "800 đơn vị", "8 ở hàng trăm → 800."],
      ["input", "Viết tách số: 754 = ? + ? + ? (dùng dấu +)", "700 + 50 + 4", "700 + 50 + 4 = 754."],
      ["input", "Tính nhẩm: 20 × 3 = ?", "60", "2 chục × 3 = 6 chục = 60."],
      ["input", "Tìm y: y – 12 = 345. y = ?", "357", "345 + 12 = 357."],
      ["input", "Tính: 820 – 486 = ?", "334", "Đặt tính trừ có nhớ."],
      ["input", "Tính nhanh: 1+2+3+4+5+6+7+8+9 = ?", "45", "(1+9)+(2+8)+…+5 = 45."],
      ["input", "Tìm y: 6 × y = 34 + 14. y = ?", "8", "6y = 48 → y = 8."],
      ["multiple_choice", "Số lớn nhất có ba chữ số là?", ["999", "990", "1000", "989"], "999", "999 là số lớn nhất 3 chữ số."]
    ]
  },
  {
    id: "sr2_quantity",
    order: 2,
    title: "Đại lượng",
    emoji: "⚖️",
    description: "Kg, lít, mét, dm, cm, mm; thời gian, tiền Việt Nam.",
    prerequisite: ["sr2_arithmetic"],
    xp: 45,
    keypoints: [
      "1 m = 100 cm; 1 dm = 10 cm; 1 km = 1000 m.",
      "Quy đổi và so sánh đơn vị trước khi tính.",
      "Đọc giờ đúng; 1 tuần = 7 ngày.",
      "Tiền VN: 100đ, 200đ, 500đ, 1000đ."
    ],
    questions: [
      ["input", "1 m = ? cm", "100", "1 mét = 100 xăng-ti-mét."],
      ["input", "200 cm = ? m", "2", "200 : 100 = 2 m."],
      ["input", "5 m 2 cm = ? cm", "502", "5m = 500cm; 500 + 2 = 502."],
      ["multiple_choice", "Chiếc bút bi dài khoảng?", ["15 cm", "15 m", "15 mm", "15 dm"], "15 cm", "Bút bi dùng cm."],
      ["input", "Một tuần lễ có bao nhiêu ngày?", "7", "7 ngày trong tuần."],
      ["input", "Can to đựng 10 lít, can bé ít hơn 5 lít. Can bé đựng bao nhiêu lít?", "5", "10 - 5 = 5 lít."],
      ["input", "Hùng có 100đ + 200đ + 500đ. Tổng cộng bao nhiêu đồng?", "800", "100+200+500=800."],
      ["input", "Bơm xong lúc 9 giờ sáng + 6 giờ nữa là mấy giờ? (gõ số 1-24)", "15", "9 + 6 = 15 giờ = 3 giờ chiều."],
      ["input", "Bạn nặng 31 kg, Hà nhẹ hơn bạn 3 kg. Hà nặng bao nhiêu kg?", "28", "31 - 3 = 28 kg."],
      ["input", "Tàu cách đèn hiệu 4 km, đèn cách bờ 3 km. Tàu cách bờ bao nhiêu km?", "1", "4 - 3 = 1 km."]
    ]
  },
  {
    id: "sr2_geometry",
    order: 3,
    title: "Hình học",
    emoji: "📐",
    description: "Điểm, đường thẳng, đường gấp khúc, chu vi; đếm hình.",
    prerequisite: ["sr2_quantity"],
    xp: 45,
    keypoints: [
      "Điểm trong/ngoài hình; đoạn thẳng nối hai điểm.",
      "Chu vi hình tam giác = tổng 3 cạnh; tứ giác = tổng 4 cạnh.",
      "Hình vuông: 4 cạnh bằng nhau; chu vi = cạnh × 4.",
      "Đếm hình tam giác, tứ giác trong hình ghép."
    ],
    questions: [
      ["input", "Tam giác có mấy cạnh?", "3", "Tam giác có 3 cạnh."],
      ["input", "Tính: 16cm + 20cm + 21cm = ? cm", "57", "16+20+21=57."],
      ["input", "Hình vuông cạnh 5 cm. Chu vi = ? cm", "20", "5 × 4 = 20 cm."],
      ["input", "Tam giác cạnh 5cm, 3cm, 4cm. Chu vi = ? cm", "12", "5+3+4=12."],
      ["input", "Đổi 3dm 6cm = ? cm", "36", "3dm = 30cm; 30+6=36."],
      ["input", "Dây dài 36cm, cắt mỗi đoạn 4cm. Cắt được bao nhiêu đoạn?", "9", "36 : 4 = 9 đoạn."],
      ["input", "Tam giác ABC có AC = 63cm, BC = 47cm. AB = ? cm", "16", "63 - 47 = 16 cm."],
      ["input", "Tam giác đều chu vi 27cm. Mỗi cạnh dài ? cm", "9", "27 : 3 = 9 cm."],
      ["input", "Hình vuông chu vi 40cm. Cạnh dài ? cm", "10", "40 : 4 = 10 cm."],
      ["input", "Dây 15m gấp 3 phần bằng nhau, lấy 1 phần. Mỗi phần dài ? m", "5", "15 : 3 = 5 m."]
    ]
  },
  {
    id: "sr2_word",
    order: 4,
    title: "Giải toán có lời văn",
    emoji: "📖",
    description: "Tìm số, so sánh, nhân chia trong bài toán thực tế.",
    prerequisite: ["sr2_geometry"],
    xp: 50,
    keypoints: [
      "Đọc kỹ: thêm → cộng; bớt → trừ; gấp → nhân; chia đều → chia.",
      "Bài toán nhiều bước: làm từng bước, ghi lời giải.",
      "Toán tuổi, toán tiền, toán đo lường — luôn ghi đơn vị.",
      "Kiểm tra đáp số có hợp lý không."
    ],
    questions: [
      ["input", "Có 17 quả cam, thêm 23 quả. Tổng cộng bao nhiêu quả?", "40", "17 + 23 = 40."],
      ["input", "Đàn vịt 90 con dưới ao, trên bờ nhiều hơn 20 con. Trên bờ bao nhiêu con?", "110", "90 + 20 = 110."],
      ["input", "Xe bus 42 hành khách, xuống 12, lên 16. Còn bao nhiêu hành khách?", "46", "42 - 12 + 16 = 46."],
      ["input", "Mẹ 35 tuổi, con kém mẹ 27 tuổi. Con mấy tuổi?", "8", "35 - 27 = 8."],
      ["input", "Trại có 458 con, trong đó 242 con lợn. Số gà?", "216", "458 - 242 = 216."],
      ["input", "Nhà bà 15 con gà mái, trống ít hơn 4 con. Số gà trống?", "11", "15 - 4 = 11."],
      ["input", "Mỗi con gà 2 chân, tổng 20 chân. Có bao nhiêu con gà?", "10", "20 : 2 = 10."],
      ["input", "Cửa hàng bán 3 ngày, mỗi ngày 9 lít xăng. Tổng bán bao nhiêu lít?", "27", "3 × 9 = 27."],
      ["input", "Dây 20m cắt 4 đoạn bằng nhau. Mỗi đoạn dài ? m", "5", "20 : 4 = 5 m."],
      ["input", "Đội Hai đắp 350m, đội Một ít hơn 123m. Đội Một đắp bao nhiêu mét?", "227", "350 - 123 = 227 m."]
    ]
  }
];

function buildTopicQuestions() {
  const questions = [];
  for (const topic of topics) {
    topic.questions.forEach((q, i) => {
      const id = `${topic.id}_q${i + 1}`;
      if (q[0] === "multiple_choice") {
        questions.push({ id, skill: topic.id, topic: topic.id, type: "multiple_choice", question: q[1], choices: q[4], answer: q[2], hint: q[3] });
      } else {
        questions.push({ id, skill: topic.id, topic: topic.id, type: "input", question: q[1], answer: q[2], hint: q[3] });
      }
    });
  }
  return questions;
}

/** 19 đề — mỗi đề 5 câu tổng hợp. */
function buildExamQuestions() {
  const questions = [];
  for (let n = 1; n <= 19; n++) {
    const offset = n * 3;
    const items = [
      { q: `Đề ${n} — Số liền sau của ${690 + n} là?`, a: String(691 + n), h: "Cộng thêm 1." },
      { q: `Đề ${n} — Tính: ${120 + offset} + ${45 + n} = ?`, a: String(165 + offset + n), h: "Đặt tính cộng." },
      { q: `Đề ${n} — Điền dấu >, < hoặc =: ${500 + n} ___ 98`, a: ">", h: "Số 3 chữ số luôn lớn hơn 98." },
      { q: `Đề ${n} — Cửa hàng có ${80 + n} kg gạo, bán ${30 + n} kg. Còn lại bao nhiêu kg?`, a: String(50), h: "Trừ số đã bán." },
      { q: `Đề ${n} — Tìm y: y + ${5 + n} = ${40 + n}. y = ?`, a: String(35), h: "y = tổng trừ số hạng đã biết." }
    ];
    items.forEach((item, idx) => {
      questions.push({
        id: `exam2_${n}_q${idx + 1}`,
        skill: `exam2_${n}`,
        exam: `exam2_${n}`,
        type: "input",
        question: item.q,
        answer: item.a,
        hint: item.h
      });
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
    { type: "keypoints", title: "Kiến thức cần nhớ", content: "Nắm vững các ý sau trước khi luyện:", points: t.keypoints },
    { type: "summary", title: "Sẵn sàng thử thách?", content: `Hoàn thành ${t.questions.length} câu để nhận sao và mở khóa đề tiếp theo!` }
  ]
}));

const exams = Array.from({ length: 19 }, (_, i) => {
  const n = i + 1;
  return {
    id: `exam2_${n}`,
    order: n,
    title: `Đề ôn số ${n}`,
    questionCount: 5,
    xp: 50,
    passScore: 4,
    prerequisite: n === 1 ? ["sr2_arithmetic"] : [`exam2_${n - 1}`]
  };
});

const payload = {
  meta: {
    id: "summer_g2_g3",
    packId: "g2-g3",
    title: "Ôn hè Toán lớp 2 → lớp 3",
    subtitle: "4 chủ đề tương tác + 19 đề tổng hợp",
    gradeFrom: 2,
    gradeTo: 3,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g2-g3.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`✓ summer-review-g2-g3.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`);
