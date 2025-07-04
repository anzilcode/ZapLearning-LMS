import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [auth, setAuth] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleAuth = () => {
    setAuth(auth === 'login' ? 'signUp' : 'login');
    setFormData({ name: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    

    const endpoint =
      auth === 'signUp'
        ? 'http://localhost:5000/auth/register'
        : 'http://localhost:5000/auth/login';

    try {
      const response = await axios.post(endpoint, formData);
      setMessage(response.data.message || 'Success!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {auth === 'login' ? 'Login to ZapLearn' : 'Create Your ZapLearn Account'}
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600 font-medium">{message}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {auth === 'signUp' && (
            <div>
              <label className="block text-sm font-medium text-blue-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-blue-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {auth === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <p className="text-center text-sm mt-4 text-gray-700">
            {auth === 'login' ? (
              <>
                Don't have an account?{' '}
                <span
                  onClick={handleAuth}
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already registered?{' '}
                <span
                  onClick={handleAuth}
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
