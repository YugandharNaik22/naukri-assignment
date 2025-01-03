import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistration from './components/StudentRegistration';

const App = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const addCourseType = (type) => setCourseTypes([...courseTypes, type]);
  const addCourse = (course) => setCourses([...courses, course]);
  const addOffering = (offering) => setOfferings([...offerings, offering]);
  const registerStudent = (registration) =>
    setRegistrations([...registrations, registration]);

  // New functions for editing and deleting courses
  const updateCourseType = (index, updatedType) => {
    const updatedCourseTypes = [...courseTypes];
    updatedCourseTypes[index] = updatedType;
    setCourseTypes(updatedCourseTypes);
  };

  const deleteCourseType = (index) => {
    const updatedCourseTypes = courseTypes.filter((_, i) => i !== index);
    setCourseTypes(updatedCourseTypes);
  };

  // New functions for updating and deleting courses
  const updateCourse = (index, updatedCourse) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = updatedCourse;
    setCourses(updatedCourses);
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/course-types"
            element={
              <CourseTypes
                courseTypes={courseTypes}
                addCourseType={addCourseType}
                updateCourseType={updateCourseType} // Pass updateCourseType to CourseTypes
                deleteCourseType={deleteCourseType} // Pass deleteCourseType to CourseTypes
              />
            }
          />
          <Route
            path="/courses"
            element={
              <Courses
                courses={courses}
                addCourse={addCourse}
                updateCourse={updateCourse} // Pass updateCourse to Courses
                deleteCourse={deleteCourse} // Pass deleteCourse to Courses
              />
            }
          />
          <Route
            path="/course-offerings"
            element={
              <CourseOfferings
                courses={courses}
                courseTypes={courseTypes}
                addOffering={addOffering}
              />
            }
          />
          <Route
            path="/student-registrations"
            element={
              <StudentRegistration offerings={offerings} registerStudent={registerStudent} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
