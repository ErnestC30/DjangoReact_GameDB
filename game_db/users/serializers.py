from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'id']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes = serializers.SerializerMethodField('get_user_likes')

    # Get list of user's favorited games.
    def get_user_likes(self, obj):
        likes_list = []
        likes_query_set = obj.game_set.all()
        for game in likes_query_set:
            likes_list.append(game.title)
        return likes_list

    # __all__ in fields seems to cause error with profile edit?
    class Meta:
        model = Profile
        fields = ['user', 'description', 'image', 'user_id', 'likes']
