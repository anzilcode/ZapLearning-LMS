import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, FileCheck, FileClock, Pencil, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        'https://zaplearning-backend.onrender.com/courses/my-courses'
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch your courses', err);
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);

  const total = courses.length;
  const published = courses.filter(c => c.status === 'Published').length;
  const drafts = courses.filter(c => c.status === 'Draft').length;

  if (loading) {
    return <p className="text-center mt-20">Loading your courses...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Hero Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">📚 My Courses</h1>
        <p className="text-gray-600">Manage your published and drafted courses from here.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Courses</p>
            <h2 className="text-xl font-bold">{total}</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <FileCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Published</p>
            <h2 className="text-xl font-bold">{total}</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <FileClock size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Drafts</p>
            <h2 className="text-xl font-bold">{drafts}</h2>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-800 mb-1">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {course.description?.slice(0, 50) || 'No description'}
              </p>

              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    course.status === 'Published'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {course.status || 'Published'}
                </span>
                <span className="text-sm text-gray-600">
                  💰 ₹{course.fee}
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition">
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/courseDetails/${course._id}`)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  <Eye size={16} />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
