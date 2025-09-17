import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGraphQL } from "../utils/graphql";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `
      query ($id: ID!) {
        book(id: $id) {
          id
          title
          author
          description
          publishYear
          coverImage
        }
      }
    `;

    fetchGraphQL(query, { id })
      .then((data) => {
        if (data && data.book) {
          setBook(data.book);
        } else {
          setError("Book not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch book details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading book details...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 mt-10">
      <div className="md:w-1/3 flex-shrink-0">
        <img
          src={book.coverImage || "https://via.placeholder.com/300x450?text=No+Cover"}
          alt={book.title}
          className="w-full h-full object-cover rounded-md shadow-md"
        />
      </div>
      <div className="md:w-2/3 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-2">by <span className="font-semibold">{book.author}</span></p>
          <p className="text-sm text-gray-500 mb-4">Published: {book.publishYear}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{book.description || "No description available."}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Fiction</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Adventure</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Bestseller</span>
        </div>
      </div>
    </div>
  );
}
