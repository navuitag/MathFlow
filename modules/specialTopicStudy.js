import { focusAnswerInput } from "../components/quizCard.js";
import { submitAnswer } from "./quizEngine.js";

function getStudy(ctx) {
  return ctx.data.specialTopicStudy || { meta: {}, lessons: [], flashDecks: {}, exercises: [] };
}

function getLesson(study, topicId) {
  return study.lessons.find((item) => item.topicId === topicId) || null;
}

function getDeck(study, topicId) {
  return study.flashDecks[topicId] || [];
}

function getTopicExercises(study, topicId) {
  return study.exercises.filter((item) => item.topic === topicId);
}

function withSkill(exercise, topicId) {
  return { ...exercise, skill: topicId };
}

export function createSpecialTopicStudyModule(ctx) {
  const session = {
    topicId: null,
    continueAfterComplete: false,
    workbookFilter: "all",
    flashcards: null
  };

  function resetIfNeeded(topicId) {
    if (session.topicId !== topicId) {
      session.topicId = topicId;
      session.continueAfterComplete = false;
      session.workbookFilter = "all";
      session.flashcards = null;
    }
  }

  function getCorrectExerciseIds(topicId, state) {
    return new Set(
      state.answers
        .filter((answer) => answer.skill === topicId && answer.correct && String(answer.questionId).startsWith("st_"))
        .map((answer) => answer.questionId)
    );
  }

  function getFilteredExercises(study, topicId) {
    const all = getTopicExercises(study, topicId);
    if (session.workbookFilter === "mc") {
      return all.filter((item) => item.type === "multiple_choice" || item.type === "true_false");
    }
    if (session.workbookFilter === "input") {
      return all.filter((item) => item.type === "input");
    }
    return all;
  }

  function areAllExercisesCorrect(topicId, state, study) {
    const list = getFilteredExercises(study, topicId);
    if (!list.length) return false;
    const correctIds = getCorrectExerciseIds(topicId, state);
    return list.every((item) => correctIds.has(item.id));
  }

  function pickExercise(study, topicId, state) {
    const list = getFilteredExercises(study, topicId);
    const correctIds = getCorrectExerciseIds(topicId, state);
    const remaining = list.filter((item) => !correctIds.has(item.id));
    if (remaining.length) return remaining[0];
    if (!session.continueAfterComplete) return null;
    const attempts = state.answers.filter(
      (answer) => answer.skill === topicId && String(answer.questionId).startsWith("st_")
    ).length;
    return list[attempts % list.length];
  }

  function renderWorkbookFilters(study, topicId, activeFilter) {
    const all = getTopicExercises(study, topicId);
    const mc = all.filter((item) => item.type === "multiple_choice" || item.type === "true_false").length;
    const input = all.filter((item) => item.type === "input").length;
    const filters = [{ id: "all", label: `Tất cả (${all.length})` }];
    if (mc) filters.push({ id: "mc", label: `Trắc nghiệm (${mc})` });
    if (input) filters.push({ id: "input", label: `Tự luận (${input})` });
    return `
      <div class="workbook-filters st-workbook-filters" role="group" aria-label="Lọc bài tập">
        ${filters.map((filter) => `
          <button type="button" class="workbook-filter${filter.id === activeFilter ? " active" : ""}" data-st-workbook-filter="${filter.id}">${filter.label}</button>
        `).join("")}
      </div>
    `;
  }

  function renderCompletionPanel(topicId, catalog) {
    const idx = catalog.topics.findIndex((item) => item.id === topicId);
    const next = idx >= 0 ? catalog.topics[idx + 1] : null;
    return `
      <article class="quiz-complete-panel">
        <h2>Đã hoàn thành bài tập rèn luyện!</h2>
        <p>Bạn muốn chuyển sang chuyên đề tiếp theo hay luyện lại các câu này?</p>
        <div class="quiz-complete-actions">
          ${next
            ? `<a class="btn primary" href="#/special-topic/${next.id}/workbook">Chuyên đề tiếp →</a>`
            : `<a class="btn primary" href="#/special-topic">Về danh sách</a>`}
          <button class="btn secondary" type="button" id="stStudyContinue">Luyện thêm</button>
        </div>
      </article>
    `;
  }

  function ensureFlashDeck(topicId, study) {
    if (session.flashcards?.deck && session.topicId === topicId) return;
    session.flashcards = {
      deck: getDeck(study, topicId),
      index: 0,
      flipped: false,
      known: new Set(),
      xpAwarded: false
    };
  }

  function renderFlash(topicId, state) {
    const study = getStudy(ctx);
    const lesson = getLesson(study, topicId);
    if (!lesson) return ctx.notFound("Chưa có Flash Study cho chuyên đề này.");
    resetIfNeeded(topicId);
    ensureFlashDeck(topicId, study);
    const flashSession = session.flashcards;
    const body = flashSession.deck.length
      ? ctx.renderFlashcardPanel(flashSession.deck, flashSession.index, flashSession.flipped)
      : `<article class="empty-state">Chưa trích xuất được thẻ lý thuyết. Xem PDF gốc để ôn thêm.</article>`;
    return `
      <div class="st-study-panel">
        <p class="st-study-meta">${lesson.cardCount} thẻ · ${lesson.theoryCount} mục lý thuyết</p>
        ${body}
      </div>
    `;
  }

  function renderWorkbook(topicId, state) {
    const study = getStudy(ctx);
    const lesson = getLesson(study, topicId);
    const list = getTopicExercises(study, topicId);
    if (!lesson || !list.length) {
      return `<article class="empty-state">Chưa có bài tập rèn luyện cho chuyên đề này. Hãy xem PDF gốc.</article>`;
    }
    resetIfNeeded(topicId);
    const allComplete = areAllExercisesCorrect(topicId, state, study);
    const exercise = allComplete && !session.continueAfterComplete ? null : pickExercise(study, topicId, state);
    const done = getCorrectExerciseIds(topicId, state).size;
    const catalog = ctx.data.specialTopics || { topics: [] };
    const progress = `
      <p class="workbook-progress">Đã hoàn thành ${done}/${getFilteredExercises(study, topicId).length} bài tập</p>
      ${renderWorkbookFilters(study, topicId, session.workbookFilter)}
    `;
    if (!exercise) {
      return `${progress}${renderCompletionPanel(topicId, catalog)}`;
    }
    return `${progress}${ctx.renderQuizCard(withSkill(exercise, topicId), { workbook: true })}`;
  }

  function bindFlash() {
    const flashSession = session.flashcards;
    if (!flashSession?.deck.length) return;
    const progress = document.querySelector("#flashcardProgress");
    if (progress) progress.textContent = `${flashSession.known.size}/${flashSession.deck.length} thẻ đã nhớ`;
    document.querySelector("#flashcardFlip")?.addEventListener("click", () => {
      flashSession.flipped = !flashSession.flipped;
      ctx.renderRoute();
    });
    document.querySelector("#flashcardPrev")?.addEventListener("click", () => {
      if (flashSession.index <= 0) return;
      flashSession.index -= 1;
      flashSession.flipped = false;
      ctx.renderRoute();
    });
    document.querySelector("#flashcardNext")?.addEventListener("click", () => {
      if (flashSession.index >= flashSession.deck.length - 1) return;
      flashSession.index += 1;
      flashSession.flipped = false;
      ctx.renderRoute();
    });
    document.querySelector("#flashcardKnown")?.addEventListener("click", () => {
      const card = flashSession.deck[flashSession.index];
      flashSession.known.add(card.id);
      if (flashSession.known.size >= flashSession.deck.length && !flashSession.xpAwarded) {
        flashSession.xpAwarded = true;
        ctx.updateState((next) => {
          next.xp += 15;
          next.todayXp += 15;
        });
        ctx.showModal({ title: "Hoàn thành Flash Study!", body: "Bạn đã xem hết bộ thẻ lý thuyết. (+15 XP)" });
      }
      if (flashSession.index < flashSession.deck.length - 1) {
        flashSession.index += 1;
        flashSession.flipped = false;
      }
      ctx.renderRoute();
    });
  }

  function bindWorkbook(topicId) {
    document.querySelectorAll("[data-st-workbook-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        session.workbookFilter = button.dataset.stWorkbookFilter;
        session.continueAfterComplete = false;
        ctx.renderRoute();
      });
    });
    document.querySelector("#stStudyContinue")?.addEventListener("click", () => {
      session.continueAfterComplete = true;
      ctx.renderRoute();
    });
    const card = document.querySelector(".quiz-card");
    if (!card) return;
    const study = getStudy(ctx);
    const exercise = getTopicExercises(study, topicId).find((item) => item.id === card.dataset.questionId);
    if (!exercise) return;
    const question = withSkill(exercise, topicId);
    document.querySelectorAll(".choice-btn").forEach((button) => {
      button.addEventListener("click", () => handleAnswer(button.dataset.answer, question, topicId));
    });
    const form = document.querySelector(".answer-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleAnswer(new FormData(form).get("answer"), question, topicId);
      });
    }
    document.querySelector(".hint-btn:not(.solution-btn)")?.addEventListener("click", (event) => {
      const hint = event.currentTarget.dataset.hint;
      if (hint) ctx.showModal({ title: "Gợi ý", body: hint });
    });
    document.querySelector(".solution-btn")?.addEventListener("click", (event) => {
      const solution = event.currentTarget.dataset.solution;
      if (solution) ctx.showModal({ title: "Lời giải", body: solution });
    });
    focusAnswerInput();
  }

  function handleAnswer(answer, question, topicId) {
    const study = getStudy(ctx);
    const result = submitAnswer(answer, question, ctx.data.errors || []);
    const panel = document.querySelector(".feedback-panel");
    const card = document.querySelector(".quiz-card");
    card?.classList.remove("is-correct", "is-wrong");
    card?.classList.add(result.correct ? "is-correct" : "is-wrong");

    if (result.correct) {
      const allComplete = areAllExercisesCorrect(topicId, ctx.getState(), study);
      panel.innerHTML = `
        <strong>Chính xác! +${result.xp} XP</strong>
        <p>${allComplete && !session.continueAfterComplete ? "Bạn đã hoàn thành tất cả bài tập của chuyên đề này." : "Câu tiếp theo sẽ xuất hiện sau một nhịp."}</p>
      `;
      if (allComplete && !session.continueAfterComplete) {
        setTimeout(() => ctx.renderRoute(), 900);
        return;
      }
      setTimeout(() => {
        const route = `#/special-topic/${topicId}/workbook`;
        if (window.location.hash.startsWith(route)) ctx.renderRoute();
        else ctx.setRoute(route);
      }, 900);
      return;
    }

    panel.innerHTML = `
      <strong>Chưa đúng — thử lại nhé</strong>
      <p class="math-content">${result.error ? result.error.message : "Kiểm tra lại các bước giải."}</p>
    `;
  }

  function getTopicStats(topicId) {
    const study = getStudy(ctx);
    const lesson = getLesson(study, topicId);
    const exerciseCount = getTopicExercises(study, topicId).length;
    return {
      cardCount: lesson?.cardCount || 0,
      exerciseCount
    };
  }

  return {
    renderFlash,
    renderWorkbook,
    bindFlash,
    bindWorkbook,
    getTopicStats
  };
}
