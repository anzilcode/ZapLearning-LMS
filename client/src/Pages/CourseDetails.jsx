import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`https://zaplearning-backend.onrender.com/courses/${id}`);
        setCourse(data);
      } catch (err) {
        console.error('Failed to fetch course details', err);
      }
    };
    fetchCourse();
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  if (!course) {
    return <p className="text-center mt-20">Loading course details...</p>;
  }

  const discountedPrice = (course.fee * 1.1).toFixed(2); // +10%
  const totalLectures = course.chapters.reduce(
    (acc, chapter) => acc + chapter.lectures.length,
    0
  );
  const totalHours = course.chapters.reduce((acc, chapter) => {
    return (
      acc +
      chapter.lectures.reduce((a, lecture) => {
        const hours = parseFloat(lecture.duration) || 0;
        return a + hours;
      }, 0)
    );
  }, 0);

  return (
    <section className="px-4 py-10 md:px-20 bg-gray-50 flex flex-col md:flex-row gap-8">
      {/* LEFT */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-blue-800">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <p className="mt-4 text-sm text-gray-500">Instructor: <span className="font-semibold">{course.createdBy.name || 'Unknown'}</span></p>

        {/* Chapters Table */}
        <div className="mt-6 bg-white shadow rounded p-4 overflow-y-auto max-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="text-blue-600 border-b">
              <tr>
                <th>Chapter</th>
                <th>Lecture</th>
                <th>Duration</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {course.chapters.map((chapter, ci) =>
                chapter.lectures.map((lecture, li) => (
                  <tr key={`${ci}-${li}`} className="border-b hover:bg-blue-50">
                    <td>{chapter.name}</td>
                    <td>{lecture.title}</td>
                    <td>{lecture.duration || '-'}</td>
                    <td>
                      {lecture.isPreviewFree ? (
                        <button
                          onClick={() => setPreviewUrl(lecture.url)}
                          className="text-blue-500 underline"
                        >
                          Preview
                        </button>
                      ) : (
                        <span className="text-gray-400">Locked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-96">
        <div className="bg-white shadow rounded p-6">
          {previewUrl ? (
            previewUrl.includes('youtube') || previewUrl.includes('youtu.be') ? (
              <iframe
                src={`${getEmbedUrl(previewUrl)}?autoplay=1`}
                title="Preview Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-40 rounded mb-4"
              />
            ) : (
              <video
                src={previewUrl}
                autoPlay
                controls
                className="w-full h-40 rounded mb-4"
              />
            )
          ) : (
            <img
              src={course.thumbnail}
              alt="Thumbnail"
              className="w-full h-40 object-cover rounded mb-4"
            />
          )}

          <p className="text-red-500 text-sm">
            Hurry! Price will increase soon:
            <span className="line-through ml-1 text-gray-400">
              ₹{discountedPrice}
            </span>
            <span className="ml-1 font-bold text-green-600">
              ₹{course.fee}
            </span>
          </p>

          <div className="mt-4">
            <p><strong>Rating:</strong> ⭐⭐⭐⭐☆</p>
            <p><strong>Total Hours:</strong> {totalHours} hrs</p>
            <p><strong>Total Lessons:</strong> {totalLectures}</p>
          </div>

          <button
            onClick={() => navigate('/payment')}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Enroll Now
          </button>

          <div className="mt-4 text-sm text-gray-600">
            <p>✅ Lifetime access</p>
            <p>✅ Step by step hands-on projects</p>
            <p>✅ Downloadable resources</p>
            <p>✅ Certificate of completion</p>
            <p>✅ Quizzes & assessments</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
