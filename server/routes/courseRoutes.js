const express = require('express');
const { addCourse, getAllCourses, getCourseById, getMyCourses } = require('../controllers/CourseControllers');
const { protect } = require('../middleware/protect');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lms_thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
  },
});

const upload = multer({ storage });

router.get('/', getAllCourses);

router.post('/add', protect, upload.single('thumbnail'), addCourse);

router.get('/my-courses', protect, getMyCourses); 

router.get('/:id', getCourseById);

module.exports = router;




