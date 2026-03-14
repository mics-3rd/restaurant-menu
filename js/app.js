async function loadData() {
    const catRes = await fetch("data/categories.json")
    const categories = (await catRes.json()).categories
    const menuRes = await fetch("data/menus/index.json")
    const menus = (await menuRes.json()).menus
    renderCategories(categories)
    setupSearch(menus, categories)
}
function renderCategories(categories) {
    categories.sort((a, b) => a.order - b.order)
    const container = document.getElementById("categoryCards")
    container.innerHTML = ""
    categories.forEach(cat => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `${cat.icon}<br>${cat.name}`
        card.onclick = () => {
            location.href = `category.html?id=${cat.id}`
        }
        container.appendChild(card)
    })
}
function setupSearch(menus, categories) {
    const input = document.getElementById("searchInput")
    input.addEventListener("input", () => {
        const word = input.value
        const result = menus.filter(m => m.name.includes(word))
        renderSearch(result, categories)
    })
}
function renderSearch(menus, categories) {
    const box = document.getElementById("searchResult")
    box.innerHTML = ""
    if (menus.length === 0) return
    const list = document.createElement("div")
    list.className = "menu-list"
    menus.forEach(menu => {
        const cat = categories.find(c => c.id === menu.category)
        const row = document.createElement("div")
        row.className = "menu-item"
        row.innerHTML = `<span>${menu.name}（${cat.name}）</span><span>›</span>`
        row.onclick = () => {
            location.href = `recipe.html?id=${menu.id}`
        }
        list.appendChild(row)
    })
    box.appendChild(list)
}
loadData()