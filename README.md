# KimsRecipes

A simple, browser-based digital recipe box. Recipes are stored as JSON files and automatically listed (alphabetically) for easy browsing and selection. Built with plain HTML, CSS, and JavaScript for simplicity and portability.

## Features
- Each recipe is a separate JSON file for modularity and version control.
- All recipes listed alphabetically on the home page.
- Click any recipe to view details.
- Simple, no dependencies—just open index.html in your browser.

## Usage
1. Add a new recipe: place your JSON file in the repo and update master-recipes.json.
2. Open index.html in a browser to browse/select recipes.
3. Click a recipe title to view its details.

## Structure
- master-recipes.json: the recipe index—each entry has a title and filename.
- /[recipe files].json: individual structured recipes.
- main.js: loads and sorts recipes for display.
- recipe.html & recipe.js: display full details of a single recipe.

## Customization
- Add, reorder, or edit fields in your recipe JSON as needed.
- For dietary tags, nutrition, etc., simply expand the recipe schema.

## License
MIT License. Open for personal and collaborative use. Contributions welcome!
