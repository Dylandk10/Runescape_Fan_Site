from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.signup, name='signup'),
    path('signupuser', views.signupuser, name='signupuser'),
    path('logoutview', views.logout_view, name='logout'),
    path('login', views.login_view, name="login"),
    path('loginpage', views.login_page, name="loginpage"),
]
