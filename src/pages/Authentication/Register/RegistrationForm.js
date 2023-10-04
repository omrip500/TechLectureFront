import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

import "./RegistrationForm.css";

const errorsExist = (errors) => {
  if (Object.keys(errors).length !== 0) {
    return true;
  }
  return false;
};

const validateFunction = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 3) {
    errors.password = "The password must contain at least three characters";
  }

  if (!values.verifyPassword) {
    errors.verifyPassword = "Required";
  } else if (values.verifyPassword !== values.password) {
    errors.verifyPassword = "The passwords are not matches";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.role) {
    errors.role = "Required";
  }
  if (!values.usage) {
    errors.usage = "Required";
  }
  return errors;
};

const RegistrationForm = () => {
  const [dataFromServer, setDataFromServer] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [passwordErrorFromServer, setPasswordErrorFromServer] = useState();

  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }

  if (dataFromServer.status === 201) {
    return <Navigate to="/signedUpSuccsessfully" replace={true} />;
  }

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validateFunction}
        onSubmit={async (values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));
          // console.log(values);
          // const response = await fetch("http://localhost:8080/register", {
          const response = await fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setDataFromServer(data);
              if (data.status === 409) {
                setIsAlreadyRegistered(true);
              } else if (data.status === 508) {
                setPasswordErrorFromServer(data);
                setIsAlreadyRegistered(false);
              }

              // setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
          /* and other goodies */
        }) => (
          <div className="registration-container">
            <div className="registration-content">
              <div className="registration-description">
                <h1>Welcome to Our Community!</h1>
                <p>
                  Join our platform and enjoy a seamless experience. Connect
                  with others, learn and share knowledge.
                </p>
              </div>
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  {passwordErrorFromServer && (
                    <p>{passwordErrorFromServer.message}</p>
                  )}
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="errorMessage"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="errorMessage"
                />

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.email}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="errorMessage"
                  />
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="errorMessage"
                />

                <div className="form-group">
                  <label>Verify Password:</label>
                  <input
                    type="password"
                    name="verifyPassword"
                    value={values.verifyPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="verifyPassword"
                  component="div"
                  className="errorMessage"
                />

                <div className="form-group">
                  <label>Role:</label>
                  <select
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select role</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="IT Worker">IT Worker</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="errorMessage"
                />
                <div className="form-group">
                  <label>Usage:</label>
                  <select
                    name="usage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select usage</option>
                    <option value="Private">Private</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <ErrorMessage
                  name="usage"
                  component="div"
                  className="errorMessage"
                />
                <div className="maybeHaveAccount">
                  <p>
                    Already have an account?
                    <Link to="/login">
                      <span className="loginWord">Login</span>
                    </Link>
                  </p>
                </div>
                <button
                  className={`submit-button${
                    errorsExist(errors) ? "Disabled" : ""
                  }`}
                  type="submit"
                  // className="submit-button"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                {isAlreadyRegistered && (
                  <p className="registered">
                    You have an account. Please log in.
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;

// Dat8pfiZHtLb2FAU
