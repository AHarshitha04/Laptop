import React, { useState } from 'react'
import EmployeeDashboard from './EmployeeDashboard';

const EmployeeLOGIN_differentation = () => {
    const [employeeData, setEmployeeData] = useState(null);

    const handleLogout = async () => {
        try {
          const token = localStorage.getItem("token");
      
        //   if (token) {
        //     // Call the logout history API to record the logout time
        //     const response = await fetch("http://localhost:5001/Empoyee_protal/logout_history", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //       },
        //       body: JSON.stringify({
        //         Empoye_ID: employeeData.Empoye_ID, // Assuming you have the employee ID available
        //       }),
        //     });
      
        //     if (response.ok) {
        //       console.log("Logout successful!");
        //     } else {
        //       const data = await response.json();
        //       throw new Error(data.error || "Failed to logout");
        //     }
        //   }
      
          // Remove token and other user-related data from local storage
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
      
          // Redirect to the login page
          window.location.href = "/EmployeePortal";
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

    const userRole = localStorage.getItem('userRole');
  return (
    <div>

{userRole === "Admin" && (
        <div>
          <p>Admin View: Show limited features</p>

        <EmployeeDashboard/>

          {/* Viewer-specific content goes here */}
        </div>
      )}

<button onClick={handleLogout}>Logout</button>
{userRole === "SuperAdmin" && (
        <div>
          <p>SuperAdmin View: Show limited features</p>

        

          <EmployeeDashboard/>
          {/* Viewer-specific content goes here */}
        </div>
      )}

{userRole === "user" && (
        <div>
          <p>user View: Show limited features</p>


          {/* Viewer-specific content goes here */}
        </div>
      )}


    </div>
  )
}

export default EmployeeLOGIN_differentation