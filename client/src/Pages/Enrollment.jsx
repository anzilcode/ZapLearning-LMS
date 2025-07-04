import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'https://zaplearning-backend.onrender.com/enrollments/my-enrollments'
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrollments(data);
      } catch (err) {
        console.error('Failed to fetch enrollments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading your enrollments...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <main className="flex-grow py-10 px-4 sm:px-8 md:px-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-center flex items-center justify-center gap-3">
          📘 My Enrollments
        </h1>

        {enrollments.length === 0 ? (
          <p className="text-center text-gray-600">You have no enrollments yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Course Name</th>
                  <th className="py-3 px-4 text-left">Fee Paid</th>
                  <th className="py-3 px-4 text-left">Enrolled On</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {enrollments.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-blue-100 transition">
                    <td className="py-3 px-4">{item.course?.title || 'N/A'}</td>
                    <td className="py-3 px-4">₹{item.feePaid}</td>
                    <td className="py-3 px-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Enrollments;
