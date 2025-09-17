import BookCard from "../components/BookCard";

export default function BookList({ books, onFavorite, favorites = [] }) {
  if (!books || books.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No books found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onFavorite={onFavorite}
          isFavorite={favorites.some((f) => f.id === book.id)}
        />
      ))}
    </div>
  );
}
