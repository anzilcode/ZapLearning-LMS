import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Navbar from './Components/Navbar';
import CourseList from './Pages/CourseList';
import Enrollments from './Pages/Enrollment';
import Educator from './Pages/Educator/Educator';
import CourseDetails from './Pages/CourseDetails';
import ProtectedRoute from './Components/ProtectedRoute';

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/auth';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/CourseList" element={<CourseList />} />
        
        {/* 🔒 Protected Routes */}
        <Route
          path="/enrollments"
          element={
            <ProtectedRoute>
              <Enrollments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/educator"
          element={
            <ProtectedRoute>
              <Educator />
            </ProtectedRoute>
          }
        />

        <Route path="/courseDetails/:id" element={<CourseDetails />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
