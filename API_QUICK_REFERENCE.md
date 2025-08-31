# 🚀 API Quick Reference Card

## 🔐 **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register/` | Register new user | ❌ |
| `POST` | `/api/auth/login/` | Login user | ❌ |
| `GET` | `/api/auth/profile/` | Get user profile | ✅ |
| `PUT` | `/api/auth/profile/` | Update user profile | ✅ |

## 📝 **Posts Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/public/posts/` | Get all posts (public) | ❌ |
| `GET` | `/api/posts/` | Get all posts (authenticated) | ✅ |
| `POST` | `/api/posts/` | Create new post | ✅ |
| `GET` | `/api/posts/{id}/` | Get single post | ❌ |
| `PUT` | `/api/posts/{id}/` | Update post | ✅ |
| `DELETE` | `/api/posts/{id}/` | Delete post | ✅ |

## 💬 **Comments Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/posts/{post_id}/comments/` | Create comment | ✅ |

## 📋 **Request Examples**

### **Register User**
```bash
POST http://localhost:8000/api/auth/register/
Content-Type: application/json

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123",
    "first_name": "Test",
    "last_name": "User"
}
```

### **Login User**
```bash
POST http://localhost:8000/api/auth/login/
Content-Type: application/json

{
    "username": "testuser",
    "password": "testpass123"
}
```

### **Create Post**
```bash
POST http://localhost:8000/api/posts/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Form Data:
- title: "My Travel Adventure"
- content: "Amazing travel story..."
- location: "Paris, France"
- tags: "adventure, culture"
- image: [file] (optional)
```

### **Get Posts**
```bash
GET http://localhost:8000/api/public/posts/
```

### **Create Comment**
```bash
POST http://localhost:8000/api/posts/1/comments/
Authorization: Bearer <access_token>
Content-Type: application/json

{
    "content": "Great story! Thanks for sharing."
}
```

## 🔑 **Headers**

### **Authentication**
```
Authorization: Bearer <access_token>
```

### **Content Types**
```
Content-Type: application/json
Content-Type: multipart/form-data  # For file uploads
```

## 📊 **Response Status Codes**

| Code | Meaning |
|------|---------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `204` | No Content - Request successful, no response body |
| `400` | Bad Request - Invalid data |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Permission denied |
| `404` | Not Found - Resource not found |
| `500` | Internal Server Error - Server error |

## 🎯 **Quick Test Commands**

### **Using curl**

```bash
# Test server
curl http://localhost:8000/api/public/posts/

# Register user
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","password_confirm":"test123","email":"test@test.com"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'

# Create post (with token)
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Test content","location":"Test Location"}'
```

### **Using Python requests**

```python
import requests

BASE_URL = "http://localhost:8000/api"

# Register
response = requests.post(f"{BASE_URL}/auth/register/", json={
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123"
})

# Login
response = requests.post(f"{BASE_URL}/auth/login/", json={
    "username": "testuser",
    "password": "testpass123"
})

token = response.json()['access']

# Create post
headers = {"Authorization": f"Bearer {token}"}
response = requests.post(f"{BASE_URL}/posts/", 
    headers=headers,
    json={
        "title": "Test Post",
        "content": "Test content",
        "location": "Test Location"
    }
)
```

## ⚡ **Quick Setup Checklist**

- [ ] Django server running on port 8000
- [ ] Import Postman collection
- [ ] Set environment variables
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Save access token
- [ ] Test post creation
- [ ] Test post retrieval

## 🎉 **Success Indicators**

✅ All endpoints return expected status codes  
✅ JWT tokens work correctly  
✅ CRUD operations work for posts  
✅ File uploads work  
✅ Comments can be created  
✅ User profiles can be managed  

Your API is ready for production! 🚀
