import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  Menu
} from 'lucide-react';
import Dashboard from './Dashboard';
import MyCourse from './MyCourse';
import Enrollments from './Enrolled';
import AddCourse from './AddCourse';

const menuItems = [
  { label: 'Dashboard', icon: <LayoutDashboard />, key: 'dashboard' },
  { label: 'Add Course', icon: <PlusCircle />, key: 'add-course' },
  { label: 'My Courses', icon: <BookOpen />, key: 'my-courses' },
  { label: 'Students Enrolled', icon: <Users />, key: 'students' },
];

const Educator = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-course':
        return <AddCourse />;
      case 'my-courses':
        return <MyCourse />;
      case 'students':
        return <Enrollments />;
      default:
        return null;
    }
  };

  const handleMenuItemClick = (key) => {
    setActiveTab(key);
    setShowMobileMenu(false); // close mobile menu after selection
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-xl font-bold text-blue-700">Educator</h1>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="text-blue-700"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow px-4 py-2 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
                activeTab === item.key
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleMenuItemClick(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-8">Educator</h1>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
                activeTab === item.key
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleMenuItemClick(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Educator;


