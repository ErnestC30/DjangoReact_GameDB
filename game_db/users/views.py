#from game_db.users.models import Profile
from django.http import JsonResponse
from django.middleware import csrf
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser


import json
import os


def get_csrf(request):
    response = JsonResponse({"Info": "CSRF cookie set."})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def loginView(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({"Info": "Username and Password is required."})

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"Info": "User does not exist"}, status=400)

    login(request, user)
    profile = Profile.objects.get(user_id=user.id)
    serialized_profile = ProfileSerializer(profile)
    print('User logged in')

    return JsonResponse(serialized_profile.data)


@require_POST
def logoutView(request):
    logout(request)
    print('User logged out')
    return JsonResponse({'Info': 'User has been logged out.'})


@require_POST
def registerView(request):
    valid_user = True
    valid_email = True

    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email').lower()
    password = data.get('password')

    check_user = User.objects.filter(username=username).first()
    if check_user:
        valid_user = False

    check_email = User.objects.filter(email=email).first()
    if check_email:
        valid_email = False

    if valid_user and valid_email:
        user = User.objects.create_user(
            username=username, email=email, password=password)
        return JsonResponse({"type": 'success',
                             "message": f'Account: {username} has been created.'})
    else:
        return JsonResponse({"type": 'error',
                             "message:": 'Username or Email already exists.'})


class editProfileView(APIView):
    permission_class = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format="json"):
        data = request.data
        print(data)
        userID = request.data.get('userID')
        profile = Profile.objects.get(user_id=userID)
        profile.description = data.get('description')
        if data.get('image'):
            profile.image = data.get('image')
        profile.save()

        user = User.objects.get(pk=userID)
        user.email = data.get('email')
        user.save()

        print('profile edited')
        serializer = ProfileSerializer(profile)
        return JsonResponse(serializer.data)


class profileView(APIView):
    # IS THIS EVEN USED? - MAYBE DELETABLE
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({"username": request.user.username})
