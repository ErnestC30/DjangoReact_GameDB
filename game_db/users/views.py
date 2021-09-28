from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login

import json


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
    return JsonResponse({"Info": "User has been logged in."})
