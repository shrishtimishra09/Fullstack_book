import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaEdit, FaTrash } from "react-icons/fa";

export default function BookCard({ book, onFavorite, isFavorite, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative">
      <div className="w-full h-64 bg-gray-200 relative">
        <img
          src={book.coverImage || "https://via.placeholder.com/300x400?text=No+Cover"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        {onFavorite && (
          <button
            onClick={() => onFavorite(book)}
            className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 transition z-10"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 w-5 h-5" />
            ) : (
              <FaRegHeart className="text-gray-500 w-5 h-5" />
            )}
          </button>
        )}
        {(onEdit || onDelete) && (
          <div className="absolute bottom-2 right-2 flex gap-2 z-10">
            {onEdit && (
              <button
                onClick={onEdit}
                className="bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100 transition"
                title="Edit Book"
              >
                <FaEdit className="text-blue-500 w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100 transition"
                title="Delete Book"
              >
                <FaTrash className="text-red-500 w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1 line-clamp-1">by {book.author}</p>
        <p className="text-gray-500 text-xs mb-2">Published: {book.publishYear}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) =>
            i < (book.rating || 4) ? (
              <FaStar key={i} className="text-yellow-400 w-4 h-4" />
            ) : (
              <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
            )
          )}
          <span className="text-gray-500 text-xs ml-2">({book.reviews || 10} reviews)</span>
        </div>
        {book.description && (
          <p className="text-gray-700 text-sm line-clamp-3 mb-2">{book.description}</p>
        )}
        {book.genres && book.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {book.genres.map((genre, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex justify-between items-center">
          <Link
            to={`/book/${book.id}`}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            View Details →
          </Link>
          {!onFavorite && <div />} 
        </div>
      </div>
    </div>
  );
}
