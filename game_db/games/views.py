from django.views.decorators import csrf
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Game, Comment
from .serializers import CommentSerializer


import json


@csrf_exempt
@require_POST
def postCommentView(request):
    """Creates a Comment object into the database and returns the serialized data."""
    data = json.loads(request.body)

    rating = data.get('rating')
    comment = data.get('comment')
    author = User.objects.get(id=data.get('userID'))
    game = Game.objects.get(id=data.get('gameID'))

    new_comment = Comment.objects.create(
        rating=rating, comment=comment, author=author, game=game)

    # Also update game rating/num rating field?

    # Return serialized data
    serializer = CommentSerializer(new_comment)
    return JsonResponse({"comment": serializer.data})
