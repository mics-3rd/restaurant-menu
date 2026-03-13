fetch("menu.json")
    .then(res => res.json())
    .then(data => {
        const categoryContainer = document.getElementById("categoryContainer");
        const menuContainer = document.getElementById("menuContainer");
        const backBtn = document.getElementById("backBtn");
        const menu = data.menu;
        backBtn.style.display = "none";
        for (const category in menu) {
            const card = document.createElement("div");
            card.className = "card";
            const icon = document.createElement("div");
            icon.className = "icon";
            icon.textContent = menu[category].icon;
            const title = document.createElement("div");
            title.className = "title";
            title.textContent = category;
            const count = document.createElement("div");
            count.className = "count";
            count.textContent = menu[category].items.length + "品";
            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(count);
            card.onclick = () => {
                showMenu(category, menu[category].items);
            };
            categoryContainer.appendChild(card);
        }
        function showMenu(category, items) {
            categoryContainer.style.display = "none";
            menuContainer.style.display = "block";
            backBtn.style.display = "block";
            menuContainer.innerHTML = "";
            const title = document.createElement("h2");
            title.textContent = category;
            menuContainer.appendChild(title);
            items.forEach(item => {
                const div = document.createElement("div");
                div.className = "menuCard";
                div.textContent = item;
                menuContainer.appendChild(div);
            });
        }
        backBtn.onclick = () => {
            menuContainer.style.display = "none";
            categoryContainer.style.display = "grid";
            backBtn.style.display = "none";
        }
    });