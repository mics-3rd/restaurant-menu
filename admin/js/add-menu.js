async function init() {
    const res = await fetch("../data/categories.json")
    const categories = await res.json()
    const select = document.getElementById("category")
    categories.forEach(c => {
        const option = document.createElement("option")
        option.value = c.id
        option.textContent = c.name
        select.appendChild(option)
    })
}
async function addMenu() {
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const category = document.getElementById("category").value
    const body = `
menu追加
name:${name}
description:${description}
category:${category}
`
    await fetch(`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({
            title: `menu:${name}`,
            body: body
        })
    })
    alert("登録リクエスト送信しました")
}
init()