import { FaTimes, FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6 flex justify-center items-center w-full max-w-md mx-auto relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Search books..."
        className="w-full p-3 pl-4 pr-12 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes />
        </button>
      )}
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
