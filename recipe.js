document.addEventListener('DOMContentLoaded', () => {
    let currentRecipeData = null;
    let currentStepIndex = 0;

    const titleElement = document.getElementById('recipe-title');
    const ingredientsContainer = document.getElementById('recipe-ingredients'); // The main section for ingredients
    const instructionTextElement = document.getElementById('instruction-text');
    const stepCounterElement = document.getElementById('step-counter');
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');

    const urlParams = new URLSearchParams(window.location.search);
    const recipeFileName = urlParams.get('recipe');

    if (recipeFileName) {
        fetch(recipeFileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}, trying to load ${recipeFileName}`);
                }
                return response.json();
            })
            .then(data => {
                currentRecipeData = data;
                displayRecipe();
            })
            .catch(error => {
                console.error("Could not load recipe:", error);
                if (titleElement) titleElement.textContent = "Recipe Not Found";
                if (instructionTextElement) instructionTextElement.textContent = `Error loading recipe details. Please check if the file '${recipeFileName}' exists and is valid JSON.`;
                if (stepCounterElement) stepCounterElement.textContent = "";
                if (ingredientsContainer) ingredientsContainer.innerHTML = '<h2>Ingredients</h2><p>Could not load ingredients.</p>';
                prevButton.disabled = true;
                nextButton.disabled = true;
            });
    } else {
        if (titleElement) titleElement.textContent = "No Recipe Specified";
        if (instructionTextElement) instructionTextElement.textContent = "Please select a recipe from the main list.";
        if (ingredientsContainer) ingredientsContainer.innerHTML = '<h2>Ingredients</h2><p>No recipe selected.</p>';
        prevButton.disabled = true;
        nextButton.disabled = true;
    }

    prevButton.addEventListener('click', showPreviousStep);
    nextButton.addEventListener('click', showNextStep);

    function displayRecipe() {
        if (!currentRecipeData) return;

        document.title = currentRecipeData.title; // Update page title in the browser tab
        if (titleElement) titleElement.textContent = currentRecipeData.title;

        displayIngredients();
        displayInstructionStep();
    }

    function displayIngredients() {
        if (!currentRecipeData || !currentRecipeData.ingredients || !ingredientsContainer) return;

        // helper to escape text before inserting as HTML
        function escapeHtml(str) {
            return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
        }

        // Regex to capture a leading quantity (numbers, fractions, simple units) at the start of the string
        const qtyRegex = /^\s*([0-9⅓¼½¾⅔\/\.\s-]+(?:\s*(?:[a-zA-Z]+\.?))?)/;

        // Clear previous ingredients and add the main "Ingredients" heading
        ingredientsContainer.innerHTML = '<h2>Ingredients</h2>';

        for (const category in currentRecipeData.ingredients) {
            if (currentRecipeData.ingredients.hasOwnProperty(category)) {
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category;
                ingredientsContainer.appendChild(categoryTitle);

                const ingredientList = document.createElement('ul');
                currentRecipeData.ingredients[category].forEach(itemString => {
                    const listItem = document.createElement('li');

                    const m = itemString.match(qtyRegex);
                    if (m) {
                        const qty = m[0];
                        const rest = itemString.slice(qty.length);
                        listItem.innerHTML = `<span class="ingredient-quantity">${escapeHtml(qty)}</span>${escapeHtml(rest)}`;
                    } else {
                        listItem.textContent = itemString;
                    }

                    ingredientList.appendChild(listItem);
                });
                ingredientsContainer.appendChild(ingredientList);
            }
        }
    }

    function displayInstructionStep() {
        if (!currentRecipeData || !currentRecipeData.steps || !instructionTextElement || !stepCounterElement) return;

        const steps = currentRecipeData.steps;
        instructionTextElement.textContent = steps[currentStepIndex];
        stepCounterElement.textContent = `Step ${currentStepIndex + 1} of ${steps.length}`;

        prevButton.disabled = currentStepIndex === 0;
        nextButton.disabled = currentStepIndex >= steps.length - 1;
    }

    function showPreviousStep() {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            displayInstructionStep();
        }
    }

    function showNextStep() {
        if (currentRecipeData && currentStepIndex < currentRecipeData.steps.length - 1) {
            currentStepIndex++;
            displayInstructionStep();
        }
    }
});
