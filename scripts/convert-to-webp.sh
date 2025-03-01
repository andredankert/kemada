#!/bin/bash

# Set the gallery directory path
GALLERY_DIR="public/images/gallery"

# Function to convert a file to WebP
convert_to_webp() {
    local file="$1"
    local filename=$(basename "$file")
    local dirname=$(dirname "$file")
    local base="${filename%.*}"
    local output="$dirname/$base.webp"
    
    echo "Converting: $file"
    convert "$file" -quality 80 "$output"
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully converted: $file"
    else
        echo "✗ Failed to convert: $file"
    fi
}

# Function to process a directory
process_directory() {
    local dir="$1"
    
    # Loop through all files in the directory
    for file in "$dir"/*; do
        # Skip if it's not a file or directory
        [ ! -e "$file" ] && continue
        
        if [ -d "$file" ]; then
            # Recursively process subdirectories
            process_directory "$file"
        elif [ -f "$file" ]; then
            # Convert the filename to lowercase for comparison
            filename=$(basename "$file" | tr '[:upper:]' '[:lower:]')
            
            # Check if it's an image file
            case "$filename" in
                *.jpg|*.jpeg|*.png)
                    convert_to_webp "$file"
                    ;;
            esac
        fi
    done
}

echo "Starting image conversion to WebP format..."
process_directory "$GALLERY_DIR"
echo "Conversion complete!" 