import React, { useEffect, useState } from "react";

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5001/Empoyee_protal/getEmployeeData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployeeData(data);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, []);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (token) {
        // Call the logout history API to record the logout time
        const response = await fetch("http://localhost:5001/Empoyee_protal/logout_history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Empoye_ID: employeeData.Empoye_ID, // Assuming you have the employee ID available
          }),
        });
  
        if (response.ok) {
          console.log("Logout successful!");
        } else {
          const data = await response.json();
          throw new Error(data.error || "Failed to logout");
        }
      }
  
      // Remove token and other user-related data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
  
      // Redirect to the login page
      window.location.href = "/EmployeePortal";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  return (
    <div>
      <h1>Welcome to the Employee Dashboard</h1>
      {employeeData && (
        <div>
          <p>Name: {employeeData.EmpoyeeName}</p>
          <p>Email: {employeeData.EmpoyeeEmail}</p>
          {/* Add other employee details here */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;
