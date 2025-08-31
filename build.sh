#!/usr/bin/env bash
# exit on error
set -o errexit

# Print current directory for debugging
echo "Current directory: $(pwd)"
echo "Starting build process..."

# Ensure we're in the right directory
if [ ! -f "build.sh" ]; then
    echo "Error: build.sh not found in current directory"
    exit 1
fi

# Install Python dependencies
echo "Installing Python dependencies..."
if [ ! -f "travel-blog/backend/requirements.txt" ]; then
    echo "Error: travel-blog/backend/requirements.txt not found"
    exit 1
fi
pip install -r travel-blog/backend/requirements.txt

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd travel-blog/frontend
npm install

# Set production environment variable for React build
export REACT_APP_BACKEND_URL=https://travel-blog-1nvr.onrender.com
export PUBLIC_URL=/

# Build React app
echo "Building React app..."
npm run build

# Fix PUBLIC_URL placeholders
echo "Fixing PUBLIC_URL placeholders..."
node build-script.js

# Go back to root
cd ../..

# Create static directory if it doesn't exist
mkdir -p travel-blog/backend/static

# Copy build files to Django static directory
cp -r travel-blog/frontend/build/* travel-blog/backend/static/

# Go to backend directory
cd travel-blog/backend

# Create staticfiles directory
mkdir -p staticfiles

# Collect static files
python manage.py collectstatic --noinput

# Ensure static files are in both locations for WhiteNoise
cp -r static/* staticfiles/ 2>/dev/null || true
cp -r staticfiles/* static/ 2>/dev/null || true

# List files for debugging
echo "Static files in staticfiles directory:"
ls -la staticfiles/
echo "Static files in static directory:"
ls -la static/
echo "Static files in static/static directory:"
ls -la static/static/ 2>/dev/null || echo "static/static directory not found"

# Run migrations
python manage.py migrate
