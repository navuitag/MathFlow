/**
 * Sinh nội dung Ôn hè Toán lớp 4 → lớp 5 (7 chủ đề + 10 đề).
 * Nguồn: Chuyên đề & Đáp án Ôn hè Toán lớp 4 - lên 5.
 * Chạy: node scripts/generate-summer-review-g4-g5.mjs
 */
import { writeFile } from "node:fs/promises";

const SOURCE =
  "Chuyên đề Ôn hè Toán lớp 4 - lên 5 (nội dung tương tác biên soạn theo tài liệu ôn hè).";

const topics = [
  {
    id: "sr4_natural",
    order: 1,
    title: "Số tự nhiên & dãy số",
    emoji: "🔢",
    description: "Đọc viết số đến hàng triệu; giá trị chữ số; dãy số cách đều; tổng dãy số.",
    prerequisite: [],
    xp: 50,
    keypoints: [
      "Mỗi lớp gồm 3 hàng: đơn vị, nghìn, triệu.",
      "Giá trị chữ số = chữ số × hàng tương ứng.",
      "Số hạng dãy cách đều = (cuối − đầu) : khoảng cách + 1.",
      "Tổng dãy cách đều = (đầu + cuối) × số hạng : 2."
    ],
    questions: [
      ["input", "Viết số: hai mươi lăm nghìn bảy trăm ba mươi tư.", "25734", "25 nghìn + 734 = 25 734."],
      ["input", "Số liền sau của 1 283 945 là?", "1283946", "1 283 945 + 1 = 1 283 946."],
      ["multiple_choice", "Giá trị chữ số 9 trong số 795 268 là?", ["900000", "90000", "9000", "900"], "900000", "9 ở hàng trăm nghìn → 900 000."],
      ["input", "Viết số gồm 29 triệu, 5 chục nghìn, 4 nghìn, 3 đơn vị.", "29054003", "29 000 000 + 50 000 + 4 000 + 3."],
      ["input", "Giá trị chữ số 2 trong số 247 365 098 là?", "200000000", "2 ở hàng trăm triệu."],
      ["input", "Dãy 2, 3, 4, …, 34 có bao nhiêu số hạng?", "33", "(34 − 2) : 1 + 1 = 33."],
      ["input", "Tổng dãy 2, 3, 4, …, 34 = ?", "594", "(2 + 34) × 33 : 2 = 594."],
      ["input", "Dãy 1, 4, 7, …, 40 có bao nhiêu số hạng?", "14", "(40 − 1) : 3 + 1 = 14."],
      ["input", "Tổng 1 + 4 + 7 + … + 40 = ?", "287", "(1 + 40) × 14 : 2 = 287."],
      ["input", "Dãy 1, 3, 5, …, 51 có bao nhiêu số hạng?", "26", "(51 − 1) : 2 + 1 = 26."],
      ["input", "Tổng dãy 1, 3, 5, …, 51 = ?", "676", "(1 + 51) × 26 : 2 = 676."],
      ["multiple_choice", "Số tự nhiên nhỏ nhất gồm các chữ số 0, 1, 3, 5 là?", ["1035", "1305", "10357", "135"], "1035", "Sắp xếp tăng dần, không bắt đầu bằng 0."]
    ]
  },
  {
    id: "sr4_measure",
    order: 2,
    title: "Bảng đơn vị đo",
    emoji: "📏",
    description: "Đổi đơn vị khối lượng, thời gian, độ dài, diện tích; chữ số La Mã.",
    prerequisite: ["sr4_natural"],
    xp: 45,
    keypoints: [
      "1 kg = 1000 g; 1 tấn = 1000 kg; 1 tạ = 100 kg.",
      "1 giờ = 60 phút; 1 phút = 60 giây.",
      "1 m² = 100 dm² = 10 000 cm².",
      "La Mã: I=1, V=5, X=10, L=50, C=100."
    ],
    questions: [
      ["input", "3 kg 60 g = ? g", "3060", "3000 + 60 = 3060 g."],
      ["input", "10 dag = ? g", "100", "1 dag = 10 g."],
      ["input", "2 phút 10 giây = ? giây", "130", "120 + 10 = 130 giây."],
      ["input", "3 phút = ? giây", "180", "3 × 60 = 180 giây."],
      ["input", "3 km 60 m = ? m", "3060", "3000 + 60 = 3060 m."],
      ["input", "8 hm = ? m", "800", "1 hm = 100 m."],
      ["input", "1 m² = ? dm²", "100", "1 m² = 100 dm²."],
      ["input", "125 dm² = ? m² (dạng số thập phân, ví dụ 1.25)", "1.25", "125 : 100 = 1 m² 25 dm²."],
      ["input", "5 dm² 3 cm² = ? cm²", "503", "5 dm² = 500 cm²; + 3 = 503."],
      ["multiple_choice", "Số 15 viết bằng chữ số La Mã là?", ["XV", "XIV", "IX", "VX"], "XV", "10 + 5 = XV."],
      ["multiple_choice", "3 tấn 5 tạ = ? kg", ["3500", "3005", "350", "305"], "3500", "3 tấn = 3000 kg; 5 tạ = 500 kg."]
    ]
  },
  {
    id: "sr4_ops",
    order: 3,
    title: "Bốn phép tính",
    emoji: "➕",
    description: "Cộng, trừ, nhân, chia số lớn; tính nhanh; tìm x; giá trị biểu thức.",
    prerequisite: ["sr4_measure"],
    xp: 50,
    keypoints: [
      "Tìm số hạng: trừ số hạng kia khỏi tổng.",
      "Tìm thừa số: chia tích cho thừa số kia.",
      "Nhân/chia trước, cộng/trừ sau; làm trong ngoặc trước.",
      "Tính thuận tiện: gom nhóm tạo bội 10, 100, 1000."
    ],
    questions: [
      ["input", "Tìm x: x − 216 = 570. x = ?", "786", "x = 570 + 216 = 786."],
      ["input", "Tính thuận tiện: 68 + 95 + 32 + 5 = ?", "200", "(68+32)+(95+5)=100+100=200."],
      ["input", "Tính nhanh: 32 − 13 − 17 = ?", "2", "32 − (13+17) = 2."],
      ["input", "5893 − 2998 = ?", "2895", "Đặt tính trừ có nhớ."],
      ["input", "Tìm x: x × 5 = 106570. x = ?", "21314", "x = 106570 : 5."],
      ["input", "450906 : x = 6. x = ?", "75151", "x = 450906 : 6."],
      ["input", "Tính: (25 + 45) : 5 = ?", "14", "70 : 5 = 14."],
      ["input", "Tính thuận tiện: 113 × 54 + 113 × 54 + 113 = ?", "12317", "113 × (54+54+1)=113×109."],
      ["input", "Tìm x: 4478 + x = 705 × 16. x = ?", "6802", "705×16=11280; x=11280−4478."],
      ["input", "Tìm x: 5920 : x = 87569 − 87537. x = ?", "185", "5920 : x = 32 → x = 185."],
      ["input", "Tính: (1875 + 125) : 2 = ?", "1000", "2000 : 2 = 1000."],
      ["input", "Tính: 117 × (36 + 62) − 17 × (62 + 36) = ?", "9800", "(117−17)×98=100×98."]
    ]
  },
  {
    id: "sr4_divisibility",
    order: 4,
    title: "Dấu hiệu chia hết",
    emoji: "✓",
    description: "Chia hết cho 2, 3, 5, 9; tìm chữ số thích hợp; số chia hết nhiều điều kiện.",
    prerequisite: ["sr4_ops"],
    xp: 45,
    keypoints: [
      "Chia hết cho 2: tận cùng 0,2,4,6,8.",
      "Chia hết cho 5: tận cùng 0 hoặc 5.",
      "Chia hết cho 3 hoặc 9: tổng các chữ số chia hết cho 3 hoặc 9.",
      "Chia hết cho 2 và 5: tận cùng là 0."
    ],
    questions: [
      ["multiple_choice", "Số nào chia hết cho cả 2 và 5?", ["2130", "1235", "1256", "3547"], "2130", "Tận cùng 0 → chia hết 2 và 5."],
      ["multiple_choice", "Trong 2010; 1785; 1209; 4250, số chia hết cho 2, 3, 5 là?", ["2010", "1785", "1209", "4250"], "2010", "2010 tận cùng 0, tổng CS = 3."],
      ["multiple_choice", "Trong 57234; 4110; 77285; 64620, số chia hết cho 2, 3, 5 và 9 là?", ["57234", "4110", "77285", "64620"], "64620", "64620 tận cùng 0, tổng CS chia 9."],
      ["multiple_choice", "Chữ số * trong 86* chia hết cho 3 (một đáp án):", ["1", "2", "4", "7"], "1", "8+6+* chia 3 → * có thể 1,4,7."],
      ["multiple_choice", "Số 283*0 chia hết cho 3, hàng chục có thể là?", ["2", "3", "5", "1"], "5", "28320, 28350 hoặc 28380."],
      ["input", "Số nhỏ nhất dạng 17x8y chia hết 5 và 9, y=0 thì x = ?", "2", "17280: tổng CS=18 chia 9."],
      ["multiple_choice", "Số nào chia hết cho 2, 3 và 5?", ["30", "12", "10", "15"], "30", "30 tận cùng 0, tổng CS=3."],
      ["multiple_choice", "Trong 2507; 2010; 7925; 3200, số chia hết cho 2, 3 và 5?", ["2010", "2507", "7925", "3200"], "2010", "Chỉ 2010 thỏa cả ba điều kiện."],
      ["input", "Chữ số cần điền 13* để chia hết 3 và 5 là?", "5", "* = 5 (tận cùng 5, tổng CS chia 3)."],
      ["multiple_choice", "43659 : 63 có thương là?", ["693", "639", "596", "722"], "693", "Đặt tính chia."]
    ]
  },
  {
    id: "sr4_fraction",
    order: 5,
    title: "Phân số",
    emoji: "🍰",
    description: "So sánh, rút gọn, quy đồng; phân số bằng nhau; tính với phân số.",
    prerequisite: ["sr4_divisibility"],
    xp: 50,
    keypoints: [
      "Phân số bằng nhau khi nhân/chia cùng số tử và mẫu.",
      "Rút gọn: chia tử và mẫu cho ƯCLN.",
      "Quy đồng: MSC của các mẫu số.",
      "So sánh cùng mẫu: tử lớn hơn → phân số lớn hơn."
    ],
    questions: [
      ["multiple_choice", "Phân số bằng 1/2 là?", ["2/4", "3/5", "2/3", "3/4"], "2/4", "2/4 = 1/2 sau rút gọn."],
      ["multiple_choice", "Phân số tối giản trong 6/9; 4/6; 3/5; 8/12?", ["3/5", "4/6", "6/9", "8/12"], "3/5", "3/5 không rút gọn thêm được."],
      ["multiple_choice", "MSC quy đồng mẫu số 9 và 12 là?", ["27", "18", "36", "108"], "36", "MSC(9,12)=36."],
      ["multiple_choice", "Phân số lớn nhất trong 1/2; 2/3; 3/4; 5/6?", ["5/6", "3/4", "2/3", "1/2"], "5/6", "Quy đồng rồi so sánh tử."],
      ["multiple_choice", "1/3 của 12 kg là?", ["4 kg", "3 kg", "6 kg", "2 kg"], "4 kg", "12 × 1/3 = 4 kg."],
      ["input", "Rút gọn 12/18 = ? (dạng a/b tối giản, ví dụ 2/3)", "2/3", "Chia tử mẫu cho 6."],
      ["input", "Rút gọn 15/25 = ?", "3/5", "Chia tử mẫu cho 5."],
      ["multiple_choice", "Phân số bé hơn 1 là?", ["4/5", "7/6", "9/8", "11/10"], "4/5", "Tử < mẫu → PS < 1."],
      ["multiple_choice", "Tỉ số 3 và 7 viết dạng phân số là?", ["3/7", "7/3", "3/10", "7/10"], "3/7", "Tỉ số a:b = a/b."],
      ["input", "3/4 + 1/4 = ? (dạng a/b)", "1/1", "3/4+1/4=4/4=1."],
      ["multiple_choice", "Phân số bằng 2/3 trong 4/6; 6/9; 8/12; 10/15?", ["4/6", "5/8", "3/7", "2/5"], "4/6", "4/6 = 2/3."],
      ["multiple_choice", "Giá trị biểu thức 36576 : (4 × 2) − 3708 = ?", ["863", "864", "846", "854"], "864", "36576:8=4572; 4572−3708=864."]
    ]
  },
  {
    id: "sr4_geometry",
    order: 6,
    title: "Hình học",
    emoji: "📐",
    description: "Góc; song song vuông góc; diện tích HCN, hình thoi, hình bình hành.",
    prerequisite: ["sr4_fraction"],
    xp: 50,
    keypoints: [
      "Hình chữ nhật: 2 cặp cạnh song song; 4 góc vuông.",
      "Hình thoi: 4 cạnh bằng nhau; diện tích = (d₁ × d₂) : 2.",
      "Hình bình hành: 2 cặp cạnh song song; S = đáy × cao.",
      "Diện tích HCN = dài × rộng (cùng đơn vị)."
    ],
    questions: [
      ["multiple_choice", "Hình bình hành có bao nhiêu cặp cạnh song song?", ["1", "2", "3", "4"], "2", "HBH có 2 cặp cạnh đối song song."],
      ["input", "Hình thoi cạnh 15 cm. Chu vi = ? cm", "60", "15 × 4 = 60 cm."],
      ["input", "Hình thoi AC=10cm, BD=20cm. Diện tích = ? cm2", "100", "(10×20):2=100 cm²."],
      ["input", "Hình thoi đường chéo 4cm và 6cm. Diện tích = ? cm2", "12", "(4×6):2=12 cm²."],
      ["input", "Hình thoi đường chéo 3dm và 6dm. Diện tích = ? dm2", "9", "(3×6):2=9 dm²."],
      ["input", "Gạch vuông cạnh 30cm, phòng 9m×6m. Cần ? viên (bỏ mạch vữa)", "1000", "54m²=540000cm²; :900=1000."],
      ["multiple_choice", "Hình bình hành đáy 18cm, cao bằng 1/2 đáy. Diện tích?", ["180 cm2", "160 cm2", "90 cm2", "162 cm2"], "162 cm2", "Cao 9cm; 18×9=162."],
      ["multiple_choice", "Hình bình hành đáy 55dm, cao 34dm. Diện tích?", ["1870 dm2", "1807 dm2", "1670 dm2", "1580 dm2"], "1870 dm2", "55×34=1870 dm²."],
      ["input", "59 dm² 90 cm² = ? cm²", "5990", "59×100+90=5990 cm²."],
      ["input", "6 m² 9 dm² = ? dm²", "609", "6 m²=600 dm²; +9=609."],
      ["input", "23 dm² 24 cm² = ? cm²", "2324", "23×100+24=2324 cm²."],
      ["multiple_choice", "Nửa chu vi HCN 24cm, chiều dài 15cm. Diện tích?", ["135 cm2", "90 cm2", "180 cm2", "360 cm2"], "135 cm2", "Rộng 9cm; 15×9=135."]
    ]
  },
  {
    id: "sr4_word",
    order: 7,
    title: "Toán lời văn",
    emoji: "📖",
    description: "Phân số của số; trung bình; tổng-hiệu; tổng-tỉ; hiệu-tỉ; tuổi mẹ con.",
    prerequisite: ["sr4_geometry"],
    xp: 55,
    keypoints: [
      "Phân số của số: nhân số với tử rồi chia mẫu.",
      "Tổng-hiệu: vẽ sơ đồ, tìm 1 phần rồi nhân.",
      "Tổng-tỉ: tổng : (tỉ₁+tỉ₂) × tỉ cần tìm.",
      "Hiệu-tỉ: hiệu : (tỉ lớn − tỉ bé) × tỉ tương ứng."
    ],
    questions: [
      ["input", "Mẹ 49 tuổi, con bằng 2/7 tuổi mẹ. Con ? tuổi", "14", "49×2/7=14."],
      ["input", "Tổng hai số 100, tỉ 2:3. Số bé = ?", "40", "100:(2+3)×2=40."],
      ["input", "Tổng hai số 130, tỉ 4:9. Số lớn = ?", "90", "130−40=90."],
      ["input", "Hiệu hai số 36, tỉ 8:5. Số thứ nhất = ?", "96", "36:(8−5)×8=96."],
      ["input", "Mẹ hơn con 27 tuổi, tổng tuổi 48. Tuổi con = ?", "12", "(48−27):2 không đúng; mẹ 3×con → 48:4=12."],
      ["input", "Tổng tuổi mẹ con 33, mẹ hơn con 27. Tuổi con = ?", "3", "(33−27):2=3."],
      ["input", "Lớp 35 HS, trai = 2/5 số gái. Số trai = ?", "10", "Gái 25, trai 10."],
      ["input", "Vải xanh = 2/5 vải đỏ, ngắn hơn 12m. Vải xanh = ? m", "8", "Hiệu 3 phần =12 → 1 phần 4m; xanh 8m."],
      ["input", "Trung bình 2 thửa: 1070 và 1456 kg. TB mỗi thửa = ? kg", "1263", "(1070+1456):2=1263."],
      ["input", "Thửa ruộng 60m×(60×2/5)m, 100m² thu 50kg. Thu ? kg", "1200", "Rộng 24m; DT=1440m²; 1440/100×50."],
      ["input", "Hiệu-tỉ 360, tỉ 7:4. Số bé = ?", "480", "360:(7−4)×4=480."],
      ["input", "Vườn chu vi 180m, dài hơn rộng 22m. Diện tích = ? m2", "1904", "Nửa CV 90; rộng 34, dài 56; 34×56."]
    ]
  }
];

const examDefs = [
  {
    n: 1,
    items: [
      { type: "multiple_choice", q: "Đề 1 — Tích 5674 × 125 = ?", choices: ["709250", "709520", "702950", "705920"], a: "709250", h: "5674×125=709250." },
      { type: "multiple_choice", q: "Đề 1 — MSC quy đồng mẫu số 3/4 và 5/6 là?", choices: ["27", "18", "12", "36"], a: "18", h: "MSC(4,6)=12; quy đồng → 18." },
      { type: "multiple_choice", q: "Đề 1 — Tính: 48×49 + 51×48 = ?", choices: ["4900", "5100", "4800", "4951"], a: "4800", h: "48×(49+51)=4800." },
      { type: "multiple_choice", q: "Đề 1 — 4 giờ 25 giây = ? giây", choices: ["14452", "14425", "265", "5785"], a: "14425", h: "4×3600+25=14425." },
      { type: "multiple_choice", q: "Đề 1 — 4 giờ 24 phút = ? phút", choices: ["264", "268", "424", "286"], a: "264", h: "4×60+24=264." }
    ]
  },
  {
    n: 2,
    items: [
      { type: "multiple_choice", q: "Đề 2 — 15 m² = ? cm²", choices: ["150", "150000", "15000", "1500"], a: "150000", h: "1 m²=10000 cm²." },
      { type: "multiple_choice", q: "Đề 2 — 3 tấn 5 tạ = ? kg", choices: ["3500", "3005", "350", "305"], a: "3500", h: "3000+500=3500 kg." },
      { type: "multiple_choice", q: "Đề 2 — Tổ 12 bạn, 5 nữ. Tỉ nam:nữ = ?", choices: ["7/5", "5/7", "7/12", "5/12"], a: "7/5", h: "Nam 7, nữ 5." },
      { type: "multiple_choice", q: "Đề 2 — 36576:(4×2)−3708 = ?", choices: ["863", "864", "846", "854"], a: "864", h: "36576:8−3708=864." },
      { type: "input", q: "Đề 2 — Tổng hai số 100, tỉ 2:3. Số bé = ?", a: "40", h: "100:(2+3)×2=40." }
    ]
  },
  {
    n: 3,
    items: [
      { type: "multiple_choice", q: "Đề 3 — Tích 2309 × 107 = ?", choices: ["247063", "246063", "247003", "247603"], a: "247063", h: "Đặt tính nhân." },
      { type: "multiple_choice", q: "Đề 3 — 3 giờ 15 phút = ? phút", choices: ["185", "195", "193", "155"], a: "195", h: "3×60+15=195." },
      { type: "multiple_choice", q: "Đề 3 — Tính: 35×49 + 51×35 = ?", choices: ["3600", "5100", "3500", "5140"], a: "3500", h: "35×(49+51)=3500." },
      { type: "multiple_choice", q: "Đề 3 — Hình thoi AC=10cm, BD=20cm. Diện tích?", choices: ["100 cm2", "200 cm2", "300 cm2", "400 cm2"], a: "100 cm2", h: "(10×20):2=100." },
      { type: "input", q: "Đề 3 — Mẹ hơn con 27 tuổi, sau 3 năm mẹ gấp 4 lần con. Tuổi con hiện nay?", a: "6", h: "Hiện mẹ 33, con 6." }
    ]
  },
  {
    n: 4,
    items: [
      { type: "multiple_choice", q: "Đề 4 — Số chia hết cho 2, 3, 5 trong 2010;1785;1209;4250?", choices: ["2010", "1785", "1209", "4250"], a: "2010", h: "2010 thỏa cả ba." },
      { type: "multiple_choice", q: "Đề 4 — 2 yến 5 kg = ? kg", choices: ["250", "2005", "25", "205"], a: "25", h: "2 yến=20kg; +5=25." },
      { type: "multiple_choice", q: "Đề 4 — Hình bình hành có ? cặp cạnh song song", choices: ["1", "2", "3", "4"], a: "2", h: "HBH có 2 cặp." },
      { type: "multiple_choice", q: "Đề 4 — 23 dm² 24 cm² = ? cm²", choices: ["2324", "23024", "23424", "230024"], a: "2324", h: "2300+24=2324." },
      { type: "input", q: "Đề 4 — Thửa ruộng nửa chu vi 136m, dài = 5/3 rộng. Diện tích = ? m2", a: "4335", h: "Tìm dài rộng rồi nhân." }
    ]
  },
  {
    n: 5,
    items: [
      { type: "multiple_choice", q: "Đề 5 — Chữ số * trong 13* để chia hết 3 và 5?", choices: ["2", "5", "0", "8"], a: "5", h: "Tận cùng 5, tổng CS chia 3." },
      { type: "multiple_choice", q: "Đề 5 — Hình thoi chéo 3dm và 6dm. Diện tích?", choices: ["18 dm2", "9 dm2", "9 dm", "18 dm"], a: "9 dm2", h: "(3×6):2=9." },
      { type: "multiple_choice", q: "Đề 5 — Con dê nhẹ hơn lợn 24kg, dê = 2/5 lợn. Dê nặng ? kg", choices: ["26", "36", "46", "56"], a: "36", h: "Hiệu 3 phần=24." },
      { type: "input", q: "Đề 5 — Tổng tuổi mẹ con 48, mẹ gấp 3 con. Tuổi con = ?", a: "12", h: "48:4=12." },
      { type: "input", q: "Đề 5 — Ruộng 60m×24m, 100m² thu 50kg. Thu ? kg", a: "1200", h: "1440m² → 1200 kg." }
    ]
  },
  {
    n: 6,
    items: [
      { type: "multiple_choice", q: "Đề 6 — 43659 : 63 có thương?", choices: ["693", "639", "596", "722"], a: "693", h: "Đặt tính chia." },
      { type: "multiple_choice", q: "Đề 6 — 73038 g = ? kg ? g", choices: ["73;38", "7;3038", "73;83", "7303;8"], a: "73;38", h: "73038 g = 73 kg 38 g." },
      { type: "multiple_choice", q: "Đề 6 — Khoảng thời gian dài nhất?", choices: ["85 phút", "2 giờ 5 phút", "1 giờ 5 phút", "128 phút"], a: "128 phút", h: "128 phút > 125 phút." },
      { type: "input", q: "Đề 6 — Lát phòng 8m×5m, gạch 20cm. Cần ? viên", a: "1000", h: "40×25=1000 viên." },
      { type: "input", q: "Đề 6 — TB 2 thửa 1070 và 1456 kg thóc. TB = ? kg", a: "1263", h: "(1070+1456):2=1263." }
    ]
  },
  {
    n: 7,
    items: [
      { type: "input", q: "Đề 7 — Số liền sau 1 283 945 = ?", a: "1283946", h: "+1." },
      { type: "multiple_choice", q: "Đề 7 — Số chia hết 2,3,5,9 trong 57234;4110;77285;64620?", choices: ["57234", "4110", "77285", "64620"], a: "64620", h: "64620 thỏa tất cả." },
      { type: "input", q: "Đề 7 — 3 giờ 15 phút = ? phút", a: "195", h: "195 phút." },
      { type: "input", q: "Đề 7 — 2 tấn 65 kg = ? kg", a: "2065", h: "2000+65=2065." },
      { type: "input", q: "Đề 7 — Tính thuận tiện (32+55)×8+8×12+8 = ?", a: "800", h: "Gom nhân 8." }
    ]
  },
  {
    n: 8,
    items: [
      { type: "multiple_choice", q: "Đề 8 — Giá trị chữ số 5 trong 75 136 217?", choices: ["500000", "5000000", "50000", "5000"], a: "5000000", h: "5 ở hàng triệu lớp triệu thứ 2." },
      { type: "multiple_choice", q: "Đề 8 — 7 dm² 2 cm² = ? cm²", choices: ["72", "702", "7002", "70022"], a: "702", h: "7 dm²=700 cm²; +2=702." },
      { type: "multiple_choice", q: "Đề 8 — Số chia hết 2,3,5 trong 2507;2010;7925;3200?", choices: ["2010", "2507", "7925", "3200"], a: "2010", h: "2010 thỏa điều kiện." },
      { type: "multiple_choice", q: "Đề 8 — Hiệu 9, tỉ 2:1. Số bé = ?", choices: ["18", "9", "27", "15"], a: "9", h: "9:(2−1)×1=9." },
      { type: "input", q: "Đề 8 — Tổng tuổi mẹ con 33, mẹ hơn con 27. Tuổi mẹ = ?", a: "30", h: "Con 3, mẹ 30." }
    ]
  },
  {
    n: 9,
    items: [
      { type: "multiple_choice", q: "Đề 9 — Số 5 triệu, 7 chục nghìn, 6 trăm viết là?", choices: ["5070600", "5007600", "5700600", "5706000"], a: "5070600", h: "5 070 600." },
      { type: "multiple_choice", q: "Đề 9 — Số lớn nhất: 5785; 6874; 6784; 6487?", choices: ["5785", "6784", "6874", "6487"], a: "6874", h: "6874 lớn nhất." },
      { type: "multiple_choice", q: "Đề 9 — TB cộng 36; 42; 57 = ?", choices: ["35", "305", "145", "45"], a: "45", h: "135:3=45." },
      { type: "multiple_choice", q: "Đề 9 — 1 tấn 2 kg = ? kg", choices: ["12", "102", "1002", "10002"], a: "1002", h: "1000+2=1002." },
      { type: "input", q: "Đề 9 — Vườn chu vi 180m, dài hơn rộng 22m. Diện tích = ? m2", a: "1904", h: "Rộng 34, dài 56." }
    ]
  },
  {
    n: 10,
    items: [
      { type: "multiple_choice", q: "Đề 10 — 59 dm² 90 cm² = ? cm²", choices: ["9950", "9905", "9590", "5990"], a: "5990", h: "5900+90=5990." },
      { type: "multiple_choice", q: "Đề 10 — HBH đáy 55dm, cao 34dm. Diện tích?", choices: ["1580 dm2", "1670 dm2", "1807 dm2", "1870 dm2"], a: "1870 dm2", h: "55×34=1870." },
      { type: "multiple_choice", q: "Đề 10 — Lớp 18 nữ, 12 nam. Nam chiếm ? phần cả lớp", choices: ["12/30", "18/30", "12/18", "2/5"], a: "12/30", h: "12/30 = 2/5." },
      { type: "input", q: "Đề 10 — Khối 70 HS, nam = 3/7 khối. Số nữ = ?", a: "40", h: "Nam 30, nữ 40." },
      { type: "input", q: "Đề 10 — Tổng-hiệu: hiệu 360, tỉ 7:4. Số lớn = ?", a: "840", h: "Bé 480, lớn 840." }
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

function buildExamQuestions() {
  const questions = [];
  for (const exam of examDefs) {
    exam.items.forEach((item, idx) => {
      const base = {
        id: `exam4_${exam.n}_q${idx + 1}`,
        skill: `exam4_${exam.n}`,
        exam: `exam4_${exam.n}`
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
  id: `exam4_${exam.n}`,
  order: exam.n,
  title: `Đề ôn số ${exam.n}`,
  questionCount: 5,
  xp: 55,
  passScore: 4,
  prerequisite: i === 0 ? ["sr4_word"] : [`exam4_${exam.n - 1}`]
}));

const payload = {
  meta: {
    id: "summer_g4_g5",
    packId: "g4-g5",
    title: "Ôn hè Toán lớp 4 → lớp 5",
    subtitle: "7 chủ đề tương tác + 10 đề tổng hợp",
    gradeFrom: 4,
    gradeTo: 5,
    source: SOURCE
  },
  topics: topics.map(({ questions, keypoints, ...rest }) => rest),
  lessons: topicLessons,
  exams,
  questions: [...buildTopicQuestions(), ...buildExamQuestions()]
};

await writeFile("data/summer-review-g4-g5.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `✓ summer-review-g4-g5.json — ${payload.topics.length} chủ đề, ${payload.exams.length} đề, ${payload.questions.length} câu`
);
