import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState('');

  // Load existing courses from localStorage on component mount
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const addCourse = () => {
    if (input.trim()) {
      const updatedCourses = [...courses, input];
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setInput('');
    }
  };

  const updateCourse = (index, newName) => {
    if (newName.trim()) {
      const updatedCourses = [...courses];
      updatedCourses[index] = newName;
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  return (
    <div className='courses-container'>
      <h2 className='courses-header'>Courses</h2>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className='courses-input'
        placeholder="Add new course"
      />
      <button 
        onClick={addCourse} 
        className='courses-button courses-add-button'
      >
        Add Course
      </button>
      <ul className='courses-list'>
        {courses.map((course, index) => (
          <li key={index} className='courses-item'>
            <span>{course}</span>
            <button 
              onClick={() => updateCourse(index, prompt('New name:', course))}
              className='courses-button courses-edit-button'
            >
              Edit
            </button>
            <button 
              onClick={() => deleteCourse(index)} 
              className='courses-button courses-delete-button'
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
