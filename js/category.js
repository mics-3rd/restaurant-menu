const params = new URLSearchParams(location.search)
const category = params.get("category")
document.getElementById("categoryTitle").textContent = category
fetch("data/menu.json")
    .then(r => r.json())
    .then(data => {
        const menus = data.menus.filter(m => m.category === category)
        const list = document.getElementById("menuList")
        function render(filter = "") {
            list.innerHTML = ""
            menus
                .filter(m => m.name.includes(filter))
                .forEach(m => {
                    const li = document.createElement("li")
                    li.textContent = m.name
                    li.onclick = () => {
                        location.href = "recipe.html?id=" + m.id
                    }
                    list.appendChild(li)
                })
        }
        render()
        document.getElementById("search").addEventListener("input", e => {
            render(e.target.value)
        })
    })