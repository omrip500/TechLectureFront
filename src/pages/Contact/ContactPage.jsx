import React, { useState } from "react";
import "./ContactPage.css";
import { baseApi } from "../../consts";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailNotSent, setEmailNotSent] = useState(false);
  const [clickedSubmit, setClickedSubmit] = useState(false);

  const handleSubmit = async (e) => {
    setEmailNotSent(false);
    e.preventDefault();
    setClickedSubmit(true);
    const emailWholeMessage = {
      name: name,
      email: email,
      message: message,
    };

    setName("");
    setEmail("");
    setMessage("");

    const response = await fetch(`${baseApi}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailWholeMessage),
    });

    if (!response.ok) {
      setEmailNotSent(true);
    }

    console.log(emailNotSent);
    console.log(clickedSubmit);
  };

  return (
    <div className="contact-container flex center">
      <div className="contact-content flex">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            We would love to hear from you. Fill out the form below to get in
            touch.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          {emailNotSent && clickedSubmit && (
            <p className="emailNotSent">
              The form was not sent, there was a problam. Please try again.
            </p>
          )}
          {!emailNotSent && clickedSubmit && (
            <p className="emailWasSent">Succsessfully sent you data.</p>
          )}
          <h2>Contact Form</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default ContactPage;
