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


// to  register btn api start
  // const handleempolyeeportalregisterSubmit = async (e) => {
  //   e.preventDefault();
  //   // Check if the Empoyeename contains only letters
  //   if (!containsOnlyLetters(formData.Empoyeename)) {
  //     setFormData({
  //       ...formData,
  //       error: "Empoyeename must contain only letters.",
  //     });
  //     return;
  //   }
  //   // Perform client-side validation for individual fields
  //   if (!isValidEmail(formData.EmpoyeeEmail)) {
  //     setFormData({
  //       ...formData,
  //       error: "Please enter a valid egradtutor.in email.",
  //     });
  //     return;
  //   }
  
  //   // Check if the password contains a combination of letters and numbers
  //   if (!containsLetterAndNumber(formData.EmpoyeePassword)) {
  //     setFormData({
  //       ...formData,
  //       error: "Password must contain a combination of letters and numbers.",
  //     });
  //     return;
  //   }
  
  
  
  //   // If all individual field validations pass, proceed with form submission
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5001/Empoyee_protal/Employeeportal_register",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
  
  //     if (response.ok) {
  //       console.log("Employee registered successfully");
  //       window.location.reload();
  //     } else {
  //       const responseData = await response.json();
  //       if (responseData.error === "Email already exists") {
  //         setFormData({
  //           ...formData,
  //           error:
  //             "Email already exists. Please use a different egradtutor.in email.",
  //         });
  //       } else {
  //         console.error("Failed to register employee");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //   }
  // };
  
  // const isValidEmail = (email) => {
  //   // Check if the email is a valid egradtutor.com email
  //   const emailPattern = /^[a-zA-Z0-9._%+-]+@egradtutor\.in$/;
  //   return emailPattern.test(email);
  // };
  
  // const containsLetterAndNumber = (password) => {
  //   // Check if the password contains at least one letter and one number
  //   const letterPattern = /[a-zA-Z]/;
  //   const numberPattern = /[0-9]/;
  //   return letterPattern.test(password) && numberPattern.test(password);
  // };
  
  // const containsOnlyLetters = (name) => {
  //   // Check if the name contains only letters
  //   const letterPattern = /^[a-zA-Z]+$/;
  //   return letterPattern.test(name);
  // };

// to  register btn api end

  
  

  // Frontend: Update login fetch request
  // Frontend code
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
      localStorage.setItem('userRole', employee.Emp_Role);

      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem('isLoggedIn', 'true');

      // Call the login history API after a successful login
      await fetch("http://localhost:5001/Empoyee_protal/login_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Empoye_ID: employee.Empoye_ID,
          employee_name: employee.Empoyeename, // Make sure the key matches the backend expectation
        }),
      });

      console.log("Login successful!");
      window.location.href = "/EmployeeLOGIN_differentation";
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
          {/* {employeelogincontainer ? (
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
          ) : null} */}




 

{/* origanal login */}
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
      {/* <p>
        Don't have an account ?
        <Link onClick={handleemployeeregistercontainer}>
          Register here
        </Link>
      </p> */}
    </form>
    {formData.error && (
      <div style={{ color: "red" }}>{formData.error}</div>
    )}
  </div>

        </div>
      </div>
    </>
  );
};


