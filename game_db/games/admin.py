from django.contrib import admin
from games.models import Game, Genre, Comment

admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Comment)
