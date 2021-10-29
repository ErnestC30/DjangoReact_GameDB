from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.files.base import ContentFile
from users.models import Profile

import os.path
from PIL import Image
from io import BytesIO

# 'manage.py loaddata sample_Files/genre.json' to load default genre tags into db

DEFAULT_GAME_IMAGE = "default_game_image.png"
DEFAULT_GAME_THUMBNAIL = "default_game_thumbnail.png"
THUMBNAIL_SIZE = (225, 300)


class Genre(models.Model):
    name = models.CharField(max_length=15, blank=False, unique=True)

    def __str__(self):
        return self.name


class Game(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(
        default=DEFAULT_GAME_IMAGE, upload_to='game_pics')
    thumbnail = models.ImageField(
        default=DEFAULT_GAME_THUMBNAIL, upload_to='thumbnail_pics')
    description = models.TextField(blank=True)
    developer = models.CharField(max_length=30, blank=False)
    users_rating = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    num_of_rating = models.IntegerField(default=0)
    likes = models.ManyToManyField(Profile, blank=True)
    num_of_likes = models.PositiveIntegerField(default=0)
    genres = models.ManyToManyField(Genre, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """Decrease the image size for game image."""

        # Only create thumbnail when creating initial Game instance.
        if self.thumbnail.name.endswith(DEFAULT_GAME_THUMBNAIL):
            if not self.make_thumbnail():
                raise Exception('Error creating thumbnail')

        # Round user rating score to nearest tenth.
        self.users_rating = round(self.users_rating, 1)

        super(Game, self).save(*args, **kwargs)

    def make_thumbnail(self):
        """Generate a thumbnail sized image from uploaded image and stores into thumbnail field."""
        img = Image.open(self.image)
        resized_img = img.resize(THUMBNAIL_SIZE, Image.ANTIALIAS)
        thumb_name, thumb_extension = os.path.splitext(self.image.name)
        thumb_extension = thumb_extension.lower()
        thumb_filename = thumb_name + '_thumb' + thumb_extension

        if thumb_extension in ['.jpg', 'jpeg']:
            FTYPE = 'JPEG'
        elif thumb_extension == '.png':
            FTYPE = 'PNG'
        else:
            return False

        temp_thumb = BytesIO()
        resized_img.save(temp_thumb, FTYPE)
        temp_thumb.seek(0)

        self.thumbnail.save(thumb_filename, ContentFile(
            temp_thumb.read()), save=False)
        temp_thumb.close()

        return True


class Comment(models.Model):
    comment = models.TextField()
    rating = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='comments')
    game = models.ForeignKey(
        Game, on_delete=models.CASCADE, related_name='comments')
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (f'Game: {self.game.title}, Author: {self.author.user.username}')
