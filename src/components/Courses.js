import React, { useState } from 'react';
import './Courses.css';

const Courses = ({ courses, addCourse, updateCourse, deleteCourse }) => {
  const [newCourse, setNewCourse] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editCourseName, setEditCourseName] = useState('');

  const handleAddCourse = () => {
    if (newCourse.trim()) {
      addCourse(newCourse);
      setNewCourse('');
    }
  };

  const handleEditCourse = (index) => {
    setEditIndex(index);
    setEditCourseName(courses[index]);
  };

  const handleSaveEdit = () => {
    if (editCourseName.trim()) {
      updateCourse(editIndex, editCourseName); // Save the updated course
      setEditIndex(null); // Reset the edit state
      setEditCourseName(''); // Clear the input field
    }
  };

  const handleDeleteCourse = (index) => {
    deleteCourse(index); // Delete the course
  };

  return (
    <div className="courses-container">
      <h2 className="courses-header">Manage Courses</h2>
      
      <input
        className="courses-input"
        type="text"
        placeholder="Enter Course Name"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
      />
      <button
        className="courses-button courses-add-button"
        onClick={handleAddCourse}
      >
        Add
      </button>

      {editIndex !== null && (
        <div className="edit-course-container">
          <input
            className="courses-input"
            type="text"
            value={editCourseName}
            onChange={(e) => setEditCourseName(e.target.value)} // Update the course name while editing
          />
          <button
            className="courses-button courses-save-button"
            onClick={handleSaveEdit} // Save after editing
          >
            Save
          </button>
        </div>
      )}

      <ul className="courses-list">
        {courses.map((course, index) => (
          <li key={index} className="courses-item">
            <span>{course}</span>
            <button
              className="courses-button courses-edit-button"
              onClick={() => handleEditCourse(index)} // Edit the selected course
            >
              Edit
            </button>
            <button
              className="courses-button courses-delete-button"
              onClick={() => handleDeleteCourse(index)} // Delete the selected course
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
