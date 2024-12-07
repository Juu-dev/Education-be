#!/bin/bash

DIRECTORY="/Users/pham.minh.thong/Working/Binh_An/Education-be/src/modules/education-service/books"
SEARCH_STRING="teacher"
REPLACE_STRING="book"

# Hàm đổi tên file hoặc thư mục
rename_files_and_folders() {
    local dir="$1"
    for item in "$dir"/*; do
        # Kiểm tra nếu là thư mục
        if [ -d "$item" ]; then
            local new_name=$(basename "$item" | sed "s/$SEARCH_STRING/$REPLACE_STRING/g")
            local new_dir="$dir/$new_name"

            # Đổi tên thư mục
            if [ "$new_name" != "$(basename "$item")" ]; then
                mv "$item" "$new_dir"
                echo "Renamed directory: $item to $new_dir"
            fi

            # Gọi hàm đệ quy cho thư mục con
            rename_files_and_folders "$new_dir"

        # Kiểm tra nếu là file
        elif [ -f "$item" ]; then
            local new_name=$(basename "$item" | sed "s/$SEARCH_STRING/$REPLACE_STRING/g")
            local new_file="$dir/$new_name"

            # Đổi tên file
            if [ "$new_name" != "$(basename "$item")" ]; then
                mv "$item" "$new_file"
                echo "Renamed file: $item to $new_file"
            fi
        fi
    done

    # Đổi tên thư mục mẹ nếu chứa cụm từ A
    local parent_name=$(basename "$dir")
    local new_parent_name=$(echo "$parent_name" | sed "s/$SEARCH_STRING/$REPLACE_STRING/g")
    local parent_dir=$(dirname "$dir")

    if [ "$new_parent_name" != "$parent_name" ]; then
        mv "$dir" "$parent_dir/$new_parent_name"
        echo "Renamed parent directory: $dir to $parent_dir/$new_parent_name"
    fi
}

# Gọi hàm với thư mục đã chỉ định
rename_files_and_folders "$DIRECTORY"
