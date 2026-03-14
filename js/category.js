const params = new URLSearchParams(location.search)
const category = params.get("category")
fetch("data/menu.json")
    .then(r => r.json())
    .then(data => {
        const menus = data.menus
            .filter(m => m.category === category)
            .sort((a, b) => a.name.localeCompare(b.name, "ja"))
        const list = document.getElementById("menuList")
        menus.forEach(m => {
            const li = document.createElement("li")
            li.textContent = m.name
            li.onclick = () => {
                location.href = "recipe.html?id=" + m.id
            }
            list.appendChild(li)
        })
    })