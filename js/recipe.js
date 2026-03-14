async function init() {
    const params = new URLSearchParams(location.search)
    const id = params.get("id")
    const res = await fetch(`data/menus/${id}.json`)
    const data = await res.json()
    document.getElementById("title").innerText = data.name
    const recipe = data.recipe
    const div = document.getElementById("recipe")
    div.innerHTML = `
<div class="recipe-section">
<h3>材料 (${recipe.servings})</h3>
<ul>
${recipe.ingredients.map(i => `<li>${i.name} ${i.amount}</li>`).join("")}
</ul>
</div>
<div class="recipe-section">
<h3>作り方</h3>
<ol>
${recipe.steps.map(s => `<li>${s}</li>`).join("")}
</ol>
</div>
`
}
init()