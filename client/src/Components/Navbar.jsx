import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/zapLOgo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isEducator, setIsEducator] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    try {
      const parsedUser =
        storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      setUser(null);
    }

    if (role === 'educator') {
      setIsEducator(true);
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setUser(null);
    setIsEducator(false);
  };

  const handleEducatorClick = () => {
    if (isEducator) {
      navigate('/educator');
    } else {
      setShowToast(true);
      localStorage.setItem('role', 'educator');
      setIsEducator(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="relative">
      <div className="h-[70px] flex justify-between items-center px-6 border-b">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="ZapLearn Logo"
            className="h-[60px] object-contain cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {user ? (
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/enrollments')}
              className="text-blue-700 font-semibold hover:underline"
            >
              My Enrollments
            </button>

            <button
              onClick={handleEducatorClick}
              className="text-purple-700 font-semibold hover:underline"
            >
              {isEducator ? 'Educator Dashboard' : 'Become an Educator'}
            </button>

            <div ref={dropdownRef} className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || ''}
                </div>
                <span className="font-medium text-blue-800">{user?.name || ''}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button text="Create Account" onClick={() => navigate('/auth')} />
        )}
      </div>

      {showToast && (
        <div className="absolute top-[80px] right-6 w-72 bg-green-100 border-l-4 border-green-600 text-green-800 p-4 rounded shadow animate-slide-in z-50">
          <div className="font-semibold">🎉 You can now publish courses!</div>
          <div className="w-full bg-green-200 h-2 mt-2 rounded overflow-hidden">
            <div className="h-full bg-green-600 animate-progress-bar"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
