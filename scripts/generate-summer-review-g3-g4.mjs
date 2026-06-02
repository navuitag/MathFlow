/**
 * Sinh nội dung Ôn hè Toán lớp 3 → lớp 4 (6 chủ đề + 10 đề).
 * Chạy: node scripts/generate-summer-review-g3-g4.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE =
  "Chuyên đề Ôn hè Toán lớp 3 - lên 4 (nội dung tương tác biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr3_numbers",
    order: 1,
    title: "Số đến 100 000",
    emoji: "🔢",
    description: "Đọc viết, so sánh số 4–5 chữ số; số liền trước/sau; quy luật dãy số.",
    prerequisite: [],
    xp: 50,
    keypoints: [
      "Đọc số có 0, 1, 4, 5 đúng quy tắc (mươi/mốt, tư/lăm).",
      "So sánh: đếm chữ số trước, rồi từng hàng từ trái sang phải.",
      "Số liền trước = số − 1; số liền sau = số + 1.",
      "Cộng/trừ/nhân/chia số đến 100 000 — đặt tính thẳng cột."
    ],
    questions: [
      ["input", "Viết số: năm mươi hai nghìn bốn trăm ba mươi sáu.", "52436", "5 chục nghìn + 2 nghìn + 436 = 52436."],
      ["input", "Số liền trước của 26 391 là?", "26390", "26 391 − 1 = 26 390."],
      ["input", "Số liền sau của 75 280 là?", "75281", "75 280 + 1 = 75 281."],
      ["multiple_choice", "Chữ số 8 trong số 78 362 có giá trị là?", ["8000", "800", "80", "8"], "8000", "8 ở hàng nghìn → 8000."],
      ["multiple_choice", "Số bé nhất trong các số 6759; 6760; 6699; 7023?", ["6759", "6760", "6699", "7023"], "6699", "6699 < 6759 < 6760 < 7023."],
      ["input", "Tính: 47856 + 35687 = ?", "83543", "Đặt tính cộng có nhớ."],
      ["input", "Tính nhẩm: 7000 + 2000 = ?", "9000", "7 nghìn + 2 nghìn = 9 nghìn."],
      ["input", "Tính: 9356 − 6837 = ?", "2519", "Đặt tính trừ."],
      ["input", "Sắp xếp từ bé đến lớn: 3059; 2699; 3005; 2900 (cách nhau bằng dấu ;)", "2699; 2900; 3005; 3059", "So sánh từng hàng nghìn, trăm, chục."],
      ["multiple_choice", "1 hm bằng bao nhiêu mét?", ["10", "100", "1000", "10000"], "100", "1 hectomet = 100 m."],
      ["input", "Tính: 2439 × 4 = ?", "9756", "Nhân từ phải sang trái."],
      ["input", "Tính: 3648 : 6 = ?", "608", "Chia từ trái sang phải."]
    ]
  },
  {
    id: "sr3_algebra",
    order: 2,
    title: "Tìm X & biểu thức",
    emoji: "🧩",
    description: "Tìm thành phần chưa biết; tính giá trị biểu thức có/không ngoặc.",
    prerequisite: ["sr3_numbers"],
    xp: 50,
    keypoints: [
      "Tìm số hạng: trừ số hạng đã biết khỏi tổng.",
      "Tìm thừa số: chia tích cho thừa số kia; tìm số chia: chia số bị chia cho thương.",
      "Không ngoặc: nhân/chia trước, cộng/trừ sau.",
      "Có ngoặc: làm trong ngoặc trước."
    ],
    questions: [
      ["input", "Tìm x: x × 7 = 42. x = ?", "6", "x = 42 : 7 = 6."],
      ["input", "Tìm x: 28 : x = 4. x = ?", "7", "x = 28 : 4 = 7."],
      ["input", "Tìm x: x : 8 = 15. x = ?", "120", "x = 15 × 8 = 120."],
      ["input", "Tìm x: x : 5 = 2750 − 1245. x = ?", "7525", "x : 5 = 1505 → x = 7525."],
      ["input", "Tìm X: X : 8 = 3276. X = ?", "26208", "X = 3276 × 8 = 26208."],
      ["input", "Tìm X: 8 × X = 33176. X = ?", "4147", "X = 33176 : 8 = 4147."],
      ["input", "Tính: 24936 : 3 + 2538 = ?", "10850", "8312 + 2538 = 10850."],
      ["input", "Tính: 9036 − 1035 × 4 = ?", "4896", "1035 × 4 = 4140; 9036 − 4140 = 4896."],
      ["input", "Tính: 16817 + 15043 × 3 = ?", "61946", "15043 × 3 = 45129; + 16817 = 61946."],
      ["input", "Tìm x: x × 9 = 2826. x = ?", "314", "x = 2826 : 9 = 314."],
      ["input", "Tìm x: (x + 8) × 5 = 500. x = ?", "92", "x + 8 = 100 → x = 92."],
      ["input", "Tính: (65321 − 4253) : 2 = ?", "30534", "61068 : 2 = 30534."]
    ]
  },
  {
    id: "sr3_measure",
    order: 3,
    title: "Đo lường & thời gian",
    emoji: "📏",
    description: "Bảng đơn vị đo dài; quy đổi; thời gian; chữ số La Mã.",
    prerequisite: ["sr3_algebra"],
    xp: 45,
    keypoints: [
      "1 m = 100 cm; 1 dam = 10 m; 1 hm = 100 m.",
      "Quy đổi về cùng đơn vị rồi so sánh hoặc tính.",
      "1 giờ = 60 phút; đọc giờ hơn/kém trên đồng hồ.",
      "La Mã: I=1, V=5, X=10; XII=12, XV=15, XXI=21."
    ],
    questions: [
      ["input", "3 m 5 cm = ? cm", "305", "3 m = 300 cm; 300 + 5 = 305."],
      ["input", "7 m 5 cm = ? cm", "705", "7 m = 700 cm; 700 + 5 = 705."],
      ["input", "5 hm 5 dam = ? m", "550", "5 hm = 500 m; 5 dam = 50 m; tổng 550 m."],
      ["input", "8 km 7 m = ? m", "8007", "8 km = 8000 m; + 7 = 8007."],
      ["input", "20 dm = ? m", "2", "10 dm = 1 m → 20 dm = 2 m."],
      ["multiple_choice", "5 m 6 cm so với 560 cm thì?", ["5m6cm > 560cm", "5m6cm < 560cm", "5m6cm = 560cm"], "5m6cm < 560cm", "5 m 6 cm = 506 cm < 560 cm."],
      ["input", "1 giờ 20 phút = ? phút", "80", "60 + 20 = 80 phút."],
      ["input", "Ăn cơm từ 6h20 đến 6h50 hết bao nhiêu phút?", "30", "6:50 − 6:20 = 30 phút."],
      ["multiple_choice", "Số 12 viết bằng chữ số La Mã là?", ["XII", "XI", "IX", "IIX"], "XII", "10 + 2 = XII."],
      ["multiple_choice", "Số 21 viết bằng chữ số La Mã là?", ["XI", "XII", "XXI", "XX"], "XXI", "20 + 1 = XXI."]
    ]
  },
  {
    id: "sr3_geometry",
    order: 4,
    title: "Diện tích hình học",
    emoji: "📐",
    description: "Diện tích hình chữ nhật, hình vuông; cm²; bài toán ngược.",
    prerequisite: ["sr3_measure"],
    xp: 50,
    keypoints: [
      "Diện tích HCN = chiều dài × chiều rộng (cùng đơn vị).",
      "Diện tích HV = cạnh × cạnh.",
      "Chu vi HV = cạnh × 4; từ chu vi tìm cạnh rồi tính diện tích.",
      "1 cm² là diện tích hình vuông cạnh 1 cm."
    ],
    questions: [
      ["input", "HCN chiều dài 4 cm, rộng 3 cm. Diện tích = ? cm2", "12", "4 × 3 = 12 cm²."],
      ["input", "HV cạnh 7 cm. Diện tích = ? cm2", "49", "7 × 7 = 49 cm²."],
      ["input", "HV cạnh 8 cm. Diện tích = ? cm2", "64", "8 × 8 = 64 cm²."],
      ["input", "HCN diện tích 36 cm2, chiều dài 9 cm. Chiều rộng = ? cm", "4", "36 : 9 = 4 cm."],
      ["input", "HCN diện tích 36 cm2, chiều dài 9 cm. Chu vi = ? cm", "26", "rộng 4 cm; (9+4)×2 = 26 cm."],
      ["input", "HCN dài 25 cm, rộng kém dài 18 cm. Diện tích = ? cm2", "175", "rộng 7 cm; 25×7 = 175."],
      ["input", "HV chu vi 36 m. Diện tích = ? m2", "81", "cạnh 9 m; 9×9 = 81 m²."],
      ["input", "HV chu vi 16 cm. Diện tích = ? cm2", "16", "cạnh 4 cm; 4×4 = 16 cm²."],
      ["input", "18 cm2 + 24 cm2 = ? cm2", "42", "18 + 24 = 42."],
      ["input", "32 cm2 : 4 = ? cm2", "8", "32 : 4 = 8 cm²."]
    ]
  },
  {
    id: "sr3_unit_rate",
    order: 5,
    title: "Rút về đơn vị",
    emoji: "⚡",
    description: "Toán rút về đơn vị; ý nghĩa phép nhân và phép chia.",
    prerequisite: ["sr3_geometry"],
    xp: 50,
    keypoints: [
      "Bước 1: tìm giá trị 1 đơn vị (chia).",
      "Bước 2: nhân với số đơn vị cần tìm.",
      "Nhân: gấp lên nhiều lần hoặc tổng các nhóm bằng nhau.",
      "Chia: chia đều hoặc tìm số phần bằng nhau."
    ],
    questions: [
      ["input", "3 hàng 396 cây. 5 hàng có bao nhiêu cây?", "660", "1 hàng 132 cây; 132×5 = 660."],
      ["input", "448 kg gạo chia 8 bao. 5 bao nặng bao nhiêu kg?", "280", "1 bao 56 kg; 56×5 = 280."],
      ["input", "5 công nhân làm 45 sản phẩm. 7 công nhân làm bao nhiêu sản phẩm?", "63", "1 người 9 SP; 9×7 = 63."],
      ["input", "432 bóng đèn xếp 8 hộp. 6 hộp có bao nhiêu bóng?", "324", "1 hộp 54; 54×6 = 324."],
      ["input", "1615 m mương đào trong 5 ngày. 7 ngày đào bao nhiêu mét?", "2261", "323 m/ngày; 323×7 = 2261."],
      ["input", "255 bộ quần áo may trong 3 ngày. 9 ngày may bao nhiêu bộ?", "765", "85 bộ/ngày; 85×9 = 765."],
      ["input", "16560 viên gạch xếp 8 xe. 3 xe chở bao nhiêu viên?", "6210", "2070 viên/xe; ×3 = 6210."],
      ["input", "6 phòng lát 2550 viên gạch. 7 phòng cần bao nhiêu viên?", "2975", "425 viên/phòng; ×7 = 2975."],
      ["input", "144 viên kẹo chia 9 hộp. Mỗi hộp bao nhiêu viên?", "16", "144 : 9 = 16."],
      ["input", "115 túi × 5 kg, bán 125 kg. Còn lại bao nhiêu kg?", "450", "575 − 125 = 450 kg."]
    ]
  },
  {
    id: "sr3_word",
    order: 6,
    title: "Toán lời văn tổng hợp",
    emoji: "📖",
    description: "Gấp/giảm số lần; nhiều phép tính; tiền Việt; thống kê đơn giản.",
    prerequisite: ["sr3_unit_rate"],
    xp: 55,
    keypoints: [
      "Gấp lên n lần → nhân n; giảm đi n lần → chia n.",
      "Hơn/kém số đơn vị → cộng/trừ; gấp/kém số lần → nhân/chia.",
      "Bài toán tiền: tính từng khoản rồi cộng/trừ.",
      "Đọc kỹ đề, ghi lời giải từng bước, không quên đơn vị."
    ],
    questions: [
      ["input", "Ngày 1 dệt 17124 SP, ngày 2 gấp 3 lần. Cả hai ngày dệt bao nhiêu SP?", "68496", "17124×3=51372; 17124+51372=68496."],
      ["input", "PX may 2340 bộ, đã may 1/9. Còn phải may bao nhiêu bộ?", "2080", "2340:9=260; 2340−260=2080."],
      ["input", "Mẹ mua hết 45000đ, tiền gạo hơn cá 5000đ. Mua cá hết bao nhiêu đồng?", "20000", "(45000−5000):2=20000."],
      ["input", "Mẹ mua truyện 25000đ và 2 vở 5000đ/vở, đưa 100000đ. Tiền thối = ? đồng", "65000", "25000+10000=35000; 100000−35000=65000."],
      ["input", "Bình có 20000đ, mua 2 vở 4500đ/vở. Còn lại bao nhiêu đồng?", "11000", "20000−9000=11000."],
      ["input", "Thùng 1: 78 kg, thùng 2 nhiều hơn 25 kg. Cả hai thùng = ? kg", "181", "78+103=181."],
      ["input", "Mảnh vải trắng 1569 m, vải đen gấp 3 lần. Cả hai mảnh = ? m", "6276", "1569×3=4707; 1569+4707=6276."],
      ["input", "Dãy 5, 10, 15, 20, 25, 30 có bao nhiêu số?", "6", "Đếm các số trong dãy."],
      ["input", "Số thứ 3 trong dãy 5, 10, 15, 20, 25, 30 là?", "15", "Số thứ ba là 15."],
      ["input", "Tính thuận tiện: 64+52+36+48 = ?", "200", "(64+36)+(52+48)=100+100=200."]
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

/** 10 đề tổng hợp — mỗi đề 5 câu (theo tài liệu gốc). */
const examDefs = [
  {
    n: 1,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 1 — Chữ số 8 trong số 78 362 có giá trị là?",
        choices: ["8000", "800", "80", "8"],
        a: "8000",
        h: "8 ở hàng nghìn."
      },
      {
        type: "multiple_choice",
        q: "Đề 1 — 3 m 5 cm = ? cm",
        choices: ["35", "350", "305", "3005"],
        a: "305",
        h: "3 m = 300 cm."
      },
      { type: "input", q: "Đề 1 — Tìm x: x : 5 = 2750 − 1245. x = ?", a: "7525", h: "x : 5 = 1505." },
      { type: "input", q: "Đề 1 — Tính: 24936 : 3 + 2538 = ?", a: "10850", h: "Chia trước, cộng sau." },
      { type: "input", q: "Đề 1 — 5 công nhân làm 45 SP. 7 công nhân làm bao nhiêu SP?", a: "63", h: "Rút về 1 người rồi nhân 7." }
    ]
  },
  {
    n: 2,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 2 — Tổng 47 856 + 35 687 là?",
        choices: ["83433", "83543", "82443", "82543"],
        a: "83543",
        h: "Đặt tính cộng."
      },
      { type: "input", q: "Đề 2 — Tính nhẩm: 5000 × 2 = ?", a: "10000", h: "5 nghìn × 2." },
      {
        type: "multiple_choice",
        q: "Đề 2 — 1 hm = ? m",
        choices: ["10", "100", "1000", "10000"],
        a: "100",
        h: "1 hm = 100 m."
      },
      { type: "input", q: "Đề 2 — Tìm X: X : 8 = 3276. X = ?", a: "26208", h: "X = 3276 × 8." },
      { type: "input", q: "Đề 2 — PX may 2340 bộ, đã may 1/9. Còn may bao nhiêu bộ?", a: "2080", h: "2340 − 2340:9." }
    ]
  },
  {
    n: 3,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 3 — Số liền trước của 26 391 là?",
        choices: ["26392", "26301", "26390", "26401"],
        a: "26390",
        h: "Trừ 1."
      },
      {
        type: "multiple_choice",
        q: "Đề 3 — Số bé nhất: 6759; 6760; 6699; 7023?",
        choices: ["6759", "6760", "6699", "7023"],
        a: "6699",
        h: "6699 nhỏ nhất."
      },
      { type: "input", q: "Đề 3 — Tính: 6475 + 347 = ?", a: "6822", h: "Cộng có nhớ." },
      {
        type: "multiple_choice",
        q: "Đề 3 — 9036 − 1035 × 4 = ?",
        choices: ["4140", "4896", "4869", "4996"],
        a: "4896",
        h: "Nhân trước."
      },
      { type: "input", q: "Đề 3 — HCN dài 25 cm, rộng kém 18 cm. Diện tích = ? cm2", a: "175", h: "Rộng 7 cm." }
    ]
  },
  {
    n: 4,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 4 — HV cạnh 7 cm. Diện tích là?",
        choices: ["64 cm2", "64", "49 cm2", "32 cm2"],
        a: "49 cm2",
        h: "7 × 7 = 49."
      },
      { type: "input", q: "Đề 4 — Tính: 8496 : 6 = ?", a: "1416", h: "Chia dần từ trái." },
      { type: "input", q: "Đề 4 — x × 2 = 3998. x = ?", a: "1999", h: "3998 : 2." },
      { type: "input", q: "Đề 4 — 7 hm 3 dam = ? m", a: "730", h: "700 + 30 = 730 m." },
      { type: "input", q: "Đề 4 — 1615 m đào trong 5 ngày. 7 ngày đào ? m", a: "2261", h: "Rút về 1 ngày." }
    ]
  },
  {
    n: 5,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 5 — Chín mươi nghìn chín trăm viết là?",
        choices: ["90900", "90090", "99000", "90009"],
        a: "90900",
        h: "90000 + 900."
      },
      {
        type: "multiple_choice",
        q: "Đề 5 — HV cạnh 8 cm. Diện tích là?",
        choices: ["64 cm", "32 cm", "64 cm2", "32 cm2"],
        a: "64 cm2",
        h: "8 × 8."
      },
      { type: "input", q: "Đề 5 — 35000 − 275 = ?", a: "34725", h: "Trừ trực tiếp." },
      { type: "input", q: "Đề 5 — 175 : x = 5. x = ?", a: "35", h: "x = 175 : 5." },
      { type: "input", q: "Đề 5 — HV chu vi 16 cm. Diện tích = ? cm2", a: "16", h: "Cạnh 4 cm." }
    ]
  },
  {
    n: 6,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 6 — Số liền sau của 1000 là?",
        choices: ["1004", "1003", "1002", "1001"],
        a: "1001",
        h: "1000 + 1."
      },
      {
        type: "multiple_choice",
        q: "Đề 6 — Số lớn nhất: 42 075; 42 090; 42 099; 43 000?",
        choices: ["42099", "43000", "42075", "42090"],
        a: "43000",
        h: "43 000 lớn nhất."
      },
      {
        type: "multiple_choice",
        q: "Đề 6 — (65321 − 4253) : 2 = ?",
        choices: ["30534", "30543", "30354", "30345"],
        a: "30534",
        h: "Trong ngoặc trước."
      },
      { type: "input", q: "Đề 6 — 115 túi × 5 kg, bán 125 kg. Còn ? kg", a: "450", h: "575 − 125." },
      {
        type: "multiple_choice",
        q: "Đề 6 — Số 12 viết La Mã?",
        choices: ["XII", "XI", "IX", "IIX"],
        a: "XII",
        h: "10 + 2."
      }
    ]
  },
  {
    n: 7,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 7 — Số liền sau của 1001 là?",
        choices: ["1005", "1004", "1003", "1002"],
        a: "1002",
        h: "1001 + 1."
      },
      {
        type: "multiple_choice",
        q: "Đề 7 — Số lớn nhất: 50 752; 50 257; 50 527; 50 572?",
        choices: ["50572", "50752", "50257", "50527"],
        a: "50752",
        h: "So sánh hàng nghìn."
      },
      {
        type: "multiple_choice",
        q: "Đề 7 — 4569 + 3750 : 6 = ?",
        choices: ["5194", "5914", "5419", "5491"],
        a: "5194",
        h: "Chia trước cộng sau."
      },
      { type: "input", q: "Đề 7 — 432 bóng đèn : 8 hộp. 6 hộp có ? bóng", a: "324", h: "Rút về 1 hộp." },
      {
        type: "multiple_choice",
        q: "Đề 7 — Số 15 viết La Mã?",
        choices: ["XV", "VX", "XIIV", "XIV"],
        a: "XV",
        h: "10 + 5."
      }
    ]
  },
  {
    n: 8,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 8 — Số dư lớn nhất khi chia cho 4?",
        choices: ["3", "4", "2", "5"],
        a: "3",
        h: "Số dư < số chia."
      },
      { type: "input", q: "Đề 8 — 5 hm 5 dam = ? m", a: "550", h: "500 + 50." },
      { type: "input", q: "Đề 8 — 65849 − x = 12466 : 2. x = ?", a: "59616", h: "65849 − 6233." },
      { type: "input", q: "Đề 8 — Mẹ mua truyện 25000đ + 2 vở 5000đ, đưa 100000đ. Tiền thối?", a: "65000", h: "100000 − 35000." },
      { type: "input", q: "Đề 8 — 255 bộ trong 3 ngày. 9 ngày may ? bộ", a: "765", h: "85 bộ/ngày." }
    ]
  },
  {
    n: 9,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 9 — Số lớn nhất: 82 350; 82 305; 82 503; 8530?",
        choices: ["82350", "82305", "82503", "8530"],
        a: "82503",
        h: "82 503 lớn nhất."
      },
      { type: "input", q: "Đề 9 — 20 dm = ? m", a: "2", h: "10 dm = 1 m." },
      { type: "input", q: "Đề 9 — HV chu vi 36 m. Diện tích = ? m2", a: "81", h: "Cạnh 9 m." },
      { type: "input", q: "Đề 9 — 16560 viên gạch : 8 xe. 3 xe chở ? viên", a: "6210", h: "2070 viên/xe." },
      {
        type: "multiple_choice",
        q: "Đề 9 — 2342 + 403 × 6 = ?",
        choices: ["4670", "16470", "4760", "47600"],
        a: "4760",
        h: "Nhân trước."
      }
    ]
  },
  {
    n: 10,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 10 — Số liền sau của 45 768 là?",
        choices: ["46769", "46767", "45769", "45768"],
        a: "45769",
        h: "45768 + 1."
      },
      {
        type: "multiple_choice",
        q: "Đề 10 — HCN 8 cm × 5 cm. Diện tích?",
        choices: ["26 cm2", "13 cm2", "40 cm2", "40 cm"],
        a: "40 cm2",
        h: "8 × 5."
      },
      {
        type: "multiple_choice",
        q: "Đề 10 — 8 km 7 m = ? m",
        choices: ["807", "8007", "870", "8070"],
        a: "8007",
        h: "8000 + 7."
      },
      { type: "input", q: "Đề 10 — 10303 × 4 + 27854 = ?", a: "69066", h: "Nhân trước." },
      { type: "input", q: "Đề 10 — 6 phòng lát 2550 viên. 7 phòng cần ? viên", a: "2975", h: "425 viên/phòng." }
    ]
  }
];

function buildExamQuestions() {
  const questions = [];
  for (const exam of examDefs) {
    exam.items.forEach((item, idx) => {
      const base = {
        id: `exam3_${exam.n}_q${idx + 1}`,
        skill: `exam3_${exam.n}`,
        exam: `exam3_${exam.n}`
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
  id: `exam3_${exam.n}`,
  order: exam.n,
  title: `Đề ôn số ${exam.n}`,
  questionCount: 5,
  xp: 55,
  passScore: 4,
  prerequisite: i === 0 ? ["sr3_numbers"] : [`exam3_${exam.n - 1}`]
}));

const payload = {
  meta: {
    id: "summer_g3_g4",
    packId: "g3-g4",
    title: "Ôn hè Toán lớp 3 → lớp 4",
    subtitle: "6 chủ đề tương tác + 10 đề tổng hợp",
    gradeFrom: 3,
    gradeTo: 4,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g3-g4.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `✓ summer-review-g3-g4.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`
);
