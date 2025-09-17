from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    publish_year = models.IntegerField()
    cover_image = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} by {self.author}"
