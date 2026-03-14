async function init() {
    const catRes = await fetch("data/categories.json")
    const categories = await catRes.json()
    const menuRes = await fetch("data/menus/index.json")
    const menus = (await menuRes.json()).menus
    const cards = document.getElementById("categoryCards")
    categories.forEach(cat => {
        const card = document.createElement("div")
        card.className = "card"
        const count = menus.filter(m => m.category === cat.id).length
        card.innerHTML = `
${cat.name}
<br>
<small>${count}品</small>
`
        card.onclick = () => {
            location.href = `category.html?id=${cat.id}`
        }
        cards.appendChild(card)
    })
}
init()