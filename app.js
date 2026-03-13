fetch("menu.json")
.then(res => res.json())
.then(data => {
    const ul = document.getElementById("menu");
    data.menu.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
});