from django.db import models
from users.models import Profile
from django.core.validators import MinValueValidator, MaxValueValidator

#'manage.py loaddata sample_Files/genre.json' to load default tags into db
class Genre(models.Model):
    name = models.CharField(max_length=15, blank=False, unique=True)

    def __str__(self):
        return self.name

class Game(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    developer = models.CharField(max_length=30, blank=False) 
    users_rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    num_of_rating = models.IntegerField(default=0)
    likes = models.ManyToManyField(Profile, blank=True)
    genres = models.ManyToManyField(Genre, blank=True)

    def __str__(self):
        return self.title


#Add Review Object Many-To-One with Game and Profile