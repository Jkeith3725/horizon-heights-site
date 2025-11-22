import os
import json

# Configuration
GALLERY_DIR = 'assets/images/gallery'
OUTPUT_FILE = 'assets/js/gallery-data.js'
VALID_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')

def update_gallery():
    # Get the absolute path to the project root (where this script is located)
    project_root = os.path.dirname(os.path.abspath(__file__))
    gallery_path = os.path.join(project_root, GALLERY_DIR)
    
    # Check if gallery directory exists
    if not os.path.exists(gallery_path):
        print(f"Error: Gallery directory not found at {gallery_path}")
        return

    # Find all image files
    images = []
    try:
        for filename in os.listdir(gallery_path):
            if filename.lower().endswith(VALID_EXTENSIONS):
                # Store relative path for the web
                rel_path = f"{GALLERY_DIR}/{filename}"
                images.append(rel_path)
        
        # Sort images to ensure consistent order (optional, alphabetical)
        images.sort()
        
        # Generate JavaScript content
        js_content = f"const galleryImages = {json.dumps(images, indent=4)};\n"
        
        # Write to output file
        output_path = os.path.join(project_root, OUTPUT_FILE)
        with open(output_path, 'w') as f:
            f.write(js_content)
            
        print(f"Success! Found {len(images)} images.")
        print(f"Updated {OUTPUT_FILE}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    print("Scanning for new gallery images...")
    update_gallery()
