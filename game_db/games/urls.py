from rest_framework import routers
from .api import GameViewSet

router = routers.DefaultRouter()

router.register('games', GameViewSet, 'game-list-display')

urlpatterns = router.urls
