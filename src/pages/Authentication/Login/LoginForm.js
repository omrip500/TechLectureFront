import React, { useState, useContext } from "react";
import { Formik } from "formik";
import "./LoginForm.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";

const errorsExist = (errors) => {
  if (Object.keys(errors).length !== 0) {
    return true;
  }
  return false;
};

const LoginPage = ({ toLecture }) => {
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [dontHvaeAccount, setDontHvaeAccount] = useState(false);
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  console.log(location);

  // if (isAuthenticated() && toLecture) {
  //   navigate(-1);
  // }

  if (isAuthenticated() && toLecture) {
    window.location.replace(
      `http://localhost:3000/lectures/studentPosition/${123}`
    );
  }

  if (isAuthenticated()) {
    return <Navigate to={"/"} replace={true} />;
  }

  // useEffect(() => {
  //   navigate("/");
  // }, userIsLoggedIn);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 3) {
            errors.password =
              "The password must contain at least three characters";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));
          // console.log(values);
          // const response = await fetch("http://localhost:8080/login", {
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            if (data.status === 401) {
              setIsPasswordWrong(true);
              setDontHvaeAccount(false);
            } else if (data.status === 402) {
              setDontHvaeAccount(true);
            } else if (data.status === 200) {
              setIsPasswordWrong(false);
              setDontHvaeAccount(false);
              signIn({
                token: data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                },
              });
            }
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="login-container">
            <div className="login-content">
              <div className="login-img">
                <img
                  src={require("../../../images/login_illustration.png")}
                  // width="960px"
                  // height="759px"
                  alt="login_illustration"
                />
              </div>
              <div class="login-form">
                <h2>Hey, Good to See You!</h2>
                <form onSubmit={handleSubmit}>
                  {toLecture && (
                    <p className="haveToLogInMessage">
                      You have to log in if you want to join a lecture.
                    </p>
                  )}
                  <br />
                  <h2>Login</h2>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <p className="problamMessage">
                    {errors.email && touched.email && errors.email}
                  </p>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                  <p className="errorMessage">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <div className="dontHaveAccount">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className={`login-button${
                      errorsExist(errors) ? "Disabled" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  {isPasswordWrong && (
                    <p className="problamMessage">Wrong Password</p>
                  )}
                  {dontHvaeAccount && (
                    <p className="problamMessage">
                      You don't have an account, please Register.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
