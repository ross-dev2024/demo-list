#!/bin/bash

# Exit on error
set -e

# Define paths
TARGET_DIR="/mydata/nginx/html"
CURRENT_DIR=$(pwd)

echo "Starting build process for Vue projects..."

# Build BookingHotel project
echo "Building BookingHotel project..."
cd "$CURRENT_DIR/BookingHotel"
npm install
npm run build

# Build PhotoGallary project
echo "Building PhotoGallary project..."
cd "$CURRENT_DIR/PhotoGallary"
npm install
npm run build

# Build Weather project
echo "Building Weather project..."
cd "$CURRENT_DIR/Weather"
npm install
npm run build

# Build mealplanner project
echo "Building mealplanner project..."
cd "$CURRENT_DIR/mealplanner"
npm install
npm run build

# Clean target directory
echo "Cleaning target directory: $TARGET_DIR"
if [ -d "$TARGET_DIR" ]; then
  rm -rf "$TARGET_DIR"/*
else
  mkdir -p "$TARGET_DIR"
fi

# Copy build results to target directory
echo "Copying build results to $TARGET_DIR"
mkdir -p "$TARGET_DIR/booking"
mkdir -p "$TARGET_DIR/gallery"
mkdir -p "$TARGET_DIR/weather"
mkdir -p "$TARGET_DIR/meal"

cp -r "$CURRENT_DIR/BookingHotel/dist/"* "$TARGET_DIR/booking/"
cp -r "$CURRENT_DIR/PhotoGallary/dist/"* "$TARGET_DIR/gallery/"
cp -r "$CURRENT_DIR/Weather/dist/"* "$TARGET_DIR/weather/"
cp -r "$CURRENT_DIR/mealplanner/dist/"* "$TARGET_DIR/meal/"

echo "Build process completed successfully!"