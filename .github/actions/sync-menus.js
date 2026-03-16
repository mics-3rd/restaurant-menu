const fs = require("fs");
const path = require("path");
const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) throw new Error("GITHUB_EVENT_PATH missing");
const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
if (!event.issue) process.exit(0);

const body = event.issue.body || "";
if (!body.includes("## メニュー名")) process.exit(0);

const section = (title) => {
  const m = body.match(new RegExp(`## ${title}[\\s\\S]*?(?=## |$)`, "m"));
  return m ? m[0].replace(new RegExp(`## ${title}`), "").trim() : "";
};

const category = ["meat","fish","soup","salad"].find(c => body.includes(c));
const name = section("メニュー名").split("\n")[0].trim();
const description = section("説明").split("\n")[0].trim();
const serving = section("分量").split("\n")[0].trim();
const ingredients = section("材料（1行1項目）").split("\n").map(l => l.replace(/^[\s\-0-9\.\)]+/, "").trim()).filter(Boolean);
const recipe = section("作り方（1行1手順）").split("\n").map(l => l.replace(/^[\s0-9\.\-\)]+/, "").trim()).filter(Boolean);
if (!category || !name) throw new Error("カテゴリ/メニュー名不足");

const dataPath = path.resolve(__dirname, "../../data/menus.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
data.menus = data.menus.filter(m => m.id !== `issue-${event.issue.number}`);

data.menus.push({
  id: `issue-${event.issue.number}`,
  category,
  name,
  description,
  serving,
  ingredients,
  recipe
});
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
console.log("sync done", event.issue.number);