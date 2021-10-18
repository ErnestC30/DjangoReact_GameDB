from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from users.models import Profile
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
    author = Profile.objects.get(user_id=data.get('userID'))
    game = Game.objects.get(id=data.get('gameID'))

    # Error Check to see if user already posted a review for the game (only one review per game).
    comments_query = author.comments.all().filter(game=game)
    if len(comments_query) > 0:
        return JsonResponse({'error': 'user has already posted once.'})

    # Create new Comment object
    else:
        new_comment = Comment.objects.create(
            rating=rating, comment=comment, author=author, game=game)

        # # Also update game rating/num rating field?

        # Return serialized data
        serializer = CommentSerializer(new_comment)
        return JsonResponse({"comment": serializer.data})
