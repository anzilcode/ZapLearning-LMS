const Course = require('../models/Course');
const mongoose = require('mongoose');


const addCourse = async (req, res) => {
  try {
    const { title, description, fee, chapters } = req.body;

    const thumbnail = req.file ? req.file.path : '';

    const course = new Course({
      title,
      description,
      fee,
      thumbnail,
      chapters: JSON.parse(chapters),
      createdBy: req.user._id
    });

    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating course' });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('createdBy', 'name email'); 
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};


const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const course = await Course.findById(id).populate('createdBy', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching course' });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user._id });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch your courses' });
  }
};


module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  getMyCourses 
}

