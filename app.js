fetch("menu.json")
    .then(res => res.json())
    .then(data => {
        const categoryContainer = document.getElementById("categoryContainer");
        const menuContainer = document.getElementById("menuContainer");
        const backBtn = document.getElementById("backBtn");
        const menu = data.menu;
        let currentCategory = null;
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
                currentCategory = category;
                showMenu(menu[category].items);
            };
            categoryContainer.appendChild(card);
        }
        function showMenu(items) {
            categoryContainer.style.display = "none";
            menuContainer.style.display = "block";
            backBtn.style.display = "block";
            menuContainer.innerHTML = "";
            const title = document.createElement("h2");
            title.textContent = currentCategory;
            menuContainer.appendChild(title);
            items.forEach(item => {
                const div = document.createElement("div");
                div.className = "menuCard";
                div.textContent = item.name;
                div.onclick = () => {
                    showRecipe(item);
                };
                menuContainer.appendChild(div);
            });
        }
        function showRecipe(item) {
            menuContainer.innerHTML = "";
            const title = document.createElement("h2");
            title.textContent = item.name;
            const servings = document.createElement("div");
            servings.className = "servings";
            servings.textContent = item.servings;
            menuContainer.appendChild(title);
            menuContainer.appendChild(servings);
            const ingTitle = document.createElement("h3");
            ingTitle.textContent = "材料";
            menuContainer.appendChild(ingTitle);
            item.ingredients.forEach(i => {
                const div = document.createElement("div");
                div.className = "ingredient";
                const name = document.createElement("span");
                name.className = "ingName";
                name.textContent = i.name;
                const amount = document.createElement("span");
                amount.className = "ingAmount";
                amount.textContent = i.amount;
                div.appendChild(name);
                div.appendChild(amount);
                menuContainer.appendChild(div);
            });
            const stepTitle = document.createElement("h3");
            stepTitle.textContent = "作り方";
            menuContainer.appendChild(stepTitle);
            item.steps.forEach((step, index) => {
                const div = document.createElement("div");
                div.className = "step";
                div.textContent = (index + 1) + ". " + step;
                menuContainer.appendChild(div);
            });
        }
        backBtn.onclick = () => {
            if (menuContainer.querySelector(".ingredient")) {
                showMenu(menu[currentCategory].items);
            } else {
                menuContainer.style.display = "none";
                categoryContainer.style.display = "grid";
                backBtn.style.display = "none";
            }
        };
    });