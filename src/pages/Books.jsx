import { books } from '../data/store';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

function Books() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between mb-8">
        <Logo />
        <Link to="/" className="btn btn-secondary ml-4">Back Home</Link>
      </nav>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books; 