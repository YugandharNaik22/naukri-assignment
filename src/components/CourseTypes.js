import React, { useState } from 'react';
import './CourseTypes.css';

const CourseTypes = ({ courseTypes, addCourseType, updateCourseType, deleteCourseType }) => {
  const [newType, setNewType] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTypeName, setEditTypeName] = useState('');

  const handleAddType = () => {
    if (newType.trim()) {
      addCourseType(newType);
      setNewType('');
    }
  };

  const handleEditType = (index) => {
    setEditIndex(index);
    setEditTypeName(courseTypes[index]);
  };

  const handleSaveEdit = () => {
    if (editTypeName.trim()) {
      updateCourseType(editIndex, editTypeName);
      setEditIndex(null);
      setEditTypeName('');
    }
  };

  const handleDeleteType = (index) => {
    deleteCourseType(index);
  };

  return (
    <div className="course-types-container">
      <h2 className="course-types-header">Manage Course Types</h2>
      
      <input
        className="course-types-input"
        type="text"
        placeholder="Enter Course Type"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
      />
      <button
        className="course-types-button course-types-add-button"
        onClick={handleAddType}
      >
        Add
      </button>

      {editIndex !== null && (
        <div className="edit-type-container">
          <input
            className="course-types-input"
            type="text"
            value={editTypeName}
            onChange={(e) => setEditTypeName(e.target.value)}
          />
          <button
            className="course-types-button course-types-save-button"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      )}

      <ul className="course-types-list">
        {courseTypes.map((type, index) => (
          <li key={index} className="course-types-item">
            <span>{type}</span>
            <button
              className="course-types-button course-types-edit-button"
              onClick={() => handleEditType(index)}
            >
              Edit
            </button>
            <button
              className="course-types-button course-types-delete-button"
              onClick={() => handleDeleteType(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseTypes;
