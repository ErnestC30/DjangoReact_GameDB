from rest_framework import serializers
from users.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile 
        fields = ['username', 'email', 'first_name', 'last_name', 'description', 'image']