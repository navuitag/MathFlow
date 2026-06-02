/**
 * Sinh nội dung Ôn hè Toán lớp 7 → lớp 8 (6 chủ đề + 10 đề).
 * Nguồn: ÔN HÈ TOÁN 7 LÊN 8 - DE.pdf (10 buổi + đề HK I/II).
 * Chạy: node scripts/generate-summer-review-g7-g8.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE =
  "Ôn hè Toán lớp 7 lên 8 — 10 buổi (nội dung tương tác biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr7_rational_real",
    order: 1,
    title: "Số hữu tỉ & Số thực",
    emoji: "🔢",
    description: "Phép tính hữu tỉ, tìm x; số thập phân tuần hoàn; căn bậc hai; so sánh số thực.",
    prerequisite: [],
    xp: 50,
    keypoints: [
      "Nhân/chia hữu tỉ: nhân tử×tử, mẫu×mẫu; đổi dấu khi nhân/chia số âm.",
      "Số thập phân hữu hạn: mẫu PS chỉ có TSNT 2 và 5.",
      "√a (a ≥ 0): số không âm có bình phương bằng a.",
      "a/b = a : b; tìm x trong phương trình hữu tỉ quy về phép nhân/chia."
    ],
    questions: [
      ["input", "Tính: (-6/7)·(-21/12) = ? (dạng a/b rút gọn)", "3/2", "Hai số âm → dương; 126/84 = 3/2."],
      ["input", "1/2 + 1/3 = ? (dạng a/b rút gọn)", "5/6", "QS mẫu 6: 3/6 + 2/6."],
      ["input", "Căn bậc hai số học của 36 = ?", "6", "6² = 36."],
      ["input", "23/40 viết dạng thập phân?", "0.575", "23 : 40 = 0.575."],
      ["input", "16/25 có phải STP hữu hạn? (gõ co hoac khong)", "co", "Mẫu 25 = 5², chỉ có TSNT 5."],
      ["input", "Tìm x: (-3/2) - 2x + 3/4 = -2", "5/8", "-2x = -5/4 → x = 5/8."],
      ["input", "HCN vuông diện tích 6,25 m². Cạnh = ? m", "2.5", "√6,25 = 2,5."],
      ["input", "So sánh 5√3 và 3√5: gõ >, < hoặc =", ">", "≈ 8,66 > 6,71."],
      ["multiple_choice", "Biết x² = 49 thì x bằng?", ["x = 49", "x = 7", "x = -7", "x = 7 hoặc x = -7"], "x = 7 hoặc x = -7", "x = ±7."],
      ["input", "Biết √x = 8 thì x = ?", "64", "x = 8² = 64."]
    ]
  },
  {
    id: "sr7_geometry",
    order: 2,
    title: "Góc, song song & Tam giác",
    emoji: "📐",
    description: "Góc đối đỉnh, kề bù; điều kiện song song; tổng góc tam giác; so sánh cạnh-góc.",
    prerequisite: ["sr7_rational_real"],
    xp: 55,
    keypoints: [
      "Hai góc đối đỉnh bằng nhau; hai góc kề bù có tổng 180°.",
      "a // b khi có cặp góc so le trong (hoặc đồng vị) bằng nhau.",
      "Tổng ba góc tam giác bằng 180°.",
      "Cạnh lớn hơn đối diện góc lớn hơn."
    ],
    questions: [
      ["multiple_choice", "Góc đối đỉnh với ∠AOC là?", ["∠COB", "∠AOD", "∠AOB", "∠BOD"], "∠BOD", "Đối đỉnh qua O."],
      ["input", "Tổng ba góc trong một tam giác = ? độ", "180", "Định lý cơ bản lớp 7."],
      ["input", "∠xOy = 60°. Góc kề bù ∠xOy' = ? độ", "120", "60 + 120 = 180."],
      ["input", "Tam giác DEF: D=30°, E=105°. F = ? độ", "45", "180 - 30 - 105 = 45."],
      ["input", "Tam giác ABC: AB=3, AC=4, BC=5. Góc lớn nhất ở đỉnh nào? (A/B/C)", "A", "BC=5 lớn nhất → đối diện góc A."],
      ["multiple_choice", "Qua M ngoài đường thẳng a có bao nhiêu đường // a?", ["Không có", "Đúng 1", "Đúng 2", "Vô số"], "Đúng 1", "Euclid: duy nhất một đường //."],
      ["input", "a // b và b // c thì a và c? (gõ // hoac khong //)", "//", "Quan hệ // là tương đương."],
      ["input", "Ba góc tam giác tỉ lệ 2:3:4. Góc nhỏ nhất = ? độ", "40", "180×2/9 = 40."],
      ["input", "Góc vuông = ? độ", "90", "Định nghĩa góc vuông."],
      ["input", "Tam giác DEF: D=30°, E=105°. Cạnh dài nhất là? (DE/EF/FD)", "FD", "E=105° lớn nhất → đối diện FD."]
    ]
  },
  {
    id: "sr7_statistics",
    order: 3,
    title: "Thu thập & biểu diễn dữ liệu",
    emoji: "📊",
    description: "Bảng thống kê, biểu đồ; tỉ lệ phần trăm; đọc dữ liệu thực tế.",
    prerequisite: ["sr7_geometry"],
    xp: 50,
    keypoints: [
      "Tần số: số lần xuất hiện; tỉ lệ % = (phần/tổng)×100.",
      "Biểu đồ cột/đoạn: so sánh theo thời gian hoặc nhóm.",
      "Biểu đồ tròn: thể hiện tỉ lệ phần trăm.",
      "Giảm giá p%: giá mới = giá gốc × (1 - p/100)."
    ],
    questions: [
      ["input", "Giảm giá 8% máy tính giá 5 000 000 đ. Giá sau giảm = ? (triệu, gõ 4.6)", "4.6", "5 000 000 × 0,92 = 4 600 000."],
      ["input", "Khảo sát phim: Hành động 7, KHVT 8, Hoạt hình 15 bạn. Tổng 3 loại = ?", "30", "7+8+15=30."],
      ["input", "Trong 30 bạn, 10 thích phim hài. Tỉ lệ % phim hài = ? (gõ 33.3)", "33.3", "10/30×100 ≈ 33,3%."],
      ["input", "Điểm 5, 8, 12, 15, 20. Số trung bình cộng = ?", "12", "60/5 = 12."],
      ["input", "Dãy 5, 8, 12, 15, 20. Khoảng biến thiên = ?", "15", "20 - 5 = 15."],
      ["input", "20% của 250 = ?", "50", "250×0,2 = 50."],
      ["input", "Tăng 15% giá 200 000 đ → giá mới = ? nghìn (gõ 230)", "230", "200×1,15 = 230 nghìn."],
      ["multiple_choice", "Biểu đồ nào phù hợp thể hiện tỉ lệ % các nguồn thu?", ["Biểu đồ cột", "Biểu đồ tròn", "Biểu đồ đoạn", "Bảng số liệu"], "Biểu đồ tròn", "Tròn cho tỉ lệ phần trăm."],
      ["multiple_choice", "Biểu đồ nào phù hợp kim ngạch qua các năm?", ["Biểu đồ tròn", "Biểu đồ đoạn", "Biểu đồ cột đơn", "Bảng tần số"], "Biểu đồ đoạn", "Đoạn thể hiện xu hướng theo thời gian."],
      ["input", "Tủ sách: SGK 80, tham khảo 55, truyện 122, tạp chí 78. Tổng = ?", "335", "80+55+122+78=335."]
    ]
  },
  {
    id: "sr7_proportion",
    order: 4,
    title: "Tỉ lệ thức & Đại lượng tỉ lệ",
    emoji: "⚖️",
    description: "Tỉ lệ thức, tìm thành phần chưa biết; tỉ lệ thuận/nghịch; bài toán thực tế.",
    prerequisite: ["sr7_statistics"],
    xp: 55,
    keypoints: [
      "a/b = c/d ⇔ ad = bc (tích chéo bằng nhau).",
      "Tỉ lệ thuận: y = kx; tỉ lệ nghịch: xy = k.",
      "Góc tam giác tỉ lệ a:b:c → góc = 180×a/(a+b+c).",
      "Đổi đơn vị: 1 dặm ≈ 1,6 km; 1 lb ≈ 0,45 kg."
    ],
    questions: [
      ["input", "Tìm x: x/20 = 1,5/6", "5", "x = 20×1,5/6 = 5."],
      ["input", "3 km ≈ ? dặm (1 dặm ≈ 1,6 km, làm tròn 2 CS thập phân)", "1.88", "3:1,6 = 1,875 → 1,88."],
      ["input", "60 kg ≈ ? pound (1 lb ≈ 0,45 kg, làm tròn đơn vị)", "133", "60:0,45 ≈ 133."],
      ["input", "Ba góc tam giác tỉ lệ 2:3:4. Góc lớn nhất = ? độ", "80", "180×4/9 = 80."],
      ["input", "Ba góc tỉ lệ nghịch 2:3:6. Góc nhỏ nhất = ? độ", "30", "Tỉ lệ góc 3:2:1 → 30°."],
      ["input", "3 đội xe: 2h, 2,5h, 3h hoàn thành. Đội 1 hơn đội 3 là 10 xe. Đội 3 = ? xe", "20", "n1:n2:n3 = 15:12:10; n1=30, n3=20."],
      ["input", "5 l ≈ ? gallon (1 gal ≈ 3,79 l, làm tròn nghìn)", "1.319", "5:3,79 ≈ 1,319."],
      ["input", "Tìm x: 25/x = x/4 (x > 0)", "10", "x² = 100 → x = 10."],
      ["input", "Hoàng 10 phút, Minh 15 phút cùng quãng đường. Minh chậm hơn 10 m/phút. Quãng đường = ? m", "600", "v_H=60 m/ph, d=600 m."],
      ["multiple_choice", "Từ a/4 = b/5 có thể suy ra?", ["a/5 = b/4", "4/a = 5/b", "a/b = 4/5", "5a = 4b"], "5a = 4b", "Tích chéo: 5a = 4b."]
    ]
  },
  {
    id: "sr7_polynomials",
    order: 5,
    title: "Đa thức một biến",
    emoji: "✖️",
    description: "Nhân đơn thức, rút gọn đa thức; giá trị đa thức; tìm nghiệm; bài toán mô hình hóa.",
    prerequisite: ["sr7_proportion"],
    xp: 55,
    keypoints: [
      "Nhân đơn thức: nhân hệ số, cộng bậc.",
      "Đa thức: rút gọn hệ số cùng bậc; sắp xếp theo bậc giảm dần.",
      "Nghiệm: thay x vào P(x) được 0.",
      "Mô hình: số thùng còn = 1200 - 40x."
    ],
    questions: [
      ["input", "(-2x⁴)·(3/4 x²). Bậc đa thức = ?", "6", "-3/2 x⁶, bậc 6."],
      ["input", "Rút gọn: 7x³ - x² + x + 2x² - 7x³ - x - 9 = ? (dạng ax²+b, gõ -x²-9)", "-x²-9", "x² - 9."],
      ["input", "(x - 2)(x + 3) = 0. Nghiệm lớn hơn = ?", "3", "x = 2 hoặc -3."],
      ["input", "3 - x = 5/2. x = ? (dạng phân số a/b)", "1/2", "x = 3 - 5/2 = 1/2."],
      ["input", "x² - 1/4 = 0. x dương = ? (dạng a/b)", "1/2", "x = ±1/2."],
      ["input", "Xưởng 1200 thùng, mỗi ngày lấy 40. Sau 10 ngày còn = ? thùng", "800", "1200 - 400 = 800."],
      ["input", "Hết 1200 thùng (40/ngày) sau = ? ngày", "30", "1200:40 = 30."],
      ["input", "Hội viên: 50000 + 5000x. Đức trả 95000 đ/năm. x = ?", "9", "(95000-50000):5000 = 9."],
      ["input", "3x(x-4) - x(5+3x) = 17. x = ?", "-1", "-17x = 17 → x = -1."],
      ["multiple_choice", "P(x) = x² - 4x + 3. x = 1 có phải nghiệm?", ["Có", "Không", "Không xác định", "Chỉ khi x = 3"], "Có", "1 - 4 + 3 = 0."]
    ]
  },
  {
    id: "sr7_probability_solids",
    order: 6,
    title: "Xác suất & Hình khối",
    emoji: "🎲",
    description: "Biến cố chắc chắn/ngẫu nhiên; xác suất; thể tích hình hộp, lăng trụ.",
    prerequisite: ["sr7_polynomials"],
    xp: 55,
    keypoints: [
      "Xác suất = số kết quả thuận lợi / số kết quả đều có thể.",
      "V_HCN = d×r×c; S_xq hộp = 2(d+r)×c.",
      "V_lăng trụ = S_đáy × h.",
      "Biến cố chắc chắn: P = 1; không thể: P = 0."
    ],
    questions: [
      ["input", "Gieo xúc xắc. P(số chẵn) = ? (dạng a/b rút gọn)", "1/2", "3/6 = 1/2."],
      ["input", "Gieo xúc xắc. P(chia hết cho 3) = ? (a/b)", "1/3", "{3,6} → 2/6."],
      ["input", "Gieo xúc xắc. P(10 chấm) = ?", "0", "Không thể."],
      ["input", "Gieo xúc xắc. P(số nguyên tố) = ? (a/b)", "1/2", "{2,3,5} → 3/6."],
      ["input", "Tung 2 đồng xu. P(đúng 1 mặt N) = ? (a/b)", "1/2", "HT, TH → 2/4."],
      ["multiple_choice", "Tháng 2 năm 2028 có 29 ngày là biến cố?", ["Ngẫu nhiên", "Chắc chắn", "Không thể", "Không xác định"], "Chắc chắn", "2028 chia hết cho 4 → nhuận."],
      ["input", "Hộp 6 đỏ, 8 vàng, 6 đen. P(lấy đỏ) = ? (a/b rút gọn)", "3/10", "6/20 = 3/10."],
      ["input", "Vòng quay 8 phần (1→8). P(điểm ≥ 7) = ? (a/b)", "1/4", "2/8 = 1/4."],
      ["input", "Hộp chữ nhật 22×16×18 cm. V = ? cm³", "6336", "22×16×18."],
      ["input", "HCN 25×15×8 cm. V = ? cm³", "3000", "25×15×8 = 3000."]
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
        q: "Đề 1 — (-6/7)·(-21/12) = ?",
        choices: ["3/2", "-3/2", "2/3", "-2/3"],
        a: "3/2",
        h: "Hai số âm → dương."
      },
      {
        type: "multiple_choice",
        q: "Đề 1 — Kết quả KHÔNG bằng x⁹?",
        choices: ["x¹⁰ : x", "x⁵·x⁴", "x³·x³", "(x³)³"],
        a: "(x³)³",
        h: "(x³)³ = x²⁷."
      },
      { type: "input", q: "Đề 1 — √36 = ?", a: "6", h: "6² = 36." },
      { type: "input", q: "Đề 1 — HCN 25×15×8 cm. V = ? cm³", a: "3000", h: "Nhân ba kích thước." },
      {
        type: "multiple_choice",
        q: "Đề 1 — Góc đối đỉnh với ∠AOC?",
        choices: ["∠COB", "∠AOD", "∠AOB", "∠BOD"],
        a: "∠BOD",
        h: "Đối đỉnh qua O."
      }
    ]
  },
  {
    n: 2,
    tag: "HK1 Đề 2",
    items: [
      {
        type: "multiple_choice",
        q: "Đề 2 — Khẳng định SAI về số đối?",
        choices: [
          "-1/3 và -1/3 là hai số đối nhau",
          "Đối của 5/7 là -5/7",
          "2/3 và -2/3 là đối nhau",
          "Đối của 2/7 là -2/7"
        ],
        a: "-1/3 và -1/3 là hai số đối nhau",
        h: "Cùng một số không phải cặp đối."
      },
      { type: "input", q: "Đề 2 — Trong -5/25; 0; 5; 25/4 có ? số hữu tỉ dương", a: "2", h: "5 và 25/4." },
      { type: "input", q: "Đề 2 — Làm tròn 3167,0995 đến hàng phần nghìn", a: "3167.1", h: "CS thứ 4 = 0 < 5." },
      { type: "input", q: "Đề 2 — HCN CD=6, AE=7, EH=8 cm. V = ? cm³", a: "336", h: "6×7×8." },
      {
        type: "multiple_choice",
        q: "Đề 2 — Mặt bên lăng trụ đứng là?",
        choices: ["Hình bình hành", "Hình thang cân", "Hình chữ nhật", "Hình thoi"],
        a: "Hình chữ nhật",
        h: "Mặt bên HCN."
      }
    ]
  },
  {
    n: 3,
    tag: "HK1 Đề 3",
    items: [
      { type: "input", q: "Đề 3 — √16 = ?", a: "4", h: "4² = 16." },
      {
        type: "multiple_choice",
        q: "Đề 3 — Khẳng định đúng?",
        choices: [
          "Số vô tỉ là STP vô hạn tuần hoàn",
          "π không phải số vô tỉ",
          "STP hữu hạn là số vô tỉ",
          "Số vô tỉ là STP vô hạn không tuần hoàn"
        ],
        a: "Số vô tỉ là STP vô hạn không tuần hoàn",
        h: "Định nghĩa số vô tỉ."
      },
      { type: "input", q: "Đề 3 — √100 = ? (x dương)", a: "10", h: "10² = 100." },
      {
        type: "multiple_choice",
        q: "Đề 3 — Mặt bên lăng trụ đứng?",
        choices: ["Hình tứ giác", "Hình vuông", "Hình chữ nhật", "Hình tam giác"],
        a: "Hình chữ nhật",
        h: "Các mặt bên HCN."
      },
      {
        type: "multiple_choice",
        q: "Đề 3 — Qua M ngoài a có ... đường // a",
        choices: ["Không có", "Đúng 1", "Đúng 2", "Vô số"],
        a: "Đúng 1",
        h: "Tiên đề Euclid."
      }
    ]
  },
  {
    n: 4,
    tag: "HK1 Đề 4",
    items: [
      { type: "input", q: "Đề 4 — 2/3 + 1/6 = ? (a/b)", a: "5/6", h: "4/6 + 1/6." },
      { type: "input", q: "Đề 4 — (-4)×(-5) = ?", a: "20", h: "Cùng dấu → dương." },
      { type: "input", q: "Đề 4 — x² = 49. |x| = ?", a: "7", h: "x = ±7." },
      { type: "input", q: "Đề 4 — Giảm 8% giá 5 000 000 → ? triệu", a: "4.6", h: "×0,92." },
      {
        type: "multiple_choice",
        q: "Đề 4 — Tổng ba góc tam giác?",
        choices: ["90°", "180°", "270°", "360°"],
        a: "180°",
        h: "Định lý tam giác."
      }
    ]
  },
  {
    n: 5,
    tag: "HK1 Đề 5",
    items: [
      { type: "input", q: "Đề 5 — x/20 = 1,5/6. x = ?", a: "5", h: "Tỉ lệ thức." },
      { type: "input", q: "Đề 5 — Ba góc tỉ lệ 2:3:4. Góc lớn nhất = ?°", a: "80", h: "180×4/9." },
      { type: "input", q: "Đề 5 — (x-2)(x+3)=0. Nghiệm dương = ?", a: "3", h: "x=2 hoặc -3." },
      { type: "input", q: "Đề 5 — Gieo xúc xắc P(chẵn) = ? (a/b)", a: "1/2", h: "3/6." },
      { type: "input", q: "Đề 5 — LP cạnh 5 cm. V = ? cm³", a: "125", h: "5³ = 125." }
    ]
  },
  {
    n: 6,
    tag: "HK2 Đề 1",
    items: [
      { type: "input", q: "Đề 6 — Rút gọn: 3x² + 5x - 2x² + x = ? (ax²+bx)", a: "x²+6x", h: "Gộp hệ số." },
      { type: "input", q: "Đề 6 — 1200 - 40×15 = ? thùng", a: "600", h: "600 thùng còn." },
      { type: "input", q: "Đề 6 — HCN 12×5×3 m. V = ? m³", a: "180", h: "12×5×3." },
      {
        type: "multiple_choice",
        q: "Đề 6 — Biến cố chắc chắn?",
        choices: ["Ngày mai trời mưa", "Mặt Trời mọc từ phía đông", "Xúc xắc ra 7 chấm", "Rút thẻ > 100 từ 1→12"],
        a: "Mặt Trời mọc từ phía đông",
        h: "Luôn xảy ra."
      },
      { type: "input", q: "Đề 6 — Tam giác D=30°, E=105°. F = ?°", a: "45", h: "180-135=45." }
    ]
  },
  {
    n: 7,
    tag: "HK2 Đề 2",
    items: [
      { type: "input", q: "Đề 7 — (-2x⁴)(x²) bậc = ?", a: "6", h: "4+2=6." },
      { type: "input", q: "Đề 7 — 3 - x = 5/2. x = ? (a/b)", a: "1/2", h: "x=1/2." },
      { type: "input", q: "Đề 7 — 60 kg ≈ ? lb (làm tròn)", a: "133", h: "60:0,45." },
      { type: "input", q: "Đề 7 — Hộp 22×16×18. V = ? cm³", a: "6336", h: "Tích ba cạnh." },
      { type: "input", q: "Đề 7 — P(x)=x²-4x+3. P(1) = ?", a: "0", h: "1-4+3=0." }
    ]
  },
  {
    n: 8,
    tag: "HK2 Đề 3",
    items: [
      { type: "input", q: "Đề 8 — 0,1(6) + 1,(3) = ? (dạng a/b rút gọn)", a: "3/2", h: "1/6+4/3=3/2." },
      { type: "input", q: "Đề 8 — √49 = ?", a: "7", h: "7²=49." },
      { type: "input", q: "Đề 8 — a//b, b//c → a và c? (// hoac khong //)", a: "//", h: "Tính chất //." },
      { type: "input", q: "Đề 8 — 6 đỏ, 8 vàng, 6 đen. P(đỏ) = ? (a/b)", a: "3/10", h: "6/20." },
      { type: "input", q: "Đề 8 — LP S_tp=294 cm². V = ? cm³", a: "343", h: "c=7, V=343." }
    ]
  },
  {
    n: 9,
    tag: "HK2 Đề 4",
    items: [
      { type: "input", q: "Đề 9 — 1/2 - 1/3 = ? (a/b)", a: "1/6", h: "3/6-2/6." },
      { type: "input", q: "Đề 9 — x² - 1/9 = 0. x dương = ? (a/b)", a: "1/3", h: "x=±1/3." },
      { type: "input", q: "Đề 9 — ∠xOy=100°. Góc kề bù = ?°", a: "80", h: "180-100." },
      { type: "input", q: "Đề 9 — Tung 2 xu P(cả hai S) = ? (a/b)", a: "1/4", h: "1/4 kết quả." },
      { type: "input", q: "Đề 9 — HCN đáy 40 cm², cao=8, dài hơn rộng 4. V = ? cm³", a: "320", h: "r=4,d=8,V=320." }
    ]
  },
  {
    n: 10,
    tag: "HK2 Đề 5",
    items: [
      { type: "input", q: "Đề 10 — 25/x = x/4 (x>0). x = ?", a: "10", h: "x²=100." },
      { type: "input", q: "Đề 10 — Trung bình 6, 10, 14 = ?", a: "10", h: "30/3=10." },
      { type: "input", q: "Đề 10 — 3x(x-4)-x(5+3x)=17. x = ?", a: "-1", h: "-17x=17." },
      { type: "input", q: "Đề 10 — Lăng trụ tam giác đáy 6, cao 10, cao LP 8. V = ? cm³", a: "240", h: "6×10:2×8=240." },
      {
        type: "multiple_choice",
        q: "Đề 10 — Gieo xúc xắc P(lẻ)?",
        choices: ["1/6", "1/3", "1/2", "2/3"],
        a: "1/2",
        h: "3/6."
      }
    ]
  }
];

function buildExamQuestions() {
  const questions = [];
  for (const exam of examDefs) {
    exam.items.forEach((item, idx) => {
      const base = {
        id: `exam7_${exam.n}_q${idx + 1}`,
        skill: `exam7_${exam.n}`,
        exam: `exam7_${exam.n}`
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
  id: `exam7_${exam.n}`,
  order: exam.n,
  title: `Đề ôn số ${exam.n}`,
  subtitle: exam.tag,
  questionCount: 5,
  xp: 60,
  passScore: 4,
  prerequisite: i === 0 ? ["sr7_rational_real"] : [`exam7_${exam.n - 1}`]
}));

const payload = {
  meta: {
    id: "summer_g7_g8",
    packId: "g7-g8",
    title: "Ôn hè Toán lớp 7 → lớp 8",
    subtitle: "6 chủ đề tương tác + 10 đề tổng hợp (10 buổi ôn hè)",
    gradeFrom: 7,
    gradeTo: 8,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g7-g8.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `✓ summer-review-g7-g8.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`
);
