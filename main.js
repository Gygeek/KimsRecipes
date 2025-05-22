document.addEventListener('DOMContentLoaded', () => {
    const recipeListContainer = document.getElementById('recipe-list-container');

    if (recipeListContainer) {
        fetch('master-recipes.json') // Fetch the new master list
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - Could not load master-recipes.json`);
                }
                return response.json();
            })
            .then(recipes => {
                if (recipes.length === 0) {
                    recipeListContainer.innerHTML = '<li>No recipes found in master-recipes.json.</li>';
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
            })
            .catch(error => {
                console.error("Could not load or process recipes:", error);
                recipeListContainer.innerHTML = `<li>Error loading recipes: ${error.message}. Please check if master-recipes.json exists and is valid.</li>`;
            });
    } else {
        console.error("Recipe list container not found in index.html");
    }
});