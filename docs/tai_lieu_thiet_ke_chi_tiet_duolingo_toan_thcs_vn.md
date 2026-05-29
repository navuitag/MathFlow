# TÀI LIỆU THIẾT KẾ CHI TIẾT
# Ứng dụng Web “MathFlow VN”

---

# 1. GIỚI THIỆU

## 1.1 Mục tiêu tài liệu

Tài liệu này mô tả chi tiết:

- kiến trúc frontend
- luồng dữ liệu
- thiết kế UI/UX
- cấu trúc module
- logic xử lý
- thiết kế tương tác
- mô hình dữ liệu
- nguyên lý rendering
- animation system
- error analysis system

cho ứng dụng web học toán THCS.

---

# 2. KIẾN TRÚC FRONTEND

# 2.1 Mô hình tổng thể

```text
Browser
   │
   ▼
index.html
   │
   ▼
App Controller
   │
   ├── Router
   ├── State Manager
   ├── UI Renderer
   ├── Lesson Engine
   ├── Quiz Engine
   ├── Error Engine
   ├── Visualization Engine
   ├── Progress Engine
   └── Storage Engine
```

---

# 2.2 Kiến trúc SPA

Ứng dụng hoạt động theo mô hình:

```text
Single Page Application
```

Không reload toàn bộ trang.

Mọi nội dung được render động vào:

```html
<div id="app"></div>
```

---

# 2.3 Nguyên lý render

## Render flow

```text
User Action
    ↓
Update State
    ↓
Render Component
    ↓
Update DOM
```

---

# 3. CẤU TRÚC THƯ MỤC

```text
project/
│
├── index.html
├── manifest.json
├── service-worker.js
│
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── layout.css
│   │   ├── animation.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── state.js
│   │   └── utils.js
│   │
│   ├── images/
│   └── sounds/
│
├── modules/
│   ├── lesson/
│   ├── quiz/
│   ├── error/
│   ├── visualization/
│   ├── progress/
│   └── gamification/
│
├── data/
│   ├── lessons/
│   ├── quizzes/
│   ├── skills/
│   └── errors/
│
└── components/
    ├── cards/
    ├── modal/
    ├── buttons/
    └── charts/
```

---

# 4. ROUTER DESIGN

# 4.1 Route Structure

```text
#/home
#/skills
#/lesson/:id
#/practice/:id
#/review/errors
#/profile
```

---

# 4.2 Router Logic

## Router pseudocode

```javascript
function router(){

   const hash = location.hash

   switch(hash){
      case '#/home':
         renderHome()
         break

      case '#/skills':
         renderSkills()
         break
   }
}
```

---

# 5. STATE MANAGEMENT

# 5.1 App State

```javascript
const state = {

   user: {},

   progress: {},

   currentLesson: null,

   currentQuestion: null,

   xp: 0,

   streak: 0,

   completedLessons: [],

   weakSkills: []

}
```

---

# 5.2 State Update Flow

```text
Action
   ↓
Update State
   ↓
Save Local Storage
   ↓
Re-render UI
```

---

# 6. UI/UX THIẾT KẾ CHI TIẾT

# 6.1 Design System

## Typography

| Thành phần | Font size |
|---|---|
| Title | 32px |
| Subtitle | 24px |
| Body | 16px |
| Small text | 14px |

---

## Color Palette

| Màu | Ý nghĩa |
|---|---|
| Xanh lá | Đúng |
| Đỏ | Sai |
| Xanh dương | Học tập |
| Vàng | Thành tích |
| Tím | Level |

---

## Border Radius

```css
border-radius: 16px;
```

---

## Shadow

```css
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
```

---

# 6.2 Layout System

## Desktop

```text
Navbar
Sidebar
Main Content
```

---

## Mobile

```text
Top Bar
Main Content
Bottom Navigation
```

---

# 6.3 Main Screens

# 6.3.1 Home Screen

## Thành phần

- XP hôm nay
- Streak
- Daily Quest
- Continue Learning
- Skill Progress

---

## Wireframe

```text
+----------------+
| Avatar   XP    |
| Streak: 7🔥     |
+----------------+
| Continue Lesson|
+----------------+
| Daily Quest    |
+----------------+
| Skill Progress |
+----------------+
```

---

# 6.3.2 Skill Tree Screen

## Thành phần

- skill nodes
- progress lines
- lock state
- mastery level

---

## Interaction

- click node
- unlock animation
- hover info

---

# 6.3.3 Lesson Screen

## Thành phần

- title
- explanation
- animation
- interaction
- mini quiz

---

## Lesson Flow

```text
Intro
 ↓
Visualization
 ↓
Example
 ↓
Practice
 ↓
Summary
```

---

# 6.3.4 Practice Screen

## Thành phần

- question card
- answer area
- timer
- hint button
- feedback panel

---

## Feedback Types

| Kết quả | Hiệu ứng |
|---|---|
| Đúng | bounce |
| Sai | shake |
| Level up | glow |

---

# 6.3.5 Error Review Screen

## Thành phần

- error history
- common mistakes
- recommended lessons
- retry button

---

# 7. COMPONENT DESIGN

# 7.1 Card Component

## HTML Structure

```html
<div class="card">
   <div class="card-title"></div>
   <div class="card-content"></div>
</div>
```

---

# 7.2 Button Component

## Variants

- primary
- secondary
- success
- danger
- disabled

---

## Example

```html
<button class="btn-primary">
   Tiếp tục
</button>
```

---

# 7.3 Modal Component

## Chức năng

- popup hint
- popup achievement
- popup confirm

---

# 8. LESSON ENGINE DESIGN

# 8.1 Lesson Structure

```javascript
const lesson = {

   id: 'fraction_intro',

   title: 'Giới thiệu phân số',

   steps: [],

   quiz: []

}
```

---

# 8.2 Lesson Rendering

## Render flow

```text
Load Lesson JSON
       ↓
Render Title
       ↓
Render Visualization
       ↓
Render Example
       ↓
Render Quiz
```

---

# 9. VISUALIZATION ENGINE DESIGN

# 9.1 Fraction Bar Visualization

## Mục tiêu

Giúp học sinh hiểu:

- phân số
- quy đồng
- phân số tương đương

---

## Interaction

- drag slider
- color fill
- split bar
- compare fractions

---

## Canvas Flow

```text
Create Canvas
      ↓
Draw Rectangle
      ↓
Split Parts
      ↓
Fill Colors
      ↓
Update Realtime
```

---

# 9.2 Number Line Visualization

## Mục tiêu

Hiển thị:

- số nguyên
- phân số
- khoảng cách

---

## Chức năng

- kéo điểm
- zoom line
- animate movement

---

# 9.3 Geometry Engine

## Chức năng

- dynamic triangle
- dynamic circle
- angle measurement
- draggable points

---

## Interaction

```javascript
canvas.addEventListener('mousemove')
```

---

# 9.4 Graph Explorer

## Chức năng

Hiển thị:

```text
y = ax + b
```

---

## Slider System

```html
<input type="range">
```

---

## Realtime Graph Update

```javascript
requestAnimationFrame(drawGraph)
```

---

# 10. QUIZ ENGINE DESIGN

# 10.1 Quiz Lifecycle

```text
Load Question
      ↓
Render UI
      ↓
User Answer
      ↓
Validate
      ↓
Analyze Error
      ↓
Show Feedback
      ↓
Update Progress
```

---

# 10.2 Question Types

| Type | UI |
|---|---|
| Multiple Choice | button group |
| Input | text input |
| Drag Drop | draggable items |
| Step Solving | step cards |
| Match Pair | connection lines |

---

# 10.3 Validation Engine

## Example

```javascript
function validate(answer, correct){
   return answer === correct
}
```

---

# 11. ERROR ANALYSIS ENGINE DESIGN

# 11.1 Mục tiêu

Phân tích:

- lỗi sai phổ biến
- nguyên nhân
- hướng cải thiện

---

# 11.2 Error Detection Pipeline

```text
Raw Answer
    ↓
Normalize
    ↓
Pattern Matching
    ↓
Error Classification
    ↓
Feedback Generator
```

---

# 11.3 Normalize Engine

## Chức năng

Chuẩn hóa:

- khoảng trắng
- dấu
- ký tự toán

---

## Example

```javascript
answer.replace(/\s+/g, '')
```

---

# 11.4 Pattern Matching

## Example

```javascript
if(answer.includes('2x+3')){

   return {
      type: 'distribution_error',
      message: 'Bạn quên phân phối số 2'
   }

}
```

---

# 11.5 Error Categories

| Error Type | Description |
|---|---|
| sign_error | Sai dấu |
| distribution_error | Sai phân phối |
| denominator_error | Sai quy đồng |
| transfer_error | Sai chuyển vế |
| logic_error | Sai suy luận |

---

# 11.6 Feedback Generator

## Response Structure

```javascript
{
   title: 'Sai quy đồng',
   explanation: 'Bạn chưa nhân cả tử và mẫu',
   hint: 'Hãy nhân cùng một số cho tử và mẫu',
   recommendation: 'fraction_equivalent_lesson'
}
```

---

# 12. ADAPTIVE LEARNING DESIGN

# 12.1 Difficulty System

## Levels

| Level | Difficulty |
|---|---|
| 1 | Easy |
| 2 | Medium |
| 3 | Hard |

---

# 12.2 Adaptive Logic

```javascript
if(correctRate > 80){
   increaseDifficulty()
}

if(errorFrequency > 5){
   repeatLesson()
}
```

---

# 13. PROGRESS ENGINE DESIGN

# 13.1 XP System

## Rules

| Action | XP |
|---|---|
| Correct answer | +10 |
| Perfect lesson | +50 |
| Daily streak | +20 |

---

# 13.2 Mastery System

## Mastery Score

```text
0–30   = Beginner
31–60  = Intermediate
61–100 = Master
```

---

# 13.3 Dashboard Charts

## Charts

- XP progress
- accuracy trend
- weak skills
- study time

---

# 14. GAMIFICATION ENGINE DESIGN

# 14.1 Badge System

## Example

| Badge | Requirement |
|---|---|
| Fraction Master | 100 correct |
| Speed Runner | 10 fast answers |
| Never Give Up | 7 streak |

---

# 14.2 Daily Quest

## Example

- Complete 2 lessons
- Correct 10 questions
- Practice 15 minutes

---

# 14.3 Boss Challenge

## Example

"Defeat Algebra Boss"

Điều kiện:

- đúng liên tiếp 10 câu

---

# 15. STORAGE ENGINE DESIGN

# 15.1 Local Storage Keys

```javascript
localStorage.setItem('progress')
localStorage.setItem('xp')
localStorage.setItem('errors')
```

---

# 15.2 IndexedDB Design

## Tables

| Store | Purpose |
|---|---|
| lessons | lesson cache |
| progress | user progress |
| errors | error history |

---

# 16. OFFLINE SUPPORT

# 16.1 Service Worker

## Chức năng

- cache assets
- cache lessons
- offline mode

---

## Files cached

- HTML
- CSS
- JS
- JSON data
- images

---

# 17. ANIMATION SYSTEM

# 17.1 Animation Principles

Animation phải:

- nhẹ
- nhanh
- không gây rối mắt
- tăng trực quan

---

# 17.2 Animation Types

| Animation | Usage |
|---|---|
| Fade | transition |
| Shake | wrong answer |
| Bounce | success |
| Glow | achievement |
| Slide | lesson flow |

---

# 17.3 Animation Timing

```css
transition: 0.3s ease;
```

---

# 18. PERFORMANCE OPTIMIZATION

# 18.1 Optimization Goals

- dưới 3 giây load
- chạy mượt trên mobile yếu
- tối ưu memory

---

# 18.2 Techniques

- lazy loading
- minimize DOM updates
- use requestAnimationFrame
- cache data
- debounce input

---

# 19. ACCESSIBILITY DESIGN

# 19.1 Accessibility Features

- font lớn
- màu tương phản tốt
- hỗ trợ keyboard
- responsive

---

# 19.2 Audio Support

- âm thanh đúng/sai
- voice reading lesson

---

# 20. SECURITY DESIGN

# 20.1 Frontend Security

- sanitize input
- escape HTML
- prevent script injection

---

## Example

```javascript
element.textContent = userInput
```

---

# 21. TESTING DESIGN

# 21.1 Unit Test

Modules:

- quiz engine
- error engine
- progress engine

---

# 21.2 UI Testing

- responsive
- mobile
- interaction
- animation

---

# 21.3 Performance Testing

- FPS
- load time
- memory usage

---

# 22. MVP IMPLEMENTATION PRIORITY

# Priority 1

- Router
- Quiz Engine
- Error Analysis
- Local Storage

---

# Priority 2

- Visualization Engine
- Progress Dashboard
- Gamification

---

# Priority 3

- Adaptive Learning
- Offline Mode
- AI Tutor

---

# 23. KẾT LUẬN

Thiết kế hệ thống tập trung vào:

1. Trực quan hóa toán học
2. Phân tích lỗi sai
3. Học thích nghi
4. Game hóa trải nghiệm
5. SPA nhẹ và nhanh

Kiến trúc hiện tại phù hợp để:

- phát triển MVP nhanh
- mở rộng dần
- dễ bảo trì
- dễ thêm module AI trong tương lai.
