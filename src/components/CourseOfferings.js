import React, { useState, useEffect } from 'react';
import './CourseOfferings.css';

const CourseOfferings = () => {
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [course, setCourse] = useState('');
  const [courseType, setCourseType] = useState('');

  // Load existing course offerings from localStorage on component mount
  useEffect(() => {
    const savedCourseOfferings = JSON.parse(localStorage.getItem('courseOfferings')) || [];
    setCourseOfferings(savedCourseOfferings);
  }, []);

  const addCourseOffering = () => {
    if (course.trim() && courseType.trim()) {
      const newCourseOffering = `${courseType} - ${course}`;
      const updatedCourseOfferings = [...courseOfferings, newCourseOffering];
      setCourseOfferings(updatedCourseOfferings);
      localStorage.setItem('courseOfferings', JSON.stringify(updatedCourseOfferings));
      setCourse('');
      setCourseType('');
    }
  };

  const updateCourseOffering = (index, newCourse, newCourseType) => {
    if (newCourse.trim() && newCourseType.trim()) {
      const updatedCourseOfferings = [...courseOfferings];
      updatedCourseOfferings[index] = `${newCourseType} - ${newCourse}`;
      setCourseOfferings(updatedCourseOfferings);
      localStorage.setItem('courseOfferings', JSON.stringify(updatedCourseOfferings));
    }
  };

  const deleteCourseOffering = (index) => {
    const updatedCourseOfferings = courseOfferings.filter((_, i) => i !== index);
    setCourseOfferings(updatedCourseOfferings);
    localStorage.setItem('courseOfferings', JSON.stringify(updatedCourseOfferings));
  };

  return (
    <div className='course-offerings-container'>
      <h2 className='course-offerings-header'>Course Offerings</h2>
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className='course-offerings-input'
        placeholder="Enter course name"
      />
      <input
        type="text"
        value={courseType}
        onChange={(e) => setCourseType(e.target.value)}
        className='course-offerings-input'
        placeholder="Enter course type"
      />
      <button
        onClick={addCourseOffering}
        className='course-offerings-button course-offerings-add-button'
      >
        Add Course Offering
      </button>
      <ul className='course-offerings-list'>
        {courseOfferings.map((offering, index) => (
          <li key={index} className='course-offerings-item'>
            <span>{offering}</span>
            <button
              onClick={() => {
                const newCourse = prompt('Enter new course name:', offering.split(' - ')[1]);
                const newCourseType = prompt('Enter new course type:', offering.split(' - ')[0]);
                if (newCourse && newCourseType) {
                  updateCourseOffering(index, newCourse, newCourseType);
                }
              }}
              className='course-offerings-button course-offerings-edit-button'
            >
              Edit
            </button>
            <button
              onClick={() => deleteCourseOffering(index)}
              className='course-offerings-button course-offerings-delete-button'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOfferings;
