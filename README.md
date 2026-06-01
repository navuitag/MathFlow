# MathFlow VN — Học Toán kiểu Duolingo

Ứng dụng web học Toán (lớp 1–5, 6–9) theo phong cách "vi kỹ năng" (micro-learning): học bài ngắn, luyện tập, **phản hồi và phân tích lỗi sai tức thì**, kèm trực quan hóa và game hóa để duy trì động lực. Lớp 1–5 bám sát SGK **Kết nối tri thức với cuộc sống** (lớp 1: 41 bài; lớp 2: 75 bài; lớp 3: 81 bài; lớp 4: 73 bài, 13 chủ đề; lớp 5: 75 bài).

Ứng dụng là **SPA thuần** bằng HTML5 + CSS3 + JavaScript ES6 (ES Modules), **không cần backend**, chạy được offline (PWA + Service Worker + localStorage).

---

## Tính năng chính

- **Chọn lớp để học**: màn hình chọn lớp khi mở app lần đầu, dropdown đổi lớp trên thanh điều hướng (mọi trang), và nút "Đổi lớp" trong Hồ sơ (giữ nguyên tiến độ).
- **Cây kỹ năng (Skill Tree)**: nội dung được chia theo lớp và **nhóm theo chương**; mỗi nút là một vi kỹ năng, mở khóa dần theo `prerequisite`.
- **Bài học ngắn**: lý thuyết + minh họa trực quan + mini quiz.
- **Luyện tập & chấm tức thì**: nhiều dạng câu hỏi, phản hồi đúng/sai ngay.
- **Phân tích lỗi sai (module lõi)**: chuẩn hóa biểu thức → so khớp mẫu lỗi → giải thích nguyên nhân + gợi ý + đề xuất bài ôn.
- **Trực quan hóa**: ~25 loại minh họa bằng SVG/HTML (thanh phân số, trục số, cân phương trình, tam giác, đồ thị, parabol, đường tròn...).
- **Tiến độ & Game hóa**: XP, level, streak, mastery theo kỹ năng, huy hiệu, daily quest, sổ tay lỗi sai.
- **Lưu cục bộ**: toàn bộ trạng thái lưu trong `localStorage`, không cần đăng nhập.

---

## Nội dung

| | Tổng | Lớp 1 | Lớp 2 | Lớp 3 | Lớp 4 | Lớp 5 | Lớp 6 | Lớp 7 | Lớp 8 | Lớp 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Kỹ năng / Bài học | 492 | 41 | 75 | 81 | 73 | 75 | 39 | 37 | 39 | 32 |
| Câu hỏi | 984 | 82 | 150 | 162 | 146 | 150 | 78 | 74 | 78 | 64 |
| Mẫu lỗi sai | 121 | 11 | 14 | 15 | 15 | 15 | — | — | — | — |

Mỗi kỹ năng có 1 bài học và (tối thiểu) 2 câu hỏi, được tổ chức theo chương/sách (Tập 1 & Tập 2). Lớp 1–5 theo SGK KNT; lớp 6–9 theo chương trình Toán THCS.

---

## Cách chạy

Ứng dụng dùng ES Modules và `fetch` nên **cần chạy qua HTTP server** (không mở trực tiếp `file://`).

### Cách 1 — Python (có sẵn trên macOS/Linux)

```bash
cd duolingo-math
python3 -m http.server 8000
```

Mở trình duyệt: http://localhost:8000

### Cách 2 — Node.js

```bash
cd duolingo-math
npx serve -l 8000
# hoặc
npx http-server -p 8000
```

> Lần đầu vào app sẽ hiện màn hình **chọn lớp**. Sau đó có thể đổi lớp qua dropdown trên navbar hoặc nút "Đổi lớp" trong trang Hồ sơ.

---

## Cấu trúc thư mục

```text
duolingo-math/
├── index.html              # Điểm vào SPA (#app)
├── manifest.json           # Cấu hình PWA
├── service-worker.js       # Cache offline
│
├── assets/
│   ├── css/                # main, layout, animation, responsive
│   └── js/
│       ├── app.js          # Khởi động: tải JSON, cấu hình router
│       ├── router.js       # Hash router + render các màn hình
│       ├── state.js        # State toàn cục + localStorage
│       └── utils.js        # Tiện ích (normalizeMath, escapeHtml, ...)
│
├── modules/
│   ├── lessonEngine.js     # Hoàn thành bài học
│   ├── quizEngine.js       # Chấm bài, cập nhật XP/mastery
│   ├── errorEngine.js      # Phân tích lỗi sai (module lõi)
│   ├── progress.js         # Tiến độ, độ chính xác, kỹ năng yếu
│   ├── gamification.js     # XP, level, huy hiệu
│   └── visualization.js    # Các minh họa toán học
│
├── components/             # navbar, lessonCard, quizCard, modal
│
├── data/
│   ├── skills.json         # 492 kỹ năng (grade, chương, prerequisite, ...)
│   ├── lessons.json        # 492 bài học
│   ├── questions.json      # 984 câu hỏi
│   └── errors.json         # 121 mẫu lỗi sai
│
├── scripts/                # Script sinh/bổ sung nội dung (generate-grade1–5-content.mjs, ...)
│
└── *.md                    # Tài liệu đặc tả & thiết kế chi tiet
```

---

## Định tuyến (hash routing)

| Route | Màn hình |
|---|---|
| `#/home` | Trang chủ (theo lớp đang chọn) |
| `#/skills` | Cây kỹ năng (tab chọn lớp + nhóm theo chương) |
| `#/lesson/:id` | Bài học |
| `#/practice/:id` | Luyện tập một kỹ năng |
| `#/review/errors` | Sổ tay lỗi sai |
| `#/profile` | Hồ sơ (đổi lớp, xóa tiến độ) |

---

## Mô hình dữ liệu (ví dụ)

Kỹ năng (`skills.json`):

```json
{
  "id": "nat_set",
  "title": "Bài 1. Tập hợp",
  "grade": 6,
  "book": "Tập 1",
  "chapter": "Tập hợp các số tự nhiên",
  "chapterIndex": 1,
  "lessonNo": 1,
  "level": 1,
  "prerequisite": [],
  "visualization": "set"
}
```

Trạng thái người dùng (`localStorage` key: `mathflow_vn_state`):

```json
{
  "selectedGrade": 6,
  "onboarded": true,
  "xp": 0,
  "streak": 1,
  "completedLessons": [],
  "skillMastery": {},
  "answers": [],
  "errors": []
}
```

---

## Công nghệ

- HTML5, CSS3, JavaScript ES6+ (ES Modules), SVG.
- Không phụ thuộc framework; không cần build step.
- PWA: `manifest.json` + `service-worker.js`.

## Tài liệu liên quan

- `dac_ta_ky_thuat_duolingo_toan_thcs_vn.md` — Đặc tả kỹ thuật.
- `tai_lieu_thiet_ke_chi_tiet_duolingo_toan_thcs_vn.md` — Thiết kế chi tiết.
