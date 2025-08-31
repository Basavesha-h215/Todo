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

# Copy build files to Django static directory
cp -r build/* ../backend/static/

# Go back to root
cd ..

# Collect static files
cd backend
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate
