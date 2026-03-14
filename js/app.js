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
                location.href = "category.html?category=" + encodeURIComponent(c.name)
            }
            container.appendChild(card)
        })
    })