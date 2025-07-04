import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'https://zaplearning-backend.onrender.com/enrollments/my-students'
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(data);
      } catch (err) {
        console.error('Failed to fetch enrolled students', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading enrolled students...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-blue-50 min-h-[calc(100vh-70px)]">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center flex items-center justify-center gap-2">
        📥 Student Enrollments
      </h1>

      {students.length === 0 ? (
        <p className="text-center text-gray-600">No students have enrolled yet.</p>
      ) : (
        <div className="bg-white shadow-md rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left py-3 px-4">Student Name</th>
                <th className="text-left py-3 px-4">Course Title</th>
                <th className="text-left py-3 px-4">Enrolled Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-blue-100 transition duration-200"
                >
                  <td className="py-3 px-4">{item.student?.name || 'N/A'}</td>
                  <td className="py-3 px-4">{item.course?.title || 'N/A'}</td>
                  <td className="py-3 px-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollment;
