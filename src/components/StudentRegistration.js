import React, { useState, useEffect } from 'react';
import './StudentRegistration.css';

const StudentRegistration = ({ offerings }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // To track which student is being edited

  // Load registered students from localStorage on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('registeredStudents')) || [];
    if (savedStudents.length > 0) {
      setRegisteredStudents(savedStudents);
    }
  }, []); // Run only once on component mount

  // Save registered students to localStorage whenever they change
  useEffect(() => {
    if (registeredStudents.length > 0) {
      localStorage.setItem('registeredStudents', JSON.stringify(registeredStudents));
    }
  }, [registeredStudents]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!studentName || !selectedOffering) {
      alert('Please fill in all fields.');
      return;
    }

    const newStudent = { studentName, offering: selectedOffering };

    if (editIndex !== null) {
      // Update the student
      const updatedStudents = [...registeredStudents];
      updatedStudents[editIndex] = newStudent;
      setRegisteredStudents(updatedStudents);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add new student
      setRegisteredStudents((prevStudents) => [...prevStudents, newStudent]);
    }

    // Show popup and reset form
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setStudentName('');
    setSelectedOffering('');
  };

  const handleEdit = (index) => {
    const studentToEdit = registeredStudents[index];
    setStudentName(studentToEdit.studentName);
    setSelectedOffering(studentToEdit.offering);
    setEditIndex(index); // Set the student to edit
  };

  const handleDelete = (index) => {
    const updatedStudents = registeredStudents.filter((_, i) => i !== index);
    setRegisteredStudents(updatedStudents);
  };

  return (
    <div className="student-registration-container">
      <h2 className="student-registration-header">Student Registration</h2>

      <form onSubmit={handleRegister}>
        <input
          className="student-registration-input"
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <select
          className="student-registration-input"
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(e.target.value)}
          required
        >
          <option value="" disabled>Select Course Offering</option>
          {offerings.map((offering, index) => (
            <option key={index} value={`${offering.course} - ${offering.type}`}>
              {offering.course} - {offering.type}
            </option>
          ))}
        </select>

        <button
          className="student-registration-button student-registration-add-button"
          type="submit"
        >
          {editIndex !== null ? 'Update' : 'Register'}
        </button>
      </form>

      {showPopup && (
        <div className="popup-box">
          🥳 Successfully registered! Now you can explore 😍.
        </div>
      )}

      <h4>Registered Students</h4>
      <ul className="student-registration-list">
        {registeredStudents.map((student, index) => (
          <li key={index} className="student-registration-item">
            <span>{student.studentName}</span>
            <span>{student.offering}</span>
            <button
              className="edit-button"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentRegistration;
