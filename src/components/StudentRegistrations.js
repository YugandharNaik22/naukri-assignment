import React, { useState, useEffect } from 'react';
import './StudentRegistration.css';

const StudentRegistration = () => {
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [students, setStudents] = useState({});
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Load course offerings and students from localStorage
  useEffect(() => {
    const savedCourseOfferings = JSON.parse(localStorage.getItem('courseOfferings')) || [];
    setCourseOfferings(savedCourseOfferings);
    const savedStudents = JSON.parse(localStorage.getItem('students')) || {};
    setStudents(savedStudents);
  }, []);

  // Add new course offering
  const addCourseOffering = () => {
    if (courseName.trim() && courseType.trim()) {
      const newCourseOffering = `${courseType} - ${courseName}`;
      const updatedCourseOfferings = [...courseOfferings, newCourseOffering];
      setCourseOfferings(updatedCourseOfferings);
      localStorage.setItem('courseOfferings', JSON.stringify(updatedCourseOfferings));
      setCourseName('');
      setCourseType('');
    }
  };

  // Register student for a course offering
  const registerStudent = (courseOffering) => {
    if (studentName.trim()) {
      const courseKey = courseOffering;
      const updatedStudents = { ...students };

      if (!updatedStudents[courseKey]) {
        updatedStudents[courseKey] = [];
      }

      updatedStudents[courseKey].push(studentName);
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudentName('');
    }
  };

  // Filter course offerings by type
  const filterCourseOfferings = (courseType) => {
    setSelectedCourseType(courseType);
    if (courseType) {
      const filtered = courseOfferings.filter((offering) => offering.startsWith(courseType));
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courseOfferings);
    }
  };

  // List of registered students for a specific course offering
  const getRegisteredStudents = (courseOffering) => {
    return students[courseOffering] || [];
  };

  return (
    <div className="student-registration-container">
      <h2 className="student-registration-header">Student Registration</h2>

      {/* Filter by Course Type */}
      <select
        className="student-registration-input"
        value={selectedCourseType}
        onChange={(e) => filterCourseOfferings(e.target.value)}
      >
        <option value="">Select Course Type</option>
        <option value="Individual">Individual</option>
        <option value="Group">Group</option>
      </select>

      {/* Course Offering Creation */}
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="student-registration-input"
        placeholder="Enter course name"
      />
      <input
        type="text"
        value={courseType}
        onChange={(e) => setCourseType(e.target.value)}
        className="student-registration-input"
        placeholder="Enter course type"
      />
      <button
        onClick={addCourseOffering}
        className="student-registration-button student-registration-add-button"
      >
        Add Course Offering
      </button>

      {/* Display filtered Course Offerings */}
      <ul className="student-registration-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((offering, index) => (
            <li key={index} className="student-registration-item">
              <span>{offering}</span>
              {/* Register Student for this Course Offering */}
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="student-registration-input"
                placeholder="Enter student's name"
              />
              <button
                onClick={() => registerStudent(offering)}
                className="student-registration-button student-registration-add-button"
              >
                Register
              </button>

              {/* List Registered Students */}
              <div>
                <h4>Registered Students:</h4>
                <ul>
                  {getRegisteredStudents(offering).map((student, idx) => (
                    <li key={idx}>{student}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))
        ) : (
          <p>No course offerings available for the selected type.</p>
        )}
      </ul>
    </div>
  );
};

export default StudentRegistration;
