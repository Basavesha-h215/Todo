#!/usr/bin/env bash
# exit on error
set -o errexit

# Print current directory for debugging
echo "Current directory: $(pwd)"
echo "Starting build process..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd frontend
npm install

# Set production environment variable for React build
export REACT_APP_BACKEND_URL=https://todo-4-xnxh.onrender.com
export PUBLIC_URL=/

# Build React app
echo "Building React app..."
npm run build

# Fix PUBLIC_URL placeholders
echo "Fixing PUBLIC_URL placeholders..."
node build-script.js

# Go back to root
cd ..

# Create static directory if it doesn't exist
mkdir -p backend/static

# Copy build files to Django static directory
cp -r frontend/build/* backend/static/

# Go to backend directory
cd backend

# Create staticfiles directory
mkdir -p staticfiles

# Collect static files
python manage.py collectstatic --noinput

# Ensure static files are properly served
cp -r static/* staticfiles/ 2>/dev/null || true

# Run migrations
python manage.py migrate
