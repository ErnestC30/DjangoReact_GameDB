from rest_framework import serializers
from games.models import Game, Genre, Comment


class GenreSerializer(serializers.ModelSerializer):
    """Serialize the genres in a list of Genre names to be stored into GameSerializer"""
    class Meta:
        model = Genre
        fields = ['name']


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for comments in a list of Comments to be stored into GameSerializer"""
    class Meta:
        model = Comment
        fields = "__all__"


class GameSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'image', 'thumbnail', 'description',
                  'developer', 'users_rating', 'num_of_rating', 'likes', 'genres', 'comments']
