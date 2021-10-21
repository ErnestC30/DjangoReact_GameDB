from rest_framework import routers
from django.urls import path
from .api import GameViewSet
from . import views
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()

router.register('games', GameViewSet, 'game-list-display')

urlpatterns = [
    path("api/add_comment/", views.postCommentView, name='add-comment'),
    path("api/like_game/", views.postLikeView, name="like-game"), ]

urlpatterns += router.urls
