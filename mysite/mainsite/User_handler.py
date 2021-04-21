#handles user creation and updates and deletes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


from .models import PlayerVoted
#overrides the forms since i choose to use boot strap and dont want to use crispy
class User_handler:
    #move two four attributes not to override the main schema and no need for last/first name
    def create_user(username, email, password, first_name, last_name):
        #add user to database
        user = User.objects.create_user(username, email, password)

        #create the vote table with the user
        userVote = PlayerVoted.objects.create(username=username, voted=False)

        #check for username
    def check_username(username_given):
        if User.objects.filter(username=username_given).exists():
            return True
        return False

    #check for email
    def check_email(emailcheck):
        if User.objects.filter(email=emailcheck).exists():
            return True
        return False

    def authenticate_user(username_given, password_given):
        user = authenticate(username=username_given, password=password_given)
        return user

    #log in
    def login_user(request, user):
        login(request, user)

    #log out
    def logout_now(request):
        logout(request)

    #direct log in
    def login_now(request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        flag = False
        if user is not None:
            login(request, user)
            flag = True
        return flag

    def has_user_voted(username):
        player = PlayerVoted.objects.get(username=username)
        if player.voted == True:
            return True
        else:
            return False
