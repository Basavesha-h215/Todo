from django.contrib import admin
from .models import Post, Comment

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'location', 'created_date')
    list_filter = ('created_date', 'author')
    search_fields = ('title', 'content', 'location')
    date_hierarchy = 'created_date'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content', 'author', 'post', 'created_date')
    list_filter = ('created_date', 'author')
    search_fields = ('content', 'author__username', 'post__title')
