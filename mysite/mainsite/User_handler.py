#handles user creation and updates and deletes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

class User_handler:
    def create_user(username, email, password, first_name, last_name):
        #add user to database
        user = User.objects.create_user(username, email, password, first_name, last_name, voted=False)

        #check for username
    def check_username(username_given):
        try:
            username_valid = User.objects.get(username=username_given)
        except User.DoesNotExist:
            username_valid = None

        if username_valid:
            return True
        else:
            return False

    #check for email
    def check_email(emailcheck):
        try:
            email_valid = User.objects.get(email=emailcheck)
        except User.DoesNotExist:
            email_valid = None
            
        if email_valid:
            return True
        else:
            return False

    def authenticate_user(username_given, password_given):
        user = authenticate(username=username_given, password=password_given)
        return user

    def login(request, user):
        login(request, user)
