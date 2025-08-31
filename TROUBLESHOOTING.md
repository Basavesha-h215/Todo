# 🔧 Troubleshooting Guide

This guide helps you resolve common issues with the Travel Blog application.

## 🚨 Common Issues and Solutions

### 1. **400 Bad Request Errors**

**Problem:** Getting 400 errors when creating posts or registering users.

**Solutions:**
- ✅ **Fixed:** Updated API views to use correct serializers
- ✅ **Fixed:** Improved frontend API service to handle FormData properly
- ✅ **Fixed:** Added proper content-type handling

**Test:** Run `python test-api.py` to verify API functionality.

### 2. **CORS Errors**

**Problem:** Frontend can't communicate with backend due to CORS restrictions.

**Solutions:**
- Ensure Django server is running on port 8000
- Check CORS settings in `backend/travel_blog/settings.py`
- Verify frontend is running on port 3000

**Test:** Open browser console and check for CORS errors.

### 3. **JWT Token Issues**

**Problem:** Authentication tokens not working or expiring.

**Solutions:**
- Clear browser localStorage: `localStorage.clear()`
- Check token expiration settings in Django settings
- Ensure proper Authorization header format: `Bearer <token>`

**Test:** Try logging out and logging back in.

### 4. **Image Upload Issues**

**Problem:** Images not uploading or not displaying.

**Solutions:**
- Check media directory permissions
- Ensure Django media settings are configured
- Verify image file format (JPG, PNG, etc.)

**Test:** Try uploading a small test image.

### 5. **Database Issues**

**Problem:** Database errors or missing migrations.

**Solutions:**
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

**Test:** Check if admin panel is accessible at `http://localhost:8000/admin`

### 6. **Server Not Starting**

**Problem:** Django or React servers won't start.

**Solutions:**
- Check if ports 8000 and 3000 are available
- Ensure all dependencies are installed
- Check for syntax errors in code

**Test:** Run servers individually:
```bash
# Backend
cd backend
python manage.py runserver

# Frontend (in new terminal)
cd frontend
npm start
```

## 🧪 Testing Your Setup

### API Testing
Run the test script to verify all endpoints work:
```bash
python test-api.py
```

Expected output:
```
✅ Server is running - Status: 200
✅ Registration successful
✅ Login successful
✅ Post creation successful
✅ Retrieved X posts
```

### Frontend Testing
1. Open `http://localhost:3000`
2. Try registering a new user
3. Try logging in
4. Try creating a post
5. Check if posts appear on home page

### Backend Testing
1. Open `http://localhost:8000/admin`
2. Login with admin credentials (admin/admin123)
3. Check if posts and users are visible

## 🔍 Debugging Steps

### 1. Check Server Logs
Look at the terminal where Django is running for error messages.

### 2. Check Browser Console
Open browser developer tools and check for JavaScript errors.

### 3. Check Network Tab
In browser dev tools, check the Network tab for failed requests.

### 4. Test API Endpoints
Use tools like Postman or curl to test API endpoints directly:

```bash
# Test public posts endpoint
curl http://localhost:8000/api/public/posts/

# Test registration
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","password_confirm":"test123","email":"test@test.com"}'
```

## 🛠️ Quick Fixes

### Reset Everything
```bash
# Clear browser data
localStorage.clear()

# Restart servers
# Stop both servers (Ctrl+C) and restart them
```

### Reinstall Dependencies
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Reset Database
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

## 📞 Getting Help

If you're still having issues:

1. **Check the logs** - Look at server output for error messages
2. **Test step by step** - Use the test script to isolate the problem
3. **Check versions** - Ensure you're using compatible versions of Python and Node.js
4. **Restart servers** - Sometimes a simple restart fixes issues

## ✅ Verification Checklist

- [ ] Django server running on port 8000
- [ ] React server running on port 3000
- [ ] API test script passes all tests
- [ ] Can register new users
- [ ] Can login with existing users
- [ ] Can create posts
- [ ] Can view posts on home page
- [ ] Images upload correctly
- [ ] Admin panel accessible

If all items are checked, your application is working correctly! 🎉
