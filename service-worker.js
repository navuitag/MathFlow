const CACHE_NAME = "mathflow-vn-v11";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/css/main.css",
  "./assets/css/layout.css",
  "./assets/css/animation.css",
  "./assets/css/responsive.css",
  "./assets/css/practice-features.css",
  "./assets/css/mindmap.css",
  "./assets/css/math-format.css",
  "./assets/js/app.js",
  "./assets/js/router.js",
  "./assets/js/state.js",
  "./assets/js/profileStore.js",
  "./assets/js/utils.js",
  "./assets/js/mathFormat.js",
  "./modules/lessonEngine.js",
  "./modules/quizEngine.js",
  "./modules/errorEngine.js",
  "./modules/visualization.js",
  "./modules/practiceContent.js",
  "./modules/practiceModes.js",
  "./modules/mindMap.js",
  "./modules/summerReview.js",
  "./modules/specialTopics.js",
  "./assets/css/summer-review.css",
  "./assets/css/special-topics.css",
  "./modules/progress.js",
  "./modules/gamification.js",
  "./components/navbar.js",
  "./components/learnerSwitcher.js",
  "./components/lessonCard.js",
  "./components/quizCard.js",
  "./components/flashcardPanel.js",
  "./components/memoryPanel.js",
  "./components/modal.js",
  "./data/skills.json",
  "./data/lessons.json",
  "./data/questions.json",
  "./data/errors.json",
  "./data/exercises.json",
  "./data/special-topics.json",
  "./data/workbook-g8-ch2-extra.json",
  "./data/summer-review.json",
  "./data/summer-review-g2-g3.json",
  "./data/summer-review-g3-g4.json",
  "./data/summer-review-g4-g5.json",
  "./data/summer-review-g5-g6.json",
  "./data/summer-review-g6-g7.json",
  "./data/summer-review-g7-g8.json",
  "./data/summer-review-g8-g9.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
