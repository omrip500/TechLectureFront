import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [usage, setUsage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל להשתמש בנתונים המאוחסנים במשתנים המצויינים מעל על מנת לבצע פעולות נוספות, כמו שליחת הטופס לשרת.
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <div className="registration-description">
          <h1>Welcome to Our Community!</h1>
          <p>
            Join our platform and enjoy a seamless experience. Connect with
            others, learn and share knowledge.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Registration Form</h2>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Lecturer">Lecturer</option>
              <option value="IT Worker">IT Worker</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Usage:</label>
            <select value={usage} onChange={(e) => setUsage(e.target.value)}>
              <option value="">Select usage</option>
              <option value="Private">Private</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="maybeHaveAccount">
            <p>
              Already have an account? <a href="#">Log in</a>
            </p>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
