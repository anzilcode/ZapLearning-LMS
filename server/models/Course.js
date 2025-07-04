const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: String,
  url: String,
  isPreviewFree: { type: Boolean, default: false }
});

const ChapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lectures: [LectureSchema]
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    fee: { type: Number, default: 0 },
    thumbnail: String,
    chapters: [ChapterSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
