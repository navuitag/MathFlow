import { levelFromXp } from "../assets/js/utils.js";

export function getGamificationSummary(state) {
  const level = levelFromXp(state.xp);
  const currentLevelXp = state.xp % 120;
  const badges = [];

  if (state.completedLessons.includes("fraction_intro")) badges.push("Khởi đầu phân số");
  if (state.completedLessons.length >= 3) badges.push("Nhịp học đều");
  if (state.streak >= 7) badges.push("7 ngày liên tiếp");
  if (state.answers.filter((answer) => answer.correct).length >= 10) badges.push("Mười câu chắc tay");

  return {
    level,
    currentLevelXp,
    nextLevelXp: 120,
    badges
  };
}

export function xpForAnswer(correct) {
  return correct ? 10 : 0;
}
