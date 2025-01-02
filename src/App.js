import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/course-types" element={<CourseTypes />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-offerings" element={<CourseOfferings />} />
          <Route path="/student-registrations" element={<StudentRegistrations />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
