async function init() {
    const res = await fetch("../data/menus/index.json")
    const menus = (await res.json()).menus
    const select = document.getElementById("menu")
    menus.forEach(m => {
        const option = document.createElement("option")
        option.value = m.id
        option.textContent = m.name
        select.appendChild(option)
    })
}
async function addRecipe() {
    const id = document.getElementById("menu").value
    const servings = document.getElementById("servings").value
    const ingredients = document
        .getElementById("ingredients")
        .value
        .split("\n")
    const steps = document
        .getElementById("steps")
        .value
        .split("\n")
    const body = `
recipe追加
menu:${id}
servings:${servings}
ingredients:
${ingredients.join("\n")}
steps:
${steps.join("\n")}
`
    await fetch(`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({
            title: `recipe:${id}`,
            body: body
        })
    })
    alert("登録リクエスト送信しました")
}
init()