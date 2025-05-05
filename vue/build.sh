#!/bin/bash

# Exit on error
set -e

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
    CUSTOM_PROJECTS["$project_name"]=true
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
declare -A CUSTOM_PROJECTS

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

# Clean target directory
echo "Cleaning target directory: $TARGET_DIR"
if [ -d "$TARGET_DIR" ]; then
  rm -rf "$TARGET_DIR"/*
else
  mkdir -p "$TARGET_DIR"
fi

# Copy build results to target directory
echo "Copying build results to $TARGET_DIR"

# Only create directories and copy files for projects that were built
if [ "$BOOKING_BUILT" = true ]; then
  mkdir -p "$TARGET_DIR/booking"
  cp -r "$CURRENT_DIR/BookingHotel/dist/"* "$TARGET_DIR/booking/"
  echo "Copied BookingHotel build to $TARGET_DIR/booking/"
fi

if [ "$GALLERY_BUILT" = true ]; then
  mkdir -p "$TARGET_DIR/gallery"
  cp -r "$CURRENT_DIR/PhotoGallary/dist/"* "$TARGET_DIR/gallery/"
  echo "Copied PhotoGallary build to $TARGET_DIR/gallery/"
fi

if [ "$WEATHER_BUILT" = true ]; then
  mkdir -p "$TARGET_DIR/weather"
  cp -r "$CURRENT_DIR/Weather/dist/"* "$TARGET_DIR/weather/"
  echo "Copied Weather build to $TARGET_DIR/weather/"
fi

if [ "$MEAL_BUILT" = true ]; then
  mkdir -p "$TARGET_DIR/meal"
  cp -r "$CURRENT_DIR/mealplanner/dist/"* "$TARGET_DIR/meal/"
  echo "Copied mealplanner build to $TARGET_DIR/meal/"
fi

# Copy build results for custom projects
for project_name in "${!CUSTOM_PROJECTS[@]}"; do
  if [ "${CUSTOM_PROJECTS[$project_name]}" = true ]; then
    mkdir -p "$TARGET_DIR/$project_name"
    cp -r "$CURRENT_DIR/$project_name/dist/"* "$TARGET_DIR/$project_name/"
    echo "Copied $project_name build to $TARGET_DIR/$project_name/"
  fi
done

echo "Build process completed successfully!"
