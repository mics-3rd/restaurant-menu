async function init() {
    const params = new URLSearchParams(location.search)
    const id = params.get("id")
    const res = await fetch("data/menus/index.json")
    const menus = (await res.json()).menus
    const list = document.getElementById("menuList")
    menus
        .filter(m => m.category === id)
        .forEach(menu => {
            const card = document.createElement("div")
            card.className = "menu-card"
            let desc = ""
            if (menu.description && menu.description !== "") {
                desc = `<div class="menu-desc">${menu.description}</div>`
            } else {
                desc = `<div class="menu-divider"></div>`
            }
            card.innerHTML = `
<div class="menu-name">${menu.name}</div>
${desc}
`
            card.onclick = () => {
                location.href = `recipe.html?id=${menu.id}`
            }
            list.appendChild(card)
        })
}
init()