from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'id']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    # added user_id -> check for error
    class Meta:
        model = Profile
        #fields = ['user', 'description', 'image', 'user_id']
        fields = '__all__'
