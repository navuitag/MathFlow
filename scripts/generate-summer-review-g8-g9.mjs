/**
 * Sinh nội dung Ôn hè Toán lớp 8 → lớp 9 (6 chủ đề + 10 đề).
 * Nguồn: ÔN HÈ TOÁN 8 LÊN 9 - DE.pdf (10 buổi + đề HK I/II).
 * Chạy: node scripts/generate-summer-review-g8-g9.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE =
  "Ôn hè Toán lớp 8 lên 9 — 10 buổi (nội dung tương tác biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr8_polynomials",
    order: 1,
    title: "Đa thức & Hằng đẳng thức",
    emoji: "✖️",
    description: "Đơn thức, đa thức; hằng đẳng thức; phân tích nhân tử; tìm x.",
    prerequisite: [],
    xp: 50,
    keypoints: [
      "Đơn thức: tích hệ số và biến; bậc = tổng mũ các biến.",
      "(a±b)² = a² ± 2ab + b²; a² − b² = (a−b)(a+b).",
      "Phân tích nhân tử: đặt nhân tử chung, dùng hằng đẳng thức.",
      "Thu gọn: gộp các hạng tương đương."
    ],
    questions: [
      ["multiple_choice", "Biểu thức nào là đa thức nhưng không phải đơn thức?", ["9x²y", "9x²y + 5xy", "15", "x²y⁵"], "9x²y + 5xy", "Có dấu + giữa hai hạng."],
      ["input", "6xy² · (x² − 3y) = 6x³y² − 18xy³. Hệ số của x³y² = ?", "6", "6xy²·x² = 6x³y²."],
      ["input", "(3/2)xy + 5xy − 6 tại x = −2, y = 1 = ?", "-19", "−3 − 10 − 6 = −19."],
      ["input", "(x + 3)² = ? (dạng x²+ax+b, gõ x²+6x+9)", "x²+6x+9", "a²+2ab+b²."],
      ["input", "Thu gọn: 4x²y − 3x²y + 3x²y − x²y = ? (dạng ax²y)", "3x²y", "4−3+3−1=3."],
      ["input", "Phân tích: 5x − 25 = 5( ? ) (gõ x-5)", "x-5", "Đặt 5 chung."],
      ["input", "Phân tích: x² − 9 = (x−3)( ? ) (gõ x+3)", "x+3", "a²−b²."],
      ["input", "6x² − 72x = 0. Nghiệm dương = ?", "12", "6x(x−12)=0."],
      ["input", "103² − 97² = ? (dùng a²−b²)", "1200", "(103−97)(103+97)=6×200."],
      ["input", "(2x − 5)² tại x = 5,5 = ?", "36", "2×5,5−5=6 → 36."]
    ]
  },
  {
    id: "sr8_quadrilaterals",
    order: 2,
    title: "Tứ giác & Định lý Ta-lét",
    emoji: "📐",
    description: "Tứ giác đặc biệt; góc tứ giác; đường trung bình; Ta-lét và hình đồng dạng cơ bản.",
    prerequisite: ["sr8_polynomials"],
    xp: 55,
    keypoints: [
      "Tổng bốn góc tứ giác = 360°.",
      "Hình bình hành: đối song song và bằng nhau.",
      "Hình thang: một cặp cạnh đối song song.",
      "Ta-lét: DE // BC ⇒ AD/DB = AE/EC."
    ],
    questions: [
      ["input", "Tổng bốn góc tứ giác = ? độ", "360", "Cơ bản lớp 8."],
      ["input", "Tứ giác ABCD: A=110°, B=75°, D=75°. C = ?°", "100", "360−260=100."],
      ["multiple_choice", "Hình nào luôn có hai cặp cạnh đối song song?", ["Hình thang cân", "Hình bình hành", "Hình thang thường", "Hình thoi tùy ý"], "Hình bình hành", "Định nghĩa HBH."],
      ["input", "Hình vuông có bao nhiêu trục đối xứng? (gõ 4)", "4", "4 trục đối xứng."],
      ["input", "Tam giác ABC, M trung điểm AB, N trung điểm AC. MN = ? so với BC (gõ BC/2 hoac 0.5BC)", "BC/2", "Đường trung bình."],
      ["input", "Hình thoi có góc nhọn bằng bao nhiêu độ nếu là hình vuông? (gõ 90)", "90", "Hình vuông là thoi đặc biệt."],
      ["input", "DE // BC, AD=2, DB=3. Tỉ số AE/EC = ? (dạng a/b)", "2/3", "Ta-lét."],
      ["input", "Tam giác vuông: AB=3, AC=4. BC = ? cm", "5", "Pythagore: 5."],
      ["multiple_choice", "Hình chóp tứ giác đều có đáy là?", ["Tam giác đều", "Hình vuông", "Hình chữ nhật", "Hình thoi bất kỳ"], "Hình vuông", "Đáy vuông, cạnh bên bằng nhau."],
      ["input", "Chóp tam giác đều đáy 10 cm, cao mặt bên 20 cm. S_xq = ? cm²", "300", "3×(1/2×10×20)=300."]
    ]
  },
  {
    id: "sr8_statistics",
    order: 3,
    title: "Dữ liệu & Biểu đồ",
    emoji: "📊",
    description: "Bảng thống kê, biểu đồ; tỉ lệ phần trăm; đọc và phân tích dữ liệu.",
    prerequisite: ["sr8_quadrilaterals"],
    xp: 50,
    keypoints: [
      "Tần số: số lần xuất hiện; tỉ lệ % = phần/tổng × 100.",
      "Biểu đồ cột/đoạn: so sánh, xu hướng.",
      "Biểu đồ tròn: tỉ lệ phần trăm.",
      "Trung bình cộng = tổng giá trị : số phần tử."
    ],
    questions: [
      ["input", "Điểm 6, 8, 9, 10, 12. Trung bình = ?", "9", "45/5=9."],
      ["input", "Dãy 6, 8, 9, 10, 12. Khoảng biến thiên = ?", "6", "12−6=6."],
      ["input", "Giảm 25% giá 125 000 → còn = ? nghìn (gõ 93.75)", "93.75", "×0,75."],
      ["input", "Giảm 20% giá 300 000 → còn = ? nghìn (gõ 240)", "240", "×0,8."],
      ["input", "Tủ sách: SGK 80, tham khảo 55, truyện 122, tạp chí 78. Tổng = ?", "335", "Cộng bốn loại."],
      ["input", "Truyện 122/335 ≈ ? % (làm tròn 1 CS, gõ 36.4)", "36.4", "122:335×100."],
      ["multiple_choice", "Biểu đồ phù hợp tỉ lệ nguồn thu ngân sách?", ["Biểu đồ cột", "Biểu đồ tròn", "Biểu đồ đoạn", "Bảng tần số"], "Biểu đồ tròn", "Tròn cho %."],
      ["multiple_choice", "Biểu đồ phù hợp kim ngạch qua các năm?", ["Biểu đồ tròn", "Biểu đồ đoạn", "Biểu đồ cột đơn", "Bảng số liệu"], "Biểu đồ đoạn", "Xu hướng thời gian."],
      ["input", "Lớp 8C đăng ký: bóng rổ 6+6=12, tổng 32 HS. P(bóng rổ) = ? (a/b rút gọn)", "3/8", "12/32=3/8."],
      ["input", "Nam 8+6+2+2=18, nữ 2+6+4+2=14, tổng 32. P(nam) = ? (a/b rút gọn)", "9/16", "18/32=9/16."]
    ]
  },
  {
    id: "sr8_fractions",
    order: 4,
    title: "Phân thức đại số",
    emoji: "➗",
    description: "Điều kiện xác định; rút gọn; cộng trừ phân thức; bài toán thực tế.",
    prerequisite: ["sr8_statistics"],
    xp: 55,
    keypoints: [
      "Phân thức P(x)/Q(x): Q(x) ≠ 0.",
      "Rút gọn: tách nhân tử, đặt ĐK.",
      "a/b + c/d = (ad+bc)/(bd) với b,d ≠ 0.",
      "Thời gian = quãng đường : vận tốc."
    ],
    questions: [
      ["multiple_choice", "Biểu thức KHÔNG phải phân thức?", ["x²y + y", "3xy/(2z)", "x/2", "(a+b)/(a−b)"], "x²y + y", "Tổng, không dạng A/B."],
      ["input", "(x+y)/(x²−y²) rút gọn = ? (dạng 1/(x-y) hoặc 1/(y-x))", "1/(x-y)", "x²−y²=(x−y)(x+y)."],
      ["input", "(x−21)/(2x+2023). Mẫu ≠ 0 khi 2x+2023 ≠ 0. x ≠ ? (gõ -1011.5)", "-1011.5", "2x=−2023."],
      ["input", "(x²−4)/(x+2) rút gọn (x≠−2) = ? (gõ x-2)", "x-2", "Tử = (x−2)(x+2)."],
      ["input", "1/x + 1/y = ? (dạng (x+y)/(xy))", "(x+y)/(xy)", "QS mẫu xy."],
      ["input", "Đi 6 km lên dốc với v km/h. Thời gian = ? (dạng 6/v)", "6/v", "t = s/v."],
      ["input", "Đi 4 km xuống dốc gấp đôi v. Thời gian = ? (dạng 2/v)", "2/v", "2v km/h → 4/(2v)."],
      ["input", "6/v + 2/v = 8/3 giờ. v = ? km/h", "3", "8/v=8/3 → v=3."],
      ["input", "90/x ngày hoàn thành 90 sp/ngày x. x=15 thì = ? ngày", "6", "90/15=6."],
      ["input", "Thực tế x+5 sp/ngày, sớm 3 ngày: 90/(x+5)=90/x−3. x = ? (gõ 10)", "10", "Giải PT phân thức."]
    ]
  },
  {
    id: "sr8_linear",
    order: 5,
    title: "Phương trình & Hàm bậc nhất",
    emoji: "📈",
    description: "Giải PT bậc nhất; hàm số y=ax+b; bài toán vận tốc, tiền lương.",
    prerequisite: ["sr8_fractions"],
    xp: 55,
    keypoints: [
      "PT bậc nhất ax+b=0 (a≠0): x = −b/a.",
      "Hàm bậc nhất: y = ax + b (a≠0).",
      "Hai đường song song ⇔ cùng hệ số góc a.",
      "Giao điểm: giải hệ phương trình."
    ],
    questions: [
      ["multiple_choice", "Hàm số bậc nhất?", ["y = −2x + 3", "y = 3x²", "y = x³", "y = 3"], "y = −2x + 3", "Dạng ax+b, a≠0."],
      ["input", "y = x − 3. a = ?, b = ? (gõ 1,-3)", "1,-3", "a=1, b=−3."],
      ["input", "2x + 9 = 3 − x. x = ?", "-2", "3x=−6."],
      ["input", "2x − (3 − 5x) = 4(x + 3). x = ?", "5", "7x−3=4x+12."],
      ["input", "y=(m−1)x+2 // y=x+4. m = ?", "2", "m−1=1."],
      ["input", "Hệ số góc đường thẳng y=2024−2x = ? (gõ -2)", "-2", "a=−2."],
      ["input", "C(x)=70x+300 (nghìn). x=6 tháng → C = ? nghìn", "720", "420+300."],
      ["input", "C=930 nghìn → 70x+300=930 → x = ? tháng", "9", "70x=630."],
      ["input", "T=(11/8)R+150 (nghìn). R=28 → T = ? nghìn (gõ 188.5)", "188.5", "38,5+150=188,5."],
      ["input", "180 km, gặp sau 2,4h, v_A=2v_B. v_B = ? km/h", "25", "2,4(2v+v)=180 → v=25."]
    ]
  },
  {
    id: "sr8_prob_similarity",
    order: 6,
    title: "Xác suất & Tam giác đồng dạng",
    emoji: "🎲",
    description: "Xác suất; tam giác đồng dạng; Pythagore; bài toán bóng, hình khối.",
    prerequisite: ["sr8_linear"],
    xp: 55,
    keypoints: [
      "P(A) = số kết quả thuận lợi / tổng số kết quả đều có thể.",
      "ΔA'B'C' ∽ ΔABC: tỉ số k = A'B'/AB.",
      "Tam giác vuông: c² = a² + b² (Pythagore).",
      "Bóng nắng: h/H = s/S (đồng dạng)."
    ],
    questions: [
      ["input", "Lớp 8C: 30 HS, 3 sinh tháng 8. P(tháng 8) = ? (a/b rút gọn)", "1/10", "3/30=1/10."],
      ["input", "102 quả cầu: 25 đỏ, 40 tím, 12 vàng, 10 trắng, 15 đen. P(đỏ) = ? (a/b)", "25/102", "25/102."],
      ["input", "P(tím hoặc vàng) = ? (a/b rút gọn)", "26/51", "52/102=26/51."],
      ["input", "P(không đen) = ? (a/b rút gọn)", "29/34", "87/102=29/34."],
      ["input", "Tam giác vuông AB=9, AC=12. BC = ? cm", "15", "9²+12²=225, BC=15."],
      ["input", "Cột cờ bóng 25 m, cọc 1,8 m bóng 2,5 m. Cao cột = ? m", "18", "h/25=1,8/2,5."],
      ["input", "Cây bóng 9 m, cọc 1,2 m bóng 0,6 m. Cao cây = ? m", "18", "h/9=1,2/0,6."],
      ["input", "ΔABC ∽ ΔA'B'C' tỉ số k=2. AB=5 → A'B' = ?", "10", "Nhân k."],
      ["input", "Gieo 2 xúc xắc. P(tổng ≥ 10) = ? (a/b rút gọn)", "1/6", "6 cách/36."],
      ["multiple_choice", "Tam giác vuông, AH cao. ΔABC ∽ ΔHBA vì?", ["Cạnh-góc-cạnh", "Góc-góc", "Cạnh-cạnh-cạnh", "Hai cạnh góc vuông"], "Góc-góc", "Chung góc B, góc vuông."]
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
    tag: "HK1 Đề 1",
    items: [
      {
        type: "multiple_choice",
        q: "Đề 1 — Đa thức nhưng không phải đơn thức?",
        choices: ["9x²y", "9x²y + 5xy", "15", "x²y⁵"],
        a: "9x²y + 5xy",
        h: "Có dấu cộng."
      },
      {
        type: "multiple_choice",
        q: "Đề 1 — 6xy²·(2x²−3y) = ?",
        choices: ["12x³y − 18xy²", "12x³y + 18xy²", "12x²y − 18xy²", "6x³y² − 18xy³"],
        a: "12x³y − 18xy²",
        h: "6·x³y − 18xy²."
      },
      { type: "input", q: "Đề 1 — (x+3)² = ? (x²+ax+b)", a: "x²+6x+9", h: "HĐT bình phương." },
      {
        type: "multiple_choice",
        q: "Đề 1 — (x+y)/(x²−y²) = ?",
        choices: ["1/(y−x)", "1/(x−y)", "1/(x+y)", "x−y"],
        a: "1/(x−y)",
        h: "Rút gọn mẫu."
      },
      { type: "input", q: "Đề 1 — Tứ giác A=110°, B=75°, D=75°. C = ?°", a: "100", h: "360−260." }
    ]
  },
  {
    n: 2,
    tag: "HK1 Đề 2",
    items: [
      { type: "input", q: "Đề 2 — Phân tích: x² − 16 = (x−4)( ? )", a: "x+4", h: "a²−b²." },
      { type: "input", q: "Đề 2 — Phân tích: x² − y² = (x−y)( ? )", a: "x+y", h: "Hiệu hai bình phương." },
      { type: "input", q: "Đề 2 — 2x+9=3−x. x = ?", a: "-2", h: "3x=−6." },
      {
        type: "multiple_choice",
        q: "Đề 2 — Khẳng định SAI về số đối?",
        choices: [
          "−1/3 và 1/3 là đối nhau",
          "Đối của 5/7 là −5/7",
          "2/3 và −2/3 đối nhau",
          "Đối của 2/7 là −2/7"
        ],
        a: "−1/3 và 1/3 là đối nhau",
        h: "1/3 và −1/3 mới đối nhau."
      },
      { type: "input", q: "Đề 2 — HCN 6×7×8 cm. V = ? cm³", a: "336", h: "6×7×8." }
    ]
  },
  {
    n: 3,
    tag: "HK1 Đề 3",
    items: [
      { type: "input", q: "Đề 3 — (3/2)xy+5xy−6, x=−2,y=1 = ?", a: "-19", h: "−3−10−6." },
      {
        type: "multiple_choice",
        q: "Đề 3 — Hình chóp tứ giác đều đúng?",
        choices: [
          "Mặt bên tam giác đều",
          "Tất cả cạnh bằng nhau",
          "Cạnh bên bằng nhau, đáy vuông",
          "Mặt bên tam giác vuông"
        ],
        a: "Cạnh bên bằng nhau, đáy vuông",
        h: "Định nghĩa chóp tứ giác đều."
      },
      { type: "input", q: "Đề 3 — Chóp tam giác đều: đáy 10, cao mặt bên 20. S_xq = ? cm²", a: "300", h: "3×100." },
      { type: "input", q: "Đề 3 — 6x²−72x=0. x = ? (nghiệm lớn hơn)", a: "12", h: "x=0 hoặc 12." },
      { type: "input", q: "Đề 3 — (x−21)/(2x+2023). ĐK: x ≠ ?", a: "-1011.5", h: "2x+2023≠0." }
    ]
  },
  {
    n: 4,
    tag: "HK1 Đề 4",
    items: [
      { type: "input", q: "Đề 4 — 103²−97² = ?", a: "1200", h: "a²−b²." },
      { type: "input", q: "Đề 4 — x²−9=0. x dương = ?", a: "3", h: "x=±3." },
      { type: "input", q: "Đề 4 — Giảm 25% giá 125000 → ? nghìn", a: "93.75", h: "×0,75." },
      { type: "input", q: "Đề 4 — Tổng 4 góc tứ giác = ?°", a: "360", h: "Định lý." },
      { type: "input", q: "Đề 4 — Tam giác 3-4-5. Cạnh huyền = ?", a: "5", h: "Pythagore." }
    ]
  },
  {
    n: 5,
    tag: "HK1 Đề 5",
    items: [
      { type: "input", q: "Đề 5 — 2x−(3−5x)=4(x+3). x = ?", a: "5", h: "7x−3=4x+12." },
      { type: "input", q: "Đề 5 — y=(m−1)x+2 // y=x+4. m = ?", a: "2", h: "m−1=1." },
      { type: "input", q: "Đề 5 — 90/x=90/(x+5)+3. x = ? (kế hoạch sp/ngày)", a: "10", h: "PT phân thức." },
      { type: "input", q: "Đề 5 — Cột bóng 25m, cọc 1,8m bóng 2,5m. Cao cột = ? m", a: "18", h: "Đồng dạng." },
      { type: "input", q: "Đề 5 — P(gieo xúc xắc, số chẵn) = ? (a/b)", a: "1/2", h: "3/6." }
    ]
  },
  {
    n: 6,
    tag: "HK2 Đề 1",
    items: [
      {
        type: "multiple_choice",
        q: "Đề 6 — Hàm số bậc nhất?",
        choices: ["y = −2x + 3", "y = 3x²", "y = x³", "y = 3"],
        a: "y = −2x + 3",
        h: "ax+b, a≠0."
      },
      {
        type: "multiple_choice",
        q: "Đề 6 — y = x − 3. a, b = ?",
        choices: ["0, 3", "1, 3", "0, −3", "1, −3"],
        a: "1, −3",
        h: "y=1·x+(−3)."
      },
      { type: "input", q: "Đề 6 — 2x+9=3−x. x = ?", a: "-2", h: "x=−2." },
      { type: "input", q: "Đề 6 — Hệ số góc y=2024−2x = ?", a: "-2", h: "a=−2." },
      { type: "input", q: "Đề 6 — Tam giác vuông AB=9, AC=12. BC = ? cm", a: "15", h: "15 cm." }
    ]
  },
  {
    n: 7,
    tag: "HK2 Đề 2",
    items: [
      { type: "input", q: "Đề 7 — 4(x+3)=−7x+17. x = ? (dạng phân số a/b)", a: "5/11", h: "11x=5." },
      { type: "input", q: "Đề 7 — C(x)=70x+300, x=6 → ? nghìn", a: "720", h: "420+300." },
      { type: "input", q: "Đề 7 — 180 km, 2,4h, v_A=2v_B. v_B = ? km/h", a: "25", h: "7,2v=180." },
      { type: "input", q: "Đề 7 — ΔABC vuông A, AB=9, AC=12. BC = ? cm", a: "15", h: "Pythagore." },
      { type: "input", q: "Đề 7 — Lớp 8C 30 HS, P(sinh tháng 8)=1/10. Số bạn tháng 8 = ?", a: "3", h: "30×1/10=3." }
    ]
  },
  {
    n: 8,
    tag: "HK2 Đề 3",
    items: [
      { type: "input", q: "Đề 8 — (2x−5)² tại x=5,5 = ?", a: "36", h: "(6)²." },
      { type: "input", q: "Đề 8 — Phân tích x²−16 = (x−4)( ? )", a: "x+4", h: "a²−b²." },
      { type: "input", q: "Đề 8 — 5x−25 = 5( ? )", a: "x-5", h: "Đặt 5." },
      { type: "input", q: "Đề 8 — P(2 xúc xắc, tổng chia 3) = ? (a/b)", a: "1/3", h: "12/36." },
      { type: "input", q: "Đề 8 — HCN 22×16×18. V = ? cm³", a: "6336", h: "Tích ba cạnh." }
    ]
  },
  {
    n: 9,
    tag: "HK2 Đề 4",
    items: [
      { type: "input", q: "Đề 9 — 2x−(3−5x)=4(x+3). x = ?", a: "5", h: "x=5." },
      { type: "input", q: "Đề 9 — (x+y)/(x²−y²) = 1/( ? )", a: "x-y", h: "Rút gọn." },
      { type: "input", q: "Đề 9 — Cây bóng 9m, cọc 1,2m bóng 0,6m. Cao cây = ? m", a: "18", h: "Tỉ lệ 2:1." },
      { type: "input", q: "Đề 9 — 102 quả, 25 đỏ. P(đỏ) = ? (a/b rút gọn)", a: "25/102", h: "25/102." },
      { type: "input", q: "Đề 9 — Tứ giác A=110,B=75,D=75. C = ?°", a: "100", h: "100°." }
    ]
  },
  {
    n: 10,
    tag: "HK2 Đề 5",
    items: [
      { type: "input", q: "Đề 10 — y=(m+1)x+1 // y=−x+2. m = ?", a: "-2", h: "m+1=−1." },
      { type: "input", q: "Đề 10 — 300000+5000t=2000000. t = ? ngày", a: "340", h: "5000t=1700000." },
      { type: "input", q: "Đề 10 — ΔABC ∽ tỉ số 3, AB=4 → A'B' = ?", a: "12", h: "4×3." },
      { type: "input", q: "Đề 10 — Gieo 2 xúc xắc P(tổng=7) = ? (a/b)", a: "1/6", h: "6/36." },
      {
        type: "multiple_choice",
        q: "Đề 10 — Biểu thức không phải phân thức?",
        choices: ["x/2", "3xy/(2z)", "(a+b)/(a−b)", "x² + y"],
        a: "x² + y",
        h: "Không dạng tử/mẫu."
      }
    ]
  }
];

function buildExamQuestions() {
  const questions = [];
  for (const exam of examDefs) {
    exam.items.forEach((item, idx) => {
      const base = {
        id: `exam8_${exam.n}_q${idx + 1}`,
        skill: `exam8_${exam.n}`,
        exam: `exam8_${exam.n}`
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
  id: `exam8_${exam.n}`,
  order: exam.n,
  title: `Đề ôn số ${exam.n}`,
  subtitle: exam.tag,
  questionCount: 5,
  xp: 60,
  passScore: 4,
  prerequisite: i === 0 ? ["sr8_polynomials"] : [`exam8_${exam.n - 1}`]
}));

const payload = {
  meta: {
    id: "summer_g8_g9",
    packId: "g8-g9",
    title: "Ôn hè Toán lớp 8 → lớp 9",
    subtitle: "6 chủ đề tương tác + 10 đề tổng hợp (10 buổi ôn hè)",
    gradeFrom: 8,
    gradeTo: 9,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g8-g9.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `✓ summer-review-g8-g9.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`
);
