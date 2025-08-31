# 🌍 Travel Blog Website

A full-stack travel blog application built with Django REST API backend and React frontend, featuring JWT authentication and a beautiful Material-UI interface.

## 🚀 Features

- **JWT Authentication**: Secure login/register system with token-based authentication
- **Travel Blog Posts**: Create, read, and manage travel blog posts
- **Image Upload**: Upload images for your travel posts
- **Comments System**: Comment on posts (backend ready)
- **Responsive Design**: Beautiful Material-UI interface that works on all devices
- **Real-time Updates**: Dynamic content loading and updates

## 🛠️ Tech Stack

### Backend (Django)
- Django 4.2.7
- Django REST Framework 3.14.0
- JWT Authentication (djangorestframework-simplejwt)
- SQLite Database
- CORS Headers for frontend communication

### Frontend (React)
- React 18
- React Router DOM for navigation
- Material-UI for beautiful components
- Axios for API communication
- Local storage for token management

## 📁 Project Structure

```
travel-blog/
├── backend/                 # Django API
│   ├── manage.py
│   ├── requirements.txt
│   ├── travel_blog/        # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── api/               # API app
│       ├── models.py      # Database models
│       ├── serializers.py # API serializers
│       ├── views.py       # API views
│       └── urls.py        # API routes
└── frontend/              # React app
    ├── package.json
    ├── public/
    └── src/
        ├── components/    # React components
        │   ├── Home.js
        │   ├── Login.js
        │   ├── Register.js
        │   └── CreatePost.js
        ├── services/      # API services
        │   └── api.js
        └── App.js        # Main app component
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd travel-blog/backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

5. **Start the Django server:**
   ```bash
   python manage.py runserver
   ```

   The Django API will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd travel-blog/frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The React app will be available at: `http://localhost:3000`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

### Posts
- `GET /api/posts/` - Get all posts (authenticated)
- `POST /api/posts/` - Create new post (authenticated)
- `GET /api/posts/{id}/` - Get specific post
- `PUT /api/posts/{id}/` - Update post (authenticated)
- `DELETE /api/posts/{id}/` - Delete post (authenticated)
- `GET /api/public/posts/` - Get all posts (public)

### Comments
- `POST /api/posts/{post_id}/comments/` - Create comment (authenticated)

## 🎯 Usage Guide

### 1. Registration
- Visit `http://localhost:3000/register`
- Fill in your details and create an account
- You'll be automatically logged in and redirected to the home page

### 2. Login
- Visit `http://localhost:3000/login`
- Enter your username and password
- You'll be redirected to the home page

### 3. Creating Posts
- Click "New Post" in the navigation bar (when logged in)
- Fill in the post details:
  - Title
  - Location
  - Tags (comma-separated)
  - Content (your travel story)
  - Upload an image (optional)
- Click "Publish Post"

### 4. Viewing Posts
- All posts are displayed on the home page
- Click on any post card to view full details
- Posts show author, location, date, and comment count

## 🔧 Configuration

### Backend Configuration
- Database: SQLite (default) - can be changed in `backend/travel_blog/settings.py`
- JWT Token lifetime: 60 minutes (configurable in settings)
- CORS: Configured for `localhost:3000`

### Frontend Configuration
- API Base URL: `http://localhost:8000/api` (in `frontend/src/services/api.js`)
- Theme: Material-UI theme (customizable in `App.js`)

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Django server is running on port 8000
   - Check CORS settings in `backend/travel_blog/settings.py`

2. **JWT Token Issues**
   - Clear browser localStorage
   - Check token expiration settings
   - Ensure proper Authorization header format

3. **Image Upload Issues**
   - Check media directory permissions
   - Ensure Django media settings are configured

4. **Database Issues**
   - Run `python manage.py makemigrations`
   - Run `python manage.py migrate`

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG = False` in settings
2. Configure production database (PostgreSQL recommended)
3. Set up static files serving
4. Configure environment variables

### Frontend Deployment
1. Run `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Django REST Framework for the robust API
- Material-UI for the beautiful components
- React community for the excellent ecosystem

---

**Happy Traveling! 🌍✈️**
