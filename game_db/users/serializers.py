from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'id']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    # __all__ in fields seems to cause error with profile edit?
    class Meta:
        model = Profile
        fields = ['user', 'description', 'image', 'user_id']
