import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li>
          <NavLink to="/course-types" className="nav-link" activeClassName="active-link">
            Course Types
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className="nav-link" activeClassName="active-link">
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/course-offerings" className="nav-link" activeClassName="active-link">
            Course Offerings
          </NavLink>
        </li>
        <li>
          <NavLink to="/student-registrations" className="nav-link" activeClassName="active-link">
            Student Registrations
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
