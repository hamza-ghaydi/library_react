import { Link } from 'react-router-dom';
import { books } from '../data/store';
import Logo from '../components/Logo';

function Home({ currentUser, setCurrentUser }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Logo />
        </div>
        <div className="space-x-4">
          {currentUser ? (
            <>
              <span className="text-gray-600">Welcome, {currentUser.username}</span>
              <button
                onClick={() => setCurrentUser(null)}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>

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

export default Home; 