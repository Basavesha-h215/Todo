from django.urls import path
from .views import (
    RegisterView, LoginView, UserProfileView, PostListView, 
    PostDetailView, CommentCreateView, public_posts
)

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
    
    # Post endpoints
    path('posts/', PostListView.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/comments/', CommentCreateView.as_view(), name='comment-create'),
    
    # Public endpoints
    path('public/posts/', public_posts, name='public-posts'),
]
