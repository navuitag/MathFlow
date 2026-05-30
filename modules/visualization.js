import { hasScene3D, renderScene3DPanel, initScene3D, disposeScenes3D } from "./scene3d.js";

export function renderVisualization(config = {}) {
  const type = config.visualization;
  const panel3d = hasScene3D(type) ? renderScene3DPanel(type, config.caption) : "";
  const legacy = renderLegacyVisualization(config);
  if (panel3d) {
    return `
      ${panel3d}
      <details class="viz-2d-alt">
        <summary>Sơ đồ 2D bổ sung</summary>
        ${legacy}
      </details>
    `;
  }
  return legacy;
}

export function bindVisualizations(root = document) {
  disposeScenes3D();
  initScene3D(root);
}

function renderLegacyVisualization(config = {}) {
  const type = config.visualization;
  if (type === "fractionCompare") return renderFractionCompare();
  if (type === "fractionBar") return renderFractionBar(config.numerator || 3, config.denominator || 4);
  if (type === "numberLine") return renderNumberLine();
  if (type === "equationBalance") return renderEquationBalance();
  if (type === "geometry" || type === "symmetry") return renderGeometry(type);
  if (type === "angle") return renderAngleViz();
  if (type === "triangle") return renderTriangleViz();
  if (type === "solid") return renderSolidViz();
  if (type === "algebra") return renderAlgebraViz();
  if (type === "ratio") return renderRatioViz();
  if (type === "graph") return renderGraphViz();
  if (type === "parabola") return renderParabolaViz();
  if (type === "circle") return renderCircleViz();
  if (type === "radical") return renderRadicalViz();
  if (type === "inequality") return renderInequalityViz();
  if (type === "system") return renderSystemViz();
  if (type === "frequency") return renderFrequencyViz();
  if (type === "chart" || type === "data" || type === "probability") return renderDataViz(type);
  if (type === "percent") return renderPercentViz();
  if (type === "power") return renderPowerViz();
  if (type === "divisibility" || type === "factor") return renderDivisibilityViz(type);
  if (type === "integerOps") return renderIntegerOpsViz();
  if (type === "estimate") return renderEstimateViz();
  return renderConceptViz(type);
}

export function renderFractionBar(numerator, denominator) {
  const cells = Array.from({ length: denominator }, (_, index) => {
    const active = index < numerator ? " active" : "";
    return `<span class="fraction-cell${active}"></span>`;
  }).join("");

  return `
    <div class="viz fraction-viz" aria-label="Thanh phân số ${numerator}/${denominator}">
      <div class="fraction-bar" style="grid-template-columns: repeat(${denominator}, 1fr)">${cells}</div>
      <div class="viz-caption">${numerator}/${denominator}</div>
    </div>
  `;
}

function renderFractionCompare() {
  return `
    <div class="viz compare-viz">
      ${renderMiniBar("1/2", 1, 2)}
      ${renderMiniBar("2/4", 2, 4)}
      ${renderMiniBar("4/8", 4, 8)}
    </div>
  `;
}

function renderMiniBar(label, numerator, denominator) {
  const cells = Array.from({ length: denominator }, (_, index) =>
    `<span class="${index < numerator ? "active" : ""}"></span>`
  ).join("");
  return `<div class="compare-row"><strong>${label}</strong><div class="mini-bar" style="grid-template-columns: repeat(${denominator}, 1fr)">${cells}</div></div>`;
}

function renderNumberLine() {
  return `
    <div class="viz number-line-viz">
      <svg viewBox="0 0 520 130" role="img" aria-label="Trục số so sánh 1/2 và 2/3">
        <line x1="40" y1="72" x2="480" y2="72" class="axis"></line>
        <line x1="40" y1="62" x2="40" y2="82" class="tick"></line>
        <line x1="480" y1="62" x2="480" y2="82" class="tick"></line>
        <circle cx="260" cy="72" r="10" class="point-a"></circle>
        <circle cx="333" cy="72" r="10" class="point-b"></circle>
        <text x="34" y="108">0</text>
        <text x="472" y="108">1</text>
        <text x="242" y="42">1/2</text>
        <text x="315" y="42">2/3</text>
      </svg>
    </div>
  `;
}

function renderEquationBalance() {
  return `
    <div class="viz balance-viz">
      <div class="balance-beam">
        <span>2(x + 3)</span>
        <span>2x + 6</span>
      </div>
      <div class="balance-stand"></div>
      <p>Nhân 2 với từng hạng tử để hai vế vẫn cân bằng.</p>
    </div>
  `;
}

function renderConceptViz(type = "concept") {
  return `
    <div class="viz concept-viz">
      <span>${type}</span>
      <div class="concept-grid">
        <i></i><i></i><i></i>
        <i></i><i></i><i></i>
      </div>
    </div>
  `;
}

function renderPowerViz() {
  return `
    <div class="viz power-viz" aria-label="Minh họa lũy thừa 2 mũ 4">
      <span>2^4</span>
      <div>2 · 2 · 2 · 2 = 16</div>
    </div>
  `;
}

function renderDivisibilityViz(type) {
  const label = type === "factor" ? "Ước và bội" : "Chia hết";
  return `
    <div class="viz divisibility-viz">
      <strong>${label}</strong>
      <div class="number-chips">
        <span>12</span><span>18</span><span>24</span><span>30</span>
      </div>
    </div>
  `;
}

function renderIntegerOpsViz() {
  return `
    <div class="viz integer-viz">
      <span>-3</span>
      <b>+</b>
      <span>5</span>
      <b>=</b>
      <span>2</span>
    </div>
  `;
}

function renderGeometry(type) {
  const isSymmetry = type === "symmetry";
  return `
    <div class="viz geometry-viz">
      <svg viewBox="0 0 360 180" role="img" aria-label="${isSymmetry ? "Minh họa đối xứng" : "Minh họa hình học"}">
        <rect x="35" y="38" width="110" height="86" rx="6" class="shape-a"></rect>
        <polygon points="240,32 310,124 170,124" class="shape-b"></polygon>
        ${isSymmetry ? `<line x1="90" y1="20" x2="90" y2="150" class="sym-line"></line><line x1="240" y1="20" x2="240" y2="150" class="sym-line"></line>` : ""}
      </svg>
    </div>
  `;
}

function renderDataViz(type) {
  const label = type === "probability" ? "9/20" : "Dữ liệu";
  return `
    <div class="viz chart-viz">
      <div class="bar" style="height:44%"></div>
      <div class="bar" style="height:72%"></div>
      <div class="bar" style="height:58%"></div>
      <strong>${label}</strong>
    </div>
  `;
}

function renderPercentViz() {
  return `
    <div class="viz percent-viz" aria-label="Minh họa 25 phần trăm">
      <div class="percent-ring"><span>25%</span></div>
      <p>25/100 = 1/4</p>
    </div>
  `;
}

function renderEstimateViz() {
  return `
    <div class="viz estimate-viz">
      <span>49,8 ≈ 50</span>
      <span>20,1 ≈ 20</span>
      <strong>≈ 70</strong>
    </div>
  `;
}

function renderAngleViz() {
  return `
    <div class="viz angle-viz">
      <svg viewBox="0 0 360 180" role="img" aria-label="Minh họa góc và đường thẳng song song">
        <line x1="32" y1="42" x2="328" y2="42" class="parallel-line"></line>
        <line x1="32" y1="128" x2="328" y2="128" class="parallel-line"></line>
        <line x1="95" y1="160" x2="245" y2="14" class="transversal"></line>
        <path d="M155 102 A36 36 0 0 1 183 128" class="angle-arc"></path>
        <text x="188" y="112">70°</text>
      </svg>
    </div>
  `;
}

function renderTriangleViz() {
  return `
    <div class="viz triangle-viz">
      <svg viewBox="0 0 360 190" role="img" aria-label="Minh họa tam giác">
        <polygon points="180,28 58,152 306,152" class="triangle-shape"></polygon>
        <line x1="180" y1="28" x2="180" y2="152" class="triangle-helper"></line>
        <circle cx="180" cy="111" r="6" class="triangle-point"></circle>
        <text x="171" y="24">A</text>
        <text x="42" y="170">B</text>
        <text x="310" y="170">C</text>
      </svg>
    </div>
  `;
}

function renderAlgebraViz() {
  return `
    <div class="viz algebra-viz">
      <span>2x + 3x</span>
      <b>=</b>
      <span>5x</span>
    </div>
  `;
}

function renderRatioViz() {
  return `
    <div class="viz ratio-viz">
      <div><span style="width:40%"></span></div>
      <div><span style="width:60%"></span></div>
      <strong>2 : 3</strong>
    </div>
  `;
}

function renderSolidViz() {
  return `
    <div class="viz solid-viz">
      <svg viewBox="0 0 360 190" role="img" aria-label="Minh họa hình hộp">
        <polygon points="88,64 222,64 282,108 148,108" class="solid-top"></polygon>
        <polygon points="88,64 148,108 148,160 88,116" class="solid-side"></polygon>
        <polygon points="148,108 282,108 282,160 148,160" class="solid-front"></polygon>
        <line x1="222" y1="64" x2="282" y2="108" class="solid-edge"></line>
      </svg>
    </div>
  `;
}

function renderGraphViz() {
  return `
    <div class="viz graph-viz">
      <svg viewBox="0 0 360 220" role="img" aria-label="Minh họa đồ thị hàm số bậc nhất">
        <line x1="36" y1="170" x2="330" y2="170" class="graph-axis"></line>
        <line x1="76" y1="24" x2="76" y2="194" class="graph-axis"></line>
        <line x1="42" y1="176" x2="324" y2="38" class="graph-line"></line>
        <circle cx="76" cy="154" r="6" class="graph-point"></circle>
        <circle cx="154" cy="116" r="6" class="graph-point"></circle>
        <text x="306" y="190">x</text>
        <text x="52" y="38">y</text>
        <text x="174" y="112">y = ax + b</text>
      </svg>
    </div>
  `;
}

function renderParabolaViz() {
  return `
    <div class="viz graph-viz">
      <svg viewBox="0 0 360 220" role="img" aria-label="Minh họa parabol y = ax bình phương">
        <line x1="36" y1="172" x2="330" y2="172" class="graph-axis"></line>
        <line x1="180" y1="24" x2="180" y2="196" class="graph-axis"></line>
        <path d="M70 48 C115 172 245 172 290 48" class="graph-line" fill="none"></path>
        <circle cx="180" cy="172" r="6" class="graph-point"></circle>
        <text x="206" y="78">y = ax^2</text>
      </svg>
    </div>
  `;
}

function renderCircleViz() {
  return `
    <div class="viz circle-viz">
      <svg viewBox="0 0 360 220" role="img" aria-label="Minh họa đường tròn">
        <circle cx="180" cy="110" r="72" class="circle-main"></circle>
        <line x1="180" y1="110" x2="252" y2="110" class="circle-radius"></line>
        <line x1="108" y1="80" x2="252" y2="140" class="circle-chord"></line>
        <line x1="64" y1="184" x2="296" y2="184" class="circle-tangent"></line>
        <text x="170" y="104">O</text>
        <text x="216" y="98">R</text>
      </svg>
    </div>
  `;
}

function renderRadicalViz() {
  return `
    <div class="viz radical-viz">
      <span>sqrt(12)</span>
      <b>=</b>
      <span>2sqrt(3)</span>
    </div>
  `;
}

function renderInequalityViz() {
  return `
    <div class="viz inequality-viz">
      <span>-2x &lt; 6</span>
      <b>÷ (-2)</b>
      <span>x &gt; -3</span>
    </div>
  `;
}

function renderSystemViz() {
  return `
    <div class="viz system-viz">
      <span>x + y = 5</span>
      <span>x - y = 1</span>
      <strong>(3; 2)</strong>
    </div>
  `;
}

function renderFrequencyViz() {
  return `
    <div class="viz frequency-viz">
      <div><strong>Giá trị</strong><span>2</span><span>3</span><span>4</span></div>
      <div><strong>Tần số</strong><span>5</span><span>8</span><span>7</span></div>
    </div>
  `;
}
