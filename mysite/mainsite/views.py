from django.shortcuts import render

# Create your views here.

#home page
def index(request):
    return render(request, 'mainsite/index.html')

#https://docs.djangoproject.com/en/3.1/topics/auth/default/
#use this to make login and auth 
