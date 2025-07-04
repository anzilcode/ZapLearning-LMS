import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseCard from '../Components/CourseCard';

const CourseList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';

  const [searchValue, setSearchValue] = useState(searchParam);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/courses');
        setCourses(res.data);
        setFilteredCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const results = courses.filter(course =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchValue, courses]);

  const handleCardClick = (id) => {
    navigate(`/courseDetails/${id}`);
  };

  return (
    <section id="courses" className="bg-blue-50 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Explore Our Full Course Library
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upgrade your skills with a curated list of courses across development, cloud, DevOps, cybersecurity and more.
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex items-center gap-4 mb-12">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((item) => (
            <div
              key={item._id}
              className="hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleCardClick(item._id)}
            >
              <CourseCard
                thumbnail={item.thumbnail} 
                title={item.title}
                courseBy={item.createdBy?.name || 'Unknown'}
                rating={4.5} 
                price={item.fee}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No courses found.</p>
        )}
      </div>
    </section>
  );
};

export default CourseList;
