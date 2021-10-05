from rest_framework.generics import get_object_or_404
from django.contrib.auth.models import User
from users.models import Profile
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfileSerializer

    # Returns the ProfileSerializer data from a given username.
    def retrieve(self, request, *args, **kwargs):
        username = kwargs['pk']
        user_query = User.objects.filter(username=username).first()
        query = Profile.objects.filter(user=user_query).first()
        # Context needed to generate full image URL
        serializer = ProfileSerializer(query, context={'request': request})
        return Response(serializer.data)
