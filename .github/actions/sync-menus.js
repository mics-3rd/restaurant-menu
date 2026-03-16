const fs = require("fs");
const path = require("path");

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) throw new Error("GITHUB_EVENT_PATH is not set");
const event = JSON.parse(fs.readFileSync(eventPath, "utf-8"));

if (!event.issue) {
  console.log("Not an issue event; exit");
  process.exit(0);
}

const body = event.issue.body || "";
if (!body.includes("## メニュー名")) {
  console.log("Issue is not menu-add template; exit");
  process.exit(0);
}

function parseSection(title) {
  const re = new RegExp(`## ${title}[\\s\\S]*?(?=(## |$))`, "m");
  const m = body.match(re);
  if (!m) return "";
  return m[0]
    .replace(new RegExp(`## ${title}`), "")
    .trim();
}

const category = ["meat","fish","soup","salad"].find(c => body.includes(c));
const name = parseSection("メニュー名").split("\n")[0].trim();
const description = parseSection("説明").split("\n")[0].trim();
const serving = parseSection("分量").split("\n")[0].trim();

const ingredients = parseSection("材料（1行1項目）")
  .split("\n")
  .map(line => line.replace(/^[\s\-0-9\.\)]+/, "").trim())
  .filter(Boolean);

const recipe = parseSection("作り方（1行1手順）")
  .split("\n")
  .map(line => line.replace(/^[\s0-9\.\-\)]+/, "").trim())
  .filter(Boolean);

if (!category || !name) throw new Error("カテゴリ/メニュー名が取れません");

const dataPath = path.resolve(__dirname, "../../data/menus.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
data.menus = data.menus.filter(m => m.id !== `issue-${event.issue.number}`);

const menu = {
  id: `issue-${event.issue.number}`,
  category,
  name,
  description,
  serving,
  ingredients,
  recipe
};
data.menus.push(menu);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2, 2), "utf8");
console.log("menu added:", menu.id);