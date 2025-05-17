document.addEventListener('DOMContentLoaded', () => {
    // This list would ideally be generated from actual files or a master index
    // For now, we hardcode the recipes we have JSON files for.
    const recipes = [
        { title: "Instant Pot Black Beans", file: "instant-pot-black-beans.json" },
        { title: "Instant Pot Butternut Squash Soup", file: "instant-pot-butternut-squash-soup.json" },
        { title: "Black Bean Burger", file: "black-bean-burger.json" },
        { title:  "Instant Pot Spaghetti & Meatballs", file: "InstantPotSpaghettiMeatballs.json" },
        { title:  "Black Bean Soup", file: "Black-Bean-Soup.json" },
        { title:  "Bok Choy Chicken", file: "Bok-Choy-Chicken.json" },
        { title:  "Cauliflower Rice Chicken Biryani", file: "Cauliflower-Rice-Chicken-Biryani.json" },
        { title:  "Cauliflower Rice Lunch Bowl W/Sweet Potatoes Chickpeas", file: "Cauliflower-Rice-Lunch-Bowl-with-Sweet-Potatoes-and-Chickpeas.json" },
        { title:  "Chicken Lombardy", file: "Chicken-Lombardy.json" },
        { title:  "Grilled Swordfish Pumpkin Ravioli", file: "Grilled-Swordfish-Pumpkin-Ravioli.json" },
        { title:  "Instant Pot Butter Chicken", file: "Instant-Pot-Butter-Chicken.json" },
        { title:  "Instant Pot Chicken Shawarma", file: "Instant-Pot-Chicken-Shawarma.json" },
        // Add more recipe objects here as you create more JSON files
        // { title: "Your Next Recipe Title", file: "your-next-recipe.json" }
    ];

    const recipeListContainer = document.getElementById('recipe-list-container');

    if (recipeListContainer) {
        if (recipes.length === 0) {
            recipeListContainer.innerHTML = '<li>No recipes found. Add recipe data and update main.js!</li>';
        } else {
            recipes.forEach(recipe => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = recipe.title;
                // Ensure the filename is properly encoded in the URL
                link.href = `recipe.html?recipe=${encodeURIComponent(recipe.file)}`;
                listItem.appendChild(link);
                recipeListContainer.appendChild(listItem);
            });
        }
    } else {
        console.error("Recipe list container not found in index.html");
    }
});
