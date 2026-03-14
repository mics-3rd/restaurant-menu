async function loadCategories() {
    const res = await fetch("../data/categories.json")
    const categories = (await res.json()).categories
    const select = document.getElementById("category")
    categories.forEach(c => {
        const opt = document.createElement("option")
        opt.value = c.id
        opt.text = c.name
        select.appendChild(opt)
    })
}
function submitMenu() {
    const name = document.getElementById("name").value
    const category = document.getElementById("category").value
    const body = `
type:menu
name:${name}
category:${category}
`
    const url = `https://github.com/mics-3rd/restaurant-menu/issues/new?title=${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`
    location.href = url
}
loadCategories()