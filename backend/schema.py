import graphene
from graphene_django import DjangoObjectType
from .books.models import Book
from django.core.paginator import Paginator
class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = ("id", "title", "author", "description", "publish_year", "cover_image")
class Query(graphene.ObjectType):
    books = graphene.List(
        BookType,
        search=graphene.String(),
        page=graphene.Int(),
        page_size=graphene.Int()
    )
    book = graphene.Field(BookType, id=graphene.ID(required=True))

    def resolve_books(self, info, search=None, page=1, page_size=5, **kwargs):
        qs = Book.objects.all().order_by("id")

        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(author__icontains=search)

        paginator = Paginator(qs, page_size)
        return paginator.get_page(page).object_list

    def resolve_book(self, info, id):
        return Book.objects.get(pk=id)
class CreateBook(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)
        description = graphene.String(required=True)
        publish_year = graphene.Int(required=True)
        cover_image = graphene.String(required=False)

    book = graphene.Field(BookType)

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
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        author = graphene.String()
        description = graphene.String()
        publish_year = graphene.Int()
        cover_image = graphene.String()

    book = graphene.Field(BookType)

    def mutate(self, info, id, **kwargs):
        book = Book.objects.get(pk=id)
        for field, value in kwargs.items():
            setattr(book, field, value)
        book.save()
        return UpdateBook(book=book)


class DeleteBook(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        Book.objects.get(pk=id).delete()
        return DeleteBook(success=True)


class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()
    update_book = UpdateBook.Field()
    delete_book = DeleteBook.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
