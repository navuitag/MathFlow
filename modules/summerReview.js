import { escapeHtml } from "../assets/js/utils.js";
import { formatMathHtml } from "../assets/js/mathFormat.js";
import { renderQuizCard } from "../components/quizCard.js";
import { showModal } from "../components/modal.js";
import { validateAnswer } from "./quizEngine.js";
import { updateState } from "../assets/js/state.js";

const XP_TOPIC = 30;
const XP_EXAM = 50;
const XP_COMBO_BONUS = 5;
const XP_PERFECT = 20;

function defaultSummerProgress() {
  return {
    topicStars: {},
    topicBest: {},
    completedTopics: [],
    examResults: {},
    unlockedExams: ["exam_1"],
    sessionCombo: 0,
    bestCombo: 0
  };
}

function getSummerProgress(state) {
  if (!state.summerReview) state.summerReview = defaultSummerProgress();
  return state.summerReview;
}

function isTopicUnlocked(topic, progress, completedTopics) {
  if (!topic.prerequisite?.length) return true;
  return topic.prerequisite.every((id) => completedTopics.includes(id));
}

function isExamUnlocked(exam, progress) {
  return progress.unlockedExams.includes(exam.id);
}

function getTopicQuestions(data, topicId) {
  return data.questions.filter((q) => q.topic === topicId);
}

function getExamQuestions(data, examId) {
  return data.questions.filter((q) => q.exam === examId);
}

function starsFromAccuracy(correct, total) {
  const pct = total ? correct / total : 0;
  if (pct >= 1) return 3;
  if (pct >= 0.75) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

function renderStars(count) {
  return Array.from({ length: 3 }, (_, i) => `<span class="sr-star${i < count ? " filled" : ""}">★</span>`).join("");
}

function awardXp(amount, reason) {
  updateState((state) => {
    state.xp += amount;
    state.todayXp += amount;
  });
  return amount;
}

export function createSummerReviewModule(ctx) {
  const session = {
    mode: null,
    id: null,
    questions: [],
    index: 0,
    correct: 0,
    combo: 0,
    answers: []
  };

  function resetSession() {
    session.mode = null;
    session.id = null;
    session.questions = [];
    session.index = 0;
    session.correct = 0;
    session.combo = 0;
    session.answers = [];
  }

  function getData() {
    return ctx.data.summerReview || { topics: [], exams: [], lessons: [], questions: [], meta: {} };
  }

  function renderHub(state) {
    const data = getData();
    const progress = getSummerProgress(state);
    const completedTopics = progress.completedTopics || [];
    const topicDone = completedTopics.length;
    const examDone = Object.keys(progress.examResults || {}).length;
    const totalStars = Object.values(progress.topicStars || {}).reduce((a, b) => a + b, 0);

    const topicCards = data.topics
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((topic) => {
        const unlocked = isTopicUnlocked(topic, progress, completedTopics);
        const stars = progress.topicStars[topic.id] || 0;
        const done = completedTopics.includes(topic.id);
        return `
          <article class="sr-topic-card${unlocked ? "" : " locked"}${done ? " done" : ""}">
            <div class="sr-topic-icon">${topic.emoji}</div>
            <div class="sr-topic-body">
              <span class="sr-topic-order">Chủ đề ${topic.order}</span>
              <h3>${escapeHtml(topic.title)}</h3>
              <p>${escapeHtml(topic.description)}</p>
              <div class="sr-topic-meta">
                ${renderStars(stars)}
                <span>${topic.xp} XP</span>
              </div>
            </div>
            ${unlocked
    ? `<a class="btn primary sr-topic-btn" href="#/summer/topic/${topic.id}">${done ? "Ôn lại" : "Bắt đầu"}</a>`
    : `<span class="sr-lock">🔒 Hoàn thành chủ đề trước</span>`}
          </article>
        `;
      }).join("");

    const examPath = data.exams.map((exam) => {
      const unlocked = isExamUnlocked(exam, progress);
      const result = progress.examResults[exam.id];
      const passed = result && result.correct >= exam.passScore;
      return `
        <a class="sr-exam-node${unlocked ? "" : " locked"}${passed ? " passed" : ""}" href="${unlocked ? `#/summer/exam/${exam.id}` : "#"}" ${unlocked ? "" : 'aria-disabled="true"'}>
          <span class="sr-exam-num">${exam.order}</span>
          ${passed ? `<span class="sr-exam-badge">✓</span>` : ""}
        </a>
      `;
    }).join("");

    return `
      <section class="sr-hero">
        <a class="back-link" href="#/home">← Trang chủ</a>
        <span class="eyebrow">Luyện tập tương tác · Gamification</span>
        <h1>${escapeHtml(data.meta.title || "Ôn hè Toán")}</h1>
        <p>${escapeHtml(data.meta.subtitle || "")}</p>
        <div class="sr-hero-stats">
          <article><strong>${topicDone}/${data.topics.length}</strong><span>Chủ đề</span></article>
          <article><strong>${examDone}/${data.exams.length}</strong><span>Đề ôn</span></article>
          <article><strong>${totalStars}</strong><span>Sao</span></article>
          <article><strong>${progress.bestCombo || 0}</strong><span>Combo cao nhất</span></article>
        </div>
      </section>

      <section class="sr-section">
        <header class="section-head">
          <h2>🗺️ Lộ trình 7 chủ đề</h2>
          <p>Học lý thuyết ngắn → luyện câu hỏi → nhận sao và XP</p>
        </header>
        <div class="sr-topic-grid">${topicCards}</div>
      </section>

      <section class="sr-section">
        <header class="section-head">
          <h2>🏆 23 đề tổng hợp</h2>
          <p>Hoàn thành từng đề để mở khóa đề tiếp theo. Đạt ≥ ${data.exams[0]?.passScore || 4}/5 câu để vượt qua.</p>
        </header>
        <div class="sr-exam-path">${examPath}</div>
      </section>

      <section class="sr-rules card-panel">
        <h3>🎮 Quy tắc game hóa</h3>
        <ul>
          <li><strong>+10 XP</strong> mỗi câu đúng · <strong>+${XP_COMBO_BONUS} XP</strong> bonus khi combo ≥ 3</li>
          <li><strong>+${XP_TOPIC} XP</strong> khi hoàn thành chủ đề · <strong>+${XP_EXAM} XP</strong> khi vượt đề</li>
          <li><strong>+${XP_PERFECT} XP</strong> thưởng đề không sai · Sao: 3★ = 100%, 2★ ≥ 75%, 1★ ≥ 50%</li>
        </ul>
      </section>
    `;
  }

  function renderTopicLesson(topicId, state) {
    const data = getData();
    const topic = data.topics.find((t) => t.id === topicId);
    const lesson = data.lessons.find((l) => l.id === topicId);
    if (!topic || !lesson) return ctx.notFound("Không tìm thấy chủ đề.");

    const progress = getSummerProgress(state);
    const stars = progress.topicStars[topicId] || 0;
    const qCount = getTopicQuestions(data, topicId).length;

    return `
      <section class="lesson-layout sr-lesson">
        <aside class="lesson-sidebar">
          <a class="back-link" href="#/summer">← Ôn hè</a>
          <span class="sr-topic-icon lg">${topic.emoji}</span>
          <h1>${escapeHtml(topic.title)}</h1>
          <p>${renderStars(stars)} · ${qCount} câu luyện</p>
          <div class="progress-track"><span style="width:${Math.round((stars / 3) * 100)}%"></span></div>
        </aside>
        <div class="lesson-steps">
          ${lesson.steps.map((step, index) => `
            <article class="lesson-step${step.type === "keypoints" ? " lesson-step-keypoints" : ""}">
              <span class="step-count">${index + 1}</span>
              <div>
                <h2>${escapeHtml(step.title)}</h2>
                ${step.content ? `<p class="math-content">${formatMathHtml(step.content)}</p>` : ""}
                ${step.type === "keypoints" && step.points?.length ? `
                  <ul class="keypoints-list">
                    ${step.points.map((p) => `<li class="math-content">${formatMathHtml(p)}</li>`).join("")}
                  </ul>` : ""}
              </div>
            </article>
          `).join("")}
          <div class="completion-panel sr-play-panel">
            <div>
              <h2>Sẵn sàng thử thách?</h2>
              <p>Luyện ${qCount} câu — giữ combo để nhận XP thưởng!</p>
            </div>
            <a class="btn primary" href="#/summer/topic/${topicId}/play">Chơi ngay 🎯</a>
          </div>
        </div>
      </section>
    `;
  }

  function renderPlayHeader() {
    const total = session.questions.length;
    const current = session.index + 1;
    const pct = total ? Math.round((session.index / total) * 100) : 0;
    return `
      <div class="sr-play-header">
        <div class="sr-play-progress">
          <span>Câu ${current}/${total}</span>
          <div class="progress-track"><span style="width:${pct}%"></span></div>
        </div>
        <div class="sr-combo${session.combo >= 3 ? " hot" : ""}" aria-live="polite">
          🔥 Combo ×${session.combo}
        </div>
        <div class="sr-score">✓ ${session.correct}</div>
      </div>
    `;
  }

  function renderTopicPlay(topicId, state) {
    const data = getData();
    const topic = data.topics.find((t) => t.id === topicId);
    if (!topic) return ctx.notFound("Không tìm thấy chủ đề.");

    if (session.mode === "topic" && session.id === topicId) {
      if (session.index >= session.questions.length) {
        session.index = 0;
        session.correct = 0;
        session.combo = 0;
        session.answers = [];
      }
    } else {
      session.mode = "topic";
      session.id = topicId;
      session.questions = getTopicQuestions(data, topicId);
      session.index = 0;
      session.correct = 0;
      session.combo = 0;
      session.answers = [];
    }

    if (session.index >= session.questions.length) {
      return renderTopicComplete(topicId, state);
    }

    const question = session.questions[session.index];
    return `
      <section class="sr-play-shell">
        <a class="back-link" href="#/summer/topic/${topicId}">← ${escapeHtml(topic.title)}</a>
        ${renderPlayHeader()}
        ${renderQuizCard(question, { workbook: false })}
      </section>
    `;
  }

  function renderExamPlay(examId, state) {
    const data = getData();
    const exam = data.exams.find((e) => e.id === examId);
    const progress = getSummerProgress(state);
    if (!exam) return ctx.notFound("Không tìm thấy đề.");
    if (!isExamUnlocked(exam, progress)) return ctx.notFound("Đề chưa mở khóa. Hoàn thành đề trước hoặc chủ đề đầu tiên.");

    if (session.mode === "exam" && session.id === examId) {
      if (session.index >= session.questions.length) {
        session.index = 0;
        session.correct = 0;
        session.combo = 0;
        session.answers = [];
      }
    } else {
      session.mode = "exam";
      session.id = examId;
      session.questions = getExamQuestions(data, examId);
      session.index = 0;
      session.correct = 0;
      session.combo = 0;
      session.answers = [];
    }

    if (session.index >= session.questions.length) {
      return renderExamComplete(examId, state);
    }

    const question = session.questions[session.index];
    return `
      <section class="sr-play-shell">
        <a class="back-link" href="#/summer">← Ôn hè</a>
        <div class="sr-exam-banner">
          <span class="tag">Đề ôn ${exam.order}</span>
          <span>Cần ≥ ${exam.passScore}/${exam.questionCount} câu để vượt qua</span>
        </div>
        ${renderPlayHeader()}
        ${renderQuizCard(question, { workbook: false })}
      </section>
    `;
  }

  function renderTopicComplete(topicId, state) {
    const data = getData();
    const topic = data.topics.find((t) => t.id === topicId);
    const total = session.questions.length;
    const stars = starsFromAccuracy(session.correct, total);
    const isNewBest = stars > (getSummerProgress(state).topicStars[topicId] || 0);

    updateState((s) => {
      const sr = getSummerProgress(s);
      const prevStars = sr.topicStars[topicId] || 0;
      sr.topicStars[topicId] = Math.max(prevStars, stars);
      if (!sr.completedTopics.includes(topicId)) sr.completedTopics.push(topicId);
      sr.bestCombo = Math.max(sr.bestCombo || 0, session.combo);
      sr.sessionCombo = session.combo;
    });

    let bonusXp = 0;
    if (isNewBest && stars > 0) bonusXp += XP_TOPIC;
    if (stars === 3) bonusXp += XP_PERFECT;
    if (bonusXp) awardXp(bonusXp, "topic");

    const nextTopic = data.topics.find((t) => t.order === topic.order + 1);

    return `
      <section class="sr-result card-panel">
        <div class="sr-result-icon">${stars >= 2 ? "🎉" : stars >= 1 ? "👍" : "💪"}</div>
        <h1>Hoàn thành: ${escapeHtml(topic.title)}</h1>
        <div class="sr-result-stars">${renderStars(stars)}</div>
        <p>${session.correct}/${total} câu đúng · Combo cao nhất: ${session.combo}</p>
        ${bonusXp ? `<p class="sr-xp-bonus">+${bonusXp} XP thưởng!</p>` : ""}
        <div class="hero-actions">
          ${nextTopic ? `<a class="btn primary" href="#/summer/topic/${nextTopic.id}">Chủ đề tiếp →</a>` : ""}
          <a class="btn secondary" href="#/summer/topic/${topicId}/play">Chơi lại</a>
          <a class="btn secondary" href="#/summer">Về lộ trình</a>
        </div>
      </section>
    `;
  }

  function renderExamComplete(examId, state) {
    const data = getData();
    const exam = data.exams.find((e) => e.id === examId);
    const total = session.questions.length;
    const passed = session.correct >= exam.passScore;
    const perfect = session.correct === total;

    updateState((s) => {
      const sr = getSummerProgress(s);
      const prev = sr.examResults[examId];
      if (!prev || session.correct > prev.correct) {
        sr.examResults[examId] = {
          correct: session.correct,
          total,
          passed,
          completedAt: Date.now()
        };
      }
      if (passed) {
        const nextId = `exam_${exam.order + 1}`;
        if (!sr.unlockedExams.includes(nextId) && exam.order < 23) {
          sr.unlockedExams.push(nextId);
        }
      }
      sr.bestCombo = Math.max(sr.bestCombo || 0, session.combo);
    });

    let bonusXp = 0;
    if (passed) bonusXp += XP_EXAM;
    if (perfect) bonusXp += XP_PERFECT;
    if (bonusXp) awardXp(bonusXp, "exam");

    const nextExam = data.exams.find((e) => e.order === exam.order + 1);

    return `
      <section class="sr-result card-panel">
        <div class="sr-result-icon">${passed ? (perfect ? "🏆" : "✅") : "📚"}</div>
        <h1>${escapeHtml(exam.title)}</h1>
        <p class="sr-result-score">${session.correct}/${total} câu đúng</p>
        <p>${passed ? "Chúc mừng! Em đã vượt qua đề này." : `Cần ${exam.passScore} câu đúng. Cố gắng thêm nhé!`}</p>
        ${bonusXp ? `<p class="sr-xp-bonus">+${bonusXp} XP thưởng!</p>` : ""}
        <div class="hero-actions">
          ${passed && nextExam ? `<a class="btn primary" href="#/summer/exam/${nextExam.id}">Đề ${nextExam.order} →</a>` : ""}
          <a class="btn secondary" href="#/summer/exam/${examId}">Làm lại</a>
          <a class="btn secondary" href="#/summer">Về lộ trình</a>
        </div>
      </section>
    `;
  }

  function handlePlayAnswer(answer, question) {
    const correct = validateAnswer(answer, question);
    const card = document.querySelector(".quiz-card");
    const panel = document.querySelector(".feedback-panel");

    card?.classList.remove("is-correct", "is-wrong");
    card?.classList.add(correct ? "is-correct" : "is-wrong");

    let xpGain = 0;
    if (correct) {
      session.correct += 1;
      session.combo += 1;
      xpGain = 10;
      if (session.combo >= 3) xpGain += XP_COMBO_BONUS;
      awardXp(xpGain, "answer");
      updateState((s) => {
        s.dailyQuest.progress = Math.min(s.dailyQuest.target, s.dailyQuest.progress + 1);
      });
    } else {
      session.combo = 0;
    }

    session.answers.push({ questionId: question.id, answer, correct });

    if (panel) {
      panel.innerHTML = correct
        ? `<strong>Chính xác!</strong> +${xpGain} XP${session.combo >= 3 ? ` · Combo ×${session.combo} 🔥` : ""}`
        : `<strong>Chưa đúng.</strong> Đáp án: <strong>${escapeHtml(question.answer)}</strong><br>${formatMathHtml(question.hint || "")}`;
    }

    document.querySelectorAll(".choice-btn, .answer-form button").forEach((el) => {
      el.disabled = true;
    });

    setTimeout(() => {
      session.index += 1;
      ctx.renderRoute();
    }, correct ? 900 : 1600);
  }

  function bindPlayQuiz() {
    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = document.querySelector(".quiz-card");
        const qId = card?.dataset.questionId;
        const question = session.questions.find((q) => q.id === qId);
        if (question) handlePlayAnswer(btn.dataset.answer, question);
      });
    });

    const form = document.querySelector(".answer-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector(".answer-input");
        const card = document.querySelector(".quiz-card");
        const qId = card?.dataset.questionId;
        const question = session.questions.find((q) => q.id === qId);
        if (question && input?.value.trim()) handlePlayAnswer(input.value.trim(), question);
      });
    }

    document.querySelectorAll(".hint-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hint = btn.dataset.hint;
        if (hint) showModal({ title: "Gợi ý", body: formatMathHtml(hint), actionLabel: "Đã hiểu" });
      });
    });
  }

  function resetOnLeave(route) {
    if (!route.startsWith("summer")) resetSession();
  }

  function renderExamIntro(examId, state) {
    const data = getData();
    const exam = data.exams.find((e) => e.id === examId);
    const progress = getSummerProgress(state);
    if (!exam) return ctx.notFound("Không tìm thấy đề.");
    if (!isExamUnlocked(exam, progress)) return ctx.notFound("Đề chưa mở khóa.");

    const prev = progress.examResults[examId];
    resetSession();

    return `
      <section class="sr-exam-intro card-panel">
        <a class="back-link" href="#/summer">← Ôn hè</a>
        <span class="tag">Đề tổng hợp</span>
        <h1>${escapeHtml(exam.title)}</h1>
        <p>${exam.questionCount} câu · Cần ≥ ${exam.passScore} câu đúng để vượt qua · Thưởng ${exam.xp} XP</p>
        ${prev ? `<p>Kết quả trước: ${prev.correct}/${prev.total} ${prev.passed ? "✓" : ""}</p>` : ""}
        <ul class="sr-exam-topics">
          <li>Số & dãy số</li>
          <li>Cộng trừ</li>
          <li>So sánh</li>
          <li>Lời văn</li>
          <li>Tư duy</li>
        </ul>
        <a class="btn primary" href="#/summer/exam/${examId}/play">Bắt đầu làm bài ⏱️</a>
      </section>
    `;
  }

  return {
    resetOnLeave,
    renderHub,
    renderTopicLesson,
    renderTopicPlay,
    renderExamIntro,
    renderExamPlay,
    bindPlayQuiz,
    resetSession
  };
}
