#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r backend/requirements.txt

# Install Node.js dependencies
cd frontend
npm install

# Build React app
npm run build

# Go back to root
cd ..

# Create static directory if it doesn't exist
mkdir -p backend/static

# Copy build files to Django static directory
cp -r frontend/build/* backend/static/

# Go to backend directory
cd backend

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate
