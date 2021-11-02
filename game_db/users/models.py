from django.db import models
from django.db.models.fields.related import OneToOneField
from django.contrib.auth.models import User
from PIL import Image

DEFAULT_PROFILE_IMAGE = "default_profile_pic.jpg"
MAX_HEIGHT = 300
MAX_WIDTH = 300


class Profile(models.Model):
    """Extension of default User model.
       Adds a profile image and description."""

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        default=DEFAULT_PROFILE_IMAGE, upload_to='profile_pics')
    description = models.TextField(default='Add description here.')

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        """Resize the image size for user profile."""

        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > MAX_HEIGHT or img.width > MAX_WIDTH:
            output_size = (MAX_HEIGHT, MAX_WIDTH)
            img.thumbnail(output_size)
            img.save(self.image.path)
