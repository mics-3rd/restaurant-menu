async function init() {
    const params = new URLSearchParams(location.search)
    const id = params.get("id")
    const res = await fetch(`data/menus/${id}.json`)
    const menu = await res.json()
    document.getElementById("title").innerText = menu.name
    renderRecipe(menu.recipe)
}
function renderRecipe(recipe) {
    const box = document.getElementById("recipe")
    if (!recipe) {
        box.innerHTML = "レシピ未登録"
        return
    }
    box.innerHTML = `
<h3>材料（${recipe.servings}）</h3>
<ul>
${recipe.ingredients.map(i => `<li>${i.name} ${i.amount}</li>`).join("")}
</ul>
<h3>作り方</h3>
<ol>
${recipe.steps.map(s => `<li>${s}</li>`).join("")}
</ol>
`
}
init()