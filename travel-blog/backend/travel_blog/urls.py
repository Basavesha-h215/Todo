"""travel_blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import FileResponse
from api.views import ReactAppView

def serve_react_app(request):
    return render(request, 'index.html')

def serve_static_file(request, file_path):
    """Serve static files directly"""
    import os
    static_dir = os.path.join(settings.BASE_DIR, 'static')
    file_location = os.path.join(static_dir, file_path)
    
    if os.path.exists(file_location):
        return FileResponse(open(file_location, 'rb'))
    else:
        # Try alternative location
        alt_location = os.path.join(static_dir, 'static', file_path)
        if os.path.exists(alt_location):
            return FileResponse(open(alt_location, 'rb'))
        else:
            from django.http import Http404
            raise Http404("File not found")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # Serve static files directly
    path('static/<path:file_path>', serve_static_file),
    # Serve React app for all other routes
    path('', serve_react_app),
]

# Serve media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
