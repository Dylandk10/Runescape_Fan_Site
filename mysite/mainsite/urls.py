from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.signup, name='signup'),
    path('signupuser', views.signupuser, name='signupuser'),
    path('logoutview', views.logout_view, name='logout'),
    path('login', views.login_view, name="login"),
    path('loginpage', views.login_page, name="loginpage"),
    path('loging', views.loging_in_page, name='loging'),
    path('gamebreak', views.gamebreak, name='gamebreak'),
    path('searchplayer', views.search_player_view, name='searchplayer'),
    path('searchplayerstats', views.search_player_stats, name='searchplayerstats'),
    path('searchitemview', views.search_item_view, name="searchitemview"),
    path('searchitem', views.search_for_item, name='searchitem'),
]
