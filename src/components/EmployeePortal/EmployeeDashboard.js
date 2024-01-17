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
          console.log(employeeData)
        })
      
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, []);

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
    </div>
  );
};

export default EmployeeDashboard;
