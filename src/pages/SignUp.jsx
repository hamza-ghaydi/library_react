import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addUser, findUserByEmail, findUserByUsername } from '../data/store';
import Logo from '../components/Logo';

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    showVerificationCode(code);
  };

  const showVerificationCode = (code) => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Your verification code is: " + code);
      }
    });
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (findUserByEmail(formData.email)) {
      setError('Email already exists');
      return;
    }
    if (findUserByUsername(formData.username)) {
      setError('Username already exists');
      return;
    }
    generateVerificationCode();
    setStep(2);
    setError('');
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      setStep(3);
      setError('');
    } else {
      setError('Invalid verification code');
    }
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    addUser(formData);
    navigate('/login');
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
            Sign Up
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step {step} of 3
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="input mt-1"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="input mt-1"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="input mt-1"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                type="text"
                name="code"
                id="code"
                required
                className="input mt-1"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Verify
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="space-y-6">
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
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp; 