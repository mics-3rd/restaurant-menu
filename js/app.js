fetch("data/menu.json")
    .then(r => r.json())
    .then(data => {
        const container = document.getElementById("categoryContainer")
        data.categories.forEach(c => {
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML =
                `<div class="icon">${c.icon}</div>
<div>${c.name}</div>`
            card.onclick = () => {
                location.href = "category.html?category=" + c.id
            }
            container.appendChild(card)
        })
        const menus = data.menus
        const results = document.getElementById("searchResults")
        document.getElementById("search").addEventListener("input", e => {
            const q = e.target.value
            results.innerHTML = ""
            menus
                .filter(m => m.name.includes(q))
                .forEach(m => {
                    const li = document.createElement("li")
                    li.textContent = m.name
                    li.onclick = () => {
                        location.href = "recipe.html?id=" + m.id
                    }
                    results.appendChild(li)
                })
        })
    })