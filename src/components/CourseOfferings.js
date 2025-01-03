import React, { useState } from 'react';
import './CourseOfferings.css';

const CourseOfferings = ({ courses, courseTypes, addOffering }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleAddOffering = () => {
    if (selectedCourse && selectedType) {
      addOffering({ course: selectedCourse, type: selectedType });
      setSelectedCourse('');
      setSelectedType('');
    }
  };

  return (
    <div className="course-offerings-container">
      <h2 className="course-offerings-header">Manage Course Offerings</h2>
      <select
        className="course-offerings-input"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="" disabled>Select Course</option>
        {courses.map((course, index) => (
          <option key={index} value={course}>{course}</option>
        ))}
      </select>
      <select
        className="course-offerings-input"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="" disabled>Select Course Type</option>
        {courseTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      <button
        className="course-offerings-button course-offerings-add-button"
        onClick={handleAddOffering}
      >
        Add Offering
      </button>
    </div>
  );
};

export default CourseOfferings;
