from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path("csrf/", views.get_csrf, name="api-csrf"),
    path("login/", views.loginView, name="api-login"),
    path("logout/", views.logoutView, name="api-logout"),
    path("profile/", views.profileView.as_view(), name="api-profile"),
]
