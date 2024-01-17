import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock, FaUserAlt } from "react-icons/fa";
import employeepagelogo from "./assets/logo.png";
import "./styles/EmployeePortal.css";

const EmployeePortal = () => {
  return (
    <>
      {/* -------------- header--------------------- */}
      <EmployeePortalHomepageLogin />
    </>
  );
};

export default EmployeePortal;

export const EmployeePortalHomepageLogin = () => {
  const [employeelogincontainer, setEmployeelogincontainer] = useState(true);
  const [employeeregistercontainer, setEmployeeregistercontainer] =
    useState(false);

  const handleemployeelogincontainer = () => {
    setEmployeelogincontainer(true);
    setEmployeeregistercontainer(false);
  };

  const handleemployeeregistercontainer = () => {
    setEmployeelogincontainer(false);
    setEmployeeregistercontainer(true);
  };

  const [formData, setFormData] = useState({
    Empoyeename: "",
    EmpoyeeEmail: "",
    EmpoyeePassword: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleempolyeeportalregisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5001/Empoyee_protal/Employeeportal_register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Employee registered successfully");
        window.location.reload();
      } else {
        const responseData = await response.json();
        if (responseData.error === "Email already exists") {
          setFormData({
            ...formData,
            error: "Email already exists. Please use a different email.",
          });
        } else {
          console.error("Failed to register employee");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // Frontend: Update login fetch request
const handleempolyeeportalloginSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5001/Empoyee_protal/Employeeportal_login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmpoyeeEmail: formData.EmpoyeeEmail,
          EmpoyeePassword: formData.EmpoyeePassword,
        }),
        credentials: "same-origin",
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const { token, employee } = responseData;

      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      // Get the current date and time
      const currentDateTime = new Date();

      // Extract day name, month name, and format date
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      const formattedDateTime = currentDateTime.toLocaleDateString(
        "en-US",
        options
      );

      // Call the login history API after a successful login
      await fetch("http://localhost:5001/Empoyee_protal/login_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Empoye_ID: employee.Empoye_ID,
          login_time: formattedDateTime,
          employee_name: employee.Empoyeename,
        }),
      });

      console.log("Login successful!");
      window.location.href = "/Employee_dashboard";
    } else {
      const data = await response.json();
      throw new Error(data.error || "Failed to login");
    }
  } catch (error) {
    console.error("Error:", error);

    setFormData({
      ...formData,
      error: error.message || "Error logging in",
    });
  }
};



  return (
    <>
      <div className="EmployeePortalHomepageLogin_login_container">
        <div className="EmployeePortalHomepageLogin_login_sub_container">
          {employeelogincontainer ? (
            <div>
              <h2>Employee Login</h2>
              <div className="employeepagelogo">
                <img src={employeepagelogo} alt="" />
              </div>
              <form>
                <label htmlFor="">
                  <MdAlternateEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.EmpoyeeEmail}
                    onChange={(e) => handleChange(e)}
                    name="EmpoyeeEmail"
                  />
                </label>
                <label htmlFor="">
                  <FaLock />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.EmpoyeePassword}
                    onChange={(e) => handleChange(e)}
                    name="EmpoyeePassword"
                  />
                </label>
                <button
                  className="btn"
                  onClick={handleempolyeeportalloginSubmit}
                >
                  Login
                </button>
                <p>
                  Don't have an account ?
                  <Link onClick={handleemployeeregistercontainer}>
                    Register here
                  </Link>
                </p>
              </form>
              {formData.error && (
                <div style={{ color: "red" }}>{formData.error}</div>
              )}
            </div>
          ) : null}

          {employeeregistercontainer ? (
            <>
              <h2>Employee Registration</h2>
              {formData.error && (
                <div style={{ color: "red" }}>{formData.error}</div>
              )}
              <div className="employeepagelogo">
                <img src={employeepagelogo} alt="" />
              </div>
              <form onSubmit={handleempolyeeportalregisterSubmit}>
                <label htmlFor="">
                  <FaUserAlt />
                  <input
                    type="text"
                    placeholder="User Name"
                    value={formData.Empoyeename}
                    onChange={(e) => handleChange(e)}
                    name="Empoyeename"
                  />
                </label>
                <label htmlFor="">
                  <MdAlternateEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.EmpoyeeEmail}
                    onChange={(e) => handleChange(e)}
                    name="EmpoyeeEmail"
                  />
                </label>
                <label htmlFor="">
                  <FaLock />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.EmpoyeePassword}
                    onChange={(e) => handleChange(e)}
                    name="EmpoyeePassword"
                  />
                </label>
                <button className="btn">Register</button>
                <p>
                  Already have an account ?
                  <Link onClick={handleemployeelogincontainer}>Login here</Link>
                </p>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
