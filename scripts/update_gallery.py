import os
import json

# Configuration
GALLERY_DIR = 'assets/images/gallery'
OUTPUT_FILE = 'assets/js/gallery-data.js'
VALID_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')

def update_gallery():
    # Get the absolute path to the project root (where this script is located)
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    gallery_path = os.path.join(project_root, GALLERY_DIR)
    
    # Check if gallery directory exists
    if not os.path.exists(gallery_path):
        print(f"Error: Gallery directory not found at {gallery_path}")
        return

    # Categories to scan for (matching folder names)
    categories = ['exterior', 'interior', 'land', 'commercial', 'events']
    gallery_data = {}

    total_images = 0

    for category in categories:
        category_path = os.path.join(gallery_path, category)
        if os.path.exists(category_path):
            images = []
            try:
                for filename in os.listdir(category_path):
                    if filename.lower().endswith(VALID_EXTENSIONS):
                        # Store relative path for the web
                        rel_path = f"{GALLERY_DIR}/{category}/{filename}"
                        images.append(rel_path)
                
                # Sort images
                images.sort()
                gallery_data[category] = images
                total_images += len(images)
                print(f"Found {len(images)} images in {category}")
            except Exception as e:
                print(f"Error scanning {category}: {e}")
        else:
            print(f"Warning: Category folder '{category}' not found")
            gallery_data[category] = []
        
    # Generate JavaScript content
    js_content = f"window.galleryData = {json.dumps(gallery_data, indent=4)};\n"
    
    # Write to output file
    output_path = os.path.join(project_root, OUTPUT_FILE)
    with open(output_path, 'w') as f:
        f.write(js_content)
        
    print(f"Success! Found {total_images} total images.")
    print(f"Updated {OUTPUT_FILE}")

if __name__ == "__main__":
    print("Scanning for new gallery images...")
    update_gallery()
