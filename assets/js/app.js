import { loadJson } from "./utils.js";
import { configureRouter, renderRoute } from "./router.js";

async function boot() {
  const [skills, lessons, questions, errors, exercises, summerG1G2, summerG2G3, summerG3G4] = await Promise.all([
    loadJson("data/skills.json"),
    loadJson("data/lessons.json"),
    loadJson("data/questions.json"),
    loadJson("data/errors.json"),
    loadJson("data/exercises.json"),
    loadJson("data/summer-review.json"),
    loadJson("data/summer-review-g2-g3.json"),
    loadJson("data/summer-review-g3-g4.json")
  ]);

  configureRouter({
    skills,
    lessons,
    questions,
    errors,
    exercises,
    summerPacks: {
      "g1-g2": summerG1G2,
      "g2-g3": summerG2G3,
      "g3-g4": summerG3G4
    }
  });

  if (!window.location.hash) {
    window.location.hash = "#/home";
  } else {
    renderRoute();
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}

boot().catch((error) => {
  document.querySelector("#app").innerHTML = `
    <main class="app-shell">
      <section class="empty-state">
        Không khởi động được ứng dụng.<br>
        <small>${error.message}</small>
      </section>
    </main>
  `;
});
