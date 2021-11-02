#from game_db.users.models import Profile
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser

import json


def get_csrf(request):
    response = JsonResponse({"Info": "CSRF cookie set."})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def loginView(request):
    """Verifies login information and then authenticates user into Django system."""

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

    return JsonResponse(serialized_profile.data)


@require_POST
def logoutView(request):

    logout(request)
    return JsonResponse({'Info': 'User has been logged out.'})


@require_POST
def registerView(request):
    """ Validates user information and then creates a new User and Profile instance. """

    valid_user = True
    valid_email = True

    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email').lower()
    password = data.get('password')

    # Check if username or email is already taken.
    check_user = User.objects.filter(username=username).first()
    if check_user:
        valid_user = False

    check_email = User.objects.filter(email=email).first()
    if check_email:
        valid_email = False

    if valid_user and valid_email:
        user = User.objects.create_user(
            username=username, email=email, password=password)
        return JsonResponse({'alert': {"type": 'success',
                                       "message": f'Account: {username} has been created. Redirecting to login page.'}})
    else:
        if not valid_user:
            return JsonResponse({'alert': {"type": 'error',
                                           "message": 'Username already exists.'}})
        elif not valid_email:
            return JsonResponse({'alert': {"type": 'error',
                                           "message": 'Email already exists.'}})
        else:
            return JsonResponse({'alert': {"type": 'error',
                                           'message': 'An error has occured'}})


class editProfileView(APIView):
    """ Updates a user's Profile with new data. """

    permission_class = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format="json"):
        data = request.data
        userID = request.data.get('userID')
        profile = Profile.objects.get(user_id=userID)
        profile.description = data.get('description')
        if data.get('image'):
            profile.image = data.get('image')
        profile.save()

        user = User.objects.get(pk=userID)
        user.email = data.get('email')
        user.save()

        serializer = ProfileSerializer(profile)
        return JsonResponse(serializer.data)
