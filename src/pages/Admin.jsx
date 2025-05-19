import { useState } from 'react';
import { books, addBook } from '../data/store';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(formData);
    setFormData({
      title: '',
      description: '',
      image: '',
    });
    setPreviewImage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between mb-8">
        <Logo />
        <Link to="/" className="btn btn-secondary ml-4">Back Home</Link>
      </nav>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="input mt-1"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows="4"
                className="input mt-1"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Book Cover Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="mt-1"
                onChange={handleImageChange}
              />
            </div>

            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              Add Book
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Books ({books.length})</h2>
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="border-b pb-4">
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin; 