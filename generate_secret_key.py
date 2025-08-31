#!/usr/bin/env python3
"""
Generate a Django secret key for production use.
Run this script to get a secure secret key for your Django application.
"""

from django.core.management.utils import get_random_secret_key

def generate_secret_key():
    """Generate a new Django secret key."""
    secret_key = get_random_secret_key()
    print("🔐 Generated Django Secret Key:")
    print("=" * 50)
    print(secret_key)
    print("=" * 50)
    print("\n📝 Copy this key and use it as your SECRET_KEY environment variable in Render.")
    print("⚠️  Keep this key secret and never commit it to version control!")
    
    return secret_key

if __name__ == "__main__":
    generate_secret_key()
