import React from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Submit_Page = () => {
    const navigate = useNavigate();
    const handleResult = () => {
        // window.alert("Your Test has been Submitted!! Click Ok to See Result.");
    
      
        navigate("/TestResultsPage");
      };

  return (
    <div>
      <h1>Thank You, Submitted Successfully.</h1>
      <button onClick={handleResult}>View Result</button>
    </div>
  )
}

export default Submit_Page
