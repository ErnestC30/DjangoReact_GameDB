from django.views.decorators import csrf
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from users.models import Profile
from .models import Game, Comment
from .serializers import CommentSerializer, GameSerializer

import json


@csrf_exempt
@require_POST
def postCommentView(request):
    """Creates a Comment instance into the database and returns the serialized data."""

    data = json.loads(request.body)
    rating = data.get('rating')
    comment = data.get('comment')

    author = Profile.objects.get(user_id=data.get('userID'))
    game = Game.objects.get(id=data.get('gameID'))

    # Error check to see if user already posted a review for the game (only one review for each user per game).
    comments_query = author.comments.all().filter(game=game)
    if len(comments_query) > 0:
        return JsonResponse({"alert": {'type': 'error',
                                       'message': 'You have already posted a comment. Delete or edit the existing comment.'}})

    # Create a new Comment object.
    else:
        new_comment = Comment.objects.create(
            rating=rating, comment=comment, author=author, game=game)

        # Update number of rating and average user rating value for the game.
        # Change in average user's rating: new_average = average + ((value - average) / num_values)
        game.num_of_rating += 1
        game.users_rating = float(game.users_rating) + (
            (float(new_comment.rating) - float(game.users_rating)) / float(game.num_of_rating))
        game.save()
        game_serializer = GameSerializer(game)

        # Return serialized data for comment and game.
        comment_serializer = CommentSerializer(new_comment)
        return JsonResponse({"alert": {'type': 'success',
                                       'message': 'Your comment has been added.'},
                             "comment": comment_serializer.data,
                             "game": game_serializer.data})


@csrf_exempt
@require_POST
def postDeleteCommentView(request):
    """Deletes a Comment instance and updates the Game's rating."""

    comment_id = json.loads(request.body)
    comment = Comment.objects.get(pk=comment_id)
    game = comment.game

    # Change in average user's rating: new_average = ((average * num_values) - value) / (num_values - 1)
    game.num_of_rating -= 1
    game.users_rating = ((float(game.users_rating) * float(game.num_of_rating)) -
                         float(comment.rating)) / (float(game.num_of_rating - 1))
    game.save()
    game_serializer = GameSerializer(game)
    comment.delete()

    return JsonResponse({"alert": {'type': 'success',
                                   'message': 'Your comment has been deleted.'},
                         "commentID": comment_id,
                         "game": game_serializer.data})


@csrf_exempt
@require_POST
def postEditCommentView(request):
    """Edits an existing comment and updates the Game rating."""

    data = json.loads(request.body)
    new_rating = data['newRating']
    old_rating = data['oldRating']
    new_comment = data['comment']

    comment = Comment.objects.get(pk=data['commentID'])
    game = comment.game

    # Calculate the new average user rating: new_average = average + ((new_value - old_value) / num_values )
    game.users_rating = float(game.users_rating) + \
        ((float(new_rating) - float(old_rating)) / float(game.num_of_rating))
    comment.rating = new_rating
    comment.comment = new_comment
    comment.save()
    game.save()
    game_serializer = GameSerializer(game)

    return JsonResponse({"alert": {'type': 'success',
                                   'message': 'Your comment has been edited.'},
                         "commentContent": new_comment,
                         "commentRating": new_rating,
                         "game": game_serializer.data})


@csrf_exempt
@require_POST
def postAddLikeView(request):
    """Add a user's Profile into the Game's 'likes' list."""

    data = json.loads(request.body)
    user_id = data.get('userID')
    game_id = data.get('gameID')

    profile = Profile.objects.get(user_id=user_id)
    game = Game.objects.get(id=game_id)
    game.likes.add(profile)
    game.num_of_likes += 1
    game.save()

    return JsonResponse(
        {
            'alert': {'type': 'success',
                      'message': 'You have added this game to your likes list.'},
            'gameID': game_id,
            'gameTitle': game.title
        })


@csrf_exempt
@require_POST
def postRemoveLikeView(request):
    """Remove user's Profile from the Game's 'likes' list."""

    data = json.loads(request.body)
    user_id = data.get('userID')
    game_id = data.get('gameID')

    profile = Profile.objects.get(user_id=user_id)
    game = Game.objects.get(id=game_id)
    game.likes.remove(profile)
    game.num_of_likes -= 1
    game.save()

    return JsonResponse({
        'alert': {'type': 'success',
                  'message': 'You have removed this game from your likes list.'},
        'gameID': game_id,
        'gameTitle': game.title
    })


@csrf_exempt
@require_POST
def getUserLikesView(request):
    """Returns a serialized list of games that a user has liked."""

    data = json.loads(request.body)
    likes_list = data.get('likes')

    filtered_query = Game.objects.filter(title__in=likes_list)
    serializer = GameSerializer(filtered_query, many=True)

    return JsonResponse({'games_list': serializer.data})
