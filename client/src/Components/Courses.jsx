import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from './CourseCard';

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://zaplearning-backend.onrender.com');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (id) => {
    navigate(`/courseDetails/${id}`);
  };

  return (
    <section id='courses' className="bg-blue-50 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          Fuel Your Career with the Right Skills
        </h1>
        <p className="text-gray-600 text-base max-w-xl mx-auto">
          Technical, soft, and industry-specific skills — expertly curated for professionals.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {courses.slice(0, 4).map((item) => (
            <div
              key={item._id}
              onClick={() => handleCourseClick(item._id)}
              className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <CourseCard
                thumbnail={item.thumbnail}
                title={item.title}
                courseBy={item.createdBy?.name || 'Unknown Instructor'}
                rating={item.rating || 5}
                price={item.fee}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate('/CourseList')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-300 cursor-pointer"
        >
          Show More Courses
        </button>
      </div>
    </section>
  );
};

export default Courses;

