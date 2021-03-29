from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse

from .User_handler import User_handler
from .OSRSAPIHandler import OSRS_API_handler
# Create your views here.

#home page
def index(request):
    return render(request, 'mainsite/index.html')

#https://docs.djangoproject.com/en/3.1/topics/auth/default/
#use this to make login and auth

#sign up user page
def signup(request):
    return render(request, 'mainsite/signup.html')

#sign up user
def signupuser(request):
    username = request.POST['username']
    password = request.POST['password']
    email = request.POST['email']
    first_name = request.POST['first_name']
    last_name = request.POST['last_name']

    flag = False
    error = None
    #check is username or email is in use
    if User_handler.check_username(username):
        flag = True
        error = 'Username'
    elif User_handler.check_email(email):
        flag = True
        error = 'Email'
    #make sure fields are not empty
    elif username == None or password == None or email == None or first_name == None or last_name == None:
        flag = True
        error = 'Blank form'
    else:
        User_handler.create_user(username, email, password, first_name, last_name)
        user = User_handler.authenticate_user(username, password)

        if user is not None:
            User_handler.login_user(request, user)

    #context for errors
    context = {
        'flag': flag,
        'error': error
    }

    #rendering
    if flag:
        return render(request, 'mainsite/signup.html', context)
    else:
        return render(request, 'mainsite/index.html')

#log out function
def logout_view(request):
    User_handler.logout_now(request)
    return render(request, 'mainsite/logingout.html')

#login method to log user in
def login_view(request):
    flag = User_handler.login_now(request)
    if flag:
        return render(request, 'mainsite/loging.html')
    else:
        return render(request, 'mainsite/login.html', {'error': 'Invalid Information'})

#page view for login
def login_page(request):
    return render(request, 'mainsite/login.html')

#page display for loggin in
def loging_in_page(request):
    return render(request, 'mainsite/loging.html')

def gamebreak(request):
    return render(request, 'mainsite/gamebreak.html')

def search_player_view(request):
    return render(request, 'mainsite/searchplayer.html')

def search_player_stats(request):
    username = list(request.GET.values())[0]
    if OSRS_API_handler.lookup_player(username):
        data = OSRS_API_handler.get_player_stats(username)
        return JsonResponse(data, safe=False)
    else:
        data = {}
        return JsonResponse(data, safe=False)
