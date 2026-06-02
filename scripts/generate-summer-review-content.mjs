/**
 * Sinh nội dung Ôn hè Toán lớp 1 → lớp 2 (7 chủ đề + 23 đề tổng hợp).
 * Chạy: node scripts/generate-summer-review-content.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE = "Chuyên đề Ôn hè Toán lớp 1 - lên 2 (nội dung tương tác tự biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr_numbers",
    order: 1,
    title: "Số và dãy số",
    emoji: "🔢",
    description: "Đọc, viết, đếm số 0–100; số liền trước/sau; dãy số.",
    prerequisite: [],
    xp: 40,
    keypoints: [
      "Số 1 chữ số: 0–9; số tròn chục: 10, 20, …, 90.",
      "Số bé nhất có 2 chữ số là 10; lớn nhất là 99.",
      "Số chẵn có hàng đơn vị 0, 2, 4, 6, 8; số lẻ có 1, 3, 5, 7, 9.",
      "10 đơn vị = 1 chục; số liền trước/sau cách nhau 1 đơn vị."
    ],
    questions: [
      ["input", "Viết số: bảy mươi tám.", "78", "7 chục 8 đơn vị = 78."],
      ["input", "Viết số: năm mươi tư.", "54", "5 chục 4 đơn vị = 54."],
      ["multiple_choice", "Số liền sau của 89 là?", ["90", "88", "91", "80"], "90", "89 + 1 = 90."],
      ["multiple_choice", "Số nào là số tròn chục?", ["30", "33", "35", "38"], "30", "30 = 3 chục, hàng đơn vị là 0."],
      ["input", "Số liền trước của 60 là?", "59", "60 - 1 = 59."],
      ["multiple_choice", "Số nào là số chẵn?", ["46", "47", "49", "51"], "46", "46 có hàng đơn vị là 6."],
      ["input", "Từ 15 đến 27 (tính cả hai đầu) có bao nhiêu số?", "13", "27 - 15 + 1 = 13."],
      ["multiple_choice", "Số lớn nhất có 1 chữ số là?", ["9", "10", "8", "99"], "9", "9 là số lớn nhất một chữ số."]
    ]
  },
  {
    id: "sr_add_sub",
    order: 2,
    title: "Cộng trừ trong phạm vi 100",
    emoji: "➕",
    description: "Cộng, trừ không nhớ; tính nhẩm và đặt tính.",
    prerequisite: ["sr_numbers"],
    xp: 45,
    keypoints: [
      "Cộng 2 chữ số + 1 chữ số: cộng hàng đơn vị trước.",
      "Cộng 2 chữ số + 2 chữ số: cộng đơn vị với đơn vị, chục với chục.",
      "Trừ: trừ hàng đơn vị trước, rồi hàng chục.",
      "Cộng/trừ có đơn vị cm: giữ nguyên đơn vị cm."
    ],
    questions: [
      ["input", "Tính: 45 + 34.", "79", "5 + 4 = 9; 4 + 3 = 7."],
      ["input", "Tính: 56 - 20.", "36", "6 - 0 = 6; 5 - 2 = 3."],
      ["input", "Tính: 18 + 71.", "89", "8 + 1 = 9; 1 + 7 = 8."],
      ["input", "Tính: 74 - 3.", "71", "4 - 3 = 1; 7 chục."],
      ["input", "Tính: 23 + 15.", "38", "3 + 5 = 8; 2 + 1 = 3."],
      ["input", "Tính: 67 - 25.", "42", "7 - 5 = 2; 6 - 2 = 4."],
      ["input", "58cm + 40cm = ? cm", "98", "58 + 40 = 98."],
      ["input", "Tính: 57 + 2 - 4.", "55", "57 + 2 = 59; 59 - 4 = 55."]
    ]
  },
  {
    id: "sr_compare",
    order: 3,
    title: "So sánh",
    emoji: "⚖️",
    description: "Dấu >, <, =; so sánh số và biểu thức.",
    prerequisite: ["sr_add_sub"],
    xp: 40,
    keypoints: [
      "9 > 5: chín lớn hơn năm; 6 < 8: sáu bé hơn tám.",
      "So sánh số 2 chữ số: so hàng chục trước, rồi hàng đơn vị.",
      "25 > 19 vì 2 chục > 1 chục; 25 < 29 vì chục bằng nhau, 5 < 9.",
      "Có thể so sánh biểu thức: 88 - 45 và 63 - 20."
    ],
    questions: [
      ["input", "Điền dấu >, < hoặc =: 63 ___ 60", ">", "6 chục > 6 chục? Cùng chục, 3 > 0."],
      ["input", "Điền dấu >, < hoặc =: 48 ___ 88 - 45", ">", "88 - 45 = 43; 48 > 43."],
      ["multiple_choice", "65 ___ 48. Chọn dấu đúng.", [">", "<", "="], ">", "6 chục > 4 chục."],
      ["input", "Điền dấu: 63 - 20 ___ 88 - 45", "=", "Cả hai đều bằng 43."],
      ["multiple_choice", "25 + 41 ___ 41 + 25", ["=", ">", "<"], "=", "Đổi chỗ không đổi tổng."],
      ["input", "Điền dấu: 18 ___ 20 - 10", ">", "20 - 10 = 10; 18 > 10."],
      ["multiple_choice", "Số nào lớn nhất: 28, 76, 54, 74?", ["76", "74", "54", "28"], "76", "7 chục lớn nhất."],
      ["input", "Điền dấu: 99 ___ 100", "<", "99 bé hơn 100."]
    ]
  },
  {
    id: "sr_word",
    order: 4,
    title: "Toán có lời văn",
    emoji: "📖",
    description: "Tính tổng, hiệu; bài toán thực tế và tuổi.",
    prerequisite: ["sr_compare"],
    xp: 50,
    keypoints: [
      "Thêm vào → phép cộng; bớt đi → phép trừ.",
      "Tính tổng: gộp hai số lượng. Tìm còn lại: trừ đi phần đã dùng.",
      "Toán tuổi: cách đây n năm → trừ n; n năm nữa → cộng n.",
      "Luôn ghi đáp số kèm đơn vị (quả, con, tuổi…)."
    ],
    questions: [
      ["input", "Hà có 30 que tính, Lan có 40 que tính. Cả hai có bao nhiêu que? (chỉ gõ số)", "70", "30 + 40 = 70."],
      ["input", "Có 9 con gà, bán 3 con. Còn lại bao nhiêu con?", "6", "9 - 3 = 6."],
      ["input", "Mẹ hái 85 quả hồng, bán 60 quả. Còn lại bao nhiêu quả?", "25", "85 - 60 = 25."],
      ["input", "Lớp có 24 bạn trai, 21 bạn gái. Lớp có tất cả bao nhiêu học sinh?", "45", "24 + 21 = 45."],
      ["input", "Hiện nay Mai 6 tuổi. Cách đây 3 năm Mai mấy tuổi?", "3", "6 - 3 = 3."],
      ["input", "Hiện nay Mai 6 tuổi. Ba năm nữa Mai mấy tuổi?", "9", "6 + 3 = 9."],
      ["input", "Vườn có 26 cây cam, ít hơn cây bưởi 15 cây. Vườn có bao nhiêu cây bưởi?", "41", "26 + 15 = 41 (bưởi nhiều hơn cam)."],
      ["input", "Nam có 36 viên bi xanh, ít hơn bi đỏ 14 viên. Nam có bao nhiêu viên bi đỏ?", "50", "36 + 14 = 50."]
    ]
  },
  {
    id: "sr_time",
    order: 5,
    title: "Thời gian",
    emoji: "🕐",
    description: "Đọc giờ, thứ trong tuần, lịch.",
    prerequisite: ["sr_word"],
    xp: 40,
    keypoints: [
      "Kim ngắn chỉ giờ, kim dài chỉ phút. Giờ đúng: kim dài ở số 12.",
      "1 tuần = 7 ngày: Thứ 2 → Chủ nhật.",
      "Hôm qua = hôm nay - 1 ngày; ngày mai = hôm nay + 1 ngày.",
      "1 tuần lễ = 7 ngày."
    ],
    questions: [
      ["multiple_choice", "Kim ngắn ở 5, kim dài ở 12. Mấy giờ?", ["5 giờ", "12 giờ", "7 giờ", "10 giờ"], "5 giờ", "Kim ngắn chỉ giờ."],
      ["input", "Một tuần có bao nhiêu ngày?", "7", "Thứ 2 đến Chủ nhật = 7 ngày."],
      ["multiple_choice", "Sau Thứ Tư là thứ mấy?", ["Thứ Năm", "Thứ Ba", "Thứ Sáu", "Chủ nhật"], "Thứ Năm", "Thứ Tư → Thứ Năm."],
      ["input", "Lan ở quê 1 tuần lễ và thêm 3 ngày. Tổng cộng bao nhiêu ngày?", "10", "7 + 3 = 10."],
      ["multiple_choice", "Lịch dùng để xem gì?", ["Ngày tháng", "Cân nặng", "Độ dài", "Nhiệt độ"], "Ngày tháng", "Lịch ghi ngày trong tháng."],
      ["input", "Kim ngắn ở 8, kim dài ở 12: mấy giờ? (chỉ gõ số)", "8", "8 giờ đúng."],
      ["multiple_choice", "Ngày đầu tuần đi học thường là?", ["Thứ Hai", "Thứ Bảy", "Chủ nhật", "Thứ Sáu"], "Thứ Hai", "Thứ Hai mở đầu tuần học."],
      ["input", "Thứ Bảy rồi đến ngày gì?", "Chủ nhật", "Cuối tuần."]
    ]
  },
  {
    id: "sr_geometry",
    order: 6,
    title: "Hình học",
    emoji: "📐",
    description: "Hình vuông, tròn, tam giác; đo cm; đếm hình.",
    prerequisite: ["sr_time"],
    xp: 45,
    keypoints: [
      "Hình vuông: 4 cạnh bằng nhau; hình tròn: không góc.",
      "Hình tam giác: 3 cạnh; đoạn thẳng AB nối 2 điểm A và B.",
      "Đo độ dài bằng thước có đơn vị cm.",
      "Điểm M ở trong hình: nằm bên trong; ở ngoài: nằm bên ngoài."
    ],
    questions: [
      ["multiple_choice", "Hình nào có 3 cạnh?", ["Tam giác", "Vuông", "Tròn", "Chữ nhật"], "Tam giác", "Tam giác có 3 cạnh."],
      ["input", "Hình tròn có mấy góc?", "0", "Hình tròn không có góc."],
      ["input", "Hình vuông có mấy cạnh?", "4", "4 cạnh bằng nhau."],
      ["multiple_choice", "Đo độ dài dùng đơn vị gì?", ["cm", "kg", "lít", "giờ"], "cm", "cm = xăng-ti-mét."],
      ["input", "Viết tắt xăng-ti-mét là gì?", "cm", "centimet = cm."],
      ["multiple_choice", "Hình chữ nhật có mấy góc vuông?", ["4", "3", "0", "2"], "4", "4 góc đều vuông."],
      ["input", "Thước kẻ thường dài 20 cm hay 20 m?", "cm", "Thước kẻ dùng cm."],
      ["multiple_choice", "Biển báo cấm thường là hình gì?", ["Tròn", "Vuông", "Tam giác", "Thoi"], "Tròn", "Biển tròn hay gặp."]
    ]
  },
  {
    id: "sr_logic",
    order: 7,
    title: "Toán tư duy",
    emoji: "🧩",
    description: "Dãy số, tính liên tiếp, bài toán suy luận.",
    prerequisite: ["sr_geometry"],
    xp: 50,
    keypoints: [
      "Dãy cách 2: 10, 12, 14, 16… (cộng 2).",
      "Dãy cách 3: 3, 6, 9, 12… (cộng 3).",
      "Tính nhiều bước: làm từ trái sang phải trừ khi có ngoặc.",
      "Số thay cho dấu ?: tìm số sao cho phép tính đúng."
    ],
    questions: [
      ["input", "Điền số tiếp theo: 10, 12, 14, 16, __", "18", "Cộng 2 mỗi lần."],
      ["input", "Điền số tiếp theo: 3, 6, 9, 12, __", "15", "Cộng 3 mỗi lần."],
      ["input", "Tính: 13 + 4 - 5.", "12", "13 + 4 = 17; 17 - 5 = 12."],
      ["input", "Tính: 26 - 5 + 8.", "29", "26 - 5 = 21; 21 + 8 = 29."],
      ["input", "Số thay cho ?: 10 - (8 - 3) = ?", "5", "8 - 3 = 5; 10 - 5 = 5."],
      ["input", "Tính: 40 + 20 - 40.", "20", "40 + 20 = 60; 60 - 40 = 20."],
      ["input", "Từ 10 đến 32 (tính cả hai đầu) có bao nhiêu số?", "23", "32 - 10 + 1 = 23."],
      ["input", "Tính: 2 + 5 - 3.", "4", "2 + 5 = 7; 7 - 3 = 4."]
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

/** 23 đề tổng hợp — mỗi đề 5 câu, xoay dạng theo chủ đề. */
const examBlueprints = [
  { n: 1, items: ["78", "79", ">", "25", "5"] },
  { n: 2, items: ["54", "66", "5", "45", "3"] },
  { n: 3, items: ["100", "39", ">", "11", "5"] },
  { n: 4, items: ["99", "20", "22", "55", "8"] },
  { n: 5, items: ["45", "50", "7", "10", "4"] },
  { n: 6, items: ["50", "0", "20", "49", "B"] },
  { n: 7, items: ["100", "25", "90", "11", "6"] },
  { n: 8, items: ["87", "43", ">", "30", "4"] },
  { n: 9, items: ["98", "55", "5", "45", "3"] },
  { n: 10, items: ["76", "39", ">", "25", "2"] },
  { n: 11, items: ["88", "51", "7", "19", "4"] },
  { n: 12, items: ["69", "84", ">", "45", "6"] },
  { n: 13, items: ["97", "38", "5", "55", "8"] },
  { n: 14, items: ["84", "43", ">", "30", "3"] },
  { n: 15, items: ["100", "55", "10", "19", "7"] },
  { n: 16, items: ["80", "12", "43", "19", "7"] },
  { n: 17, items: ["80", "14", "19", "29", "3"] },
  { n: 18, items: [">", "24", "10", "23", "86"] },
  { n: 19, items: ["99", "20", "25", "13", "25"] },
  { n: 20, items: ["6", "9", "10", "8", "11"] },
  { n: 21, items: ["98", "30", "86", "8", "5"] },
  { n: 22, items: ["99", "20", "91", "24", "6"] },
  { n: 23, items: ["15", "14", "57", "7", "8"] }
];

function buildExamQuestions() {
  const templates = [
    (examNo, ans) => ({
      id: `exam_${examNo}_q1`,
      skill: `exam_${examNo}`,
      exam: `exam_${examNo}`,
      type: "input",
      question: `Đề ${examNo} — Viết số: bảy mươi tám.`,
      answer: "78",
      hint: "7 chục 8 đơn vị."
    }),
    (examNo, ans) => ({
      id: `exam_${examNo}_q2`,
      skill: `exam_${examNo}`,
      exam: `exam_${examNo}`,
      type: "input",
      question: `Đề ${examNo} — Tính: 45 + 34.`,
      answer: String(ans),
      hint: "5 + 4 = 9; 4 + 3 = 7."
    }),
    (examNo, ans) => ({
      id: `exam_${examNo}_q3`,
      skill: `exam_${examNo}`,
      exam: `exam_${examNo}`,
      type: "input",
      question: `Đề ${examNo} — Điền dấu >, < hoặc =: 63 ___ 60`,
      answer: String(ans),
      hint: "So sánh hàng chục rồi đơn vị."
    }),
    (examNo, ans) => ({
      id: `exam_${examNo}_q4`,
      skill: `exam_${examNo}`,
      exam: `exam_${examNo}`,
      type: "input",
      question: `Đề ${examNo} — Mẹ hái 85 quả hồng, bán 60 quả. Còn lại bao nhiêu quả?`,
      answer: String(ans),
      hint: "85 - 60 = ?"
    }),
    (examNo, ans) => ({
      id: `exam_${examNo}_q5`,
      skill: `exam_${examNo}`,
      exam: `exam_${examNo}`,
      type: "input",
      question: `Đề ${examNo} — Số thay cho ?: 10 - (8 - 3) = ?`,
      answer: String(ans),
      hint: "Làm trong ngoặc trước."
    })
  ];

  const defaults = ["78", "79", ">", "25", "5"];
  const questions = [];
  for (let i = 1; i <= 23; i++) {
    const bp = examBlueprints.find((e) => e.n === i);
    const vals = bp?.items || defaults;
    templates.forEach((fn, idx) => {
      questions.push(fn(i, vals[idx]));
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
    {
      type: "intro",
      title: "Mục tiêu chủ đề",
      content: t.description
    },
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

const exams = Array.from({ length: 23 }, (_, i) => {
  const n = i + 1;
  return {
    id: `exam_${n}`,
    order: n,
    title: `Đề ôn số ${n}`,
    questionCount: 5,
    xp: 50,
    passScore: 4,
    prerequisite: n === 1 ? ["sr_numbers"] : [`exam_${n - 1}`]
  };
});

const payload = {
  meta: {
    id: "summer_g1_g2",
    title: "Ôn hè Toán lớp 1 → lớp 2",
    subtitle: "7 chủ đề tương tác + 23 đề tổng hợp",
    gradeFrom: 1,
    gradeTo: 2,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`✓ summer-review.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu hỏi`);
