# TÀI LIỆU ĐẶC TẢ KỸ THUẬT
# Ứng dụng Web: “MathFlow VN”

---

# 1. GIỚI THIỆU DỰ ÁN

## 1.1 Tên dự án
MathFlow VN

Tên thay thế:
- Toán Hero
- Math Journey VN
- Toán Vui THCS
- Math League VN

---

## 1.2 Mục tiêu dự án

Xây dựng một ứng dụng học toán THCS trên nền tảng web giúp học sinh lớp 6–9:

- Học toán theo kỹ năng nhỏ
- Luyện tập hằng ngày
- Nhận phản hồi tức thì
- Hiểu lỗi sai thay vì chỉ biết đúng/sai
- Học bằng hình ảnh trực quan và tương tác
- Duy trì động lực học tập bằng game hóa

Ứng dụng hoạt động hoàn toàn bằng:

- HTML5
- CSS3
- JavaScript ES6+

Không yêu cầu backend trong giai đoạn MVP.

---

# 2. TRIẾT LÝ GIÁO DỤC CỐT LÕI

## 2.1 Micro Learning (Học vi kỹ năng)

Kiến thức được chia thành các kỹ năng rất nhỏ.

Ví dụ:

```text
Phân số
 ├── Rút gọn
 ├── Quy đồng
 ├── So sánh
 ├── Cộng phân số
 └── Nhân phân số
```

Mỗi kỹ năng:
- 3–5 phút học
- 5–10 bài luyện
- phản hồi ngay

---

## 2.2 Error-Based Learning (Học qua lỗi sai)

Ứng dụng không chỉ báo:

```text
Sai
```

Mà phải:

- phân tích lỗi
- xác định nguyên nhân
- giải thích trực quan
- đề xuất luyện tập bổ sung

Ví dụ:

```text
2(x+3)=2x+3
```

Ứng dụng phản hồi:

```text
Bạn quên phân phối số 2 cho tất cả phần tử trong ngoặc.
```

---

## 2.3 Visualization Learning (Trực quan hóa)

Dùng:

- animation
- kéo thả
- hình học động
- graph realtime
- màu sắc
- mô hình trực quan

để giúp học sinh hiểu bản chất.

---

## 2.4 Adaptive Learning

Ứng dụng tự điều chỉnh:

- độ khó
- loại bài tập
- kỹ năng cần luyện thêm

Dựa trên:

- tốc độ làm bài
- tỷ lệ đúng
- loại lỗi sai

---

## 2.5 Gamification

Bao gồm:

- XP
- Level
- Streak
- Badge
- Daily Quest
- Boss Challenge

---

# 3. ĐỐI TƯỢNG NGƯỜI DÙNG

## 3.1 Học sinh

- Lớp 6
- Lớp 7
- Lớp 8
- Lớp 9

---

## 3.2 Phụ huynh

- Theo dõi tiến độ học tập
- Theo dõi điểm yếu
- Theo dõi thời gian học

---

## 3.3 Giáo viên (Giai đoạn mở rộng)

- Giao bài
- Theo dõi lớp học
- Xem thống kê lỗi phổ biến

---

# 4. KIẾN TRÚC HỆ THỐNG

## 4.1 Kiến trúc tổng quan

```text
App
│
├── UI Layer
├── Router
├── Lesson Engine
├── Quiz Engine
├── Error Analysis Engine
├── Visualization Engine
├── Progress Engine
├── Gamification Engine
├── Local Storage Layer
└── Data Layer
```

---

## 4.2 Mô hình SPA

Ứng dụng hoạt động dạng Single Page Application.

Không reload trang.

Sử dụng:

```javascript
window.history.pushState()
```

hoặc hash routing:

```text
#/lesson/fraction
```

---

# 5. CÔNG NGHỆ SỬ DỤNG

# 5.1 Core

| Công nghệ | Vai trò |
|---|---|
| HTML5 | Cấu trúc giao diện |
| CSS3 | Styling |
| JavaScript ES6+ | Logic ứng dụng |

---

# 5.2 Thư viện đề xuất

| Thư viện | Mục đích |
|---|---|
| MathJax | Render công thức toán |
| math.js | Xử lý biểu thức toán |
| Konva.js | Canvas tương tác |
| Chart.js | Biểu đồ tiến độ |
| Anime.js | Animation |
| LocalForage | Lưu dữ liệu local |

---

# 6. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
project/
│
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── sounds/
│
├── data/
│   ├── lessons.json
│   ├── questions.json
│   ├── skills.json
│   └── errors.json
│
├── modules/
│   ├── router.js
│   ├── lessonEngine.js
│   ├── quizEngine.js
│   ├── errorEngine.js
│   ├── visualization.js
│   ├── progress.js
│   └── gamification.js
│
└── components/
    ├── navbar.js
    ├── lessonCard.js
    ├── quizCard.js
    └── modal.js
```

---

# 7. MODULE CHỨC NĂNG CHI TIẾT

# 7.1 Skill Tree Module

## Mục tiêu

Hiển thị cây kỹ năng toán học.

---

## Ví dụ

```text
Đại số
 ├── Số nguyên
 ├── Phân số
 ├── Biểu thức
 └── Phương trình
```

---

## Chức năng

- Khóa/mở khóa kỹ năng
- Hiển thị tiến độ
- Hiển thị độ thành thạo
- Animation hoàn thành

---

## Dữ liệu

```json
{
  "id": "fraction_compare",
  "title": "So sánh phân số",
  "level": 1,
  "prerequisite": ["fraction_reduce"]
}
```

---

# 7.2 Lesson Engine

## Chức năng

Hiển thị bài học ngắn.

---

## Thành phần bài học

- Giới thiệu
- Trực quan hóa
- Ví dụ
- Mini quiz
- Tổng kết

---

## Ví dụ lesson

```json
{
  "id": "lesson_fraction_intro",
  "title": "Giới thiệu phân số",
  "steps": []
}
```

---

# 7.3 Visualization Engine

## Mục tiêu

Trực quan hóa kiến thức toán.

---

# 7.3.1 Fraction Visualization

## Mô tả

Hiển thị:

- 1/2
- 2/4
- 4/8

bằng thanh màu.

---

## Chức năng

- kéo thả
- chia phần
- tô màu
- animation

---

## Công nghệ

- Canvas API
- SVG

---

# 7.3.2 Geometry Visualization

## Mô tả

Cho học sinh:

- kéo đỉnh tam giác
- thay đổi góc
- thay đổi cạnh

và quan sát kết quả realtime.

---

## Ví dụ

Tổng góc tam giác luôn bằng 180 độ.

---

## Công nghệ

```javascript
canvas.addEventListener("mousemove")
```

---

# 7.3.3 Graph Explorer

## Mô tả

Hiển thị đồ thị hàm số realtime.

Ví dụ:

```text
y=ax+b
```

Cho phép thay đổi:

- a
- b

bằng slider.

---

## Công nghệ

- Canvas
- requestAnimationFrame()

---

# 7.3.4 Equation Balance Visualization

## Ý tưởng

Hiển thị phương trình như cân thăng bằng.

Ví dụ:

```text
2x+5=15
```

Khi chuyển vế:
- animation cân bằng
- hiệu ứng di chuyển

---

# 7.4 Quiz Engine

## Mục tiêu

Sinh bài tập và chấm điểm.

---

# 7.4.1 Các loại bài tập

| Loại | Mô tả |
|---|---|
| Multiple Choice | Chọn đáp án |
| Fill Input | Nhập đáp án |
| Drag & Drop | Kéo thả |
| Match Pair | Ghép cặp |
| Step Solving | Giải từng bước |

---

# 7.4.2 Cấu trúc dữ liệu câu hỏi

```json
{
  "id": "q001",
  "skill": "fraction_compare",
  "type": "multiple_choice",
  "question": "1/2 hay 2/3 lớn hơn?",
  "choices": ["1/2", "2/3"],
  "answer": "2/3"
}
```

---

# 7.4.3 Quiz Flow

```text
Hiển thị câu hỏi
        ↓
Người dùng trả lời
        ↓
Kiểm tra đáp án
        ↓
Phân tích lỗi
        ↓
Hiển thị phản hồi
        ↓
Cập nhật XP
```

---

# 7.5 Error Analysis Engine (CORE MODULE)

Đây là module quan trọng nhất của hệ thống.

---

# 7.5.1 Mục tiêu

Phân tích:

- học sinh sai gì
- vì sao sai
- sai theo mẫu nào
- cần luyện gì thêm

---

# 7.5.2 Quy trình xử lý

```text
Input đáp án
      ↓
Normalize biểu thức
      ↓
Pattern Matching
      ↓
Xác định loại lỗi
      ↓
Hiển thị giải thích
      ↓
Đề xuất bài luyện
```

---

# 7.5.3 Các loại lỗi

| Nhóm lỗi | Ví dụ |
|---|---|
| Sai dấu | âm/dương |
| Sai phân phối | bỏ sót số |
| Sai quy đồng | mẫu số |
| Sai chuyển vế | không đổi dấu |
| Sai thứ tự tính | PEMDAS |
| Sai logic | suy luận |

---

# 7.5.4 Cấu trúc dữ liệu lỗi

```json
{
  "pattern": "2x+3",
  "errorType": "distribution_error",
  "message": "Bạn quên phân phối số.",
  "hint": "Hãy nhân 2 với tất cả phần tử trong ngoặc"
}
```

---

# 7.5.5 Pseudocode

```javascript
function analyzeError(answer){

   if(answer.includes("2x+3")){
      return {
         type: "distribution_error",
         message: "Bạn quên phân phối số 2"
      }
   }

}
```

---

# 7.5.6 Adaptive Recommendation

Ví dụ:

```javascript
if(errorType === "distribution_error"){
   recommend("lesson_distributive_property")
}
```

---

# 7.6 Progress Engine

## Mục tiêu

Theo dõi tiến độ học tập.

---

## Dữ liệu theo dõi

- XP
- Accuracy
- Streak
- Skill mastery
- Time learning
- Error frequency

---

## Cấu trúc dữ liệu

```json
{
  "xp": 1200,
  "streak": 7,
  "accuracy": 82
}
```

---

# 7.7 Gamification Engine

## Thành phần

| Thành phần | Mô tả |
|---|---|
| XP | Điểm kinh nghiệm |
| Level | Cấp độ |
| Badge | Huy hiệu |
| Streak | Chuỗi học |
| Daily Quest | Nhiệm vụ |

---

## Ví dụ Badge

- Bậc thầy phân số
- Chiến binh đại số
- Không bỏ cuộc
- 7 ngày liên tiếp

---

# 8. LOCAL STORAGE ARCHITECTURE

## Mục tiêu

Lưu dữ liệu người dùng offline.

---

## Công nghệ

```javascript
localStorage
```

hoặc:

```javascript
IndexedDB
```

---

## Dữ liệu lưu

- tiến độ
- XP
- lịch sử lỗi
- streak
- kỹ năng hoàn thành

---

## Ví dụ

```javascript
localStorage.setItem(
   "userProgress",
   JSON.stringify(progressData)
)
```

---

# 9. ROUTING SYSTEM

## Ví dụ route

```text
#/home
#/lesson/fraction
#/practice/fraction
#/review/errors
```

---

## Router đơn giản

```javascript
window.addEventListener("hashchange", renderPage)
```

---

# 10. UI/UX DESIGN

# 10.1 Thiết kế tổng thể

## Phong cách

- vui nhộn
- dễ đọc
- màu sắc nhẹ
- tối giản
- thân thiện trẻ em

---

## Responsive

Hỗ trợ:

- mobile
- tablet
- desktop

---

# 10.2 Màn hình chính

## Home Screen

Hiển thị:

- streak
- XP hôm nay
- bài học tiếp theo
- nhiệm vụ ngày

---

## Lesson Screen

Hiển thị:

- animation
- lý thuyết ngắn
- ví dụ
- mini quiz

---

## Practice Screen

Hiển thị:

- câu hỏi
- timer
- phản hồi realtime

---

## Error Review Screen

Hiển thị:

- lỗi thường gặp
- giải thích lỗi
- bài luyện đề xuất

---

# 11. ANIMATION SYSTEM

## Mục tiêu

Tăng tính trực quan và hứng thú.

---

## Hiệu ứng đề xuất

| Hiệu ứng | Ứng dụng |
|---|---|
| Fade | Chuyển màn hình |
| Bounce | Đúng đáp án |
| Shake | Sai đáp án |
| Slide | Lesson transition |
| Glow | Achievement |

---

## Công nghệ

- CSS Animation
- Anime.js
- requestAnimationFrame()

---

# 12. PERFORMANCE OPTIMIZATION

## Mục tiêu

- load nhanh
- chạy mượt trên máy yếu
- hoạt động offline cơ bản

---

## Kỹ thuật

- lazy loading
- cache dữ liệu
- tối ưu animation
- hạn chế DOM re-render

---

# 13. BẢO TRÌ VÀ MỞ RỘNG

# 13.1 Phase 2

## Bổ sung backend

Có thể dùng:

- Firebase
- Supabase
- NodeJS API

---

# 13.2 Tính năng mở rộng

- AI tutor
- voice assistant
- multiplayer battle
- classroom mode
- parent dashboard

---

# 14. MVP ĐỀ XUẤT

## Chủ đề nên triển khai đầu tiên

### Phân số lớp 6

Vì:

- dễ trực quan hóa
- nhiều lỗi sai phổ biến
- phù hợp animation
- phù hợp game hóa

---

## MVP Features

### Core

- Skill tree
- Lesson
- Quiz
- Error analysis
- Progress tracking

---

## Visualization

- Fraction bar
- Number line
- Equation balance

---

## Gamification

- XP
- Streak
- Badge

---

# 15. ROADMAP PHÁT TRIỂN

# Phase 1

## 1–2 tháng

- SPA cơ bản
- Quiz system
- Local storage
- Error engine cơ bản
- Fraction visualization

---

# Phase 2

## 2–4 tháng

- Dynamic geometry
- Graph explorer
- Adaptive learning

---

# Phase 3

## 4–6 tháng

- AI tutor
- Multiplayer
- Classroom
- Cloud sync

---

# 16. ĐIỂM KHÁC BIỆT CHIẾN LƯỢC

Ứng dụng KHÔNG chỉ:

- cho bài tập
- chấm điểm
- hiển thị đáp án

Mà:

- hiểu lỗi sai
- giải thích nguyên nhân
- trực quan hóa bản chất toán học
- cá nhân hóa lộ trình học

Đây là lợi thế cạnh tranh lớn nhất.

---

# 17. KẾT LUẬN

Ứng dụng “MathFlow VN” có tiềm năng lớn vì:

- nhu cầu học toán rất cao
- phụ huynh quan tâm mạnh
- học sinh cần môi trường luyện tập liên tục
- mô hình micro-learning + error analysis còn ít đối thủ tại Việt Nam

Nếu tập trung đúng vào:

1. Phân tích lỗi sai
2. Trực quan hóa
3. Adaptive learning

thì sản phẩm sẽ có khả năng tạo khác biệt rất lớn trên thị trường EdTech Việt Nam.
