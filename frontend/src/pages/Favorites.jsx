import { useState } from "react";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFavorite = (book) => {
    const updated = favorites.filter((f) => f.id !== book.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center sm:text-left mb-4 sm:mb-0">
            ⭐ My Favorites ({favorites.length})
          </h1>
          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="px-5 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
            >
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <p className="text-gray-500 text-lg mb-6 text-center">
              You have no favorite books yet. <br />
              Start adding some from the search page!
            </p>
            <img
              src="/assets/empty-books.svg"
              alt="No favorites"
              className="w-64 opacity-70"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onFavorite={removeFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
