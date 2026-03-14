async function addCategory() {
    const name = document.getElementById("name").value
    const id = document.getElementById("id").value
    const body = `
category追加
id:${id}
name:${name}
`
    await fetch(`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json"
        },
        body: JSON.stringify({
            title: `category:${name}`,
            body: body
        })
    })
    alert("追加リクエスト送信しました")
}