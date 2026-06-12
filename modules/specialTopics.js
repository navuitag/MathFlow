import { escapeHtml } from "../assets/js/utils.js";
import { createSpecialTopicStudyModule } from "./specialTopicStudy.js";

function getCatalog(ctx) {
  return ctx.data.specialTopics || { meta: {}, overviews: [], categories: [], topics: [] };
}

function getTopic(catalog, topicId) {
  return catalog.topics.find((t) => t.id === topicId) || null;
}

function topicIndex(catalog, topicId) {
  return catalog.topics.findIndex((t) => t.id === topicId);
}

function encodeAssetPath(path) {
  return path.split("/").map((part) => encodeURIComponent(part)).join("/");
}

export function createSpecialTopicsModule(ctx) {
  const study = createSpecialTopicStudyModule(ctx);

  function renderCatalog() {
    const catalog = getCatalog(ctx);
    const { meta, overviews, categories, topics } = catalog;

    const overviewCards = overviews.map((item) => `
      <a class="st-overview-card card-panel" href="#/special-topic/overview/${item.id}">
        <img src="${encodeAssetPath(item.file)}" alt="" loading="lazy">
        <span>${escapeHtml(item.title)}</span>
      </a>
    `).join("");

    const sections = categories.map((cat) => {
      const items = topics.filter((t) => t.category === cat.id);
      if (!items.length) return "";
      return `
        <section class="st-section">
          <h2>${cat.emoji} ${escapeHtml(cat.title)}</h2>
          <div class="st-topic-grid">
            ${items.map((topic) => renderTopicCard(topic)).join("")}
          </div>
        </section>
      `;
    }).join("");

    return `
      <section class="st-hero">
        <a class="back-link" href="#/home">← Trang chủ</a>
        <span class="eyebrow">Tài liệu · Chuyên đề</span>
        <h1>${escapeHtml(meta.title || "Chuyên đề Toán")}</h1>
        <p>${escapeHtml(meta.subtitle || "")}</p>
        <div class="st-hero-stats">
          <span>${topics.length} chuyên đề</span>
          <span>Flash Study</span>
          <span>Bài tập rèn luyện</span>
          <span>PDF + sơ đồ</span>
        </div>
      </section>
      ${overviews.length ? `
        <section class="st-overviews">
          <h2>🗺️ Tổng quan</h2>
          <div class="st-overview-grid">${overviewCards}</div>
        </section>
      ` : ""}
      ${sections}
    `;
  }

  function renderTopicCard(topic) {
    const stats = study.getTopicStats(topic.id);
    const href = `#/special-topic/${topic.id}/flash`;
    return `
      <a class="st-topic-card card-panel" href="${href}">
        <span class="st-topic-code">${escapeHtml(topic.code)}</span>
        <h3>${escapeHtml(topic.title)}</h3>
        <div class="st-topic-meta">
          ${stats.cardCount ? `<span>${stats.cardCount} thẻ</span>` : ""}
          ${stats.exerciseCount ? `<span>${stats.exerciseCount} bài</span>` : ""}
          ${topic.pdf ? "<span>PDF</span>" : ""}
          ${topic.image ? "<span>Sơ đồ</span>" : ""}
        </div>
      </a>
    `;
  }

  function renderOverview(overviewId) {
    const catalog = getCatalog(ctx);
    const item = catalog.overviews.find((o) => o.id === overviewId);
    if (!item) return ctx.notFound("Không tìm thấy sơ đồ tổng quan.");

    return `
      <section class="st-viewer">
        ${renderViewerHeader({
          title: item.title,
          backHref: "#/special-topic",
          backLabel: "Danh sách chuyên đề"
        })}
        <div class="st-viewer-body st-viewer-image-only">
          <img class="st-doc-image" src="${encodeAssetPath(item.file)}" alt="${escapeHtml(item.title)}">
        </div>
      </section>
    `;
  }

  function renderTopicTabs(topic, activeTab) {
    const tabs = [
      { id: "flash", label: "⚡ Flash Study", href: `#/special-topic/${topic.id}/flash` },
      { id: "workbook", label: "✏️ Bài tập", href: `#/special-topic/${topic.id}/workbook` }
    ];
    if (topic.pdf) tabs.push({ id: "pdf", label: "📄 PDF", href: `#/special-topic/${topic.id}/pdf` });
    if (topic.image) tabs.push({ id: "image", label: "🗺️ Sơ đồ", href: `#/special-topic/${topic.id}/image` });
    return `
      <div class="st-tabs" role="tablist">
        ${tabs.map((tab) => `
          <a class="st-tab${tab.id === activeTab ? " active" : ""}" href="${tab.href}" role="tab">${tab.label}</a>
        `).join("")}
      </div>
    `;
  }

  function resolveActiveTab(topic, tab) {
    const valid = ["flash", "workbook", "pdf", "image"];
    if (valid.includes(tab)) {
      if (tab === "pdf" && !topic.pdf) return topic.image ? "image" : "flash";
      if (tab === "image" && !topic.image) return topic.pdf ? "pdf" : "flash";
      return tab;
    }
    return "flash";
  }

  function renderTopicViewer(topicId, tab = "flash", state) {
    const catalog = getCatalog(ctx);
    const topic = getTopic(catalog, topicId);
    if (!topic) return ctx.notFound("Không tìm thấy chuyên đề.");

    const idx = topicIndex(catalog, topicId);
    const prev = idx > 0 ? catalog.topics[idx - 1] : null;
    const next = idx < catalog.topics.length - 1 ? catalog.topics[idx + 1] : null;

    const activeTab = resolveActiveTab(topic, tab);
    const tabs = renderTopicTabs(topic, activeTab);

    let body = "";
    if (activeTab === "flash") {
      body = study.renderFlash(topicId, state);
    } else if (activeTab === "workbook") {
      body = study.renderWorkbook(topicId, state);
    } else if (activeTab === "pdf" && topic.pdf) {
      const src = encodeAssetPath(topic.pdf);
      body = `
        <div class="st-pdf-wrap">
          <iframe class="st-pdf-frame" src="${src}" title="${escapeHtml(topic.title)}"></iframe>
        </div>
        <div class="st-viewer-actions">
          <a class="btn secondary" href="${src}" target="_blank" rel="noopener">Mở tab mới</a>
          <a class="btn secondary" href="${src}" download>Tải PDF</a>
        </div>
      `;
    } else if (activeTab === "image" && topic.image) {
      body = `
        <div class="st-viewer-body">
          <img class="st-doc-image" src="${encodeAssetPath(topic.image)}" alt="${escapeHtml(topic.title)}">
        </div>
      `;
    } else {
      body = `<div class="empty-state">Chuyên đề này chưa có tệp xem trực tiếp.</div>`;
    }

    return `
      <section class="st-viewer">
        ${renderViewerHeader({
          title: `${topic.code} — ${topic.title}`,
          subtitle: topic.categoryTitle,
          backHref: "#/special-topic",
          backLabel: "Danh sách chuyên đề"
        })}
        ${tabs}
        ${body}
        ${renderTopicNav(prev, next, activeTab)}
      </section>
    `;
  }

  function renderViewerHeader({ title, subtitle, backHref, backLabel }) {
    return `
      <header class="st-viewer-head">
        <a class="back-link" href="${backHref}">← ${escapeHtml(backLabel)}</a>
        ${subtitle ? `<span class="tag">${escapeHtml(subtitle)}</span>` : ""}
        <h1>${escapeHtml(title)}</h1>
      </header>
    `;
  }

  function renderTopicNav(prev, next, tab) {
    const tabSuffix = tab === "flash" || tab === "workbook" || tab === "pdf" || tab === "image"
      ? `/${tab}`
      : "/flash";
    return `
      <nav class="st-topic-nav" aria-label="Chuyên đề trước/sau">
        ${prev
          ? `<a class="st-nav-btn" href="#/special-topic/${prev.id}${tabSuffix}">← ${escapeHtml(prev.code)}</a>`
          : "<span></span>"}
        ${next
          ? `<a class="st-nav-btn" href="#/special-topic/${next.id}${tabSuffix}">${escapeHtml(next.code)} →</a>`
          : "<span></span>"}
      </nav>
    `;
  }

  function bindViewer(topicId, tab) {
    document.querySelector(".st-pdf-frame")?.addEventListener("load", () => {
      document.querySelector(".st-pdf-wrap")?.classList.add("is-loaded");
    });
    if (tab === "flash") study.bindFlash();
    if (tab === "workbook") study.bindWorkbook(topicId);
  }

  return {
    renderCatalog,
    renderOverview,
    renderTopicViewer,
    bindViewer
  };
}
