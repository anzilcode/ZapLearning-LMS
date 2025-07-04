import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, BookOpen, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalEnrollments: 0,
    totalCourses: 0,
    totalEarnings: 0,
    recentEnrollments: []
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/dashboard-metrics');
        setMetrics(data);
      } catch (err) {
        console.error('Failed to fetch dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading dashboard...</p>;
  }

  const {
    totalEnrollments,
    totalCourses,
    totalEarnings,
    recentEnrollments
  } = metrics;

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Enrollments</p>
            <h3 className="text-xl font-bold text-blue-800">{totalEnrollments}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Courses</p>
            <h3 className="text-xl font-bold text-green-800">{totalCourses}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Earnings</p>
            <h3 className="text-xl font-bold text-yellow-700">₹{totalEarnings.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">📥 Latest Enrollments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.length > 0 ? (
                recentEnrollments.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4">{item.student}</td>
                    <td className="py-3 px-4">{item.course}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No recent enrollments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
