#!/bin/bash

# Exit on error
set -e

#source ~/.bashrc
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
echo "node version: $(node -v)"
echo "npm version: $(npm -v)"

# Define paths
TARGET_DIR="/mydata/nginx/html"
CURRENT_DIR=$(pwd)

# Function to display usage information
show_usage() {
  echo "Usage: $0 [project1] [project2] ..."
  echo "Available projects: booking, gallery, weather, meal, or any custom project name"
  echo "If no projects are specified, all standard projects will be built."
  echo "Example: $0 booking weather customproject"
}

# Function to build BookingHotel project
build_booking() {
  if [ -d "$CURRENT_DIR/BookingHotel" ]; then
    echo "Building BookingHotel project..."
    cd "$CURRENT_DIR/BookingHotel"
    npm install
    npm run build
    BOOKING_BUILT=true
  else
    echo "Error: BookingHotel project folder does not exist."
    exit 1
  fi
}

# Function to build PhotoGallary project
build_gallery() {
  if [ -d "$CURRENT_DIR/PhotoGallary" ]; then
    echo "Building PhotoGallary project..."
    cd "$CURRENT_DIR/PhotoGallary"
    npm install
    npm run build
    GALLERY_BUILT=true
  else
    echo "Error: PhotoGallary project folder does not exist."
    exit 1
  fi
}

# Function to build Weather project
build_weather() {
  if [ -d "$CURRENT_DIR/Weather" ]; then
    echo "Building Weather project..."
    cd "$CURRENT_DIR/Weather"
    npm install --legacy-peer-deps
    npm run build
    WEATHER_BUILT=true
  else
    echo "Error: Weather project folder does not exist."
    exit 1
  fi
}

# Function to build mealplanner project
build_meal() {
  if [ -d "$CURRENT_DIR/mealplanner" ]; then
    echo "Building mealplanner project..."
    cd "$CURRENT_DIR/mealplanner"
    npm install
    npm run build
    MEAL_BUILT=true
  else
    echo "Error: mealplanner project folder does not exist."
    exit 1
  fi
}

# Function to build custom project
build_custom_project() {
  local project_name=$1
  if [ -d "$CURRENT_DIR/$project_name" ]; then
    echo "Building $project_name project..."
    cd "$CURRENT_DIR/$project_name"
    npm install
    npm run build
    # Add project to the list with space separator
    CUSTOM_PROJECTS_LIST="$CUSTOM_PROJECTS_LIST $project_name"
  else
    echo "Error: $project_name project folder does not exist."
    exit 1
  fi
}

# Initialize build flags
BOOKING_BUILT=false
GALLERY_BUILT=false
WEATHER_BUILT=false
MEAL_BUILT=false
BUILD_ALL=false
# Using a simpler approach instead of associative arrays for better shell compatibility
CUSTOM_PROJECTS_LIST=""

# Check if help is requested
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  show_usage
  exit 0
fi

# If no arguments provided, build all projects
if [ $# -eq 0 ]; then
  BUILD_ALL=true
  echo "No specific projects specified. Building all projects..."
fi

# Process command line arguments
for arg in "$@"; do
  case "$arg" in
    booking)
      build_booking
      ;;
    gallery)
      build_gallery
      ;;
    weather)
      build_weather
      ;;
    meal)
      build_meal
      ;;
    *)
      build_custom_project "$arg"
      ;;
  esac
done

# If BUILD_ALL is true, build all projects that haven't been built yet
if [ "$BUILD_ALL" = true ]; then
  [ "$BOOKING_BUILT" = false ] && build_booking
  [ "$GALLERY_BUILT" = false ] && build_gallery
  [ "$WEATHER_BUILT" = false ] && build_weather
  [ "$MEAL_BUILT" = false ] && build_meal
fi

# Create target directory if it doesn't exist
if [ ! -d "$TARGET_DIR" ]; then
  mkdir -p "$TARGET_DIR"
fi
# Function to clean and copy project
clean_and_copy_project() {
    local project_flag=$1
    local target_subdir=$2
    local source_dir=$3
    local project_name=$4

    if [ "$project_flag" = true ] && [ -d "$TARGET_DIR/$target_subdir" ]; then
        echo "Cleaning target directory: $TARGET_DIR/$target_subdir"
        rm -rf "$TARGET_DIR/$target_subdir"
    fi

    if [ "$project_flag" = true ]; then
        mkdir -p "$TARGET_DIR/$target_subdir"
        cp -r "$CURRENT_DIR/$source_dir/dist/"* "$TARGET_DIR/$target_subdir/"
        echo "Copied $project_name build to $TARGET_DIR/$target_subdir/"
    fi
}

# Clean and copy for each project
clean_and_copy_project "$BOOKING_BUILT" "booking" "BookingHotel" "BookingHotel"
clean_and_copy_project "$GALLERY_BUILT" "gallery" "PhotoGallary" "PhotoGallary" 
clean_and_copy_project "$WEATHER_BUILT" "weather" "Weather" "Weather"
clean_and_copy_project "$MEAL_BUILT" "meal" "mealplanner" "mealplanner"

# Clean directories for custom projects
for project_name in $CUSTOM_PROJECTS_LIST; do
    if [ -n "$project_name" ] && [ -d "$TARGET_DIR/$project_name" ]; then
        clean_and_copy_project "true" "$project_name" "$project_name" "$project_name"
    fi
done

# Copy build results to target directory
echo "Copying build results to $TARGET_DIR"
# Copy build results for custom projects
for project_name in $CUSTOM_PROJECTS_LIST; do
  if [ -n "$project_name" ]; then
    mkdir -p "$TARGET_DIR/$project_name"
    cp -r "$CURRENT_DIR/$project_name/dist/"* "$TARGET_DIR/$project_name/"
    echo "Copied $project_name build to $TARGET_DIR/$project_name/"
  fi
done

echo "Build process completed successfully!"
