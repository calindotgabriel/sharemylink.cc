#!/bin/bash

# Navigate to the frontend directory
cd frontend || { echo "Frontend directory not found"; exit 1; }

# Run the build command
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed, exiting."
  exit 1
fi

# Create the docs directory if it doesn't exist
mkdir -p ../docs

# Copy the dist folder to the root and rename it to docs
cp -R dist/* ../docs

# Check if the copy was successful
if [ $? -eq 0 ]; then
  echo "Successfully built and copied to /docs"
else
  echo "Failed to copy dist folder"
  exit 1
fi
