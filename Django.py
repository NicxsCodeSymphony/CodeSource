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
11. Generate simple html code and this <title>{% block title %}Django App {% endblock %}</title> <div class="container">{% block content %} {% endblock %}</div>
12. Add another HTML FILE home.html

{% extends "base.html" %} {% block title %} Home Page {% endblock %}
{% block content %}
<p>This is the home page</p>
{% endblock %}

# RENDER THE TEMPLATES
# GO TO views.py from myapp folder

def home(request):
    return render(request, "home.html")

# ADDING DATABASES
# GO TO models.py on myapp folder

class TodoItems(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

# Go to admin.py

from django.contrib import admin
from .models import TodoItems
# Register your models here.

admin.site.register(TodoItems)

# MIGRATION (Everytime we make a change to your database modules we will make a migration)

13. python manage.py makemigrations
14. python manage.py migrate

# Make another view
15. make a template todos.html

{% extends "base.html" %} {% block content %}
<h1>Todo List</h1>
<ul>
    {% for todo in todos %}
    <li>
        {{ todo.title }}: {% if todo.completed %} Completed{% else %} Not Completed{% endif %}
    </li>
    {% endfor %}
</ul>
{% endblock %}

# When using a variable use double curly braces {{}}

# GO TO views

from django.shortcuts import render, HttpResponse
from .models import TodoItems

# Create your views here.
def home(request):
    return render(request, "home.html")

def todos(request):
    items = TodoItems.objects.all()
    return render(request, "todos.html", {"todos": items})

# Create a URL

# ADMIN PANEL

13. In the terminal type python manage.py createsuperuser

14. To access django dashboard, run server and add /admin










  
