// import React, { useEffect, useState } from "react";

// const EmployeeDashboard = () => {
//   const [employeeData, setEmployeeData] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       fetch("http://localhost:5001/Empoyee_protal/getEmployeeData", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setEmployeeData(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching employee data:", error);
//         });
//     }
//   }, []);
//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
  
//       if (token) {
//         // Call the logout history API to record the logout time
//         const response = await fetch("http://localhost:5001/Empoyee_protal/logout_history", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             Empoye_ID: employeeData.Empoye_ID, // Assuming you have the employee ID available
//           }),
//         });
  
//         if (response.ok) {
//           console.log("Logout successful!");
//         } else {
//           const data = await response.json();
//           throw new Error(data.error || "Failed to logout");
//         }
//       }
  
//       // Remove token and other user-related data from local storage
//       localStorage.removeItem("token");
//       localStorage.removeItem("isLoggedIn");
  
//       // Redirect to the login page
//       window.location.href = "/EmployeePortal";
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };
  

//   return (
//     <div>
//       <h1>Welcome to the Employee Dashboard</h1>
//       {employeeData && (
//         <div>
//           <p>Name: {employeeData.EmpoyeeName}</p>
//           <p>Email: {employeeData.EmpoyeeEmail}</p>
//           {/* Add other employee details here */}
//         </div>
//       )}
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default EmployeeDashboard;


import React, { useState } from 'react'
// import './Employee_Dashboard_Integration.css'
import { Link } from 'react-router-dom'
import Employee_Dashboard from './Employee_Dashboard'
import Employee_Information from './Employee_Information'
import Employee_Attendance from './Employee_Attendance'
import Employee_Approval from './Employee_Approval'
const EmployeeDashboard = () => {

  const [showempdashboard, setShowempdashboard] = useState(true);
  const [showempinfo, setShowempinfo] = useState(false);
  const [showempattendance, setShowempattendance] = useState(false);
  const [showempapproval, setShowempapproval] = useState(false);


  const handledisplayempdashboard = () => {
    setShowempdashboard(true);
    setShowempinfo(false);
    setShowempattendance(false);
    setShowempapproval(false);
  };

  const handledisplayempinfo = () => {
    setShowempdashboard(false);
    setShowempinfo(true);
    setShowempattendance(false);
    setShowempapproval(false);
  };

  const handledisplayempattendance = () => {
    setShowempdashboard(false);
    setShowempinfo(false);
    setShowempattendance(true);
    setShowempapproval(false);
  };

  const handledisplayempapproval = () => {
    setShowempdashboard(false);
    setShowempinfo(false);
    setShowempattendance(false);
    setShowempapproval(true);
  };

  return (
   <>
    <div className='emp_mainpage'>

<div className='Employee_Dashboard'>
  <div className='Dashboard_leftnav'>
    <Link onClick={handledisplayempdashboard} className='emp_leftnav'>Dashboard</Link>
    <Link onClick={handledisplayempinfo} className='emp_leftnav'>Employee Information</Link>
    <Link onClick={handledisplayempattendance} className='emp_leftnav'>Attendance</Link>
    <Link onClick={handledisplayempapproval} className='emp_leftnav'>Approval</Link>
    <Link className='emp_leftnav'>Message</Link>
  </div>
</div>

<div>
<div className='showempdashboard'>

  {showempdashboard ? (
    <>
      <Employee_Dashboard />
    </>
  ) : null}
</div>

<div className='showempdashboard'>
  {showempinfo ? (
    <>
      <Employee_Information />
    </>
  ) : null}
</div>

<div className='showempdashboard'>
  {showempattendance ? (
    <>
      <Employee_Attendance />
    </>
  ) : null}
</div>

<div className='showempdashboard'>
  {showempapproval ? (
    <>
      <Employee_Approval />
    </>
  ) : null}
</div>
</div>
</div>
    </>
  )
}

export default EmployeeDashboard