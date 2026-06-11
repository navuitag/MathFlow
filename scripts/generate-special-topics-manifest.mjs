/**
 * Quét thư mục special-topic/ và sinh data/special-topics.json
 * Chạy: node scripts/generate-special-topics-manifest.mjs
 */
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "special-topic";

const SLUG_TITLES = {
  "Hang-dang-thuc": "Hằng đẳng thức",
  "Phan-tich-da-thuc-thanh-nhan-tu": "Phân tích đa thức thành nhân tử",
  "Phan-thuc-dai-so": "Phân thức đại số",
  "Bieu-thuc-dai-so": "Biểu thức đại số",
  "Phuong-trinh-chua-an-o-mau": "Phương trình chứa ẩn ở mẫu",
  "Phuong-trinh-tich": "Phương trình tích",
  "Phuong-trinh-bac-nhat-2-an-so": "Phương trình bậc nhất hai ẩn số",
  "Do-thi-ham-so": "Đồ thị hàm số",
  "Can-bac-hai": "Căn bậc hai",
  "Bien-doi-can-thuc": "Biến đổi căn thức",
  "Tam-giac": "Tam giác",
  "Tam-giac-dong-dang": "Tam giác đồng dạng",
  "Dinh-ly-Pythagoras": "Định lý Pythagoras",
  "Duong-tron": "Đường tròn",
  "Tiep-tuyen-duong-tron": "Tiếp tuyến đường tròn",
  "Tu-giac-noi-tiep": "Tứ giác nội tiếp",
  "Hinh-hoc-tong-hop": "Hình học tổng hợp"
};

const OVERVIEW_TITLES = {
  "00.20-chuyen-de-toan": "Tổng quan 20 chuyên đề Toán",
  "00.Bieu-thuc-va-Gia-tri-bieu-thuc": "Biểu thức và giá trị biểu thức"
};

const CATEGORY_BY_ORDER = [
  { max: 10, id: "algebra", title: "Đại số", emoji: "📐" },
  { max: 17, id: "geometry", title: "Hình học", emoji: "📏" }
];

function titleFromSlug(slug) {
  return SLUG_TITLES[slug] || slug.replace(/-/g, " ");
}

function categoryForOrder(order) {
  return CATEGORY_BY_ORDER.find((c) => order <= c.max) || CATEGORY_BY_ORDER[0];
}

async function scanTopicFolder(folderName) {
  const match = folderName.match(/^(\d+)\.CD(\d+)_(.+)$/i);
  if (!match) return null;

  const order = Number(match[1]);
  const codeNum = match[2];
  const slug = match[3];
  const dir = join(ROOT, folderName);
  const files = await readdir(dir);
  const pdf = files.find((f) => f.endsWith(".pdf"));
  const image = files.find((f) => f.endsWith(".png"));
  if (!pdf && !image) return null;

  const cat = categoryForOrder(order);
  return {
    id: `cd${codeNum.padStart(2, "0")}`,
    order,
    code: `CD${codeNum.padStart(2, "0")}`,
    title: titleFromSlug(slug),
    slug,
    category: cat.id,
    categoryTitle: cat.title,
    folder: folderName,
    pdf: pdf ? `${ROOT}/${folderName}/${pdf}` : null,
    image: image ? `${ROOT}/${folderName}/${image}` : null
  };
}

async function main() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const overviews = [];
  const topics = [];

  for (const ent of entries) {
    if (ent.isFile() && ent.name.endsWith(".png")) {
      const base = ent.name.replace(/\.png$/i, "");
      overviews.push({
        id: base.replace(/^00\./, "overview-").replace(/\./g, "-").toLowerCase(),
        title: OVERVIEW_TITLES[base] || base.replace(/^00\./, "").replace(/-/g, " "),
        file: `${ROOT}/${ent.name}`
      });
    } else if (ent.isDirectory() && !ent.name.startsWith(".")) {
      const topic = await scanTopicFolder(ent.name);
      if (topic) topics.push(topic);
    }
  }

  topics.sort((a, b) => a.order - b.order);
  overviews.sort((a, b) => a.file.localeCompare(b.file));

  const payload = {
    meta: {
      title: "Chuyên đề Toán",
      subtitle: "20 chuyên đề — xem PDF và sơ đồ trực tiếp trên hệ thống",
      topicCount: topics.length,
      source: "Bộ tài liệu chuyên đề trong thư mục special-topic/"
    },
    overviews,
    categories: CATEGORY_BY_ORDER.map(({ id, title, emoji }) => ({ id, title, emoji })),
    topics
  };

  await writeFile("data/special-topics.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`✓ special-topics.json — ${overviews.length} tổng quan, ${topics.length} chuyên đề`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
