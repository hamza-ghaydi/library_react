import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { findUserByEmail, findUserByUsername } from '../data/store';
import Logo from '../components/Logo';

function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailOrUsername, password } = formData;

    // Try to find user by email or username
    const user = findUserByEmail(emailOrUsername) || findUserByUsername(emailOrUsername);

    if (!user || user.password !== password) {
      setError('Invalid email/username or password');
      return;
    }

    setCurrentUser(user);
    if (user.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/books');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <nav className="w-full max-w-md flex items-center justify-between mb-8">
        <Logo />
        <Link to="/" className="btn btn-secondary ml-4">Back Home</Link>
      </nav>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              name="emailOrUsername"
              id="emailOrUsername"
              required
              className="input mt-1"
              value={formData.emailOrUsername}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="input mt-1"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; 