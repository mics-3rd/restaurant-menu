async function init() {
    const params = new URLSearchParams(location.search)
    const id = params.get("id")
    const res = await fetch("data/menus/index.json")
    const menus = (await res.json()).menus
    const list = document.getElementById("menuList")
    menus
        .filter(m => m.category === id)
        .forEach(menu => {
            const row = document.createElement("div")
            row.className = "menu-item"
            row.innerHTML = `<span>${menu.name}</span><span>›</span>`
            row.onclick = () => {
                location.href = `recipe.html?id=${menu.id}`
            }
            list.appendChild(row)
        })
}
init()