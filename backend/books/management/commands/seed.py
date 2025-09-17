from django.core.management.base import BaseCommand
from books.models import Book

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        books = [
            {"title": "1984", "author": "George Orwell", "description": "Dystopian classic", "publish_year": 1949},
            {"title": "The Alchemist", "author": "Paulo Coelho", "description": "A journey of self-discovery", "publish_year": 1988},
            {"title": "To Kill a Mockingbird", "author": "Harper Lee", "description": "Classic on justice and race", "publish_year": 1960},
            {"title": "Pride and Prejudice", "author": "Jane Austen", "description": "Romantic classic", "publish_year": 1813},
            {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "description": "The roaring twenties", "publish_year": 1925},
        ]
        for b in books:
            Book.objects.get_or_create(**b)
        self.stdout.write(self.style.SUCCESS(" Seeded books successfully!"))
