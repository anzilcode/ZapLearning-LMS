import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import this
import BrandPartner from '../Components/BrandPartner';
import Courses from '../Components/Courses';
import Footer from '../Components/Footer';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      navigate(`/courses?search=${encodeURIComponent(searchInput)}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div id='home' className="min-h-[calc(100vh-70px)] flex flex-col justify-center items-center px-4 sm:px-6 pt-10 pb-10 bg-gradient-to-b from-blue-50 via-white to-white text-center">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Empower Your Learning Journey <br />
            <span className="text-blue-600">Anytime, Anywhere.</span>
          </h1>
          <p className="mt-6 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            ZapLearn is your all-in-one platform built for modern learners.
            Track your progress, access curated content, and stay motivated with
            tools designed to match your personal pace — <span className="text-blue-600 font-medium">from classroom to career.</span>
          </p>

          {/* Search Bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                placeholder="Search the course"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full py-3 pl-12 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                🔍
              </span>
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <BrandPartner />
      <Courses />
      <Footer />
    </div>
  );
};

export default Home;
