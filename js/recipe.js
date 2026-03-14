const params = new URLSearchParams(location.search)
const id = params.get("id")
fetch("data/menu.json")
    .then(r => r.json())
    .then(data => {
        const menu = data.menus.find(m => m.id === id)
        document.getElementById("name").textContent = menu.name
        const recipeDiv = document.getElementById("recipe")
        if (!menu.recipe) {
            recipeDiv.innerHTML = "レシピはまだ登録されていません"
            return
        }
        let html = `<h3>材料（${menu.recipe.servings}）</h3><ul>`
        menu.recipe.ingredients.forEach(i => {
            html += `<li>${i.name} ${i.amount}</li>`
        })
        html += "</ul>"
        html += "<h3>作り方</h3><ol>"
        menu.recipe.steps.forEach(s => {
            html += `<li>${s}</li>`
        })
        html += "</ol>"
        recipeDiv.innerHTML = html
    })