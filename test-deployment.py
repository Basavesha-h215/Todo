#!/usr/bin/env python3
"""
Comprehensive Testing Script for Travel Blog Deployment
Tests all functionality including authentication, API endpoints, and frontend
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "https://travel-blog-1nvr.onrender.com"
API_BASE_URL = f"{BASE_URL}/api"

def print_test_result(test_name, success, message=""):
    """Print test result with formatting"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} {test_name}")
    if message:
        print(f"   {message}")
    print()

def test_frontend_access():
    """Test if the frontend loads correctly"""
    print("🌐 Testing Frontend Access...")
    
    try:
        response = requests.get(BASE_URL, timeout=10)
        success = response.status_code == 200
        message = f"Status: {response.status_code}"
        
        if success:
            # Check if React app is loaded
            if "TravelBlog" in response.text and "root" in response.text:
                message += " - React app detected"
            else:
                success = False
                message += " - React app not found"
        
        print_test_result("Frontend Loads", success, message)
        return success
    except Exception as e:
        print_test_result("Frontend Loads", False, f"Error: {str(e)}")
        return False

def test_static_files():
    """Test if static files are served correctly"""
    print("📁 Testing Static Files...")
    
    static_files = [
        "/favicon.ico",
        "/manifest.json", 
        "/logo192.png",
        "/static/js/main.f5166ca9.js",
        "/static/css/main.e6c13ad2.css"
    ]
    
    all_success = True
    for file_path in static_files:
        try:
            response = requests.get(f"{BASE_URL}{file_path}", timeout=10)
            success = response.status_code == 200 and len(response.content) > 0
            message = f"{file_path} - Status: {response.status_code}, Size: {len(response.content)} bytes"
            
            if not success:
                all_success = False
                
            print_test_result(f"Static File: {file_path}", success, message)
        except Exception as e:
            all_success = False
            print_test_result(f"Static File: {file_path}", False, f"Error: {str(e)}")
    
    return all_success

def test_api_endpoints():
    """Test API endpoints"""
    print("🔌 Testing API Endpoints...")
    
    # Test API health
    try:
        response = requests.get(f"{API_BASE_URL}/posts/", timeout=10)
        success = response.status_code in [200, 401]  # 401 is expected without auth
        message = f"Posts endpoint - Status: {response.status_code}"
        print_test_result("API Posts Endpoint", success, message)
    except Exception as e:
        print_test_result("API Posts Endpoint", False, f"Error: {str(e)}")

def test_user_registration():
    """Test user registration"""
    print("👤 Testing User Registration...")
    
    # Generate unique username
    timestamp = int(time.time())
    username = f"testuser{timestamp}"
    email = f"test{timestamp}@example.com"
    password = "testpass123"
    
    registration_data = {
        "username": username,
        "email": email,
        "password": password,
        "password_confirm": password
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/auth/register/",
            json=registration_data,
            timeout=10
        )
        
        success = response.status_code == 201
        message = f"Registration - Status: {response.status_code}"
        
        if success:
            message += f" - User: {username}"
            # Store credentials for login test
            return username, password, success
        else:
            message += f" - Response: {response.text[:100]}"
            
        print_test_result("User Registration", success, message)
        return username, password, success
    except Exception as e:
        print_test_result("User Registration", False, f"Error: {str(e)}")
        return None, None, False

def test_user_login(username, password):
    """Test user login"""
    print("🔐 Testing User Login...")
    
    if not username or not password:
        print_test_result("User Login", False, "No credentials available")
        return None
    
    login_data = {
        "username": username,
        "password": password
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/auth/login/",
            json=login_data,
            timeout=10
        )
        
        success = response.status_code == 200
        message = f"Login - Status: {response.status_code}"
        
        if success:
            data = response.json()
            if 'access' in data and 'refresh' in data:
                message += " - Tokens received"
                print_test_result("User Login", success, message)
                return data['access']
            else:
                success = False
                message += " - No tokens in response"
        else:
            message += f" - Response: {response.text[:100]}"
            
        print_test_result("User Login", success, message)
        return None
    except Exception as e:
        print_test_result("User Login", False, f"Error: {str(e)}")
        return None

def test_create_post(access_token):
    """Test creating a post"""
    print("📝 Testing Post Creation...")
    
    if not access_token:
        print_test_result("Post Creation", False, "No access token available")
        return False
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    post_data = {
        "title": "Test Travel Post",
        "content": "This is a test travel post created during deployment testing.",
        "location": "Test Location"
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/posts/",
            json=post_data,
            headers=headers,
            timeout=10
        )
        
        success = response.status_code == 201
        message = f"Post Creation - Status: {response.status_code}"
        
        if success:
            data = response.json()
            message += f" - Post ID: {data.get('id', 'N/A')}"
        else:
            message += f" - Response: {response.text[:100]}"
            
        print_test_result("Post Creation", success, message)
        return success
    except Exception as e:
        print_test_result("Post Creation", False, f"Error: {str(e)}")
        return False

def test_get_posts():
    """Test getting posts"""
    print("📖 Testing Get Posts...")
    
    try:
        response = requests.get(f"{API_BASE_URL}/posts/", timeout=10)
        success = response.status_code == 200
        message = f"Get Posts - Status: {response.status_code}"
        
        if success:
            data = response.json()
            message += f" - Posts count: {len(data)}"
        else:
            message += f" - Response: {response.text[:100]}"
            
        print_test_result("Get Posts", success, message)
        return success
    except Exception as e:
        print_test_result("Get Posts", False, f"Error: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("🚀 Travel Blog Deployment Testing")
    print("=" * 50)
    print(f"Testing URL: {BASE_URL}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Test results
    results = {}
    
    # Frontend tests
    results['frontend'] = test_frontend_access()
    results['static_files'] = test_static_files()
    
    # API tests
    test_api_endpoints()
    
    # Authentication tests
    username, password, reg_success = test_user_registration()
    results['registration'] = reg_success
    
    if reg_success:
        access_token = test_user_login(username, password)
        results['login'] = access_token is not None
        
        if access_token:
            results['create_post'] = test_create_post(access_token)
    
    # Public API tests
    results['get_posts'] = test_get_posts()
    
    # Summary
    print("📊 Test Summary")
    print("=" * 50)
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name.replace('_', ' ').title()}")
    
    print()
    print(f"Overall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed! Your Travel Blog is working perfectly!")
    else:
        print("⚠️  Some tests failed. Check the deployment logs for issues.")
    
    print()
    print("🌐 Your Travel Blog is available at:")
    print(f"   {BASE_URL}")
    print()
    print("📱 Features to test manually:")
    print("   - Login/Register forms")
    print("   - Create new travel posts")
    print("   - View existing posts")
    print("   - Modern UI responsiveness")

if __name__ == "__main__":
    main()
