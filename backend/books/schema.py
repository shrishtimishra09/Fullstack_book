import graphene
from graphene_django import DjangoObjectType
from .models import Book

class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = "__all__"

class Query(graphene.ObjectType):
    books = graphene.List(BookType, search=graphene.String(), first=graphene.Int(), skip=graphene.Int())
    book = graphene.Field(BookType, id=graphene.Int(required=True))

    def resolve_books(root, info, search=None, first=None, skip=None, **kwargs):
        qs = Book.objects.all()
        if search:
            qs = qs.filter(title__icontains=search)
        if skip:
            qs = qs[skip:]
        if first:
            qs = qs[:first]
        return qs

    def resolve_book(root, info, id):
        return Book.objects.get(pk=id)

class CreateBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)
        description = graphene.String(required=True)
        publish_year = graphene.Int(required=True)
        cover_image = graphene.String()

    def mutate(self, info, title, author, description, publish_year, cover_image=None):
        book = Book.objects.create(
            title=title,
            author=author,
            description=description,
            publish_year=publish_year,
            cover_image=cover_image,
        )
        return CreateBook(book=book)

class UpdateBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        author = graphene.String()
        description = graphene.String()
        publish_year = graphene.Int()
        cover_image = graphene.String()

    def mutate(self, info, id, **kwargs):
        book = Book.objects.get(pk=id)
        for key, value in kwargs.items():
            setattr(book, key, value)
        book.save()
        return UpdateBook(book=book)

class DeleteBook(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        Book.objects.get(pk=id).delete()
        return DeleteBook(ok=True)

class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()
    update_book = UpdateBook.Field()
    delete_book = DeleteBook.Field()
