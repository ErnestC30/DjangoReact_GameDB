from users.models import Profile 
from rest_framework import viewsets, permissions 
from users.serializers import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfileSerializer