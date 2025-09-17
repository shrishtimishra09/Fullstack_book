import { Routes, Route, Link } from "react-router-dom";
import BookSearch from "./pages/BookSearch";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";

function NotFound() {
  return (
    <div className="text-center mt-20 w-full">
      <h1 className="text-4xl font-bold text-gray-600">404</h1>
      <p className="text-gray-500 mt-2">Page not found</p>
      <Link to="/" className="text-blue-600 underline mt-4 inline-block">
        Go back to Search
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-blue-600">📚 Book Explorer</h1>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-600 font-medium">
            Search
          </Link>
          <Link to="/favorites" className="hover:text-blue-600 font-medium">
            Favorites
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full p-6">
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
