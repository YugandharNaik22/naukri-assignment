import React, { useState } from 'react';
import Courses from './Courses'; // Import Courses Component

const ParentComponent = () => {
  const [courses, setCourses] = useState([]);

  // Add Course function
  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  // Update Course function
  const updateCourse = (index, updatedCourse) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = updatedCourse; // Replace the old course with the new one
    setCourses(updatedCourses);
  };

  // Delete Course function
  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, idx) => idx !== index);
    setCourses(updatedCourses);
  };

  return (
    <div>
      <Courses
        courses={courses}
        addCourse={addCourse}
        updateCourse={updateCourse} // Pass the updateCourse function here
        deleteCourse={deleteCourse}
      />
    </div>
  );
};

export default ParentComponent;
