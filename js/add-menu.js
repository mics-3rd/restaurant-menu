fetch("data/menu.json")
    .then(r => r.json())
    .then(data => {
        const select = document.getElementById("category")
        data.categories.forEach(c => {
            const option = document.createElement("option")
            option.value = c.id
            option.textContent = c.name
            select.appendChild(option)
        })
    })
function submitMenu() {
    const name = document.getElementById("name").value
    const category = document.getElementById("category").value
    const body =
        `type:menu
category:${category}`
    const url =
        "https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new?title="
        + encodeURIComponent(name)
        + "&body=" + encodeURIComponent(body)
    window.open(url)
}