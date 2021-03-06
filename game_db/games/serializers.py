from os import truncate
from rest_framework import serializers
from games.models import Game, Genre, Comment
from users.serializers import ProfileSerializer


class GenreSerializer(serializers.ModelSerializer):
    """Serializer for the genres in a list of Genre names to be stored into GameSerializer"""
    class Meta:
        model = Genre
        fields = ['name']


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for comments in a list of Comment to be stored into GameSerializer"""

    class Meta:
        model = Comment
        fields = "__all__"

    # Displays the entire Profile instance data instead of the ID for representation of author field
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['author'] = ProfileSerializer(instance.author).data
        return rep


class GameSerializer(serializers.ModelSerializer):
    """ Serializer for the Game instance including its comments and likes. """

    genres = GenreSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = ProfileSerializer(many=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'image', 'thumbnail', 'description',
                  'developer', 'users_rating', 'num_of_rating', 'likes', 'num_of_likes', 'genres', 'comments']
