from django.shortcuts import render
from django.contrib.auth.models import User

from .User_handler import User_handler
# Create your views here.

#home page
def index(request):
    return render(request, 'mainsite/index.html')

#https://docs.djangoproject.com/en/3.1/topics/auth/default/
#use this to make login and auth

def signup(request):
    return render(request, 'mainsite/signup.html')

def sign_up_user(request):
    username = request.POST['username']
    password = request.POST['password']
    email = request.POST['email']
    first_name = request.POST['first_name']
    last_name = request.POST['last_name']

    flag = False
    error = None
    #check is username or email is in use
    if username == User_handler.check_username(username):
        flag = True
        error = 'username'
    elif email == User_handler.check_email(email):
        flag = True
        error = 'email'
    else:
        User_handler.create_user(username, email, password, first_name, last_name)
        user = User_handler.authenticate_user(username, password)

        if user is not None:
            User_handler.login(request, user)

    content = {
        'error_send': error
    }

    if flag:
        return render(request, 'mainsite/signup.html', content)
    else:
        return render(request, 'mainsite/index.html')
