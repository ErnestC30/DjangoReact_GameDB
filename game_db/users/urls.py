from django.urls import path
from rest_framework import routers
from .api import ProfileViewSet
from . import views

app_name = 'users'

router = routers.DefaultRouter()
router.register("profile", ProfileViewSet, 'api-profiles')

urlpatterns = [
    path("csrf/", views.get_csrf, name="api-csrf"),
    path("login/", views.loginView, name="api-login"),
    path("logout/", views.logoutView, name="api-logout"),
    path("register/", views.registerView, name="api-register"),
    path("edit_profile/", views.editProfileView, name="api-edit-profile"),
]

urlpatterns += router.urls
