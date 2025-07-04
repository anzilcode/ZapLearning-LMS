const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const getDashboardMetrics = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const totalEarningsAgg = await Enrollment.aggregate([
      { $group: { _id: null, total: { $sum: "$feePaid" } } }
    ]);
    const totalEarnings = totalEarningsAgg[0]?.total || 0;

    const recentEnrollments = await Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('student', 'name')
      .populate('course', 'title');

    res.json({
      totalEnrollments,
      totalCourses,
      totalEarnings,
      recentEnrollments: recentEnrollments.map(e => ({
        student: e.student.name,
        course: e.course.title
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard metrics' });
  }
};

module.exports = { getDashboardMetrics };
