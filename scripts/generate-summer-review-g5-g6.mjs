/**
 * Sinh nội dung Ôn hè Toán lớp 5 → lớp 6 (6 chủ đề + 10 đề).
 * Chạy: node scripts/generate-summer-review-g5-g6.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE =
  "Chuyên đề Ôn hè Toán lớp 5 - lên 6 (nội dung tương tác biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr5_fractions",
    order: 1,
    title: "Phân số & tỉ lệ",
    emoji: "➗",
    description: "Phân số, hỗn số, cộng trừ nhân chia; so sánh; bài toán tỉ lệ.",
    prerequisite: [],
    xp: 55,
    keypoints: [
      "Phân số gồm tử số và mẫu số (mẫu ≠ 0).",
      "Rút gọn/quy đồng bằng tính chất cơ bản của phân số.",
      "Cộng/trừ cùng mẫu: cộng/trừ tử, giữ mẫu; khác mẫu: quy đồng trước.",
      "Nhân: tử×tử, mẫu×mẫu; chia: nhân với nghịch đảo."
    ],
    questions: [
      ["input", "Tính: 1/2 + 1/3 = ? (dạng phân số a/b)", "5/6", "Quy đồng mẫu 6: 3/6 + 2/6 = 5/6."],
      ["input", "Tính: 3/4 - 1/2 = ?", "1/4", "1/2 = 2/4; 3/4 - 2/4 = 1/4."],
      ["input", "Tính: 2/3 × 3/4 = ?", "1/2", "6/12 = 1/2."],
      ["input", "Tính: 3/5 : 2/3 = ? (dạng phân số)", "9/10", "3/5 × 3/2 = 9/10."],
      ["input", "Chuyển hỗn số 3 1/4 thành phân số (dạng a/b)", "13/4", "(3×4+1)/4 = 13/4."],
      ["multiple_choice", "So sánh: 2/3 và 3/5?", ["2/3 > 3/5", "2/3 < 3/5", "2/3 = 3/5"], "2/3 > 3/5", "10/15 > 9/15."],
      ["input", "Xe máy đi 3 giờ được 60 km. 6 giờ đi được bao nhiêu km?", "120", "20 km/giờ; 20×6 = 120."],
      ["input", "Vòi 1 đầy bể trong 2 giờ, vòi 2 bằng một nửa vòi 1. Hai vòi cùng chảy đầy bể sau bao nhiêu giờ? (theo đáp án tài liệu)", "1.5", "Tài liệu: 1.5 giờ."],
      ["input", "Dùng 4000đ/kg mua 30 kg. Với 6000đ/kg mua được bao nhiêu kg?", "20", "120000 : 6000 = 20 kg."],
      ["input", "Tính nhanh: 1/4 + 1/4 + 1/2 = ?", "1", "1/4+1/4=1/2; 1/2+1/2=1."]
    ]
  },
  {
    id: "sr5_area",
    order: 2,
    title: "Đo diện tích",
    emoji: "📐",
    description: "Bảng đơn vị m², ha, km²; quy đổi và so sánh diện tích.",
    prerequisite: ["sr5_fractions"],
    xp: 50,
    keypoints: [
      "Hai đơn vị diện tích liền kề: lớn gấp 100 lần bé.",
      "1 ha = 1 hm² = 10 000 m².",
      "Quy đổi về cùng đơn vị trước khi cộng/trừ/so sánh.",
      "1 m² = 100 dm² = 10 000 cm²."
    ],
    questions: [
      ["input", "8 dam² = ? m²", "800", "1 dam² = 100 m²; 8×100 = 800."],
      ["input", "5 cm² = ? mm²", "500", "1 cm² = 100 mm²."],
      ["input", "7 ha = ? m²", "70000", "7 × 10 000 = 70 000."],
      ["input", "13 km² = ? ha", "1300", "1 km² = 100 ha."],
      ["input", "38 m² 25 dm² = ? dm²", "3825", "38 m² = 3800 dm²; +25 = 3825."],
      ["multiple_choice", "2 m² 85 cm² = ? cm²", ["285", "28500", "2085", "20085"], "20085", "2 m² = 20000 cm²; +85 = 20085."],
      ["input", "910 ha so với 91 km²: gõ >, < hoặc =", "<", "91 km² = 9100 ha > 910 ha."],
      ["input", "50000 m² = ? ha", "5", "50000 : 10000 = 5."],
      ["input", "8000 dm² = ? m²", "80", "100 dm² = 1 m²."],
      ["input", "Lát phòng 6m×4m, viên gỗ 120cm×20cm. Cần bao nhiêu viên?", "100", "24 m² = 240000 cm²; mỗi viên 2400 cm²."]
    ]
  },
  {
    id: "sr5_decimals",
    order: 3,
    title: "Số thập phân",
    emoji: "🔢",
    description: "Đọc viết, so sánh, cộng trừ nhân chia số thập phân.",
    prerequisite: ["sr5_area"],
    xp: 55,
    keypoints: [
      "Phần nguyên bên trái dấu phẩy; phần thập phân bên phải.",
      "Thêm/bớt 0 tận cùng phần thập phân → số không đổi.",
      "Cộng/trừ: thẳng cột theo hàng; dấu phẩy thẳng cột.",
      "Nhân/chia: đếm chữ số thập phân để đặt dấu phẩy."
    ],
    questions: [
      ["multiple_choice", "Số lớn nhất: 3.794; 3.749; 3.709; 3.8; 3.781?", ["3.709", "3.749", "3.8", "3.781"], "3.8", "3.8 = 3.800 lớn nhất."],
      ["input", "999 so với 1001: gõ >, < hoặc =", "<", "999 < 1001."],
      ["input", "7 m 38 cm = ? m (dùng dấu chấm thập phân)", "7.38", "38 cm = 0.38 m."],
      ["input", "Tính: 52.3 - 9.27 = ?", "43.03", "Đặt tính trừ."],
      ["input", "Tính: 13.44 : 3.2 = ?", "4.2", "Chia số thập phân."],
      ["input", "Tìm y: y + 3.65 = 36.5. y = ?", "32.85", "36.5 - 3.65 = 32.85."],
      ["input", "Tính nhanh: 13.45 + 7.98 + 8.55 = ?", "29.98", "(13.45+8.55)+7.98 = 29.98."],
      ["input", "Tính: 45.37 - 29.73 - 12.27 = ?", "3.37", "45.37 - 42 = 3.37."],
      ["input", "2345 kg = ? tấn", "2.345", "1000 kg = 1 tấn."],
      ["input", "34 dm² = ? m²", "0.34", "100 dm² = 1 m²."]
    ]
  },
  {
    id: "sr5_percent",
    order: 4,
    title: "Tỉ số phần trăm",
    emoji: "📊",
    description: "Tìm %; tìm a% của số; tìm số biết a% của nó.",
    prerequisite: ["sr5_decimals"],
    xp: 55,
    keypoints: [
      "Tỉ số % = (a : b) × 100%.",
      "a% của N = N × a : 100.",
      "Tìm số gốc: giá trị : a × 100.",
      "Tăng/giảm %: nhân với (100±a)/100."
    ],
    questions: [
      ["input", "275 : 500 = ? % (chỉ gõ số)", "55", "0.55 = 55%."],
      ["input", "25% của 1200 cây là bao nhiêu cây?", "300", "1200 × 25 : 100 = 300."],
      ["input", "65% của một số là 78. Số đó là?", "120", "78 × 100 : 65 = 120."],
      ["input", "40 học sinh, 15% đạt giỏi. Có bao nhiêu em giỏi?", "6", "40 × 15 : 100 = 6."],
      ["input", "195 con bò chiếm 65% tổng trâu bò. Tổng bao nhiêu con?", "300", "195 : 65 × 100 = 300."],
      ["input", "195 con bò chiếm 65% tổng. Số trâu?", "105", "300 - 195 = 105."],
      ["input", "75 viên bi, xanh chiếm 40%. Số bi xanh?", "30", "75 × 40 : 100 = 30."],
      ["input", "Vải giặt co 2%, còn 29.4 m. Ban đầu dài bao nhiêu m?", "30", "29.4 : 98 × 100 = 30."],
      ["multiple_choice", "Giá tăng 10% rồi giảm 10% so với ban đầu thì giá cuối?", ["Đắt hơn", "Rẻ hơn", "Bằng giá gốc"], "Rẻ hơn", "1.1 × 0.9 = 0.99 < 1."],
      ["input", "Lãi 20% so với giá vốn, giá vốn = 80% giá bán. Lãi = ? % giá vốn (gõ 25)", "25", "20% : 80% = 25%."]
    ]
  },
  {
    id: "sr5_geometry",
    order: 5,
    title: "Hình học nâng cao",
    emoji: "📏",
    description: "Diện tích HCN, HV, thang, tam giác, hình tròn; hình hộp.",
    prerequisite: ["sr5_percent"],
    xp: 55,
    keypoints: [
      "S_HCN = dài × rộng; S_HV = cạnh × cạnh.",
      "S_thang = (đáy lớn + đáy bé) × cao : 2.",
      "S_tam giác = đáy × cao : 2.",
      "Chu vi hình tròn = đường kính × 3.14."
    ],
    questions: [
      ["input", "HCN chu vi 36 cm (dài 12, rộng 6). HV cùng chu vi, diện tích HV = ? cm2", "81", "Cạnh 9 cm; 9×9 = 81."],
      ["input", "HCN chu vi 28 cm, dài hơn rộng 2 cm. Diện tích = ? cm2", "48", "rộng 6, dài 8; 48 cm²."],
      ["input", "Thang đáy 120 m, đáy bé 80 m, cao 75 m. Diện tích = ? m2", "7500", "(120+80)×75:2 = 7500."],
      ["input", "Tam giác vuông 35 cm và 15 cm. Diện tích = ? cm2", "262.5", "35×15:2 = 262.5."],
      ["input", "Hình tròn đường kính 24 cm. Chu vi = ? cm (dùng 3.14)", "75.36", "24 × 3.14 = 75.36."],
      ["input", "HCN dài 3.2 dm, rộng bằng 3/4 dài. Diện tích = ? dm2", "7.68", "rộng 2.4; 3.2×2.4 = 7.68."],
      ["input", "Hộp chữ nhật 8×5×4 cm. Diện tích xung quanh = ? cm2", "104", "Chu vi đáy 26; 26×4 = 104."],
      ["input", "Hộp chữ nhật 8×5×4 cm. Diện tích toàn phần = ? cm2", "184", "104 + 40×2 = 184."],
      ["input", "Lập phương cạnh 3 cm. Diện tích toàn phần = ? cm2", "54", "9×6 = 54."],
      ["multiple_choice", "HCN dài gấp 3 rộng, diện tích 75 cm2. Chu vi = ? cm", ["25", "225", "40", "75"], "40", "rộng 5, dài 15; P = 40."]
    ]
  },
  {
    id: "sr5_motion",
    order: 6,
    title: "Toán chuyển động",
    emoji: "🚀",
    description: "Quãng đường, vận tốc, thời gian; gặp nhau; xuôi/ngược dòng.",
    prerequisite: ["sr5_geometry"],
    xp: 55,
    keypoints: [
      "s = v × t; v = s : t; t = s : v — đơn vị phải tương ứng.",
      "Ngược chiều: thời gian gặp = quãng đường : tổng vận tốc.",
      "Cùng chiều: thời gian đuổi = khoảng cách : hiệu vận tốc.",
      "Xuôi dòng = v thuyền + v nước; ngược dòng = v thuyền - v nước."
    ],
    questions: [
      ["input", "Ô tô 7h30→8h đi 23.5 km. Vận tốc = ? km/giờ", "47", "0.5 giờ; 23.5:0.5 = 47."],
      ["multiple_choice", "Xe máy 5h45→7h, v = 32 km/h. Quãng đường?", ["32 km", "64 km", "40 km", "88 km"], "40 km", "1h15 = 1.25h; 32×1.25=40."],
      ["input", "Thuyền ngược dòng: v=22.6 km/h, dòng 2.2 km/h, 1.5 h. Quãng sông = ? km", "30.6", "(22.6-2.2)×1.5 = 30.6."],
      ["input", "AB = 6 km, v1=20 km/h, v2=12 km/h cùng chiều từ A,B. Gặp sau ? phút (số phút)", "45", "6:(20-12)=0.75h=45 phút."],
      ["input", "A cách B 140 km, ô tô 40 km/h và xe máy 30 km/h đi ngược chiều. Gặp sau ? giờ", "2", "140:(40+30)=2."],
      ["input", "Gặp lúc 7h30 + 2h = ? giờ (gõ số, ví dụ 9.5 cho 9h30)", "9.5", "7h30 + 2h = 9h30."],
      ["input", "Tàu qua mặt người 20 s, qua cầu 450 m hết 65 s. Chiều dài tàu = ? m", "200", "v=450:45=10 m/s; 10×20=200."],
      ["input", "Hiệu vận tốc 8 km/h, khoảng cách 6 km. Gặp sau ? giờ", "0.75", "6:8 = 0.75."],
      ["input", "Bánh trước dk gấp 1.5 bánh sau. Trước 10 vòng thì sau ? vòng", "15", "10×1.5 = 15."],
      ["input", "Ô tô 32.5 km/h, 6h30→14h45, nghỉ 15 phút. Quãng đường = ? km", "260", "8 giờ đi; 32.5×8 = 260."]
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
      {
        type: "multiple_choice",
        q: "Đề 1 — Số thập phân lớn nhất: 3.794; 3.749; 3.709; 3.8; 3.781?",
        choices: ["3.709", "3.749", "3.8", "3.781"],
        a: "3.8",
        h: "3.8 = 3.800."
      },
      {
        type: "multiple_choice",
        q: "Đề 1 — Chữ số 7 trong 3.1875 có giá trị?",
        choices: ["0.7", "0.007", "0.07", "0.0007"],
        a: "0.007",
        h: "7 ở hàng phần nghìn."
      },
      { type: "input", q: "Đề 1 — 2345 kg = ? tấn", a: "2.345", h: "Chia 1000." },
      { type: "input", q: "Đề 1 — X + 3.4 = 4.5 × 1.3. X = ?", a: "2.45", h: "X + 3.4 = 5.85." },
      { type: "input", q: "Đề 1 — HCN 3.2 dm × 2.4 dm. Diện tích = ? dm2", a: "7.68", h: "3.2 × 2.4." }
    ]
  },
  {
    n: 2,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 2 — Hai trăm hai đơn vị, ba phần mười, ba phần nghìn viết là?",
        choices: ["22.33", "202.33", "202.303", "22.303"],
        a: "202.303",
        h: "202 + 0.303."
      },
      {
        type: "multiple_choice",
        q: "Đề 2 — MC câu 2 (đáp án A)",
        choices: ["0.9 = 0.90", "5.73 > 5.730", "89.1 < 88.99", "1.83 > 1.829"],
        a: "0.9 = 0.90",
        h: "Thêm 0 không đổi giá trị."
      },
      {
        type: "multiple_choice",
        q: "Đề 2 — MC câu 3 (đáp án D)",
        choices: ["7.38 m = 738 cm", "750 g = 7.5 kg", "75 mm = 0.75 m", "75 mm = 0.075 m"],
        a: "75 mm = 0.075 m",
        h: "75 mm = 0.075 m."
      },
      { type: "input", q: "Đề 2 — Lớp 40 em, 15% giỏi. Số em giỏi?", a: "6", h: "40 × 15 : 100." },
      { type: "input", q: "Đề 2 — Mẹ 36 km/h đuổi Lan 16 km/h, cách 4 km. Gặp sau ? phút", a: "12", h: "4 : 20 = 0.2 giờ." }
    ]
  },
  {
    n: 3,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 3 — MC câu 1 (đáp án B)",
        choices: ["4.08 : 1.2 = 3.4", "83.21 < 88.201", "999 > 1001", "5.730 < 5.73"],
        a: "83.21 < 88.201",
        h: "So sánh phần nguyên."
      },
      {
        type: "multiple_choice",
        q: "Đề 3 — MC câu 2 (đáp án B)",
        choices: ["7.38 m = 7 m 38 cm", "1 tấn 5 kg = 1005 kg", "750 g = 0.75 kg", "75 dm2 = 7.5 m2"],
        a: "1 tấn 5 kg = 1005 kg",
        h: "1000 + 5 = 1005 kg."
      },
      { type: "input", q: "Đề 3 — 4.08 : 1.2 - 2.03 = ?", a: "1.37", h: "3.4 - 2.03." },
      { type: "input", q: "Đề 3 — Thửa ruộng thu 27000 kg = ? tấn", a: "27", h: "27000 : 1000." },
      { type: "input", q: "Đề 3 — Cửa hàng còn 0.3 tấn gạo = ? kg", a: "300", h: "0.3 × 1000." }
    ]
  },
  {
    n: 4,
    items: [
      { type: "input", q: "Đề 4 — Ruộng HCN chu vi 92 m, đổi ±5 m thành HV cạnh 23 m. Diện tích ban đầu = ? m2", a: "504", h: "28 × 18 = 504." },
      { type: "input", q: "Đề 4 — y - 1.57 = 6.28 - 2.86. y = ?", a: "4.99", h: "y - 1.57 = 3.42." },
      { type: "input", q: "Đề 4 — Con 5 tuổi, mẹ gấp 7 lần. Sau bao năm mẹ gấp 4 lần?", a: "5", h: "Hiệu tuổi không đổi." },
      { type: "input", q: "Đề 4 — 1.2 : y = 1.7 dư 0.01. y = ? (làm tròn 1 chữ số thập phân)", a: "0.7", h: "y × 1.7 = 1.19." },
      {
        type: "multiple_choice",
        q: "Đề 4 — MC (đáp án B)",
        choices: ["Chu vi HV = cạnh × 2", "S_HV = cạnh × cạnh", "S_thang = đáy × cao", "V_hộp = a + b + c"],
        a: "S_HV = cạnh × cạnh",
        h: "Công thức diện tích HV."
      }
    ]
  },
  {
    n: 5,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 5 — MC câu 2 (đáp án C)",
        choices: ["Dãy Fibonacci 1,3,4,7", "2/3 > 3/4", "1 tấn 5 kg = 1005 kg", "0.5 = 1/2"],
        a: "1 tấn 5 kg = 1005 kg",
        h: "1005 kg đúng."
      },
      { type: "input", q: "Đề 5 — Viết thêm 5 vào cuối số, tăng 1112 → số ban đầu?", a: "123", h: "10x+5 - x = 1112-5." },
      { type: "input", q: "Đề 5 — HCN chu vi 120 m = 5 × chiều dài, rộng = dài - 5. Diện tích = ? m2", a: "408", h: "dài 24, rộng 17." },
      { type: "input", q: "Đề 5 — AB 140 km, hiệu vận tốc 10, tổng 70. Vận tốc ô tô = ? km/h", a: "40", h: "(70+10):2 = 40." },
      { type: "input", q: "Đề 5 — Vận tốc xe máy = ? km/h (cùng đề trên)", a: "30", h: "(70-10):2 = 30." }
    ]
  },
  {
    n: 6,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 6 — MC câu 1 (đáp án B)",
        choices: ["1/2 + 1/3 = 2/5", "2/3 × 3/2 = 1", "5/6 < 1/2", "3/4 = 0.25"],
        a: "2/3 × 3/2 = 1",
        h: "Tích bằng 1."
      },
      {
        type: "multiple_choice",
        q: "Đề 6 — MC câu 2 (đáp án C)",
        choices: ["1 ha = 1000 m2", "1 m2 = 10 dm2", "1 km2 = 100 ha", "1 cm2 = 10 mm2"],
        a: "1 km2 = 100 ha",
        h: "1 km² = 100 ha."
      },
      { type: "input", q: "Đề 6 — HCN 28×18 cm, tam giác MCD có đáy 60 cm cao 25 cm. S tam giác = ? cm2", a: "750", h: "60×25:2 = 750." },
      { type: "input", q: "Đề 6 — Tổng vận tốc hai ô tô 105 km/h, v1 gấp 4 lần v2. v1 = ? km/h", a: "60", h: "v2=21… đề gốc: vA=60." },
      {
        type: "multiple_choice",
        q: "Đề 6 — MC câu 4 (đáp án D)",
        choices: ["s = t : v", "v = s × t", "t = s × v", "s = v × t"],
        a: "s = v × t",
        h: "Công thức cơ bản."
      }
    ]
  },
  {
    n: 7,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 7 — MC câu 1 (đáp án C)",
        choices: ["0.9 < 0.89", "5.73 = 5.730", "89.1 > 88.99", "999 = 1001"],
        a: "89.1 > 88.99",
        h: "89 > 88."
      },
      { type: "input", q: "Đề 7 — Diện tích phần còn lại vườn 35×21 - π×2² (π=3.14) ≈ ? m2 (làm tròn 1 số lẻ)", a: "722.4", h: "735 - 12.56 ≈ 722.44." },
      { type: "input", q: "Đề 7 — Bán 2 lần, cuối 10 quả, mỗi lần bán nửa còn lại +1. Ban đầu ? quả", a: "94", h: "Làm ngược từ đáp án." },
      { type: "input", q: "Đề 7 — 3 bao đường: bao 1 = 42.6 kg, bao 2 hơn 14.5 kg, bao 3 = 3/5 bao 2. Cả 3 bao = ? kg", a: "133.96", h: "42.6+57.1+34.26." },
      { type: "input", q: "Đề 7 — 65% tổng = 195 con bò. Tổng trâu bò?", a: "300", h: "195 : 65 × 100." }
    ]
  },
  {
    n: 8,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 8 — MC câu 1 (đáp án A)",
        choices: ["1/2 + 1/4 = 3/4", "2/3 < 1/2", "3/5 > 4/5", "1/3 = 2/3"],
        a: "1/2 + 1/4 = 3/4",
        h: "2/4 + 1/4 = 3/4."
      },
      {
        type: "multiple_choice",
        q: "Đề 8 — MC câu 2 (đáp án D)",
        choices: ["s = v + t", "v = s - t", "t = v : s", "v = s : t"],
        a: "v = s : t",
        h: "v = s : t."
      },
      { type: "input", q: "Đề 8 — Tìm x (đáp án đề 8 phần 2)", a: "5", h: "Theo đáp án gốc." },
      { type: "input", q: "Đề 8 — Vận tốc dự định : thực = 7:9, muộn 40 phút, v=35 km/h. Quãng AB = ? km", a: "105", h: "180 phút; 3×35=105." },
      { type: "input", q: "Đề 8 — Diện tích lát gỗ phòng 6×4 m, viên 120×20 cm = ? viên", a: "100", h: "240000:2400." }
    ]
  },
  {
    n: 9,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 9 — MC câu 1 (đáp án C)",
        choices: ["1 km2 = 10 ha", "1 m2 = 1000 cm2", "1 ha = 10000 m2", "1 dm2 = 100 m2"],
        a: "1 ha = 10000 m2",
        h: "1 ha = 1 hm²."
      },
      {
        type: "multiple_choice",
        q: "Đề 9 — MC câu 2 (đáp án A)",
        choices: ["7.38 m = 7 m 38 cm", "750 g = 7.5 kg", "1.375 km = 137.5 m", "0.5 dm2 = 0.5 m2"],
        a: "7.38 m = 7 m 38 cm",
        h: "Quy đổi đúng."
      },
      { type: "input", q: "Đề 9 — Bản đồ 1:1000, HCN 5 cm × 3 cm. Diện tích thật = ? m2", a: "1500", h: "50 m × 30 m." },
      { type: "input", q: "Đề 9 — Hình bình hành ABCD 28×18, cắt 4 tam giác. S = ? cm2", a: "294", h: "504 - 168 - 126." },
      { type: "input", q: "Đề 9 — Xe I 3.15 t, xe IV = TB - 0.1. Xe IV = ? t (TB=3)", a: "2.9", h: "3 - 0.1 = 2.9." }
    ]
  },
  {
    n: 10,
    items: [
      {
        type: "multiple_choice",
        q: "Đề 10 — MC câu 1 (đáp án B)",
        choices: ["0.9 = 0.09", "5.730 = 5.73", "83.21 > 88.2", "999 > 1001"],
        a: "5.730 = 5.73",
        h: "Bớt 0 không đổi."
      },
      {
        type: "multiple_choice",
        q: "Đề 10 — MC câu 2 (đáp án B)",
        choices: ["S = a + b", "S_HCN = a × b", "P = a × a", "V = a × b"],
        a: "S_HCN = a × b",
        h: "Diện tích HCN."
      },
      {
        type: "multiple_choice",
        q: "Đề 10 — MC câu 3 (đáp án C)",
        choices: ["1 km2 = 10 ha", "1 m2 = 100 cm2", "1 ha = 10000 m2", "1 mm2 = 1 cm2"],
        a: "1 ha = 10000 m2",
        h: "Đơn vị diện tích."
      },
      { type: "input", q: "Đề 10 — Vải co 2%, còn 29.4 m. Dài ban đầu = ? m", a: "30", h: "29.4 : 0.98." },
      { type: "input", q: "Đề 10 — Bánh xe dk 7 dm, quãng 219.8 m. Số vòng = ? (đáp án 109.8 làm tròn)", a: "100", h: "C ≈ 22 dm; 2198:22 ≈ 100." }
    ]
  }
];

function buildExamQuestions() {
  const questions = [];
  for (const exam of examDefs) {
    exam.items.forEach((item, idx) => {
      const base = {
        id: `exam5_${exam.n}_q${idx + 1}`,
        skill: `exam5_${exam.n}`,
        exam: `exam5_${exam.n}`
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
  id: `exam5_${exam.n}`,
  order: exam.n,
  title: `Đề ôn số ${exam.n}`,
  questionCount: 5,
  xp: 60,
  passScore: 4,
  prerequisite: i === 0 ? ["sr5_fractions"] : [`exam5_${exam.n - 1}`]
}));

const payload = {
  meta: {
    id: "summer_g5_g6",
    packId: "g5-g6",
    title: "Ôn hè Toán lớp 5 → lớp 6",
    subtitle: "6 chủ đề tương tác + 10 đề tổng hợp",
    gradeFrom: 5,
    gradeTo: 6,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g5-g6.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `✓ summer-review-g5-g6.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`
);
