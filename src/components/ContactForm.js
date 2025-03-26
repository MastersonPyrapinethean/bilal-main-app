import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serverUrl: "https://api.yaavaay.com/contact",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openContactForm = () => {
    setIsOpen(true);
  };

  const closeContactForm = () => {
    setIsOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(formData.serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (response.ok) {
        setFormData({
          ...formData,
          name: "",
          email: "",
        });
        setSuccessMessage("Form data sent successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Error sending form data");
        setSuccessMessage("");
        console.log(response);
      }
    } catch (error) {
      setErrorMessage("Network error or unexpected error occurred");
      setSuccessMessage("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="contact-container">
        <div id="mode-of-action">
          <h1>MODE OF ACTION:</h1>
          <ul>
            <li>2024 - <u>YAAVAAY.com</u> Public Registar</li>
            <li>2025 - Y-GEN Conglomerate Planning</li>
            <li>2026 - SEFIHEAN Contact Management</li>
          </ul>
        </div>
        <span
          className="contact-icon"
          onClick={() => openContactForm()}
          tabIndex="0"
          role="button"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              openContactForm();
            }
          }}
        >
          CONTACT
        </span>
        {isOpen && (
          <div
            className="contact-overlay"
            onClick={closeContactForm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                closeContactForm();
              }
            }}
            role="button"
            tabIndex="0"
          >
            <div
              className="contact-popup"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              }}
              role="button"
              tabIndex="0"
            >
              <div className="cross-icon">
                <span
                  className="cross-button"
                  onClick={closeContactForm}
                  tabIndex="0"
                  role="button"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      closeContactForm();
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              <div className="contact-form">
                <h2 className="heading">CONTACT</h2>
                <form
                  className="form-inputs"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    rows={4}
                    cols={30}
                    id="name"
                    name="name"
                    className="input-area"
                    value={formData.name}
                    maxLength={800}
                    onChange={handleChange}
                    required
                    placeholder="Message"
                  />
                  <input
                    type="text"
                    name="serverUrl"
                    id="serverUrl"
                    className="input"
                    placeholder="Enter Server URL"
                    value={formData.serverUrl}
                    onChange={handleChange}
                    hidden
                    required
                  />
                  <button className="submit-button" type="submit">
                    Submit
                  </button>
                </form>
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
