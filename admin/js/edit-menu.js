let currentId = ""

async function init() {
    const menuRes = await fetch("../data/menus/index.json")
    const menus = (await menuRes.json()).menus
    const catRes = await fetch("../data/categories.json")
    const categories = await catRes.json()
    const menuSelect = document.getElementById("menu")
    const catSelect = document.getElementById("category")
    menus.forEach(m => {
        const option = document.createElement("option")
        option.value = m.id
        option.textContent = m.name
        menuSelect.appendChild(option)
    })

    categories.forEach(c => {
        const option = document.createElement("option")
        option.value = c.id
        option.textContent = c.name
        catSelect.appendChild(option)
    })

    menuSelect.onchange = loadMenu
    loadMenu()
}

async function loadMenu() {
    const id = document.getElementById("menu").value
    currentId = id
    const res = await fetch(`../data/menus/${id}.json`)
    const data = await res.json()
    document.getElementById("name").value = data.name
    document.getElementById("category").value = data.category
    const recipe = data.recipe
    document.getElementById("servings").value = recipe.servings
    document.getElementById("ingredients").value =
        recipe.ingredients
            .map(i => `${i.name} ${i.amount}`)
            .join("\n")

    document.getElementById("steps").value =
        recipe.steps.join("\n")
}

async function updateMenu() {
    const name = document.getElementById("name").value
    const category = document.getElementById("category").value
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

menu更新

id:${currentId}
name:${name}
category:${category}
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
            title: `update:${currentId}`,
            body: body
        })
    })
    alert("更新リクエスト送信しました")
}

init()