from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('signup/', views.signup),
    path('index/blog/', views.blog_view),
    path('submit_registration/', views.submit_registration, name='submit_registration'),
    path('submit_signin/', views.submit_signin, name='submit_signin'),
    path('signout/', views.signout, name='signout'),
    path('profile/', views.profile, name='profile'),
]


