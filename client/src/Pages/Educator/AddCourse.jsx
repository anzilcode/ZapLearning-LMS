import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, PlusCircle, Trash2 } from 'lucide-react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot } from 'lexical';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [fee, setFee] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState('');

  const [chapters, setChapters] = useState([]);
  const [currentChapterName, setCurrentChapterName] = useState('');
  const [lectureModalOpen, setLectureModalOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);

  const [lectureData, setLectureData] = useState({
    title: '',
    duration: '',
    url: '',
    isPreviewFree: false,
  });

  const config = {
    namespace: 'CourseDescription',
    onError(error) {
      throw error;
    },
  };

  const handleDescriptionChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setDescription(root.getTextContent());
    });
  };

  const addChapter = () => {
    if (!currentChapterName.trim()) return;
    setChapters((prev) => [...prev, { name: currentChapterName, lectures: [] }]);
    setCurrentChapterName('');
  };

  const openLectureModal = (chapterIndex) => {
    setSelectedChapterIndex(chapterIndex);
    setLectureModalOpen(true);
  };

  const addLecture = () => {
    if (!lectureData.title.trim() || selectedChapterIndex === null) return;

    setChapters((prev) => {
      const updated = [...prev];
      updated[selectedChapterIndex].lectures.push(lectureData);
      return updated;
    });

    setLectureData({ title: '', duration: '', url: '', isPreviewFree: false });
    setLectureModalOpen(false);
  };

  const removeLecture = (chapterIndex, lectureIndex) => {
    setChapters((prev) => {
      const updated = [...prev];
      updated[chapterIndex].lectures = updated[chapterIndex].lectures.filter(
        (_, i) => i !== lectureIndex
      );
      return updated;
    });
  };

  const removeChapter = (chapterIndex) => {
    setChapters((prev) => prev.filter((_, i) => i !== chapterIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('fee', fee);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('chapters', JSON.stringify(chapters));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add a course.');
        return;
      }

      const res = await axios.post(
        'https://zaplearning-backend.onrender.com/courses/add'
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Course created:', res.data);
      alert('✅ Course added successfully!');

      // Reset form
      setTitle('');
      setFee('');
      setThumbnail(null);
      setDescription('');
      setChapters([]);
    } catch (err) {
      console.error('Error adding course:', err);
      alert('❌ Failed to add course');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        🎓 Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
          <div className="border border-gray-300 rounded-lg px-3 py-2 min-h-[150px] focus-within:ring-2 focus-within:ring-blue-500">
            <LexicalComposer initialConfig={config}>
              <RichTextPlugin
                contentEditable={<ContentEditable className="outline-none min-h-[100px]" />}
                placeholder={<p className="text-gray-400">Enter course description...</p>}
              />
              <HistoryPlugin />
              <OnChangePlugin onChange={handleDescriptionChange} />
            </LexicalComposer>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Fee (₹)</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-blue-600 font-medium">
            <UploadCloud size={20} />
            Upload Thumbnail
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="hidden"
            />
          </label>
          {thumbnail && <span className="text-sm text-gray-700">{thumbnail.name}</span>}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Chapter Name"
            value={currentChapterName}
            onChange={(e) => setCurrentChapterName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="button"
            onClick={addChapter}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Chapter
          </button>
        </div>

        {chapters.map((chapter, cIndex) => (
          <div key={cIndex} className="mt-4 border rounded-lg p-4 bg-blue-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-blue-800">{chapter.name}</h3>
              <button onClick={() => removeChapter(cIndex)} className="text-red-600 hover:text-red-800">
                <Trash2 size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => openLectureModal(cIndex)}
              className="mt-2 text-blue-600 hover:underline flex items-center gap-1"
            >
              <PlusCircle size={16} />
              Add Lecture
            </button>

            {chapter.lectures.length > 0 && (
              <ul className="mt-2 space-y-1">
                {chapter.lectures.map((lecture, lIndex) => (
                  <li key={lIndex} className="flex justify-between bg-white px-3 py-1 rounded">
                    <span>{lIndex + 1}. {lecture.title} ({lecture.duration})</span>
                    <button onClick={() => removeLecture(cIndex, lIndex)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold mt-4"
        >
          Submit Course
        </button>
      </form>

      {lectureModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-blue-700">Add Lecture</h3>
            <input
              type="text"
              placeholder="Lecture Title"
              value={lectureData.title}
              onChange={(e) => setLectureData({ ...lectureData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Duration (e.g. 10 mins)"
              value={lectureData.duration}
              onChange={(e) => setLectureData({ ...lectureData, duration: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="url"
              placeholder="Lecture Video URL"
              value={lectureData.url}
              onChange={(e) => setLectureData({ ...lectureData, url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lectureData.isPreviewFree}
                onChange={(e) => setLectureData({ ...lectureData, isPreviewFree: e.target.checked })}
              />
              <span className="text-sm">Is Preview Free?</span>
            </label>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setLectureModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addLecture}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Lecture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
