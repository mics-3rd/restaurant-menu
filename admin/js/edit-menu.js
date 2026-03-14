fetch("data/menu.json")
    .then(r => r.json())
    .then(data => {
        const list = document.getElementById("list")
        data.categories.forEach(c => {
            const li = document.createElement("li")
            li.textContent = c.name
            list.appendChild(li)
        })
    })

function addCategory() {
    const name = document.getElementById("newCategory").value
    const body = `type:category
name:${name}`
    const url =
        "https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new?title=category"
        + "&body=" + encodeURIComponent(body)
    window.open(url)
}