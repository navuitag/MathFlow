import { normalizeMath } from "../assets/js/utils.js";

export function analyzeError(answer, question, errorPatterns) {
  const normalized = normalizeMath(answer);
  const pattern = errorPatterns.find((item) => {
    const sameSkill = !item.skill || item.skill === question.skill;
    return sameSkill && normalized.includes(normalizeMath(item.pattern));
  });

  if (pattern) {
    return pattern;
  }

  if (question.skill.includes("fraction") && normalized.includes("/")) {
    return {
      skill: question.skill,
      errorType: "fraction_value_error",
      title: "Giá trị phân số chưa đúng",
      message: "Đáp án của bạn là một phân số, nhưng chưa biểu diễn đúng lượng cần tìm.",
      hint: question.hint,
      recommendation: question.skill
    };
  }

  return {
    skill: question.skill,
    errorType: "logic_error",
    title: "Cần kiểm tra lại lập luận",
    message: "Đáp án chưa khớp. Hãy đọc lại dữ kiện và thử diễn giải bằng hình hoặc từng bước.",
    hint: question.hint,
    recommendation: question.skill
  };
}
