import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { fetchGraphQL } from "../utils/graphql";
import { addBook, updateBook, deleteBook } from "../utils/bookActions";
export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    publishYear: "",
    coverImage: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    const query = `
      query {
        books {
          id
          title
          author
          publishYear
          description
          coverImage
        }
      }
    `;
    try {
      const data = await fetchGraphQL(query);
      if (data && data.books) setBooks(data.books);
      else setBooks([]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again.");
      setLoading(false);
    }
  };

  const toggleFavorite = (book) => {
    let updated;
    if (favorites.find((f) => f.id === book.id)) {
      updated = favorites.filter((f) => f.id !== book.id);
    } else {
      updated = [...favorites, book];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      let savedBook;
      if (editingBook) {
        savedBook = await updateBook(editingBook.id, formData);
        setBooks(books.map((b) => (b.id === savedBook.id ? savedBook : b)));
        setFavorites(favorites.map((f) => (f.id === savedBook.id ? savedBook : f)));
      } else {
        savedBook = await addBook({ ...formData, publishYear: Number(formData.publishYear) });
        setBooks([savedBook, ...books]);
      }
      closeForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await deleteBook(id);
      if (success) {
        setBooks(books.filter((b) => b.id !== id));
        setFavorites(favorites.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openForm = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description || "",
        publishYear: book.publishYear,
        coverImage: book.coverImage || "",
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: "",
        author: "",
        description: "",
        publishYear: "",
        coverImage: "",
      });
    }
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-900 text-center">
          📚 Explore Your Next Favorite Book
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => openForm()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
          >
            + Add New Book
          </button>
        </div>

        <div className="flex justify-center mb-12">
          <div className="w-full sm:w-3/4 md:w-1/2">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by title, author..."
            />
          </div>
        </div>

        {favorites.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              ⭐ Your Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favorites.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onFavorite={toggleFavorite}
                  isFavorite={true}
                  onEdit={() => openForm(book)}
                  onDelete={() => handleDelete(book.id)}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            🔍 Search Results
          </h2>

          {loading && <p className="text-gray-500 text-lg">Loading books...</p>}
          {error && <p className="text-red-500 text-lg">{error}</p>}
          {!loading && filteredBooks.length === 0 && search && !error && (
            <p className="text-gray-500 text-lg">
              No books found for "<span className="italic">{search}</span>".
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onFavorite={toggleFavorite}
                isFavorite={favorites.some((f) => f.id === book.id)}
                onEdit={() => openForm(book)}
                onDelete={() => handleDelete(book.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>
            <form className="space-y-4" onSubmit={handleAddOrUpdate}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                required
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                required
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Publish Year"
                value={formData.publishYear}
                required
                onChange={(e) => setFormData({ ...formData, publishYear: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  {editingBook ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
