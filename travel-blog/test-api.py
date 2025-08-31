#!/usr/bin/env python3
"""
Simple API test script for the Travel Blog API
Run this script to test the API endpoints
"""

import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_api():
    print("🌍 Testing Travel Blog API")
    print("=" * 50)
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/public/posts/")
        print(f"✅ Server is running - Status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running. Please start the Django server first.")
        return
    
    # Test 2: Test registration
    print("\n📝 Testing Registration...")
    register_data = {
        "username": "testuser2",
        "email": "test2@example.com",
        "password": "testpass123",
        "password_confirm": "testpass123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", json=register_data)
        if response.status_code == 201:
            print("✅ Registration successful")
            user_data = response.json()
            access_token = user_data['access']
            print(f"   Access token: {access_token[:20]}...")
        else:
            print(f"❌ Registration failed - Status: {response.status_code}")
            print(f"   Response: {response.text}")
            return
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return
    
    # Test 3: Test login
    print("\n🔐 Testing Login...")
    login_data = {
        "username": "testuser2",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
        if response.status_code == 200:
            print("✅ Login successful")
            login_data = response.json()
            access_token = login_data['access']
            print(f"   Access token: {access_token[:20]}...")
        else:
            print(f"❌ Login failed - Status: {response.status_code}")
            print(f"   Response: {response.text}")
            return
    except Exception as e:
        print(f"❌ Login error: {e}")
        return
    
    # Test 4: Test creating a post
    print("\n📝 Testing Post Creation...")
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    post_data = {
        "title": "Test Travel Post",
        "content": "This is a test travel post content.",
        "location": "Test Location",
        "tags": "test, travel, adventure"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/posts/", json=post_data, headers=headers)
        if response.status_code == 201:
            print("✅ Post creation successful")
            post_response = response.json()
            print(f"   Post ID: {post_response['id']}")
            print(f"   Title: {post_response['title']}")
        else:
            print(f"❌ Post creation failed - Status: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Post creation error: {e}")
    
    # Test 5: Test getting posts
    print("\n📖 Testing Get Posts...")
    try:
        response = requests.get(f"{BASE_URL}/public/posts/")
        if response.status_code == 200:
            posts = response.json()
            print(f"✅ Retrieved {len(posts)} posts")
            for post in posts:
                print(f"   - {post['title']} by {post['author']['username']}")
        else:
            print(f"❌ Get posts failed - Status: {response.status_code}")
    except Exception as e:
        print(f"❌ Get posts error: {e}")
    
    print("\n🎉 API testing completed!")

if __name__ == "__main__":
    test_api()
