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
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes
from rest_framework.parsers import FormParser, MultiPartParser


import json
import os

PROFILE_PIC_FOLDER = 'profile_pics/'


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
    profile = Profile.objects.get(pk=user.id)
    serialized_profile = ProfileSerializer(profile)
    print(serialized_profile.data)
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
        user = User.objects.create_user(username, email, password)
        return JsonResponse({"type": 'success',
                             "message": f'Account: {username} has been created.'})
    else:
        return JsonResponse({"type": 'error',
                             "message:": 'Username or Email already exists.'})


@parser_classes([FormParser, MultiPartParser])
@csrf_exempt
def editProfileView(request):
    print(request)
    # Grab Data and update database
    """
    profile = Profile.objects.filter(user_id=data['userID']).first()
    profile.user.email = data['email']
    profile.description = data['description']
    # saved file path, but need to create file too.
    path = PROFILE_PIC_FOLDER + os.path.basename(data['image'])
    profile.image = path
    print(path)
    """

    return JsonResponse({})


class profileView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({"username": request.user.username})
