import React, { useState, useEffect } from 'react';
import './CourseTypes.css';

const CourseTypes = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(null); // To track the editing index
  const [editInput, setEditInput] = useState(''); // To track the editing input value

  // Load existing course types from localStorage on component mount
  useEffect(() => {
    const savedCourseTypes = JSON.parse(localStorage.getItem('courseTypes')) || [];
    setCourseTypes(savedCourseTypes);
  }, []);

  const addCourseType = () => {
    if (input.trim()) {
      const updatedCourseTypes = [...courseTypes, input];
      setCourseTypes(updatedCourseTypes);
      localStorage.setItem('courseTypes', JSON.stringify(updatedCourseTypes));
      setInput('');
    }
  };

  const deleteCourseType = (index) => {
    const updatedCourseTypes = courseTypes.filter((_, i) => i !== index);
    setCourseTypes(updatedCourseTypes);
    localStorage.setItem('courseTypes', JSON.stringify(updatedCourseTypes));
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditInput(courseTypes[index]); // Set the current value as the editing input
  };

  const updateCourseType = () => {
    if (editInput.trim()) {
      const updatedCourseTypes = [...courseTypes];
      updatedCourseTypes[isEditing] = editInput;
      setCourseTypes(updatedCourseTypes);
      localStorage.setItem('courseTypes', JSON.stringify(updatedCourseTypes));
      setIsEditing(null);
      setEditInput('');
    }
  };

  return (
    <div className='course-types-container'>
      <h2 className='course-types-header'>Course Types</h2>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className='course-types-input'
        placeholder="Add new course type"
      />
      <button 
        onClick={addCourseType} 
        className='course-types-button course-types-add-button'
      >
        Add
      </button>
      <ul className='course-types-list'>
        {courseTypes.map((type, index) => (
          <li key={index} className='course-types-item'>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className='course-types-input'
                />
                <button 
                  onClick={updateCourseType} 
                  className='course-types-button course-types-edit-button'
                >
                  Save
                </button>
                <button 
                  onClick={() => setIsEditing(null)} 
                  className='course-types-button course-types-edit-button'
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{type}</span>
                <button 
                  onClick={() => startEditing(index)} 
                  className='course-types-button course-types-edit-button'
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteCourseType(index)} 
                  className='course-types-button course-types-delete-button'
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseTypes;
