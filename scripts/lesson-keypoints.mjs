/** Bước kiến thức trọng tâm — dùng chung cho các script sinh nội dung. */
export function makeKeypointsStep(visualContent, example, summary) {
  const points = [visualContent, example, summary].filter(Boolean);
  return {
    type: "keypoints",
    title: "Kiến thức trọng tâm cần nhớ",
    content: "Nắm vững các ý sau trước khi luyện tập:",
    points
  };
}

export function makeKeypointsStepFromCore([, visualContent, example, summary]) {
  return makeKeypointsStep(visualContent, example, summary);
}

export function keypointsFromSteps(steps) {
  if (steps.some((step) => step.type === "keypoints")) return steps;

  const viz = steps.find((step) => step.type === "visualization");
  const example = steps.find((step) => step.type === "example");
  const summary = steps.find((step) => step.type === "summary");
  const points = [viz?.content, example?.content, summary?.content].filter(Boolean);
  if (!points.length) return steps;

  const keypointsStep = makeKeypointsStep(...points);
  const summaryIndex = steps.findIndex((step) => step.type === "summary");
  const next = [...steps];
  if (summaryIndex >= 0) {
    next.splice(summaryIndex, 0, keypointsStep);
  } else {
    next.push(keypointsStep);
  }
  return next;
}
