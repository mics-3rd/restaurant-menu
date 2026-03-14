function submitMenu() {
    const name = document.getElementById("name").value
    const category = document.getElementById("category").value
    const servings = document.getElementById("servings").value
    const ingredients = document.getElementById("ingredients").value
    const steps = document.getElementById("steps").value
    const body =
        `category:${category}
servings:${servings}
ingredients:
${ingredients}
steps:
${steps}`
    const url =
        "https://github.com/mics-3rd/restaurant-menu/issues/new?title="
        + encodeURIComponent(name)
        + "&body=" + encodeURIComponent(body)
    window.open(url)
}