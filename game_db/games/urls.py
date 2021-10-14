from rest_framework import routers
from django.urls import path
from .api import GameViewSet
from . import views

router = routers.DefaultRouter()

router.register('games', GameViewSet, 'game-list-display')

urlpatterns = [path("add_comment/", views.postCommentView, name='add-comment')]

urlpatterns += router.urls
