DOWNLOADING PROJECTS

1. pip install django
2. django-admin startproject demo
3. cd directory
4. python manage.py startapp myapp

# Go to demo folder and then settings.py

5. add "myapp" from INSTALLED APPS
6. create new file urls.py on myapp folder

# Go to views.py from myapp folder

7. add from django.shortcuts import render, HttpResponse

def home(request):
    return HttpResponse("hello world)

# SAME FOLDER myapp go to urls.py

from django.urls import path
from . import views

urlpatterns = [
  path("", views.home, name="home")
]


# GO TO DEMO FOLDER and then urls.py

from django.contrib import admin
from django.urls import path, include

urlpattern = [
  path('admin/', admin.site.urls),
  path("", include("myapp.urls"))
]


# Run the Server
8. python manage.py runserver

# Adding Templates

9. Create a folder to myapp and name it templates
10. create a file base.html to templates folder
11. Generate simple html code and this <title>{% block title %}Django App {% endBlock %}</title> <div class="container">{% block content %} {% endBlock %}</div>
12. 
  
