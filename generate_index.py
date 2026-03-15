import os
import json

    def generate_index():
        recipes = []
        # Scan the directory for recipe files
        for filename in os.listdir('.'):
            # Only process JSON files, excluding the index and template
            if filename.endswith('.json') and filename not in ['master-recipes.json', 'recipe-template.json']:
                with open(filename, 'r') as f:
                    try:
                        data = json.load(f)
                        # Use the title from the JSON, or the filename if title is missing
                        title = data.get('title', filename.replace('.json', '').replace('-', ' '))
                        recipes.append({'title': title, 'file': filename})
                    except json.JSONDecodeError:
                        print(f"Skipping {filename}: Invalid JSON format")
    
        # Sort alphabetically by title
        recipes.sort(key=lambda x: x['title'].lower())
    
        # Update the master index file
        with open('master-recipes.json', 'w') as f:
            json.dump(recipes, f, indent=4)
        
        print(f"Successfully indexed {len(recipes)} recipes.")
    
    if __name__ == "__main__":
        generate_index()
    
